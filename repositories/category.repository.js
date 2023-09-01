import Category from "../models/category.model.js";

class CategoryRepository {
  /**
   * The function "countCategories" asynchronously counts the number of categories.
   * @returns The count of categories.
   */
  async countCategories() {
    return await Category.count({
      where: {
        status: true,
      },
    });
  }

  /**
   * The function `getCategories` retrieves all categories.
   * @returns an array of categories that have a status of true.
   */
  async getCategories() {
    const categories = await Category.findAll({
      where: {
        status: true,
      },
    });

    return categories;
  }

  /**
   * The function retrieves a category object from the database based on the provided category ID.
   * @param categoryID - The categoryID parameter is the unique identifier of the category that you
   * want to retrieve from the database.
   * @returns a promise that resolves to the category object with the specified categoryID.
   */
  async getCategory(categoryID) {
    return await Category.findByPk(categoryID);
  }

  /**
   * The function creates a new category.
   * @param category - The parameter "category" is an object that represents the data for creating a new category.
   * @returns the result of the `Category.create(category)` function call.
   */
  async createCategory(category) {
    return await Category.create(category);
  }

  /**
   * The function updates a category in a database and returns the updated category.
   * @param categoryID - The categoryID parameter is the unique identifier of the category that needs to be updated.
   * @param category - The `category` parameter is an object that represents the updated values for the category.
   * @returns the updated category object if the update was successful, or null if no rows were updated.
   */
  async updateCategory(categoryID, category) {
    const [updatedRowCount] = await Category.update(category, {
      where: { id: categoryID },
      returning: true,
    });

    if (updatedRowCount === 0) {
      return null;
    }

    return await Category.findOne({
      attributes: ["id", "title"],
      where: { id: categoryID },
    });
  }

  /**
   * The function deletes a category by setting its status to false and saving it.
   * @param category - The parameter "category" is an object representing a category.
   * @returns The updated category object after saving the changes.
   */
  async deleteCategory(category) {
    category.status = false;
    return await category.save();
  }
}

export default new CategoryRepository();
