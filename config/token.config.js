import "dotenv/config";

export const { ACCESS_SECRET_TOKEN, REFRESH_SECRET_TOKEN } = process.env;
export const EXPIRES_IN_REDIS = 365 * 24 * 60 * 60;
export const EXPIRES_IN_OPTIONS = {
  ACCESS_TOKEN: "15m",
  REFRESH_TOKEN: "180d",
};
