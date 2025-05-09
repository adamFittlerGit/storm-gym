'use client'

import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'

interface ExerciseSet {
  weight: number;
  reps: number;
  rpe: number;
}

interface Exercise {
  name: string;
  sets: ExerciseSet[];
}

interface Workout {
  id: string;
  name: string;
  date: string;
  exercises: Exercise[];
}

export default function WorkoutDetails() {
  const params = useParams()
  const router = useRouter()
  const [workout, setWorkout] = useState<Workout | null>(null)

  useEffect(() => {
    // Mock data - replace with actual API call
    setWorkout({
      id: params.workout as string,
      name: 'Full Body Workout',
      date: '2024-03-20',
      exercises: [
        { name: 'Squats', sets: [{ weight: 0, reps: 0, rpe: 0 }] },
        { name: 'Bench Press', sets: [{ weight: 0, reps: 0, rpe: 0 }] },
        { name: 'Deadlifts', sets: [{ weight: 0, reps: 0, rpe: 0 }] }
      ]
    })
  }, [params.workout])

  const handleDelete = async () => {
    // Add API call to delete workout
    router.push('/workouts')
  }

  const handleSave = async () => {
    // Add API call to save workout
    // For now, just log the workout data
    console.log('Saving workout:', workout);
    // You would typically make an API call here
    // await saveWorkout(workout);
  };

  const addSet = (exerciseIndex: number) => {
    if (!workout) return;
    const newWorkout = { ...workout };
    newWorkout.exercises[exerciseIndex].sets.push({ weight: 0, reps: 0, rpe: 0 });
    setWorkout(newWorkout);
  };

  const updateSet = (exerciseIndex: number, setIndex: number, field: 'weight' | 'reps' | 'rpe', value: number) => {
    if (!workout) return;
    const newWorkout = { ...workout };
    newWorkout.exercises[exerciseIndex].sets[setIndex][field] = value;
    setWorkout(newWorkout);
  };

  const removeSet = (exerciseIndex: number, setIndex: number) => {
    if (!workout) return;
    const newWorkout = { ...workout };
    newWorkout.exercises[exerciseIndex].sets.splice(setIndex, 1);
    setWorkout(newWorkout);
  };

  if (!workout) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="container mx-auto max-w-2xl">
        <Button 
          onClick={() => router.push('/workouts')}
          variant="ghost" 
          className="mb-4 text-gray-400 flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Workouts
        </Button>
        
        <div className="bg-gray-800 rounded-lg p-8">
          <h1 className="text-3xl font-bold text-purple-400 mb-4">{workout.name}</h1>
          <p className="text-gray-400 mb-6">{workout.date}</p>
          
          <h2 className="text-xl font-semibold text-white mb-4">Exercises:</h2>
          <div className="space-y-6 mb-8">
            {workout.exercises.map((exercise, exerciseIndex) => (
              <div key={exerciseIndex} className="border border-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-3">{exercise.name}</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-5 gap-2 text-sm text-gray-400">
                    <div>Weight (kg)</div>
                    <div>Reps</div>
                    <div>RPE</div>
                    <div>Set</div>
                    <div></div>
                  </div>
                  {exercise.sets.map((set, setIndex) => (
                    <div key={setIndex} className="grid grid-cols-5 gap-2">
                      <input
                        type="number"
                        value={set.weight}
                        onChange={(e) => updateSet(exerciseIndex, setIndex, 'weight', Number(e.target.value))}
                        className="bg-gray-700 text-white px-3 py-1 rounded"
                        placeholder="Weight"
                      />
                      <input
                        type="number"
                        value={set.reps}
                        onChange={(e) => updateSet(exerciseIndex, setIndex, 'reps', Number(e.target.value))}
                        className="bg-gray-700 text-white px-3 py-1 rounded"
                        placeholder="Reps"
                      />
                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={set.rpe}
                        onChange={(e) => updateSet(exerciseIndex, setIndex, 'rpe', Number(e.target.value))}
                        className="bg-gray-700 text-white px-3 py-1 rounded"
                        placeholder="RPE"
                      />
                      <div className="flex items-center">
                        <span className="text-gray-400">Set {setIndex + 1}</span>
                      </div>
                      <div className="flex items-center">
                        <Button
                          onClick={() => removeSet(exerciseIndex, setIndex)}
                          variant="destructive"
                          size="sm"
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button
                    onClick={() => addSet(exerciseIndex)}
                    className="bg-purple-600 hover:bg-purple-700 mt-2"
                    size="sm"
                  >
                    Add Set
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex space-x-4">
            <Button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700"
            >
              Save Workout
            </Button>
            <Button
              onClick={() => router.push(`/workouts/edit/${workout.id}`)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Edit Workout
            </Button>
            <Button
              onClick={handleDelete}
              variant="destructive"
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Workout
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
