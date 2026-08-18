import mongoose from 'mongoose';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    // Clear existing data
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});

    // Create test users
    const users = await User.insertMany([
      {
        username: 'alice_runner',
        email: 'alice@octofit.com',
        password: 'password123',
        firstName: 'Alice',
        lastName: 'Runner',
      },
      {
        username: 'bob_cyclist',
        email: 'bob@octofit.com',
        password: 'password123',
        firstName: 'Bob',
        lastName: 'Cyclist',
      },
      {
        username: 'charlie_swimmer',
        email: 'charlie@octofit.com',
        password: 'password123',
        firstName: 'Charlie',
        lastName: 'Swimmer',
      },
      {
        username: 'diana_trainer',
        email: 'diana@octofit.com',
        password: 'password123',
        firstName: 'Diana',
        lastName: 'Trainer',
      },
    ]);

    console.log('Created 4 test users');

    // Create test teams
    const teams = await Team.insertMany([
      {
        name: 'Octopus Runners',
        description: 'A team dedicated to running enthusiasts',
        createdBy: users[0]._id,
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Swift Swimmers',
        description: 'Competitive swimming team',
        createdBy: users[2]._id,
        members: [users[2]._id, users[3]._id],
      },
    ]);

    console.log('Created 2 test teams');

    // Create test activities
    const activities = await Activity.insertMany([
      {
        userId: users[0]._id,
        activityType: 'running',
        duration: 60,
        calories: 600,
        distance: 10,
        intensity: 'high',
        date: new Date(),
      },
      {
        userId: users[1]._id,
        activityType: 'cycling',
        duration: 90,
        calories: 800,
        distance: 40,
        intensity: 'moderate',
        date: new Date(),
      },
      {
        userId: users[2]._id,
        activityType: 'swimming',
        duration: 45,
        calories: 500,
        intensity: 'high',
        date: new Date(),
      },
      {
        userId: users[3]._id,
        activityType: 'weight_training',
        duration: 75,
        calories: 700,
        intensity: 'high',
        date: new Date(),
      },
    ]);

    console.log('Created 4 test activities');

    // Create leaderboard entries
    await Leaderboard.insertMany([
      {
        userId: users[0]._id,
        teamId: teams[0]._id,
        points: 1200,
        activitiesCompleted: 5,
        totalCalories: 3000,
        rank: 1,
      },
      {
        userId: users[1]._id,
        teamId: teams[0]._id,
        points: 1000,
        activitiesCompleted: 4,
        totalCalories: 2500,
        rank: 2,
      },
      {
        userId: users[2]._id,
        teamId: teams[1]._id,
        points: 950,
        activitiesCompleted: 3,
        totalCalories: 2200,
        rank: 1,
      },
      {
        userId: users[3]._id,
        teamId: teams[1]._id,
        points: 800,
        activitiesCompleted: 2,
        totalCalories: 1800,
        rank: 2,
      },
    ]);

    console.log('Created 4 leaderboard entries');

    // Create test workouts
    await Workout.insertMany([
      {
        name: 'Morning Run',
        description: 'A refreshing morning run to start the day',
        difficulty: 'beginner',
        duration: 30,
        exercises: ['warm-up', '5K run', 'cool-down'],
        targetMuscles: ['legs', 'cardio'],
      },
      {
        name: 'HIIT Circuit',
        description: 'High-intensity interval training workout',
        difficulty: 'advanced',
        duration: 45,
        exercises: ['burpees', 'mountain climbers', 'jump squats', 'push-ups'],
        targetMuscles: ['full body', 'cardio'],
      },
      {
        name: 'Yoga Flow',
        description: 'Relaxing yoga session for flexibility and balance',
        difficulty: 'beginner',
        duration: 60,
        exercises: ['sun salutation', 'warrior poses', 'downward dog', 'meditation'],
        targetMuscles: ['full body', 'flexibility'],
      },
      {
        name: 'Upper Body Strength',
        description: 'Build upper body strength with dumbbells and machines',
        difficulty: 'intermediate',
        duration: 60,
        exercises: ['bench press', 'dumbbell rows', 'shoulder press', 'bicep curls'],
        targetMuscles: ['chest', 'back', 'shoulders', 'arms'],
      },
    ]);

    console.log('Created 4 test workouts');

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
