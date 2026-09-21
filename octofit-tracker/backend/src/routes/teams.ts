import { Router } from 'express';
import Team from '../models/Team.js';

const teamsRouter = Router();

teamsRouter.get('/', async (_request, response) => {
  try {
    response.json(await Team.find().populate('members', 'displayName username').sort({ name: 1 }).lean());
  } catch (error) {
    response.status(500).json({ error: 'Unable to load teams', details: error });
  }
});

teamsRouter.post('/', async (request, response) => {
  try {
    response.status(201).json(await Team.create(request.body));
  } catch (error) {
    response.status(400).json({ error: 'Unable to create team', details: error });
  }
});

export default teamsRouter;