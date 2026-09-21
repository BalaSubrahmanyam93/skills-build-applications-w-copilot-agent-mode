import { Router } from 'express';
import LeaderboardEntry from '../models/LeaderboardEntry.js';

const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_request, response) => {
  try {
    response.json(await LeaderboardEntry.find().populate('user', 'displayName username').sort({ points: -1 }).lean());
  } catch (error) {
    response.status(500).json({ error: 'Unable to load leaderboard', details: error });
  }
});

leaderboardRouter.post('/', async (request, response) => {
  try {
    response.status(201).json(await LeaderboardEntry.create(request.body));
  } catch (error) {
    response.status(400).json({ error: 'Unable to create leaderboard entry', details: error });
  }
});

export default leaderboardRouter;