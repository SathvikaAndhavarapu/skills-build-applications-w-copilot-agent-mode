import { Router, Request, Response } from 'express';
import Activity from '../models/Activity';

const router = Router();

// Get all activities
router.get('/', async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find().populate('userId', 'username email');
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching activities', error });
  }
});

// Get activities by user ID
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find({ userId: req.params.userId }).populate('userId', 'username email');
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching activities', error });
  }
});

// Create activity
router.post('/', async (req: Request, res: Response) => {
  try {
    const activity = new Activity(req.body);
    await activity.save();
    await activity.populate('userId', 'username email');
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ message: 'Error creating activity', error });
  }
});

// Update activity
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('userId', 'username email');
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.json(activity);
  } catch (error) {
    res.status(400).json({ message: 'Error updating activity', error });
  }
});

// Delete activity
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting activity', error });
  }
});

export default router;
