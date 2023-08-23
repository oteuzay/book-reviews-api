import jsonwebtoken from "jsonwebtoken";
import createError from "http-errors";
import { ACCESS_SECRET_TOKEN } from "../config/token.config.js";

export const authCheck = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      throw createError.Unauthorized("Please log in.");
    }

    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];

    const payload = jsonwebtoken.verify(token, ACCESS_SECRET_TOKEN);

    req.payload = payload;
    next();
  } catch (error) {
    next(error);
  }
};
