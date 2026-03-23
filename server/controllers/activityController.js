import Activity from '../models/Activity.js';

// @desc    Get activities for a specific lead
// @route   GET /api/v1/activities/:leadId
// @access  Private
export const getActivitiesByLead = async (req, res) => {
  const activities = await Activity.find({ lead: req.params.leadId })
    .populate('user', 'name')
    .sort({ createdAt: -1 });
  res.json(activities);
};

// @desc    Add a new activity
// @route   POST /api/v1/activities/:leadId
// @access  Private
export const addActivity = async (req, res) => {
  const { type, description } = req.body;
  const activity = new Activity({
    lead: req.params.leadId,
    type,
    description,
    user: req.user._id
  });
  
  const createdActivity = await activity.save();
  res.status(201).json(createdActivity);
};
