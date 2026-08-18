import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  exercises: string[];
  targetMuscles: string[];
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    exercises: [
      {
        type: String,
      },
    ],
    targetMuscles: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IWorkout>('Workout', workoutSchema);
