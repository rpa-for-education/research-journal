import { connectDB } from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import Journal from '@/models/journal';

// ✅ PUT: Cập nhật journal theo id
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await connectDB();

    const { id } = context.params;
    const data = await req.json();

    const updated = await Journal.findByIdAndUpdate(id, data, {
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

// ✅ DELETE: Xoá journal theo id
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await connectDB();

    const { id } = context.params;

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
