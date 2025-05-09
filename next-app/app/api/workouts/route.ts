import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    const { rows } = await sql`
      SELECT * FROM workouts 
      ORDER BY created_at DESC
    `;
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch workouts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, description } = await request.json();
    
    // Note: You'll need to implement proper user authentication
    // For now, using a placeholder user_id
    const user_id = 'placeholder-user-id';
    
    const { rows } = await sql`
      INSERT INTO workouts (user_id, name, description)
      VALUES (${user_id}, ${name}, ${description})
      RETURNING *
    `;
    
    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create workout' }, { status: 500 });
  }
} 