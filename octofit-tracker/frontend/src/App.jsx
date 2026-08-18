import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { API_BASE_URL, API_ENDPOINTS, apiFetch } from './config/api'

function App() {
  const [count, setCount] = useState(0)
  const [apiStatus, setApiStatus] = useState('checking...')
  const [users, setUsers] = useState([])
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(false)

  // Check API health on component mount
  useEffect(() => {
    checkApiHealth()
  }, [])

  const checkApiHealth = async () => {
    try {
      const data = await apiFetch(API_ENDPOINTS.HEALTH)
      setApiStatus('✅ Connected')
      console.log('API Health:', data)
    } catch (error) {
      setApiStatus('❌ Disconnected')
      console.error('API Health Check Failed:', error)
    }
  }

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const data = await apiFetch(API_ENDPOINTS.USERS)
      setUsers(data)
      console.log('Users:', data)
    } catch (error) {
      console.error('Failed to fetch users:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchActivities = async () => {
    setLoading(true)
    try {
      const data = await apiFetch(API_ENDPOINTS.ACTIVITIES)
      setActivities(data)
      console.log('Activities:', data)
    } catch (error) {
      console.error('Failed to fetch activities:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Octofit Tracker</h1>
          <p>
            API Base URL: <code>{API_BASE_URL}</code>
          </p>
          <p>
            API Status: <strong>{apiStatus}</strong>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
        
        <div style={{ marginTop: '20px', textAlign: 'left' }}>
          <h2>API Testing</h2>
          <button onClick={checkApiHealth} style={{ marginRight: '10px' }}>
            Check Health
          </button>
          <button onClick={fetchUsers} style={{ marginRight: '10px' }} disabled={loading}>
            {loading ? 'Loading...' : 'Fetch Users'}
          </button>
          <button onClick={fetchActivities} disabled={loading}>
            {loading ? 'Loading...' : 'Fetch Activities'}
          </button>
          
          {users.length > 0 && (
            <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#f5f5f5' }}>
              <h3>Users ({users.length})</h3>
              <ul>
                {users.map((user) => (
                  <li key={user._id}>{user.username} - {user.email}</li>
                ))}
              </ul>
            </div>
          )}
          
          {activities.length > 0 && (
            <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#f5f5f5' }}>
              <h3>Activities ({activities.length})</h3>
              <ul>
                {activities.map((activity) => (
                  <li key={activity._id}>
                    {activity.activityType} - {activity.duration}min - {activity.calories} cal
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
