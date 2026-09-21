import { Router } from 'express';
import Workout from '../models/Workout.js';

const workoutsRouter = Router();

workoutsRouter.get('/', async (_request, response) => {
  try {
    response.json(await Workout.find().sort({ difficulty: 1, name: 1 }).lean());
  } catch (error) {
    response.status(500).json({ error: 'Unable to load workouts', details: error });
  }
});

workoutsRouter.post('/', async (request, response) => {
  try {
    response.status(201).json(await Workout.create(request.body));
  } catch (error) {
    response.status(400).json({ error: 'Unable to create workout', details: error });
  }
});

export default workoutsRouter;