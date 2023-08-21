import "dotenv/config";

/* The code is exporting constants that are assigned values from environment variables. These constants
are used to store the database name, username, password, host, and dialect. By using environment
variables, the values can be easily configured and changed without modifying the code. */
export const DB_NAME = process.env.DB_NAME;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_HOST = process.env.DB_HOST;
export const DB_DIALECT = process.env.DB_DIALECT;
