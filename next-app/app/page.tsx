import WorkoutList from '@/components/WorkoutList';
import CreateWorkoutButton from '@/components/CreateWorkoutButton';

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">My Workouts</h1>
          <CreateWorkoutButton />
        </div>
        <WorkoutList />
      </main>
    </div>
  );
}
