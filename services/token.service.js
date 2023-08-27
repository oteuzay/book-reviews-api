import jsonwebtoken from "jsonwebtoken";
import redisClient from "../cache/index.cache.js";

import createError from "http-errors";
import logger from "../utils/logger.util.js";

import { config } from "../config/api.config.js";

/* The TokenService class provides methods for creating, verifying, and deleting access and refresh
tokens for a user. */
class TokenService {
  /**
   * The function creates an access token using a user ID and returns it.
   * @param userID - The `userID` parameter is the unique identifier of the user for whom the access
   * token is being created. It is used as the audience for the token, indicating that the token is
   * intended for that specific user.
   * @returns a JSON Web Token (JWT) that is signed using the ACCESS_SECRET_TOKEN and has the specified
   * options for expiration, issuer, and audience.
   */
  async createAccessToken(userID) {
    const options = {
      expiresIn: config.AUTH.ACCESS_TOKEN.EXPIRE,
      issuer: "oteuzay.github.io",
      audience: userID,
    };

    try {
      const accessTokenSecret = config.AUTH.ACCESS_TOKEN.SECRET;
      return jsonwebtoken.sign({}, accessTokenSecret, options);
    } catch (error) {
      logger.error(error.message);
      throw createError.InternalServerError();
    }
  }

  /**
   * The function creates a refresh token for a given user ID and stores it in Redis with an expiration time.
   * @param userID - The `userID` parameter is the unique identifier of the user for whom the refresh
   * token is being created. It is used as the audience for the token and also as the key in the Redis
   * database to store the token.
   * @returns the refresh token.
   */
  async createRefreshToken(userID) {
    const options = {
      expiresIn: config.AUTH.REFRESH_TOKEN.EXPIRE,
      issuer: "oteuzay.github.io",
      audience: userID,
    };

    try {
      const refreshTokenSecret = config.AUTH.REFRESH_TOKEN.SECRET;
      const token = jsonwebtoken.sign({}, refreshTokenSecret, options);

      await redisClient.SET(userID, token);
      await redisClient.EXPIRE(userID, config.REDIS.OPTIONS.EXPIRE);

      return token;
    } catch (error) {
      logger.error(error.message);
      throw createError.InternalServerError();
    }
  }

  /**
   * The function verifies a refresh token by decoding it, checking if it matches the one stored in
   * Redis, and returning the user ID if successful.
   * @param refreshToken - The `refreshToken` parameter is a token that is used to refresh an access
   * token. It is typically issued by an authentication server and is used to obtain a new access token
   * when the current access token expires.
   * @returns the userID if the refreshToken matches the refreshToken stored in Redis. If the
   * refreshTokens do not match, it throws an Unauthorized error. If there is any other error during
   * the verification process, it throws an InternalServerError.
   */
  async verifyRefreshToken(refreshToken) {
    try {
      const refreshTokenSecret = config.AUTH.REFRESH_TOKEN.SECRET;
      const payload = jsonwebtoken.verify(refreshToken, refreshTokenSecret);
      const userID = payload.aud;
      const refreshTokenFromRedis = await redisClient.GET(userID);

      if (refreshToken === refreshTokenFromRedis) {
        return userID;
      } else {
        throw createError.Unauthorized("Please sign in again.");
      }
    } catch (error) {
      logger.error(error.message);
      throw createError.InternalServerError();
    }
  }

  /**
   * The function `deleteRefreshToken` deletes a refresh token from a Redis database after verifying it.
   * @param refreshToken - The `refreshToken` parameter is a token that is used to refresh an access
   * token. It is typically issued by an authentication server and is used to obtain a new access token
   * when the current access token expires.
   * @returns the result of the `DEL` command from the `redisClient` for the given `userID`.
   */
  async deleteRefreshToken(refreshToken) {
    try {
      const userID = await this.verifyRefreshToken(refreshToken);
      return await redisClient.DEL(userID);
    } catch (error) {
      logger.error(error.message);
      throw createError.InternalServerError();
    }
  }
}

export default new TokenService();
