import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import mongoose from 'mongoose';

const JournalSchema = new mongoose.Schema({}, { strict: false });
const Journal = mongoose.models.Journal || mongoose.model('Journal', JournalSchema);

export async function GET() {
  await connectDB();
  const journals = await Journal.find().limit(20);
  return NextResponse.json(journals);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const journal = await Journal.create(body);
  return NextResponse.json(journal, { status: 201 });
}
