import categoriesService from "../services/categories.service.js";

class CategoriesController {
  /**
   * The function retrieves categories and stats from a service and sends them as a JSON response.
   */
  async getCategories(req, res, next) {
    try {
      const { categories, stats } = await categoriesService.getCategories();

      res.status(200).json({
        categories: categories,
        stats: stats,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * The function creates a category with a title provided in the request body and returns the ID and
   * title of the created category.
   */
  async createCategory(req, res, next) {
    try {
      const userID = req.payload.aud;
      const category = {
        title: req.body.title,
      };

      const { id, title } = await categoriesService.createCategory(userID, category);

      res.status(201).json({
        message: "Category successfully created.",
        category: {
          id: id,
          title: title,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * The `updateCategory` function updates a category with the provided category ID and user ID, and
   * returns the updated category's ID and title in the response.
   */
  async updateCategory(req, res, next) {
    try {
      const userID = req.payload.aud;
      const categoryID = req.params.categoryID;
      const category = {
        title: req.body.title,
      };

      const { id, title } = await categoriesService.updateCategory(userID, categoryID, category);

      res.status(200).json({
        message: "Category successfully updated.",
        category: {
          id: id,
          title: title,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * The `deleteCategory` function deletes a category based on the category ID provided in
   * the request parameters.
   */
  async deleteCategory(req, res, next) {
    try {
      const userID = req.payload.aud;
      const categoryID = req.params.categoryID;

      await categoriesService.deleteCategory(userID, categoryID);

      res.status(200).json({
        message: "Category successfully deleted.",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CategoriesController();
