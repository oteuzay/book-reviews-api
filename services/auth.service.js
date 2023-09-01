import createError from "http-errors";
import tokenService from "./token.service.js";
import authRepository from "../repositories/user.repository.js";

/* The `AuthService` class provides methods for user authentication, including sign up, sign in, sign
out, and refreshing access tokens. */
class AuthService {
  /**
   * The signUp function checks if a user already exists with the provided email or username, and if
   * not, creates a new user and returns their id, username, and email.
   * @param user - The `user` parameter is an object that contains the information of the user who
   * wants to sign up. It typically includes properties such as `email`, `username`, and other relevant
   * user details.
   * @returns an object with the properties `id`, `username`, and `email`.
   */
  async signUp(user) {
    const existingUser = await authRepository.getUserByEmailAndUsername(user.email, user.username);

    if (existingUser) {
      throw createError.Conflict("User already exists with the provided email or username.");
    }

    const createdUser = await authRepository.createUser(user);

    return {
      id: createdUser.id,
      username: createdUser.username,
      email: createdUser.email,
    };
  }

  /**
   * The `signIn` function checks if a user exists, validates their password, and returns access and
   * refresh tokens if successful.
   * @param user - The `user` parameter is an object that contains the user's email and password.
   * @returns an object with two properties: accessToken and refreshToken.
   */
  async signIn(user) {
    const existingUser = await authRepository.getUserByEmail(user.email);

    if (!existingUser) {
      throw createError.NotFound("User not found!");
    }

    const isMatch = await existingUser.isValidPassword(user.password);

    if (!isMatch) {
      throw createError.Unauthorized("Invalid email or password.");
    }

    const accessToken = await tokenService.createAccessToken(existingUser.id);
    const refreshToken = await tokenService.createRefreshToken(existingUser.id);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  /**
   * The function signs out a user by deleting their refresh token.
   * @param refreshToken - The `refreshToken` parameter is a token that is used to obtain a new access
   * token when the current access token expires. It is typically used in authentication systems to
   * provide a seamless user experience without requiring the user to re-enter their credentials.
   * @returns the result of the `tokenService.deleteRefreshToken(refreshToken)` function call.
   */
  async signOut(refreshToken) {
    if (!refreshToken) {
      throw createError.BadRequest();
    }

    return await tokenService.deleteRefreshToken(refreshToken);
  }

  /**
   * The `refreshToken` function generates a new access token and refresh token for a given user ID.
   * @param refreshToken - The `refreshToken` parameter is a string that represents the refresh token
   * used to generate a new access token and refresh token pair.
   * @returns an object with two properties: "accessToken" and "refreshToken".
   */
  async refreshToken(refreshToken) {
    if (!refreshToken) {
      throw createError.BadRequest();
    }

    const userID = await tokenService.verifyRefreshToken(refreshToken);

    const newAccessToken = await tokenService.createAccessToken(userID);
    const newRefreshToken = await tokenService.createRefreshToken(userID);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}

export default new AuthService();
