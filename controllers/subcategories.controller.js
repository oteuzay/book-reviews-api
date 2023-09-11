import subcategoriesService from "../services/subcategories.service.js";

class SubcategoriesController {
  /**
   * The function `getSubcategories` is an asynchronous function that retrieves subcategories based on
   * a given category ID and sends a JSON response with the subcategories.
   */
  async getSubcategories(req, res, next) {
    try {
      const categoryID = req.params.categoryID;
      const { category } = await subcategoriesService.getSubcategories(categoryID);

      res.status(200).json({
        category,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * The function creates a subcategory with the given title and sort order under a specific category,
   * and returns the created subcategory.
   */
  async createSubcategory(req, res, next) {
    try {
      const userID = req.payload.aud;
      const categoryID = req.params.categoryID;
      const subcategory = {
        title: req.body.title,
        sort_order: req.body.sort_order,
      };

      const createdSubcategory = await subcategoriesService.createSubcategory(
        userID,
        categoryID,
        subcategory
      );

      res.status(201).json({
        message: "Subcategory successfully created.",
        subcategory: createdSubcategory.subcategory,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * The function `updateSubcategory` updates a subcategory with the provided information and returns
   * the updated subcategory.
   */
  async updateSubcategory(req, res, next) {
    try {
      const userID = req.payload.aud;
      const subcategoryID = req.params.subcategoryID;
      const subcategory = {
        title: req.body.title,
        sort_order: req.body.sort_order,
        category_id: req.body.categoryID,
      };

      const updatedSubcategory = await subcategoriesService.updateSubcategory(
        userID,
        subcategoryID,
        subcategory
      );

      res.status(200).json({
        message: "Subcategory successfully updated.",
        subcategory: updatedSubcategory,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * The function deletes a subcategory and returns a success message.
   */
  async deleteSubcategory(req, res, next) {
    try {
      const userID = req.payload.aud;
      const subcategoryID = req.params.subcategoryID;

      await subcategoriesService.deleteSubcategory(userID, subcategoryID);

      res.status(200).json({
        message: "Subcategory successfully deleted.",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new SubcategoriesController();
