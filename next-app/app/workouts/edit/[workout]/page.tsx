'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function EditWorkout() {
  const params = useParams()
  const router = useRouter()
  const [workoutName, setWorkoutName] = useState('')
  const [exercises, setExercises] = useState([''])

  useEffect(() => {
    // Mock data - replace with actual API call
    setWorkoutName('Full Body Workout')
    setExercises(['Squats', 'Bench Press', 'Deadlifts'])
  }, [params.workout])

  const addExercise = () => {
    setExercises([...exercises, ''])
  }

  const handleExerciseChange = (index: number, value: string) => {
    const newExercises = [...exercises]
    newExercises[index] = value
    setExercises(newExercises)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Add API call to update workout
    router.push(`/workouts/${params.workout}`)
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-purple-400 mb-8">Edit Workout</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white mb-2">Workout Name</label>
            <Input
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
              className="bg-gray-800 text-white"
            />
          </div>
          <div>
            <label className="block text-white mb-2">Exercises</label>
            {exercises.map((exercise, index) => (
              <div key={index} className="mb-2">
                <Input
                  value={exercise}
                  onChange={(e) => handleExerciseChange(index, e.target.value)}
                  className="bg-gray-800 text-white"
                  placeholder={`Exercise ${index + 1}`}
                />
              </div>
            ))}
            <Button
              type="button"
              onClick={addExercise}
              variant="outline"
              className="mt-2 text-purple-400 border-purple-400"
            >
              Add Exercise
            </Button>
          </div>
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
            Update Workout
          </Button>
        </form>
      </div>
    </div>
  )
}
