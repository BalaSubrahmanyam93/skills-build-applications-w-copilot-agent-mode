import { Router } from 'express';
import Activity from '../models/Activity.js';

const activitiesRouter = Router();

activitiesRouter.get('/', async (_request, response) => {
  try {
    response.json(await Activity.find().populate('user', 'displayName username').sort({ completedAt: -1 }).lean());
  } catch (error) {
    response.status(500).json({ error: 'Unable to load activities', details: error });
  }
});

activitiesRouter.post('/', async (request, response) => {
  try {
    response.status(201).json(await Activity.create(request.body));
  } catch (error) {
    response.status(400).json({ error: 'Unable to create activity', details: error });
  }
});

export default activitiesRouter;