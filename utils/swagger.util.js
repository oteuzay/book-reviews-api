import swaggerJSDoc from "swagger-jsdoc";
import { config } from "../config/api.config.js";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: config.SWAGGER.INFO.TITLE,
      description: config.SWAGGER.INFO.DESCRIPTION,
      version: config.SWAGGER.INFO.VERSION,
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
