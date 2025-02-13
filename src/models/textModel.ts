import mongoose from 'mongoose';

const textSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdBy: {
    id: { type: String, required: true },
    name: { type: String, required: true }
  },
  createdAt: { type: Date, default: Date.now }
});

export const Text = mongoose.model('Text', textSchema);
