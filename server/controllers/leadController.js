import asyncHandler from 'express-async-handler';
import Lead from '../models/Lead.js';
import { apiResponse, apiError } from '../utils/apiResponse.js';

// GET /api/v1/leads
export const getLeads = asyncHandler(async (req, res) => {
  const { status, source, search, sort, page = 1, limit = 10 } = req.query;

  const query = {};
  if (status) query.status = status;
  if (source) query.source = source;
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } }
    ];
  }

  // Handle sorting
  let sortObj = { createdAt: -1 }; // default: newest first
  if (sort) {
    const [field, order] = sort.split(':');
    sortObj = { [field]: order === 'asc' ? 1 : -1 };
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);
  
  const leads = await Lead.find(query)
    .populate('assignedTo', 'name email')
    .sort(sortObj)
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Lead.countDocuments(query);

  return apiResponse(res, 200, leads, { 
    page: parseInt(page), 
    limit: parseInt(limit), 
    total,
    totalPages: Math.ceil(total / parseInt(limit))
  });
});

// POST /api/v1/leads
export const createLead = asyncHandler(async (req, res) => {
  const { name, email, phone, company, source, status, priority, assignedTo } = req.body;

  const lead = new Lead({
    name, email, phone, company, source, status, priority,
    assignedTo: assignedTo || req.user._id,
    createdBy: req.user._id
  });

  const createdLead = await lead.save();
  return apiResponse(res, 201, createdLead);
});

// GET /api/v1/leads/:id
export const getLeadById = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id)
    .populate('assignedTo', 'name email')
    .populate('createdBy', 'name email');

  if (!lead) {
    return apiError(res, 404, 'Lead not found');
  }

  return apiResponse(res, 200, lead);
});

// PUT /api/v1/leads/:id
export const updateLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id);

  if (!lead) {
    return apiError(res, 404, 'Lead not found');
  }

  // Update fields
  const updatableFields = ['name', 'email', 'phone', 'company', 'source', 'status', 'priority', 'assignedTo'];
  updatableFields.forEach(field => {
    if (req.body[field] !== undefined) {
      lead[field] = req.body[field];
    }
  });

  const updatedLead = await lead.save();
  return apiResponse(res, 200, updatedLead);
});

// DELETE /api/v1/leads/:id
export const deleteLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id);

  if (!lead) {
    return apiError(res, 404, 'Lead not found');
  }

  await lead.deleteOne();
  return apiResponse(res, 200, { message: 'Lead removed' });
});
