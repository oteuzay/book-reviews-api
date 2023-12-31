import redis from "redis";
import logger from "../utils/logger.util.js";
import { config } from "../config/api.config.js";

class RedisClient {
  constructor() {
    this.redisClient = redis.createClient({
      host: config.REDIS.SERVER.HOST,
      port: config.REDIS.SERVER.PORT,
    });

    this.redisClient.on("connect", () => {
      logger.info("Client has connected to Redis...");
    });

    this.redisClient.on("ready", () => {
      logger.info("Client is now connected to Redis and ready to be used...");
    });

    this.redisClient.on("error", (err) => {
      logger.info("An error occurred with Redis:", err.message);
    });

    this.redisClient.on("end", () => {
      logger.info("Client has been disconnected from Redis.");
    });

    process.on("SIGINT", () => {
      this.redisClient.quit();
      logger.info("Client has been closed and disconnected from Redis due to SIGINT.");
    });
  }

  getClient() {
    return this.redisClient;
  }
}

const redisClient = new RedisClient();

export default redisClient.getClient();
