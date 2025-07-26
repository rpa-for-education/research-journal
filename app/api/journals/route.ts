// app/api/journals/route.ts
import { connectDB } from '@/lib/mongodb';
import Journal from '@/models/journal';
import { NextRequest, NextResponse } from 'next/server';

// GET: Trả về toàn bộ journal trong MongoDB
export async function GET() {
  try {
    await connectDB();
    const journals = await Journal.find();
    return NextResponse.json(journals);
  } catch (error) {
    console.error('GET /api/journals error:', error);
    return NextResponse.json({ error: 'Failed to fetch journals' }, { status: 500 });
  }
}

// POST: Thêm journal mới vào MongoDB
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const newJournal = await Journal.create(body);

    return NextResponse.json(newJournal, { status: 201 });
  } catch (error) {
    console.error('POST /api/journals error:', error);
    return NextResponse.json({ error: 'Failed to create journal' }, { status: 500 });
  }
}
