import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Journal from '@/models/journal';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const id = params.id;
    const body = await req.json();

    const updated = await Journal.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json({ error: 'Journal not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error('❌ Error updating journal:', error);
    return NextResponse.json({ error: 'Failed to update journal' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const deleted = await Journal.findByIdAndDelete(params.id);

    if (!deleted) {
      return NextResponse.json({ error: 'Journal not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting journal:', error);
    return NextResponse.json({ error: 'Failed to delete journal' }, { status: 500 });
  }
}
