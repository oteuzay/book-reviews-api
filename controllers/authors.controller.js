import authorsService from "../services/authors.service.js";

/* The AuthorsController class is responsible for handling requests related to authors, such as
retrieving authors, creating new authors, updating author details, and deleting authors. */
class AuthorsController {
  /**
   * The function `getAuthors` is an asynchronous function that retrieves a list of authors and their
   * stats, and sends it as a JSON response.
   */
  async getAuthors(req, res, next) {
    try {
      const currentPage = parseInt(req.params.page) || 1;
      const perPage = 20;

      const { authors, stats } = await authorsService.getAuthors(
        currentPage,
        perPage
      );

      res.status(200).json({
        authors,
        stats,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * The function `getAuthor` retrieves an author's information based on their ID and sends it as a
   * JSON response.
   */
  async getAuthor(req, res, next) {
    try {
      const authorID = req.params.authorID;
      const author = await authorsService.getAuthor(authorID);

      res.status(200).json({
        author: author,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * The function creates a new author with the provided name, surname, and summary, and returns the
   * created author's id, name, and surname in the response.
   */
  async createAuthor(req, res, next) {
    try {
      const userID = req.payload.aud;
      const author = {
        name: req.body.name,
        surname: req.body.surname,
        summary: req.body.summary,
      };

      const { id, name, surname } = await authorsService.createAuthor(
        userID,
        author
      );

      res.status(201).json({
        message: "Author successfully created.",
        author: {
          id,
          name,
          surname,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * The function `updateAuthor` updates the details of an author in a database and returns the updated
   * author's information.
   */
  async updateAuthor(req, res, next) {
    try {
      const userID = req.payload.aud;
      const authorID = req.params.authorID;
      const author = {
        name: req.body.name,
        surname: req.body.surname,
        summary: req.body.summary,
      };

      const { id, name, surname, summary } = await authorsService.updateAuthor(
        userID,
        authorID,
        author
      );

      res.status(200).json({
        message: "Author successfully updated.",
        author: {
          id: id,
          name: name,
          surname: surname,
          summary: summary,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * The function deletes an author from the database and returns a success message.
   */
  async deleteAuthor(req, res, next) {
    try {
      const userID = req.payload.aud;
      const authorID = req.params.authorID;

      await authorsService.deleteAuthor(userID, authorID);

      res.status(200).json({
        message: "Author successfully deleted.",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthorsController();
