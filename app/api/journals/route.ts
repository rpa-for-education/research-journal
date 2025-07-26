// Dùng cho Next.js App Router API routes
export const runtime = 'nodejs';

import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

// GET: Lấy danh sách journals
export async function GET() {
  try {
    await connectDB();

    // Kiểm tra kết nối
    if (mongoose.connection.readyState !== 1) {
      throw new Error('MongoDB not connected');
    }

    const db = mongoose.connection.db;
    if (!db) throw new Error('MongoDB database is undefined');

    const journals = await db.collection('journals').find({}).toArray(); // nếu collection tên 'journal', sửa lại
    console.log(`✅ GET: Fetched ${journals.length} journals`);

    return NextResponse.json(journals);
  } catch (err) {
    console.error('❌ GET error:', err);
    return NextResponse.json({ error: 'Failed to fetch journals' }, { status: 500 });
  }
}

// POST: Thêm một journal mới
export async function POST(req: Request) {
  try {
    await connectDB();

    if (mongoose.connection.readyState !== 1) {
      throw new Error('MongoDB not connected');
    }

    const db = mongoose.connection.db;
    if (!db) throw new Error('MongoDB database is undefined');

    const body = await req.json();
    const result = await db.collection('journals').insertOne(body);

    console.log('✅ POST: Inserted journal with ID', result.insertedId);

    return NextResponse.json({ _id: result.insertedId, ...body }, { status: 201 });
  } catch (err) {
    console.error('❌ POST error:', err);
    return NextResponse.json({ error: 'Failed to create journal' }, { status: 500 });
  }
}
