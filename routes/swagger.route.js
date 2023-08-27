import express from "express";
import swaggerUI from "swagger-ui-express";
import { config } from "../config/api.config.js";
import { swaggerSpec } from "../utils/swagger.util.js";

const router = express.Router();

if (config.SERVER.NODE_ENV === "Development") {
  router.use("/", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
}

export default router;
