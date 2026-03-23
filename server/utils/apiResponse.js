// Wrapper for standardized API responses
export const apiResponse = (res, statusCode, data = {}, meta = { page: 1, total: 0 }) => {
  return res.status(statusCode).json({
    success: true,
    data,
    meta,
    error: null
  });
};

export const apiError = (res, statusCode, message, errorDetails = null) => {
  return res.status(statusCode).json({
    success: false,
    data: {},
    meta: { page: 1, total: 0 },
    error: {
      message,
      details: errorDetails
    }
  });
};
