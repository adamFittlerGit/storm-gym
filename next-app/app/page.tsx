import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6 text-purple-400">
            Workout Tracker
          </h1>
          <p className="text-gray-300 mb-8">
            Track your fitness journey with our simple and effective workout tracker
          </p>
          <div className="space-x-4">
            <Link href="/login">
              <Button className="bg-purple-600 hover:bg-purple-700">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
