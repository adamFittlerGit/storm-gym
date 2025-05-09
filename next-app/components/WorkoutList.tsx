'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Workout {
  workout_id: string;
  name: string;
  description: string;
  created_at: string;
}

export default function WorkoutList() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    const response = await fetch('/api/workouts');
    const data = await response.json();
    setWorkouts(data);
  };

  // Debug log
  console.log('Rendering workouts:', workouts);

  return (
    <div className="grid gap-4">
      {workouts.length > 0 && workouts.map((workout) => (
        <Link 
          href={`/workout/${workout.workout_id}`} 
          key={workout.workout_id}
          className="p-4 border rounded-lg hover:bg-gray-50"
        >
          <h2 className="text-xl font-semibold">{workout.name}</h2>
          <p className="text-gray-600">{workout.description}</p>
          <p className="text-sm text-gray-500">
            {new Date(workout.created_at).toLocaleDateString()}
          </p>
        </Link>
      ))}
    </div>
  );
} 