import createError from "http-errors";
import userRepository from "../repositories/user.repository.js";

class UsersService {
  /**
   * The function retrieves a user by their ID from a user repository and throws an error if the user
   * is not found.
   * @param userID - The `userID` parameter is the unique identifier of the user you want to retrieve
   * from the user repository.
   * @returns the user object.
   */
  async getUserByID(userID) {
    const user = await userRepository.getUserByID(userID);

    if (!user) {
      throw createError.NotFound("We couldn't find the user you're looking for.");
    }

    return user;
  }

  /**
   * The function `getUser` retrieves a user by their ID and returns an object with the user's ID,
   * username, and null reviews.
   * @param userID - The `userID` parameter is the unique identifier of the user for whom we want to
   * retrieve information.
   * @returns an object with the properties "id", "username", and "reviews". The "id" and "username"
   * properties are taken from the user object retrieved by calling the "getUserByID" function.
   */
  async getUser(userID) {
    const user = await this.getUserByID(userID);

    return {
      id: user.id,
      username: user.username,
      reviews: null,
    };
  }

  /**
   * The function checks if a user is an admin and throws an error if they are not.
   * @param userID - The userID parameter is the unique identifier of the user for whom we want to
   * check if they are an admin.
   * @returns Nothing is being returned.
   */
  async isUserAdmin(userID) {
    const user = await this.getUserByID(userID);

    if (user.role !== "Admin") {
      throw createError.Unauthorized("You do not have permission.");
    }

    return;
  }
}

export default new UsersService();
