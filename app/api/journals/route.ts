export const runtime = 'nodejs';
import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Journal from '@/models/journal';

// GET: Lấy 5 bản ghi để test
export async function GET() {
  console.log('🧪 API /api/journals was hit');

  try {
    await connectDB();
    
    console.log('🔗 Mongo URI:', process.env.MONGODB_URI);

    const db = mongoose.connection.db;
    if (!db) throw new Error('MongoDB connection not established');
    console.log('📚 Current DB:', db.databaseName);

    const collections = await db.listCollections().toArray();
    console.log('📁 Collections:', collections.map(c => c.name));

    const rawJournals = await db
      .collection('journal') // viết đúng tên collection
      .find({})
      .limit(5)
      .toArray();

    console.log('✅ Sample data from raw query:', rawJournals);

    return NextResponse.json(rawJournals);
  } catch (error) {
    console.error('❌ Error fetching journals:', error);
    return NextResponse.json({ error: 'Failed to fetch journals' }, { status: 500 });
  }
}

// POST: Thêm mới một journal
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    console.log('📥 POST Body:', body);

    const newJournal = await Journal.create(body);

    return NextResponse.json(newJournal, { status: 201 });
  } catch (error) {
    console.error('❌ Error creating journal:', error);
    return NextResponse.json({ error: 'Failed to create journal' }, { status: 500 });
  }
}
