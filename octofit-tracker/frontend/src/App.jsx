import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import { API_BASE_URL, apiFetch, API_ENDPOINTS } from './config/api'
import Users from './components/Users'
import Teams from './components/Teams'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Workouts from './components/Workouts'

function Home() {
  const [apiStatus, setApiStatus] = useState('checking...')
  const [serverInfo, setServerInfo] = useState(null)

  useEffect(() => {
    checkApiHealth()
  }, [])

  const checkApiHealth = async () => {
    try {
      const data = await apiFetch(API_ENDPOINTS.HEALTH)
      setApiStatus('✅ Connected')
      setServerInfo(data)
      console.log('API Health:', data)
    } catch (error) {
      setApiStatus('❌ Disconnected')
      console.error('API Health Check Failed:', error)
    }
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-8">
          <h1>Octofit Tracker</h1>
          <p className="lead">
            A multi-tier fitness tracking application built with React, Express, and MongoDB.
          </p>

          <div className="alert alert-info mb-4">
            <h5>API Configuration</h5>
            <p>
              <strong>API Base URL:</strong> <code>{API_BASE_URL}</code>
            </p>
            <p>
              <strong>Status:</strong> <span>{apiStatus}</span>
            </p>
            {serverInfo && (
              <>
                <p>
                  <strong>Environment:</strong> {serverInfo.environment}
                </p>
                <p>
                  <strong>Server URL:</strong> {serverInfo.serverUrl}
                </p>
              </>
            )}
          </div>

          <h2>Features</h2>
          <ul className="list-group mb-4">
            <li className="list-group-item">
              👥 <strong>User Management</strong> - View and manage user profiles
            </li>
            <li className="list-group-item">
              👫 <strong>Teams</strong> - Create and manage fitness teams
            </li>
            <li className="list-group-item">
              🏃 <strong>Activities</strong> - Log and track fitness activities
            </li>
            <li className="list-group-item">
              🏆 <strong>Leaderboard</strong> - Compete on team leaderboards
            </li>
            <li className="list-group-item">
              💪 <strong>Workouts</strong> - Browse personalized workout suggestions
            </li>
          </ul>

          <h2>Get Started</h2>
          <p>Use the navigation menu above to explore different sections of the application.</p>
        </div>
        <div className="col-lg-4">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Quick Links</h5>
            </div>
            <div className="list-group list-group-flush">
              <Link to="/users" className="list-group-item list-group-item-action">
                👥 Users
              </Link>
              <Link to="/teams" className="list-group-item list-group-item-action">
                👫 Teams
              </Link>
              <Link to="/activities" className="list-group-item list-group-item-action">
                🏃 Activities
              </Link>
              <Link to="/leaderboard" className="list-group-item list-group-item-action">
                🏆 Leaderboard
              </Link>
              <Link to="/workouts" className="list-group-item list-group-item-action">
                💪 Workouts
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
          <div className="container">
            <Link className="navbar-brand" to="/">
              🐙 Octofit Tracker
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    Leaderboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    Workouts
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>

        <footer className="mt-5 mb-4 text-muted text-center">
          <div className="container">
            <p>&copy; 2026 Octofit Tracker - Multi-tier Fitness Application</p>
          </div>
        </footer>
      </div>
    </Router>
  )
}
