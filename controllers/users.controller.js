import usersService from "../services/users.service.js";

class UsersController {
  /**
   * The function `getUser` is an asynchronous function that retrieves a user by their ID and sends a
   * JSON response with the user data.
   */
  async getUser(req, res, next) {
    try {
      const userID = req.params.userID;

      const user = await usersService.getUser(userID);

      res.status(200).json({
        user: user,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UsersController();
