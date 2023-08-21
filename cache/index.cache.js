import redis from "redis";
import logger from "../utils/logger.util.js";
import { REDIS_HOST, REDIS_PORT } from "../config/cache.config.js";

class RedisClient {
  constructor() {
    this.redisClient = redis.createClient({
      host: REDIS_HOST,
      port: REDIS_PORT,
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
      logger.info(
        "Client has been closed and disconnected from Redis due to SIGINT."
      );
    });

    this.redisClient.connect();
  }

  getClient() {
    return this.redisClient;
  }
}

const redisClient = new RedisClient();

export default redisClient.getClient();
