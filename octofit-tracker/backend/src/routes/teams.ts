import { Router, Request, Response } from 'express';
import Team from '../models/Team';
import User from '../models/User';

const router = Router();

// Get all teams
router.get('/', async (req: Request, res: Response) => {
  try {
    const teams = await Team.find().populate('createdBy', 'username email').populate('members', 'username email');
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teams', error });
  }
});

// Get team by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate('createdBy', 'username email')
      .populate('members', 'username email');
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team', error });
  }
});

// Create team
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, description, createdBy } = req.body;
    const team = new Team({ name, description, createdBy, members: [createdBy] });
    await team.save();
    await team.populate('createdBy', 'username email');
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ message: 'Error creating team', error });
  }
});

// Add member to team
router.post('/:id/members/:userId', async (req: Request, res: Response) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    if (!team.members.includes(req.params.userId as any)) {
      team.members.push(req.params.userId as any);
      await team.save();
    }
    await team.populate('members', 'username email');
    res.json(team);
  } catch (error) {
    res.status(400).json({ message: 'Error adding member to team', error });
  }
});

// Remove member from team
router.delete('/:id/members/:userId', async (req: Request, res: Response) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    team.members = team.members.filter((id) => id.toString() !== req.params.userId);
    await team.save();
    await team.populate('members', 'username email');
    res.json(team);
  } catch (error) {
    res.status(400).json({ message: 'Error removing member from team', error });
  }
});

// Update team
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('createdBy', 'username email').populate('members', 'username email');
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    res.status(400).json({ message: 'Error updating team', error });
  }
});

// Delete team
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json({ message: 'Team deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting team', error });
  }
});

export default router;
