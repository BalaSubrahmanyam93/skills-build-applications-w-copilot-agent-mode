import mongoose, { type Document } from 'mongoose';

export interface UserDocument extends Document {
  username: string;
  email: string;
  displayName: string;
  role: 'member' | 'coach';
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    displayName: { type: String, required: true, trim: true },
    role: { type: String, enum: ['member', 'coach'], default: 'member' },
  },
  { timestamps: true },
);

export default mongoose.model<UserDocument>('User', userSchema);