import { Router, Request, Response } from 'express';
import User from '../models/User';

const router = Router();

// Register user
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    const user = new User({
      username,
      email,
      password,
      firstName,
      lastName,
    });

    await user.save();
    
    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.status(201).json({ message: 'User registered successfully', user: userResponse });
  } catch (error) {
    res.status(400).json({ message: 'Error registering user', error });
  }
});

// Login user
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Note: In production, use bcrypt to compare passwords
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.json({ message: 'Login successful', user: userResponse });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});

export default router;
