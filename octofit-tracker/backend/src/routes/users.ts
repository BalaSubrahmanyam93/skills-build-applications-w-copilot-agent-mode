import { Router } from 'express';
import User from '../models/User.js';

const usersRouter = Router();

usersRouter.get('/', async (_request, response) => {
  try {
    response.json(await User.find().sort({ displayName: 1 }).lean());
  } catch (error) {
    response.status(500).json({ error: 'Unable to load users', details: error });
  }
});

usersRouter.post('/', async (request, response) => {
  try {
    response.status(201).json(await User.create(request.body));
  } catch (error) {
    response.status(400).json({ error: 'Unable to create user', details: error });
  }
});

export default usersRouter;