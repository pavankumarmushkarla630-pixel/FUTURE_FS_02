import mongoose from 'mongoose';

const activitySchema = mongoose.Schema({
  lead: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead', required: true },
  type: { type: String, enum: ['call', 'email', 'meeting', 'status_change', 'note_added'], required: true },
  description: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
},{
  timestamps: true
});

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;
