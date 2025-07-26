// app/api/journals/[id]/route.ts
import { connectDB } from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import Journal from '@/models/journal';

export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const url = new URL(request.url);
    const id = url.pathname.split('/').pop(); // lấy id từ /journals/[id]
    const body = await request.json();

    const updated = await Journal.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json({ error: 'Journal not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Updated successfully', data: updated });
  } catch (error) {
    console.error('❌ PUT error:', error);
    return NextResponse.json({ error: 'Failed to update journal' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectDB();

    const url = new URL(request.url);
    const id = url.pathname.split('/').pop(); // lấy id từ /journals/[id]

    const deleted = await Journal.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: 'Journal not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('❌ DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete journal' }, { status: 500 });
  }
}
