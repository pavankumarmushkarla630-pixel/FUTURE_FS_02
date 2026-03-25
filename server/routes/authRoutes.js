import express from 'express';
import { registerUser, loginUser, refreshUser, logoutUser, changePassword } from '../controllers/authController.js';
import { validateRequest } from '../middleware/validate.js';
import Joi from 'joi';

const router = express.Router();

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

router.post('/register', validateRequest(registerSchema), registerUser);
router.post('/login', validateRequest(loginSchema), loginUser);
router.post('/refresh', refreshUser);
router.post('/logout', logoutUser);
router.put('/change-password', changePassword);

export default router;
