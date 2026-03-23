import express from 'express';
import { getFollowups } from '../controllers/followupController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getFollowups);

export default router;
