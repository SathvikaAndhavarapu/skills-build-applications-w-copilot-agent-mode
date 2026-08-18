import { Router, Request, Response } from 'express';
import Leaderboard from '../models/Leaderboard';

const router = Router();

// Get leaderboard by team
router.get('/team/:teamId', async (req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.find({ teamId: req.params.teamId })
      .populate('userId', 'username email firstName lastName')
      .sort({ rank: 1 });
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leaderboard', error });
  }
});

// Get user leaderboard standing
router.get('/:userId/:teamId', async (req: Request, res: Response) => {
  try {
    const standing = await Leaderboard.findOne({
      userId: req.params.userId,
      teamId: req.params.teamId,
    }).populate('userId', 'username email firstName lastName');
    if (!standing) {
      return res.status(404).json({ message: 'Leaderboard entry not found' });
    }
    res.json(standing);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leaderboard entry', error });
  }
});

// Update leaderboard entry
router.put('/:userId/:teamId', async (req: Request, res: Response) => {
  try {
    const standing = await Leaderboard.findOneAndUpdate(
      { userId: req.params.userId, teamId: req.params.teamId },
      req.body,
      { new: true, upsert: true, runValidators: true }
    ).populate('userId', 'username email firstName lastName');
    res.json(standing);
  } catch (error) {
    res.status(400).json({ message: 'Error updating leaderboard entry', error });
  }
});

export default router;
