import mongoose, { type Document } from 'mongoose';

export interface WorkoutDocument extends Document {
  name: string;
  focus: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  exercises: string[];
}

const workoutSchema = new mongoose.Schema<WorkoutDocument>(
  {
    name: { type: String, required: true, trim: true },
    focus: { type: String, required: true, trim: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    exercises: { type: [String], required: true, validate: (value: string[]) => value.length > 0 },
  },
  { timestamps: true },
);

export default mongoose.model<WorkoutDocument>('Workout', workoutSchema);