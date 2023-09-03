import subcategoriesService from "../services/subcategories.service.js";

class SubcategoriesController {
  /**
   * The function retrieves subcategories for a given category ID and returns them along with the
   * category title in a JSON response.
   */
  async getSubcategories(req, res, next) {
    try {
      const categoryID = req.params.categoryID;

      const { category, subcategories } = await subcategoriesService.getSubcategories(categoryID);

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

  /**
   * The function updates a subcategory in a database and returns a success message with the updated
   * subcategory title.
   */
  async updateSubcategory(res, req, next) {
    try {
      const userID = req.payload.aud;
      const subcategoryID = req.params.subcategoryID;
      const subcategory = {
        title: req.body.title,
      };

      const { title } = await subcategoriesService.updateSubcategory(
        userID,
        subcategoryID,
        subcategory
      );

      res.status(200).json({
        message: "Subcategory successfully updated.",
        subcategory: {
          title: title,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * The function deletes a subcategory and returns a success message.
   */
  async deleteSubcategory(res, req, next) {
    const userID = req.payload.aud;
    const subcategoryID = req.params.subcategoryID;

    await subcategoriesService.deleteSubcategory(userID, subcategoryID);

    try {
      res.status(200).json({
        message: "Subcategory successfully deleted.",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new SubcategoriesController();
