import Author from "../models/author.model.js";

class AuthorRepository {
  /**
   * The function `countAuthors` asynchronously counts the number of authors with a status of true.
   * @returns The count of authors whose status is true.
   */
  async countAuthors() {
    return await Author.count({
      where: {
        status: true,
      },
    });
  }

  /**
   * Get a list of active authors within the specified range.
   * @param {number} offset - The index of the first author to retrieve.
   * @param {number} limit - The maximum number of authors to retrieve.
   * @returns {Promise<Array>} - A promise resolving to an array of active author objects.
   */
  async getAuthors(offset, limit) {
    return await Author.findAll({
      where: {
        status: true,
      },
      order: [["createdAt", "DESC"]],
      offset,
      limit,
    });
  }

  /**
   * The function `getAuthor` retrieves an author's information from a database based on their ID.
   * @param authorID - The `authorID` parameter is the unique identifier of the author you want to
   * retrieve from the database.
   * @returns a promise that resolves to an Author object with the specified attributes (id, name,
   * surname, summary) and where the id matches the authorID and the status is true.
   */
  async getAuthor(authorID) {
    return await Author.findOne({
      attributes: ["id", "name", "surname", "summary"],
      where: {
        id: authorID,
        status: true,
      },
    });
  }

  /**
   * The function creates a new author record in a database using the provided author object.
   * @param author - The parameter "author" is an object that contains the information about the author
   * that we want to create. It typically includes properties such as name, surname, and any other
   * relevant information about the author.
   * @returns a promise that resolves to the created author object.
   */
  async createAuthor(author) {
    return await Author.create(author);
  }

  /**
   * The function updates an author's information in a database and returns the updated author's
   * details.
   * @param authorID - The authorID parameter is the unique identifier of the author that needs to be
   * updated.
   * @param author - The `author` parameter is an object that contains the updated information for the
   * author. It should have the following properties:
   * @returns the updated author object if the update was successful, or null if no rows were updated.
   */
  async updateAuthor(authorID, author) {
    const [updatedRowCount] = await Author.update(author, {
      where: { id: authorID },
      returning: true,
    });

    if (updatedRowCount === 0) {
      return null;
    }

    const updatedAuthor = await Author.findOne({
      attributes: ["id", "name", "surname", "summary"],
      where: { id: authorID },
    });

    return updatedAuthor;
  }

  /**
   * The function deletes an author by setting their status to false and saving the changes.
   * @param author - The "author" parameter is an object representing an author. It likely has
   * properties such as name, age, and status. The "deleteAuthor" function is an asynchronous function
   * that sets the status property of the author object to false and saves the changes to the database.
   * The function returns a promise that
   * @returns the saved author object.
   */
  async deleteAuthor(author) {
    author.status = false;
    return await author.save();
  }
}

export default new AuthorRepository();
