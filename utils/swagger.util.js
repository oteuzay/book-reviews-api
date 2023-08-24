import swaggerJSDoc from "swagger-jsdoc";
import { TITLE, DESCRIPTION, VERSION } from "../config/swagger.config.js";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: TITLE,
      description: DESCRIPTION,
      version: VERSION,
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
