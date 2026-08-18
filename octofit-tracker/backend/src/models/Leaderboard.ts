import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboard extends Document {
  userId: mongoose.Types.ObjectId;
  teamId: mongoose.Types.ObjectId;
  points: number;
  activitiesCompleted: number;
  totalCalories: number;
  rank: number;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    teamId: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
    points: {
      type: Number,
      default: 0,
    },
    activitiesCompleted: {
      type: Number,
      default: 0,
    },
    totalCalories: {
      type: Number,
      default: 0,
    },
    rank: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ILeaderboard>('Leaderboard', leaderboardSchema);
