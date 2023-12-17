import { useState } from 'react';

const WorkoutForm = ({ updateWorkouts }) => {
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [emptyFields, setEmptyFields] = useState([]); // [title, load, reps]

  const handleLoadChange = (e) => {
    const inputValue = e.target.value;
    const newLoad = inputValue < 0 ? 0 : inputValue;
    setLoad(newLoad);
  };

  const handleRepsChange = (e) => {
    const inputValue = e.target.value;
    const newReps = inputValue < 0 ? 0 : inputValue;
    setReps(newReps);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, load, reps };

    const response = await fetch('/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setSuccessMessage('');
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setError(null);
      setEmptyFields([]);
      setTitle('');
      setLoad('');
      setReps('');
      setSuccessMessage('Workout added successfully!');
      updateWorkouts();
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000); // Clear success message after 3 seconds
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Exercise Title:</label>
      <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} 
      className={emptyFields.includes('title') ? 'error' : ''}/>

      <label>Load (in kg):</label>
      <input type="number" onChange={handleLoadChange} value={load} min="0" 
      className={emptyFields.includes('load') ? 'error' : ''}/>

      <label>Number of Reps:</label>
      <input type="number" onChange={handleRepsChange} value={reps} min="0" 
      className={emptyFields.includes('reps') ? 'error' : ''}/>

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
      {successMessage && <div className="success">{successMessage}</div>}
    </form>
  );
};

export default WorkoutForm;
