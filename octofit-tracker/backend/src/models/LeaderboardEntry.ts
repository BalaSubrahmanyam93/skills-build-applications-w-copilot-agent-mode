import mongoose, { type Document } from 'mongoose';
import type { UserDocument } from './User.js';

export interface LeaderboardEntryDocument extends Document {
  user: mongoose.Types.ObjectId | UserDocument;
  points: number;
  rank: number;
  period: string;
}

const leaderboardEntrySchema = new mongoose.Schema<LeaderboardEntryDocument>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    period: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export default mongoose.model<LeaderboardEntryDocument>('LeaderboardEntry', leaderboardEntrySchema);