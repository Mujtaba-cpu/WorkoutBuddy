import React, { useState, useEffect } from 'react';

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const WorkoutDetails = ({ workout, updateWorkouts }) => {
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    setDeleteSuccess(false); // Reset success message on workout change
  }, [workout]);

  const handleClick = async () => {
    const response = await fetch(`/workouts/${workout._id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setDeleteSuccess(true);
      updateWorkouts();
      setTimeout(() => {
        setDeleteSuccess(false);
      }, 5000); // Clear success message after 3 seconds
    }
  };
  const handleEdit = async () => {
    setEditMode(true);
    setTitle(workout.title);
    setLoad(workout.load);
    setReps(workout.reps);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/workouts/${workout._id}`, {
      method: 'PATCH',
      body: JSON.stringify({ title, load, reps }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setSuccessMessage('');
    }
    if (response.ok) {
      setError(null);
      setTitle('');
      setLoad('');
      setReps('');
      setSuccessMessage('Workout updated successfully!');
      setEditMode(false);
      updateWorkouts();
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000); // Clear success message after 3 seconds
    }
  }

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Number of reps: </strong>
        {workout.reps}
      </p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <div className="button-group">
        <span className='material-symbols-outlined' onClick={handleClick}>delete</span>
        <span className='material-symbols-outlined' style={{ cursor: 'pointer', marginRight: '45px' }} onClick={handleEdit} >edit
        </span>
      </div>

      {deleteSuccess && (
        <div className="success">Workout deleted successfully!</div>
      )}
      {editMode ? (
        <div>
          <form className="create" onSubmit={handleSubmit}>
            <h3>Edit Workout</h3>

            <label>Exercise Title:</label>
            <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} />

            <label>Load (in kg):</label>
            <input type="number" onChange={(e) => setLoad(e.target.value)} value={load} min="0"/>

            <label>Number of Reps:</label>
            <input type="number" onChange={(e) => setReps(e.target.value)} value={reps} min="0"/>

            <button style={{marginRight: '10px'}}>Save Changes</button>
            <button  onClick={() => setEditMode(false)}>Cancel</button>
          </form>
        </div>
      ) : null}
      {error && <div className="error">{error}</div>}
            {successMessage && <div className="success">{successMessage}</div>}
    </div>
  );
};

export default WorkoutDetails;
