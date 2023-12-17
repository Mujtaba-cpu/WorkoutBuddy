import { useEffect, useState } from 'react';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

const Home = () => {
  const [workouts, setWorkouts] = useState(null);

  const fetchWorkouts = async () => {
    const response = await fetch('/workouts');
    const json = await response.json();
    if (response.ok) {
      // If the json is an object with a 'data' property that's an array
      if (json.workouts && Array.isArray(json.workouts)) {
        setWorkouts(json.workouts);
      } else {
        console.error('Data from server is not an array');
      }
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const updateWorkouts = () => {
    fetchWorkouts(); // Refetch workouts to update the state
  };

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout.id} workout={workout} updateWorkouts={updateWorkouts} />
          ))}
      </div>
      <WorkoutForm updateWorkouts={updateWorkouts} />
    </div>
  );
};

export default Home;
