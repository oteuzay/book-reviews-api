import "dotenv/config";
import packageJSON from "../package.json" assert { type: "json" };

export const config = {
  SERVER: {
    PORT: process.env.PORT || 8080,
    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN,
    NODE_ENV: process.env.NODE_ENV || "Production",
  },
  REDIS: {
    SERVER: {
      HOST: process.env.REDIS_HOST,
      PORT: process.env.REDIS_PORT,
    },
    OPTIONS: {
      EXPIRE: 180 * 24 * 60 * 60,
    },
  },
  AUTH: {
    ACCESS_TOKEN: {
      SECRET: process.env.ACCESS_SECRET_TOKEN,
      EXPIRE: "15m",
    },
    REFRESH_TOKEN: {
      SECRET: process.env.REFRESH_SECRET_TOKEN,
      EXPIRE: "180d",
    },
  },
  SWAGGER: {
    INFO: {
      TITLE: packageJSON.name,
      DESCRIPTION: packageJSON.description,
      VERSION: packageJSON.version,
    },
  },
  WINSTON: {
    CONSOLE: {
      LEVEL: "debug",
    },
    FILE: {
      LEVEL: "error",
      FILENAME: "./logs/errors.log",
    },
  },
};
