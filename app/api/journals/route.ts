import { connectDB } from '@/lib/mongodb';
import Journal from '@/models/journal';
import { NextResponse } from 'next/server';

// GET: Lấy danh sách journal
export async function GET() {
  try {
    await connectDB();
    const journals = await Journal.find({});
    return NextResponse.json(journals);
  } catch (error) {
    console.error('❌ Error in GET /api/journals:', error);
    return NextResponse.json({ error: 'Failed to fetch journals' }, { status: 500 });
  }
}

// POST: Thêm journal mới
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const journal = await Journal.create(body);
    return NextResponse.json(journal, { status: 201 });
  } catch (error) {
    console.error('❌ Error in POST /api/journals:', error);
    return NextResponse.json({ error: 'Failed to create journal' }, { status: 500 });
  }
}
