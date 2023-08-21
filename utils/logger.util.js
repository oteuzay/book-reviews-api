import winston from "winston";
import {
  FILE_TRANSPORTS_LEVEL,
  FILE_TRANSPORTS_FILENAME,
  CONSOLE_TRANSPORTS_LEVEL,
} from "../config/logger.config.js";

/* Configuration for the file transports in the logger */
const fileTransports = {
  level: FILE_TRANSPORTS_LEVEL,
  filename: FILE_TRANSPORTS_FILENAME,
  handleExceptions: true,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.prettyPrint()
  ),
};

/* Configuration for the console transports in the logger */
const consoleTransports = {
  level: CONSOLE_TRANSPORTS_LEVEL,
  handleExceptions: true,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      const ts = timestamp.slice(0, 19).replace("T", " ");
      return `${ts} [${level.toUpperCase()}]: ${message}`;
    })
  ),
};

/* Creating a logger object using the `winston` library */
const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  transports: [
    new winston.transports.File(fileTransports),
    new winston.transports.Console(consoleTransports),
  ],
  exitOnError: false,
});

export default logger;
