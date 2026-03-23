import asyncHandler from 'express-async-handler';
import Note from '../models/Note.js';
import { apiResponse, apiError } from '../utils/apiResponse.js';

// GET /api/v1/leads/:id/notes
export const getNotesByLead = asyncHandler(async (req, res) => {
  const notes = await Note.find({ leadId: req.params.id })
    .populate('createdBy', 'name')
    .sort({ createdAt: -1 });

  return apiResponse(res, 200, notes);
});

// POST /api/v1/leads/:id/notes
export const createNote = asyncHandler(async (req, res) => {
  const { noteText, followUpDate, followUpTime, isFollowUp } = req.body;

  const note = new Note({
    leadId: req.params.id,
    noteText,
    followUpDate,
    followUpTime,
    isFollowUp: isFollowUp || false,
    createdBy: req.user._id
  });

  const createdNote = await note.save();
  // populate createdBy so the frontend can immediately show the author name
  await createdNote.populate('createdBy', 'name');
  
  return apiResponse(res, 201, createdNote);
});

// DELETE /api/v1/leads/:id/notes/:noteId
export const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findOne({ _id: req.params.noteId, leadId: req.params.id });

  if (!note) {
    return apiError(res, 404, 'Note not found');
  }

  // Ensure user owns note or is admin? We'll just let any logged in user delete for now or limit to owner
  if (note.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return apiError(res, 403, 'Not authorized to delete this note');
  }

  await note.deleteOne();
  return apiResponse(res, 200, { message: 'Note deleted' });
});
