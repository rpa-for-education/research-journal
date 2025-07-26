import connectDB from '../../lib/mongodb';
import mongoose from 'mongoose';

const JournalSchema = new mongoose.Schema({}, { strict: false });
const Journal = mongoose.models.Journal || mongoose.model('Journal', JournalSchema);

export default async function handler(req, res) {
  await connectDB();

  switch (req.method) {
    case 'GET':
      const journals = await Journal.find().limit(20);
      return res.json(journals);

    case 'POST':
      const created = await Journal.create(req.body);
      return res.status(201).json(created);

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
