import express from 'express';
import { getNotesByLead, createNote, deleteNote } from '../controllers/noteController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validate.js';
import Joi from 'joi';

const router = express.Router({ mergeParams: true });

const noteSchema = Joi.object({
  noteText: Joi.string().required(),
  followUpDate: Joi.date().iso().optional().allow(null),
  followUpTime: Joi.string().optional().allow(null, ''),
  isFollowUp: Joi.boolean().optional()
});

router.use(protect);

router.route('/')
  .get(getNotesByLead)
  .post(validateRequest(noteSchema), createNote);

router.route('/:noteId')
  .delete(deleteNote);

export default router;
