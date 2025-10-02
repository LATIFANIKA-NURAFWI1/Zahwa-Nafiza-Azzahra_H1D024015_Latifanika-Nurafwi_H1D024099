import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema(
  {
    title: String,
    source: String,
    url: String
  },
  { timestamps: true }
);

export default mongoose.model('News', newsSchema);
