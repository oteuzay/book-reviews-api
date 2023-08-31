import httpError from "http-errors";
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
      throw httpError.NotFound("We couldn't find the user you're looking for.");
    }

    return user;
  }
}

export default new UsersService();
