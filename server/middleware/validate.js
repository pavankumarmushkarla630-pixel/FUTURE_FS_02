import { apiError } from '../utils/apiResponse.js';

export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false, allowUnknown: true });
    
    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join(', ');
      return apiError(res, 400, 'Validation Error', errorMessage);
    }
    next();
  };
};
