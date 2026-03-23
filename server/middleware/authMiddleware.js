import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import { apiError } from '../utils/apiResponse.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Assuming JWT is stored in an httpOnly cookie, but also check Authorization header
  token = req.cookies.jwt;
  
  if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      return apiError(res, 401, 'Not authorized, token failed');
    }
  } else {
    return apiError(res, 401, 'Not authorized, no token');
  }
});

export const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return apiError(res, 403, 'User role is not authorized');
    }
    next();
  };
};
