export default (err, req, res, next) => {
  // Set default status code to 500 if not specified
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";

  // Send error response with status code and message
  if (statusCode === 500) {
    return res.status(statusCode).json({
      message: "Internal Server Error",
      status: statusCode,
    });
  }
  res.status(statusCode).json({
    message: message,
    status: statusCode,
  });
};
