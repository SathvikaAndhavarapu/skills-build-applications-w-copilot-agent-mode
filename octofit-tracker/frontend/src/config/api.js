/**
 * API Configuration
 * Supports both Codespaces and localhost development
 */

export const getApiBaseUrl = () => {
  // Check if we're in a GitHub Codespace
  const codespaceName = process.env.CODESPACE_NAME;

  if (codespaceName) {
    // Codespaces environment - use the Codespace hostname
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  // Fallback to localhost for local development
  return 'http://localhost:8000';
};

export const API_BASE_URL = getApiBaseUrl();

/**
 * API endpoints
 */
export const API_ENDPOINTS = {
  HEALTH: `${API_BASE_URL}/api/health`,
  AUTH_REGISTER: `${API_BASE_URL}/api/auth/register`,
  AUTH_LOGIN: `${API_BASE_URL}/api/auth/login`,
  USERS: `${API_BASE_URL}/api/users`,
  TEAMS: `${API_BASE_URL}/api/teams`,
  ACTIVITIES: `${API_BASE_URL}/api/activities`,
  LEADERBOARD: `${API_BASE_URL}/api/leaderboard`,
  WORKOUTS: `${API_BASE_URL}/api/workouts`,
};

/**
 * Fetch helper with error handling
 */
export const apiFetch = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw error;
  }
};
