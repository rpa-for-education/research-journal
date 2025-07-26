import mongoose from 'mongoose';

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('❌ MONGODB_URI is not defined in environment');

  await mongoose.connect(uri);
}
