import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import Journal from '@/models/journal';

export async function PUT(req: Request, context: { params: { id: string } }) {
  try {
    await connectDB();

    const id = context.params.id;
    const body = await req.json();

    const updatedJournal = await Journal.findByIdAndUpdate(id, body, { new: true });

    if (!updatedJournal) {
      return NextResponse.json({ error: 'Journal not found' }, { status: 404 });
    }

    return NextResponse.json(updatedJournal);
  } catch (error) {
    console.error('❌ PUT error:', error);
    return NextResponse.json({ error: 'Failed to update journal' }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: { id: string } }) {
  try {
    await connectDB();

    const id = context.params.id;

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
