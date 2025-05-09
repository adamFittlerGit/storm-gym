-- Create the users table
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Create the workouts table
CREATE TABLE workouts (
    workout_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(user_id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create the exercises table
CREATE TABLE exercises (
    exercise_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT
);

-- Create workout_exercises junction table
CREATE TABLE workout_exercises (
    workout_exercise_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workout_id UUID NOT NULL REFERENCES workouts(workout_id),
    exercise_id UUID NOT NULL REFERENCES exercises(exercise_id),
    exercise_order INTEGER NOT NULL,
    UNIQUE(workout_id, exercise_order)
);

-- Create exercise_sets table
CREATE TABLE exercise_sets (
    exercise_set_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workout_exercise_id UUID NOT NULL REFERENCES workout_exercises(workout_exercise_id),
    set_number INTEGER NOT NULL,
    reps INTEGER,
    weight DECIMAL(5,2),  -- Optional: for tracking weight if needed
    notes TEXT,
    UNIQUE(workout_exercise_id, set_number)
);