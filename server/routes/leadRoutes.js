import express from 'express';
import { getLeads, createLead, getLeadById, updateLead, deleteLead } from '../controllers/leadController.js';
import { exportLeadsCsv } from '../controllers/exportController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validate.js';
import Joi from 'joi';

const router = express.Router();

const leadSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().optional().allow(''),
  phone: Joi.string().optional().allow(''),
  company: Joi.string().optional().allow(''),
  source: Joi.string().valid('Website', 'LinkedIn', 'Referral', 'Ads', 'Cold Call', 'Event', 'Partner').optional(),
  status: Joi.string().valid('New', 'Contacted', 'Negotiating', 'Converted', 'Lost').optional(),
  priority: Joi.string().valid('Hot', 'Warm', 'Cold').optional(),
  assignedTo: Joi.string().optional()
});

router.use(protect);

router.get('/export/csv', exportLeadsCsv);
router.route('/')
  .get(getLeads)
  .post(validateRequest(leadSchema), createLead);

router.route('/:id')
  .get(getLeadById)
  .put(validateRequest(leadSchema), updateLead)
  .delete(deleteLead);

export default router;
