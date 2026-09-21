import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import Activity from '../models/Activity.js';
import LeaderboardEntry from '../models/LeaderboardEntry.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { username: 'maya.chen', email: 'maya.chen@example.com', displayName: 'Maya Chen', role: 'member' },
      { username: 'jordan.rivera', email: 'jordan.rivera@example.com', displayName: 'Jordan Rivera', role: 'member' },
      { username: 'sam.okafor', email: 'sam.okafor@example.com', displayName: 'Sam Okafor', role: 'coach' },
    ]);

    await Team.insertMany([
      { name: 'Trailblazers', motto: 'Small steps, strong finish.', members: [users[0]._id, users[1]._id], weeklyGoalMinutes: 240 },
      { name: 'Momentum Crew', motto: 'Consistency compounds.', members: [users[2]._id], weeklyGoalMinutes: 180 },
    ]);

    await Activity.insertMany([
      { user: users[0]._id, type: 'run', durationMinutes: 42, calories: 410, completedAt: new Date('2026-09-18T07:30:00Z') },
      { user: users[1]._id, type: 'strength', durationMinutes: 35, calories: 280, completedAt: new Date('2026-09-19T17:15:00Z') },
      { user: users[2]._id, type: 'cycle', durationMinutes: 55, calories: 520, completedAt: new Date('2026-09-20T08:00:00Z') },
    ]);

    await LeaderboardEntry.insertMany([
      { user: users[0]._id, points: 1280, rank: 1, period: 'September 2026' },
      { user: users[1]._id, points: 1045, rank: 2, period: 'September 2026' },
      { user: users[2]._id, points: 980, rank: 3, period: 'September 2026' },
    ]);

    await Workout.insertMany([
      { name: 'Foundation Flow', focus: 'Mobility', difficulty: 'beginner', durationMinutes: 20, exercises: ['Cat-cow', 'Worlds greatest stretch', 'Hip bridge'] },
      { name: 'Tempo Builder', focus: 'Cardio', difficulty: 'intermediate', durationMinutes: 30, exercises: ['High knees', 'Reverse lunges', 'Mountain climbers'] },
      { name: 'Power Circuit', focus: 'Strength', difficulty: 'advanced', durationMinutes: 40, exercises: ['Goblet squats', 'Push-ups', 'Renegade rows'] },
    ]);

    console.log('Seed the octofit_db database with test data');
    console.log('Database seeding complete: 3 users, 2 teams, 3 activities, 3 leaderboard entries, 3 workouts');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
