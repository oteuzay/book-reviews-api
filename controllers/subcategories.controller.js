import subcategoriesService from "../services/subcategories.service.js";

class SubcategoriesController {
  /**
   * The function retrieves subcategories for a given category ID and returns them along with the
   * category title in a JSON response.
   */
  async getSubcategories(req, res, next) {
    try {
      const categoryID = req.params.categoryID;

      const { category, subcategories } =
        await subcategoriesService.getSubcategories(categoryID);

      res.status(200).json({
        category: {
          title: category.title,
          subcategories: subcategories.map((subcategory) => {
            return {
              id: subcategory.id,
              title: subcategory.title,
            };
          }),
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * The function creates a subcategory with a given title under a specific category for a user.
   */
  async createSubcategory(req, res, next) {
    try {
      const userID = req.payload.aud;
      const categoryID = req.params.categoryID;
      const subcategory = {
        title: req.body.title,
      };

      const { title } = await subcategoriesService.createSubcategory(
        userID,
        categoryID,
        subcategory
      );

      res.status(201).json({
        message: "Subcategory successfully created.",
        subcategory: {
          title: title,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new SubcategoriesController();
