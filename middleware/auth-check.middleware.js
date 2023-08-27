import jsonwebtoken from "jsonwebtoken";
import createError from "http-errors";
import { config } from "../config/api.config.js";

export const authCheck = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      throw createError.Unauthorized("Please log in.");
    }

    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];

    const accessTokenSecret = config.AUTH.ACCESS_TOKEN.SECRET;
    const payload = jsonwebtoken.verify(token, accessTokenSecret);

    req.payload = payload;
    next();
  } catch (error) {
    next(error);
  }
};
