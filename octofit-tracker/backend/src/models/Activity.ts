import mongoose, { type Document } from 'mongoose';
import type { UserDocument } from './User.js';

export interface ActivityDocument extends Document {
  user: mongoose.Types.ObjectId | UserDocument;
  type: 'run' | 'cycle' | 'strength' | 'yoga';
  durationMinutes: number;
  calories: number;
  completedAt: Date;
}

const activitySchema = new mongoose.Schema<ActivityDocument>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['run', 'cycle', 'strength', 'yoga'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    calories: { type: Number, required: true, min: 0 },
    completedAt: { type: Date, required: true },
  },
  { timestamps: true },
);

export default mongoose.model<ActivityDocument>('Activity', activitySchema);