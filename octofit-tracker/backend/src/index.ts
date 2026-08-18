import express from 'express';
import mongoose from 'mongoose';
import { errorHandler } from './middleware/auth';

// Import routes
import authRoutes from './routes/auth';
import usersRoutes from './routes/users';
import teamsRoutes from './routes/teams';
import activitiesRoutes from './routes/activities';
import leaderboardRoutes from './routes/leaderboard';
import workoutsRoutes from './routes/workouts';

const app = express();
const PORT = process.env.PORT || 8000;

// Determine server URL based on environment
const getServerUrl = () => {
  const codespaceName = process.env.CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  return `http://localhost:${PORT}`;
};

const SERVER_URL = getServerUrl();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware (allow all origins for development)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// MongoDB connection
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/octofit_db';

mongoose.connect(mongoUrl)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Server is running',
    serverUrl: SERVER_URL,
    environment: process.env.CODESPACE_NAME ? 'Codespaces' : 'localhost'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/teams', teamsRoutes);
app.use('/api/activities', activitiesRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/workouts', workoutsRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use(errorHandler);

// Start server
const server = app.listen(PORT, () => {
  console.log(`\n🚀 Server is running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.CODESPACE_NAME ? 'GitHub Codespaces' : 'Local Development'}`);
  console.log(`🌐 API URL: ${SERVER_URL}\n`);
});

// Handle server shutdown gracefully
process.on('SIGINT', () => {
  console.log('Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    mongoose.disconnect();
    process.exit(0);
  });
});
