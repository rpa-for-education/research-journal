import mongoose from 'mongoose';

const JournalSchema = new mongoose.Schema({
  Title: String,
  Rank: String,
  SJR: Number,
  Citations: Number,
  Country: String,
});

export default mongoose.models.Journal || mongoose.model('Journal', JournalSchema);
