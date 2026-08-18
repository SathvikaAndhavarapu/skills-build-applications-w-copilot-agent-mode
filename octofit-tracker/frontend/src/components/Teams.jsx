import { useState, useEffect } from 'react';
import { API_ENDPOINTS, apiFetch } from '../config/api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const data = await apiFetch(API_ENDPOINTS.TEAMS);
      setTeams(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError(err.message);
      setTeams([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container mt-4"><p>Loading teams...</p></div>;
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">Error: {error}</div>
        <button className="btn btn-primary" onClick={fetchTeams}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1>Teams</h1>
      <button className="btn btn-primary mb-3" onClick={fetchTeams}>
        Refresh
      </button>

      {teams.length === 0 ? (
        <div className="alert alert-info">No teams found</div>
      ) : (
        <div className="row">
          {teams.map((team) => (
            <div key={team._id} className="col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text">{team.description}</p>
                  <p className="text-muted">
                    <small>Members: {team.members?.length || 0}</small>
                  </p>
                  {team.members && team.members.length > 0 && (
                    <div>
                      <strong>Members:</strong>
                      <ul className="mb-0">
                        {team.members.map((member) => (
                          <li key={member._id}>{member.username}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
