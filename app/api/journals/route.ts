import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import mongoose from 'mongoose';

const JournalSchema = new mongoose.Schema({}, { strict: false });
const Journal = mongoose.models.Journal || mongoose.model('Journal', JournalSchema);

export async function GET() {
  try {
    const db = await connectDB();
    const journals = await db.collection('journal').find({}).toArray();
    return NextResponse.json(journals);
  } catch (err) {
    console.error('GET journals error:', err);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const journal = await Journal.create(body);
  return NextResponse.json(journal, { status: 201 });
}
