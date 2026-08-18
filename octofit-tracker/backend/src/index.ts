import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());

// MongoDB connection
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/octofit_db';

mongoose.connect(mongoUrl)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Basic health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
