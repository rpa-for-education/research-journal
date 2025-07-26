// app/api/journals/route.ts

import { connectDB } from '@/lib/mongodb';
import Journal from '@/models/journal';
import { NextResponse } from 'next/server';

// GET: Lấy toàn bộ journal
export async function GET() {
  try {
    await connectDB();
    const journals = await Journal.find({});
    return NextResponse.json(journals);
  } catch (error) {
    console.error('Error fetching journals:', error);
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
