import { useState, useEffect } from 'react';
import { API_ENDPOINTS, apiFetch } from '../config/api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      const data = await apiFetch(API_ENDPOINTS.WORKOUTS);
      setWorkouts(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError(err.message);
      setWorkouts([]);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'badge bg-success';
      case 'intermediate':
        return 'badge bg-warning';
      case 'advanced':
        return 'badge bg-danger';
      default:
        return 'badge bg-secondary';
    }
  };

  const filteredWorkouts =
    filter === 'all'
      ? workouts
      : workouts.filter((w) => w.difficulty === filter);

  if (loading) {
    return <div className="container mt-4"><p>Loading workouts...</p></div>;
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">Error: {error}</div>
        <button className="btn btn-primary" onClick={fetchWorkouts}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1>Workouts</h1>
      <div className="mb-3">
        <button className="btn btn-primary" onClick={fetchWorkouts}>
          Refresh
        </button>
        <div className="btn-group ms-2" role="group">
          <input
            type="radio"
            className="btn-check"
            name="difficulty"
            id="all"
            value="all"
            checked={filter === 'all'}
            onChange={() => setFilter('all')}
          />
          <label className="btn btn-outline-secondary" htmlFor="all">
            All
          </label>
          <input
            type="radio"
            className="btn-check"
            name="difficulty"
            id="beginner"
            value="beginner"
            checked={filter === 'beginner'}
            onChange={() => setFilter('beginner')}
          />
          <label className="btn btn-outline-secondary" htmlFor="beginner">
            Beginner
          </label>
          <input
            type="radio"
            className="btn-check"
            name="difficulty"
            id="intermediate"
            value="intermediate"
            checked={filter === 'intermediate'}
            onChange={() => setFilter('intermediate')}
          />
          <label className="btn btn-outline-secondary" htmlFor="intermediate">
            Intermediate
          </label>
          <input
            type="radio"
            className="btn-check"
            name="difficulty"
            id="advanced"
            value="advanced"
            checked={filter === 'advanced'}
            onChange={() => setFilter('advanced')}
          />
          <label className="btn btn-outline-secondary" htmlFor="advanced">
            Advanced
          </label>
        </div>
      </div>

      {filteredWorkouts.length === 0 ? (
        <div className="alert alert-info">No workouts found</div>
      ) : (
        <div className="row">
          {filteredWorkouts.map((workout) => (
            <div key={workout._id} className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{workout.name}</h5>
                  <p className="card-text">{workout.description}</p>
                  <div className="mb-2">
                    <span className={getDifficultyColor(workout.difficulty)}>
                      {workout.difficulty}
                    </span>
                  </div>
                  <p className="text-muted mb-2">
                    <strong>Duration:</strong> {workout.duration} minutes
                  </p>
                  {workout.exercises && workout.exercises.length > 0 && (
                    <div className="mb-2">
                      <strong>Exercises:</strong>
                      <ul className="mb-0">
                        {workout.exercises.map((ex, idx) => (
                          <li key={idx}>{ex}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {workout.targetMuscles && workout.targetMuscles.length > 0 && (
                    <div>
                      <strong>Target Muscles:</strong>
                      <div>
                        {workout.targetMuscles.map((muscle, idx) => (
                          <span key={idx} className="badge bg-info me-1">
                            {muscle}
                          </span>
                        ))}
                      </div>
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
