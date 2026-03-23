import mongoose from 'mongoose';

const leadSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: false },
  phone: { type: String, required: false },
  company: { type: String, required: false },
  source: { 
    type: String, 
    enum: ['Website', 'LinkedIn', 'Referral', 'Ads', 'Cold Call', 'Event', 'Partner'],
    default: 'Website' 
  },
  status: { 
    type: String, 
    enum: ['New', 'Contacted', 'Negotiating', 'Converted', 'Lost'], 
    default: 'New' 
  },
  priority: {
    type: String,
    enum: ['Hot', 'Warm', 'Cold'],
    default: 'Cold'
  },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
},{
  timestamps: true
});

const Lead = mongoose.model('Lead', leadSchema);
export default Lead;
