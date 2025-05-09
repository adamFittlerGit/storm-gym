'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface Workout {
  id: string
  name: string
  date: string
  exercises: string[]
}

export default function Workouts() {
  // Mock data - replace with actual API call
  const workouts: Workout[] = [
    {
      id: '1',
      name: 'Full Body Workout',
      date: '2024-03-20',
      exercises: ['Squats', 'Bench Press', 'Deadlifts']
    },
    // Add more mock workouts
  ]

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-purple-400">My Workouts</h1>
          <Link href="/workouts/new">
            <Button className="bg-purple-600 hover:bg-purple-700">
              New Workout
            </Button>
          </Link>
        </div>
        <div className="grid gap-4">
          {workouts.map((workout) => (
            <div
              key={workout.id}
              className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-750"
            >
              <Link href={`/workouts/${workout.id}`}>
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold text-white">{workout.name}</h2>
                    <p className="text-gray-400">{workout.date}</p>
                    <p className="text-gray-300 mt-2">
                      {workout.exercises.join(', ')}
                    </p>
                  </div>
                  <Button 
                    variant="default" 
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-2 transform transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20"
                  >
                    Start Workout →
                  </Button>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
