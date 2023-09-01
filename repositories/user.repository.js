import User from "../models/user.model.js";
import { Op } from "sequelize";

class UserRepository {
  /**
   * The function creates a new user asynchronously using the User model.
   * @param user - The "user" parameter is an object that contains the information needed to create a
   * new user. It typically includes properties such as username, email, password, and any other
   * relevant user details.
   * @returns a promise that resolves to the created user object.
   */
  async createUser(user) {
    return await User.create(user);
  }

  /**
   * The function retrieves a user from the database based on their email address.
   * @param email - The email parameter is the email address of the user you want to find in the
   * database.
   * @returns a promise that resolves to the user object with the specified email address.
   */
  async getUserByEmail(email) {
    return await User.findOne({ where: { email: email } });
  }

  /**
   * The function retrieves a user by their ID using Sequelize's `findByPk` method.
   * @param userID - The `userID` parameter is the unique identifier of the user you want to retrieve
   * from the database. It is used to search for a user record in the `User` table using the `findByPk`
   * method.
   * @returns a promise that resolves to the user object with the specified userID.
   */
  async getUserByID(userID) {
    return await User.findByPk(userID);
  }

  /**
   * The function `getUserByEmailAndUsername` retrieves a user from the database based on their email
   * or username.
   * @param email - The email parameter is used to search for a user by their email address.
   * @param username - The username parameter is a string that represents the username of a user.
   * @returns a promise that resolves to the user object found in the database based on the provided
   * email or username.
   */
  async getUserByEmailAndUsername(email, username) {
    return await User.findOne({
      where: {
        [Op.or]: [{ email }, { username }],
      },
    });
  }
}

export default new UserRepository();
