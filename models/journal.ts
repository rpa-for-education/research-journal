import mongoose from 'mongoose';

const JournalSchema = new mongoose.Schema({
  Title: String,
  Rank: String,
  SJR: Number,
  Citations: Number,
  Country: String,
}, {
  collection: 'journal', // ép dùng đúng tên collection
});

export default mongoose.models.Journal || mongoose.model('Journal', JournalSchema);
