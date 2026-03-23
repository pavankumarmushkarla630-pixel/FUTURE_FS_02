import mongoose from 'mongoose';

const noteSchema = mongoose.Schema({
  leadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead', required: true },
  noteText: { type: String, required: true },
  followUpDate: { type: Date },
  followUpTime: { type: String },
  isFollowUp: { type: Boolean, default: false },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
},{
  timestamps: true
});

const Note = mongoose.model('Note', noteSchema);
export default Note;
