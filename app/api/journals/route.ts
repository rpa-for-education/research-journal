import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET() {
  try {
    await connectDB();

    const rawJournals = await mongoose.connection.db
      .collection('journal')  // ⚠️ viết đúng tên collection
      .find({})
      .limit(5)                // chỉ lấy 5 bản ghi để test
      .toArray();

    console.log('✅ Sample data from raw query:', rawJournals);

    return NextResponse.json(rawJournals);
  } catch (error) {
    console.error('❌ Error (raw query):', error);
    return NextResponse.json({ error: 'Failed to fetch journals' }, { status: 500 });
  }
}


// POST: Thêm mới một journal
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const newJournal = await Journal.create(body);
    return NextResponse.json(newJournal, { status: 201 });
  } catch (error) {
    console.error('Error creating journal:', error);
    return NextResponse.json({ error: 'Failed to create journal' }, { status: 500 });
  }
}
