/* These lines of code are importing the `express` module in JavaScript. */
import express from "express";

/* These lines of code are importing middleware functions that enhance the functionality and security
of the Express application. */
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

/* Importing the 'http-errors' library for creating HTTP errors and the custom error handler middleware. */
import createError from "http-errors";
import errorHandler from "./middleware/error-handler.middleware.js";

/* Importing allowed origin from configuration. */
import { config } from "./config/api.config.js";

/* Router */
import mainRoute from "./routes/main.route.js";

/* Creating an instance of the Express application. */
const app = express();

/* The `cors()` middleware is used to enable Cross-Origin Resource Sharing (CORS) in the
Express application. CORS is a mechanism that allows resources (e.g., APIs) on a web page to be
requested from another domain outside the domain from which the resource originated. */
app.use(
  cors({
    origin: config.SERVER.ALLOWED_ORIGIN,
  })
);

/* `helmet()` is a middleware function that adds various HTTP headers to enhance the security
of the Express application. It helps protect the application from common security vulnerabilities
such as cross-site scripting (XSS), clickjacking, and other attacks. */
app.use(helmet());

/* `express.json()` is a middleware function that parses incoming requests with JSON payloads. */
app.use(express.json());

/* `compression()` is a middleware function that compresses the response bodies sent by the
server before sending them to the client. It uses the compression algorithm to reduce the size of
the response, which helps in improving the performance of the application by reducing the amount of
data that needs to be transferred over the network. This can be particularly useful when dealing
with large responses, such as when serving static files or sending JSON data. */
app.use(compression());

/* This is responsible for handling all the routes 
related to the API functionality of the application. */
app.use("/api", mainRoute);

/* Middleware function that is used to handle requests for routes that are not found. */
app.use(async (req, res, next) => {
  next(createError.NotFound("The page you're looking for doesn't exist."));
});

app.use(errorHandler);

export default app;
