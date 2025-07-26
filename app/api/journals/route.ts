export const runtime = 'nodejs';

import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

// GET: Lấy tất cả journals
export async function GET() {
  console.log('📥 API GET /api/journals hit');
  
  try {
    await connectDB();

    const db = mongoose.connection.db;

    if (!db) {
      console.error('❌ No MongoDB connection');
      return NextResponse.json({ error: 'Database not connected' }, { status: 500 });
    }

    // Ghi log thông tin DB
    console.log('🔗 DB name:', db.databaseName);

    const data = await db.collection('journals').find({}).toArray();

    console.log(`✅ ${data.length} journals fetched`);
    return NextResponse.json(data);
  } catch (error) {
    console.error('❌ GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch journals' }, { status: 500 });
  }
}

// POST: Tạo mới journal
export async function POST(req: Request) {
  console.log('📥 API POST /api/journals hit');

  try {
    await connectDB();
    const body = await req.json();

    const db = mongoose.connection.db;
    const result = await db.collection('journals').insertOne(body);

    console.log('✅ Journal inserted:', result.insertedId);

    return NextResponse.json({ _id: result.insertedId, ...body }, { status: 201 });
  } catch (error) {
    console.error('❌ POST error:', error);
    return NextResponse.json({ error: 'Failed to create journal' }, { status: 500 });
  }
}
