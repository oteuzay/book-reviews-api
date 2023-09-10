class BooksController {
  async getBooks(req, res, next) {
    try {
      res.status(200).json({});
    } catch (error) {
      next(error);
    }
  }

  async getBooksBySubcategoryID(req, res, next) {
    try {
      res.status(200).json({});
    } catch (error) {
      next(error);
    }
  }

  async getBooksByAuthorID(req, res, next) {
    try {
      res.status(200).json({});
    } catch (error) {
      next(error);
    }
  }

  async getBook(req, res, next) {
    try {
      res.status(200).json({});
    } catch (error) {
      next(error);
    }
  }

  async createBook(req, res, next) {
    try {
      res.status(201).json({});
    } catch (error) {
      next(error);
    }
  }

  async updateBook(req, res, next) {
    try {
      res.status(200).json({});
    } catch (error) {
      next(error);
    }
  }

  async deleteBook(req, res, next) {
    try {
      res.status(200).json({});
    } catch (error) {
      next(error);
    }
  }
}

export default new BooksController();
