import { NextResponse } from 'next/server';
import { z } from 'zod';
import { query } from '@/lib/db';

const workoutCreateSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().optional(),
});

const workoutUpdateSchema = z.object({
  workout_id: z.string().uuid(),
  name: z.string().min(1).max(255),
  description: z.string().optional(),
});

export async function GET() {
  try {
    const result = await query(
      'SELECT * FROM workouts ORDER BY created_at DESC'
    );
    return NextResponse.json(result.rows);
  } catch (error: unknown) {
    console.error('GET workout error:', error);
    return NextResponse.json({ error: 'Failed to fetch workouts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description } = workoutCreateSchema.parse(body);
    
    // Note: You'll need to implement proper user authentication
    const user_id = 'placeholder-user-id';
    
    const result = await query(
      'INSERT INTO workouts (name, description, user_id) VALUES ($1, $2, $3) RETURNING *',
      [name, description || null, user_id]
    );
    
    return NextResponse.json(result.rows[0]);
  } catch (error: unknown) {
    console.error('POST workout error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input data', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create workout' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { workout_id, name, description } = workoutUpdateSchema.parse(body);
    
    const result = await query(
      'UPDATE workouts SET name = $1, description = $2 WHERE id = $3 RETURNING *',
      [name, description || null, workout_id]
    );
    
    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Workout not found' }, { status: 404 });
    }
    
    return NextResponse.json(result.rows[0]);
  } catch (error: unknown) {
    console.error('PUT workout error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input data', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update workout' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const workout_id = searchParams.get('workout_id');

    if (!workout_id || !z.string().uuid().safeParse(workout_id).success) {
      return NextResponse.json({ error: 'Valid workout ID (UUID) is required' }, { status: 400 });
    }

    const result = await query(
      'DELETE FROM workouts WHERE id = $1 RETURNING id',
      [workout_id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Workout not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Workout deleted successfully' });
  } catch (error: unknown) {
    console.error('DELETE workout error:', error);
    return NextResponse.json({ error: 'Failed to delete workout' }, { status: 500 });
  }
} 