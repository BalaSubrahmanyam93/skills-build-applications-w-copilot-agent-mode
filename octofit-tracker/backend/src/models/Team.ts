import mongoose, { type Document } from 'mongoose';
import type { UserDocument } from './User.js';

export interface TeamDocument extends Document {
  name: string;
  motto: string;
  members: mongoose.Types.ObjectId[] | UserDocument[];
  weeklyGoalMinutes: number;
}

const teamSchema = new mongoose.Schema<TeamDocument>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    motto: { type: String, required: true, trim: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    weeklyGoalMinutes: { type: Number, required: true, min: 1 },
  },
  { timestamps: true },
);

export default mongoose.model<TeamDocument>('Team', teamSchema);