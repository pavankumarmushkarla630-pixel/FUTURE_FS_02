import mongoose from 'mongoose';

import { MongoMemoryServer } from 'mongodb-memory-server';

const connectDB = async () => {
  try {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
      console.log('Local MongoDB not running. Using in-memory fallback for preview.');
      const mongoServer = await MongoMemoryServer.create({
        binary: {
          version: '6.0.4'
        }
      });
      const uri = mongoServer.getUri();
      const conn = await mongoose.connect(uri);
      console.log(`In-Memory MongoDB Connected: ${conn.connection.host}`);
    }
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
