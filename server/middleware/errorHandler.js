/**
 * Wraps an async route handler to catch errors and forward them
 * to Express error handling. Eliminates repetitive try/catch blocks.
 */
export function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

/**
 * Express error-handling middleware — mount after all routes.
 * Logs the error and sends a uniform 500 response.
 */
export function errorMiddleware(err, _req, res, _next) {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
}
