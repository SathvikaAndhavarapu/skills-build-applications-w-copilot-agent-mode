import { useState, useEffect } from 'react';
import { API_ENDPOINTS, apiFetch } from '../config/api';

export default function Leaderboard() {
  const [leaderboards, setLeaderboards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      // Note: Leaderboard endpoint structure might vary, adjust as needed
      const data = await apiFetch(API_ENDPOINTS.LEADERBOARD);
      setLeaderboards(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError(err.message);
      setLeaderboards([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container mt-4"><p>Loading leaderboard...</p></div>;
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">Error: {error}</div>
        <button className="btn btn-primary" onClick={fetchLeaderboard}>
          Retry
        </button>
      </div>
    );
  }

  // Group by teamId if available
  const groupedByTeam = leaderboards.reduce((acc, entry) => {
    const teamId = entry.teamId?._id || entry.teamId;
    if (!acc[teamId]) {
      acc[teamId] = [];
    }
    acc[teamId].push(entry);
    return acc;
  }, {});

  return (
    <div className="container mt-4">
      <h1>Leaderboard</h1>
      <button className="btn btn-primary mb-3" onClick={fetchLeaderboard}>
        Refresh
      </button>

      {leaderboards.length === 0 ? (
        <div className="alert alert-info">No leaderboard data found</div>
      ) : Object.keys(groupedByTeam).length > 0 ? (
        Object.entries(groupedByTeam).map(([teamId, entries]) => (
          <div key={teamId} className="mb-5">
            <h2>Team Rankings</h2>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Username</th>
                    <th>Points</th>
                    <th>Activities</th>
                    <th>Total Calories</th>
                  </tr>
                </thead>
                <tbody>
                  {entries
                    .sort((a, b) => a.rank - b.rank)
                    .map((entry, idx) => (
                      <tr key={entry._id} className={idx === 0 ? 'table-success' : ''}>
                        <td>
                          <strong>#{entry.rank}</strong>
                        </td>
                        <td>{entry.userId?.username || 'Unknown'}</td>
                        <td>{entry.points}</td>
                        <td>{entry.activitiesCompleted}</td>
                        <td>{entry.totalCalories}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Points</th>
                <th>Activities</th>
                <th>Total Calories</th>
              </tr>
            </thead>
            <tbody>
              {leaderboards
                .sort((a, b) => a.rank - b.rank)
                .map((entry, idx) => (
                  <tr key={entry._id} className={idx === 0 ? 'table-success' : ''}>
                    <td>
                      <strong>#{entry.rank}</strong>
                    </td>
                    <td>{entry.userId?.username || 'Unknown'}</td>
                    <td>{entry.points}</td>
                    <td>{entry.activitiesCompleted}</td>
                    <td>{entry.totalCalories}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
