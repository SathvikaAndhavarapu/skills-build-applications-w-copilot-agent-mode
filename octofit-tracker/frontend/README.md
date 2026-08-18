# Octofit Tracker - React Frontend

This is a React 19 multi-tier presentation tier for the Octofit Tracker application.

## Prerequisites

- Node.js 18+
- npm or yarn
- Octofit backend running (Express server on port 8000)

## Installation

```bash
cd octofit-tracker/frontend
npm install
```

## Configuration

### Environment Variables

The application uses Vite environment variables. Create a `.env.local` file in the frontend directory:

```bash
# Required for Codespaces deployment
VITE_CODESPACE_NAME=your-codespace-name

# Optional API URL override
# VITE_API_BASE_URL=http://localhost:8000
```

#### Local Development
For local development without a Codespace, simply leave `VITE_CODESPACE_NAME` empty or create an empty `.env.local`. The application will default to `http://localhost:8000`.

#### Codespaces Deployment
In GitHub Codespaces, add your codespace name to `.env.local`:
```
VITE_CODESPACE_NAME=your-codespace-name-xxxxx
```

This will automatically configure the API to use:
```
https://your-codespace-name-xxxxx-8000.app.github.dev
```

### Safe Fallback
The application includes a safe fallback to prevent `https://undefined-8000.app.github.dev` URLs:
- If `VITE_CODESPACE_NAME` is unset or `undefined`, the application will use `http://localhost:8000`
- This ensures compatibility with both local and Codespaces deployments

## Development Server

Start the development server with hot reload on port 5173:

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

## Build

Build for production:

```bash
npm run build
```

Output is in the `dist/` directory.

## Preview

Preview the production build locally:

```bash
npm run preview
```

## Routing

The application uses React Router v7 for navigation:

- **/** - Home page with API health check
- **/users** - User management and listing
- **/teams** - Team management and details
- **/activities** - Activity logging and history
- **/leaderboard** - Team rankings and scores
- **/workouts** - Workout library and suggestions

## Components

### Available Components

- **Users.jsx** - Displays user profiles and management
- **Teams.jsx** - Displays team information and members
- **Activities.jsx** - Displays activity logs with filtering
- **Leaderboard.jsx** - Displays team leaderboards with rankings
- **Workouts.jsx** - Displays workout library with difficulty filtering

### Component Features

All components include:
- ✅ Error handling with retry buttons
- ✅ Loading states
- ✅ Array and paginated response support
- ✅ Responsive Bootstrap styling
- ✅ API endpoint integration

## API Integration

The application communicates with the backend API using:

```javascript
import { API_ENDPOINTS, apiFetch } from './config/api'

// Fetch data
const data = await apiFetch(API_ENDPOINTS.USERS)

// Available endpoints:
// API_ENDPOINTS.HEALTH
// API_ENDPOINTS.AUTH_REGISTER
// API_ENDPOINTS.AUTH_LOGIN
// API_ENDPOINTS.USERS
// API_ENDPOINTS.TEAMS
// API_ENDPOINTS.ACTIVITIES
// API_ENDPOINTS.LEADERBOARD
// API_ENDPOINTS.WORKOUTS
```

## Styling

The application uses:
- **Bootstrap 5** for responsive design
- **Custom CSS** for Octofit branding
- **Bootstrap utility classes** for layout and spacing

## Technologies

- **React 19** - UI library
- **React Router 7** - Client-side routing
- **Vite 8** - Build tool and dev server
- **Bootstrap 5** - CSS framework
- **Fetch API** - HTTP client

## Dependencies

- `react` - ^19.2.8
- `react-dom` - ^19.2.8
- `react-router-dom` - ^7.18.2
- `bootstrap` - ^5.3.8

## Dev Dependencies

- `@vitejs/plugin-react` - ^6.0.4
- `vite` - ^8.2.0
- `@types/react` - ^19.2.17
- `@types/react-dom` - ^19.2.3
- `oxlint` - ^1.75.0

## Troubleshooting

### API Connection Issues

If you see "❌ Disconnected" in the API status:

1. Ensure the backend server is running on port 8000:
   ```bash
   cd octofit-tracker/backend
   npm run dev
   ```

2. Check your `.env.local` configuration:
   - For local development, leave `VITE_CODESPACE_NAME` empty
   - For Codespaces, set it to your codespace name

3. Check the browser console for specific error messages

### Port Already in Use

If port 5173 is already in use, Vite will automatically use the next available port.

### Build Errors

If you encounter build errors, ensure all dependencies are installed:

```bash
npm install
npm cache clean --force
npm install
```

## Project Structure

```
frontend/
├── src/
│   ├── components/          # React components
│   │   ├── Users.jsx
│   │   ├── Teams.jsx
│   │   ├── Activities.jsx
│   │   ├── Leaderboard.jsx
│   │   └── Workouts.jsx
│   ├── config/
│   │   └── api.js          # API configuration & endpoints
│   ├── App.jsx             # Main app with routing
│   ├── main.jsx            # Entry point
│   ├── App.css             # Application styles
│   └── index.css           # Global styles
├── .env.local              # Environment variables (local)
├── .env.local.example      # Example environment file
├── vite.config.js          # Vite configuration
├── package.json            # Dependencies
└── index.html              # HTML template
```

## Contributing

When adding new components:

1. Create component in `src/components/`
2. Use the API configuration from `src/config/api.js`
3. Include error handling and loading states
4. Add route in `App.jsx`
5. Update navigation menu

## License

MIT
