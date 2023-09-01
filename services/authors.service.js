import createError from "http-errors";
import userRepository from "../repositories/user.repository.js";
import authorRespository from "../repositories/author.repository.js";

class AuthorsService {
  /**
   * The function `getAuthors` retrieves a list of authors from a repository, along with pagination
   * information.
   * @param page - The page parameter represents the current page number of the authors list that you
   * want to retrieve. It is used to calculate the offset for fetching the authors from the repository.
   * @param perPage - The `perPage` parameter represents the number of authors to be displayed per page
   * in the pagination.
   * @returns The function `getAuthors` returns an object with two properties: `authors` and `stats`.
   */
  async getAuthors(page, perPage) {
    const offset = (page - 1) * perPage;
    const countAuthors = await authorRespository.countAuthors();
    const totalPages = Math.ceil(countAuthors / perPage);

    /**
     * TODO: Consider modifying the repository to fetch only necessary values instead of using map to extract required values here.
     */

    const getAuthors = await authorRespository.getAuthors(offset, perPage);

    const authors = getAuthors.map((author) => {
      return {
        id: author.id,
        name: author.name,
        surname: author.surname,
      };
    });

    return {
      authors,
      stats: {
        currentPage: page,
        lastPage: totalPages,
        countAuthors,
      },
    };
  }

  /**
   * The function `getAuthor` retrieves an author from a repository based on the provided author ID and
   * returns it.
   * @param authorID - The `authorID` parameter is the unique identifier of the author that we want to
   * retrieve from the author repository.
   * @returns an object with a property "author" which contains the author data.
   */
  async getAuthor(authorID) {
    const author = await authorRespository.getAuthor(authorID);

    if (!author) {
      throw createError.NotFound(
        "The author you are looking for does not exist or is not available."
      );
    }

    return {
      author,
    };
  }

  /**
   * The function creates an author if the user is an admin and returns the author's id, name, and
   * surname.
   * @param userID - The userID parameter is the unique identifier of the user who is creating the
   * author.
   * @param author - The `author` parameter is an object that represents the details of the author to
   * be created. It typically includes properties such as `name` and `surname` to specify the author's
   * name and surname respectively.
   * @returns an object with the properties "id", "name", and "surname" of the created author.
   */
  async createAuthor(userID, author) {
    const user = await userRepository.getUserById(userID);

    if (user.role !== "Admin") {
      throw createError.Unauthorized("You do not have permission.");
    }

    const createdAuthor = await authorRespository.createAuthor(author);

    return {
      id: createdAuthor.id,
      name: createdAuthor.name,
      surname: createdAuthor.surname,
    };
  }

  /**
   * The function updates an author's information if the user is an admin and the author exists.
   * @param userID - The userID parameter represents the ID of the user who is performing the update
   * operation. This is used to verify the user's role and permissions before allowing the update to
   * proceed.
   * @param authorID - The `authorID` parameter is the unique identifier of the author that needs to be
   * updated.
   * @param author - The `author` parameter is an object that represents the updated information for
   * the author. It typically includes properties such as `name`, `surname`, and any other relevant
   * details that need to be updated.
   * @returns an object with the properties "id", "name", and "surname" of the updated author.
   */
  async updateAuthor(userID, authorID, author) {
    const user = await userRepository.getUserById(userID);

    if (user.role !== "Admin") {
      throw createError.Unauthorized("You do not have permission.");
    }

    const getAuthor = await authorRespository.getAuthor(authorID);

    if (!getAuthor) {
      throw createError.NotFound(
        "The author you are looking for does not exist or is not available."
      );
    }

    const updatedAuthor = await authorRespository.updateAuthor(authorID, author);

    return {
      id: updatedAuthor.id,
      name: updatedAuthor.name,
      surname: updatedAuthor.name,
      summary: updatedAuthor.summary,
    };
  }

  /**
   * The function `deleteAuthor` checks if the user is an admin, retrieves the author by ID, and then
   * proceeds with deleting the author if they have no associated books.
   * @param userID - The userID parameter represents the ID of the user who is attempting to delete the
   * author. This is used to verify if the user has the necessary permissions to perform the deletion.
   * @param authorID - The `authorID` parameter is the unique identifier of the author that you want to
   * delete.
   * @returns the result of the `authorRespository.deleteAuthor(author)` method.
   */
  async deleteAuthor(userID, authorID) {
    const user = await userRepository.getUserById(userID);

    if (user.role !== "Admin") {
      throw createError.Unauthorized("You do not have permission.");
    }

    const author = await authorRespository.getAuthor(authorID);

    if (!author) {
      throw createError.NotFound(
        "The author you are looking for does not exist or is not available."
      );
    }

    /**
     * TODO: Check if the author has any books, and if not, proceed with deletion.
     */

    return await authorRespository.deleteAuthor(author);
  }
}

export default new AuthorsService();
