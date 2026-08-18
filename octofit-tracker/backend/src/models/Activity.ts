import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  userId: mongoose.Types.ObjectId;
  activityType: string;
  duration: number;
  calories: number;
  distance?: number;
  intensity: 'low' | 'moderate' | 'high';
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    activityType: {
      type: String,
      required: true,
      enum: ['running', 'cycling', 'swimming', 'weight_training', 'yoga', 'other'],
    },
    duration: {
      type: Number,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
    distance: {
      type: Number,
    },
    intensity: {
      type: String,
      enum: ['low', 'moderate', 'high'],
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IActivity>('Activity', activitySchema);
