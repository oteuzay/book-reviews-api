import authService from "../services/auth.service.js";

class authController {
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
