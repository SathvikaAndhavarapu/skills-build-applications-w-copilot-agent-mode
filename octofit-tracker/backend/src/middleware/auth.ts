import { Request, Response, NextFunction } from 'express';

export interface AuthRequest extends Request {
  userId?: string;
}

// Simple authentication middleware (placeholder)
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // In production, verify JWT token here
    // For now, we'll do basic validation
    req.userId = 'user-id-placeholder';
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Error handling middleware
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error', error: err.message });
};
