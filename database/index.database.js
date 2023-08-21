import { Sequelize } from "sequelize";
import {
  DB_HOST,
  DB_DIALECT,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
} from "../config/database.config.js";

/* Creating a new instance of the Sequelize class and assigning it to the `sequelize` constant. */
const sequelize = new Sequelize({
  host: DB_HOST,
  dialect: DB_DIALECT,
  database: DB_NAME,
  username: DB_USERNAME,
  password: DB_PASSWORD,
});

export default sequelize;
