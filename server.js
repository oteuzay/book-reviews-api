import app from "./app.js";
import logger from "./utils/logger.util.js";
import sequelize from "./database/index.database.js";

import { PORT } from "./config/api.config.js";

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}.`);
    });
  })
  .catch((err) => {
    logger.error(err);
  });
