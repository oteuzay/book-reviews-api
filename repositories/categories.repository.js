import Category from "../models/category.model.js";

class CategoryRepository {
  /**
   * The function "countCategories" asynchronously counts the number of categories.
   * @returns The count of categories.
   */
  async countCategories() {
    return await Category.count();
  }

  /**
   * The function "getCategories" asynchronously retrieves all categories using the "findAll" method.
   * @returns a promise that resolves to the result of calling the `findAll()` method on the `Category`
   * model.
   */
  async getCategories() {
    return await Category.findAll();
  }

  /**
   * The function creates a new category using the provided data.
   * @param category - The parameter "category" is an object that represents the data for creating a
   * new category. It should contain the necessary properties and values required to create a category
   * in the database.
   * @returns the result of the `Category.create(category)` function call.
   */
  async createCategory(category) {
    return await Category.create(category);
  }
}

export default new CategoryRepository();
