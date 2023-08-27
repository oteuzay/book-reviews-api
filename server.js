import app from "./app.js";
import logger from "./utils/logger.util.js";
import sequelize from "./database/index.database.js";
import redisClient from "./cache/index.cache.js";

import { config } from "./config/api.config.js";

async function start() {
  try {
    await sequelize.sync();
    await redisClient.connect();
    app.listen(config.SERVER.PORT, () => {
      logger.info(`Server is running on port ${config.SERVER.PORT}.`);
    });
  } catch (err) {
    logger.error(err);
  }
}

start();
