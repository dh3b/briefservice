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
 * Logs the error and sends a uniform JSON response.
 */
export function errorMiddleware(err, _req, res, _next) {
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({ error: "File too large" });
  }
  if (err.code === "INVALID_FILE_TYPE") {
    return res.status(415).json({ error: err.message });
  }
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
}
