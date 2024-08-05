import mongoose from 'mongoose';
import { env } from '../utils/env.js';

export const initMongoDb = async () => {
  try {
    const name = env('MONGODB_USER');
    const pwd = env('MONGODB_PASSWORD');
    const url = env('MONGODB_URL');
    const db = env('MONGODB_DB');
    await mongoose.connect(
      `mongodb+srv://${name}:${pwd}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`,
    );
    console.log('DB successfully connected');
  } catch (error) {
    console.log('Error while setting up mongo connection', error);
    throw error;
  }
};
