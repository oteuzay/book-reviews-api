import authService from "../services/auth.service.js";

class authController {
  /**
   * The signUp function creates a new user with the provided username, email, and password, and
   * returns the user's id, username, and email in the response.
   */
  async signUp(req, res, next) {
    try {
      const user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      };

      const { id, username, email } = await authService.signUp(user);

      res.status(201).json({
        message: "User successfully created.",
        user: {
          id: id,
          username: username,
          email: email,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * The signIn function handles the sign-in process for a user, including validating the credentials,
   * generating access and refresh tokens, and sending a response with the tokens.
   */
  async signIn(req, res, next) {
    try {
      const user = {
        email: req.body.email,
        password: req.body.password,
      };

      const { accessToken, refreshToken } = await authService.signIn(user);

      res.status(200).json({
        message: "User successfully signed in.",
        tokens: {
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * The signOut function signs out a user by revoking their refresh token and returns a success
   * message.
   */
  async signOut(req, res, next) {
    try {
      await authService.signOut(req.body.refreshToken);

      res.status(200).json({
        message: "User successfully signed out.",
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * The function refreshToken is an asynchronous function that refreshes the access token and refresh
   * token, and sends a response with the new tokens.
   */
  async refreshToken(req, res, next) {
    try {
      const { accessToken, refreshToken } = await authService.refreshToken(
        req.body.refreshToken
      );

      res.status(200).json({
        message: "Tokens successfully refreshed.",
        tokens: {
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new authController();
