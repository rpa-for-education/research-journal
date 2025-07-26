import { connectDB } from '@/lib/mongodb';
import Journal from '@/models/journal';
import { NextResponse } from 'next/server';
import { Types } from 'mongoose';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const body = await req.json();
    const updated = await Journal.findByIdAndUpdate(params.id, body, { new: true });

    if (!updated) return NextResponse.json({ error: 'Not Found' }, { status: 404 });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating journal:', error);
    return NextResponse.json({ error: 'Failed to update journal' }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const deleted = await Journal.findByIdAndDelete(params.id);

    if (!deleted) return NextResponse.json({ error: 'Not Found' }, { status: 404 });

    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Error deleting journal:', error);
    return NextResponse.json({ error: 'Failed to delete journal' }, { status: 500 });
  }
}
