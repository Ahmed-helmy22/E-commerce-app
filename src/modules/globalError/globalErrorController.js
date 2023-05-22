export const globalErrorHandler = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    message: err.message,
    status: err.status,
    statusCode: err.statusCode,
    err,
  });
};
