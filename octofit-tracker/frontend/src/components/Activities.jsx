import { useState, useEffect } from 'react';
import { API_ENDPOINTS, apiFetch } from '../config/api';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const data = await apiFetch(API_ENDPOINTS.ACTIVITIES);
      setActivities(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError(err.message);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  const getActivityColor = (intensity) => {
    switch (intensity) {
      case 'low':
        return 'badge bg-success';
      case 'moderate':
        return 'badge bg-warning';
      case 'high':
        return 'badge bg-danger';
      default:
        return 'badge bg-secondary';
    }
  };

  if (loading) {
    return <div className="container mt-4"><p>Loading activities...</p></div>;
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">Error: {error}</div>
        <button className="btn btn-primary" onClick={fetchActivities}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1>Activities</h1>
      <button className="btn btn-primary mb-3" onClick={fetchActivities}>
        Refresh
      </button>

      {activities.length === 0 ? (
        <div className="alert alert-info">No activities found</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>User</th>
                <th>Activity Type</th>
                <th>Duration (min)</th>
                <th>Calories</th>
                <th>Distance</th>
                <th>Intensity</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id}>
                  <td>{activity.userId?.username || 'Unknown'}</td>
                  <td className="text-capitalize">{activity.activityType?.replace('_', ' ')}</td>
                  <td>{activity.duration}</td>
                  <td>{activity.calories}</td>
                  <td>{activity.distance ? `${activity.distance} km` : '-'}</td>
                  <td>
                    <span className={getActivityColor(activity.intensity)}>
                      {activity.intensity}
                    </span>
                  </td>
                  <td>{new Date(activity.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
