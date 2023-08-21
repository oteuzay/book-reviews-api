/* The code is exporting a middleware function that handles errors in a Node.js application. */
const errorHandler = (error, req, res, next) => {
  const errorStatus = error.statusCode || 500;
  const errorMessage = error.message || "Internal Server Error";

  res.status(errorStatus).json({
    message: errorMessage,
  });
};

export default errorHandler;
