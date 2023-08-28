import createError from "http-errors";
import categoriesRepository from "../repositories/categories.repository.js";
import userRepository from "../repositories/user.repository.js";

class CategoriesService {
  /**
   * The function `getCategories` retrieves a list of categories and their count from a repository and
   * returns them in a specific format.
   * @returns an object with two properties: `categories` and `stats`.
   */
  async getCategories() {
    const countCategories = await categoriesRepository.countCategories();
    const categories = await categoriesRepository.getCategories();

    return {
      categories: categories.map((category) => {
        return {
          id: category.id,
          title: category.title,
        };
      }),
      stats: {
        countCategories: countCategories,
      },
    };
  }

  /**
   * The function creates a category if the user is an admin and returns the created category's id and title.
   * @param userID - The userID parameter is the unique identifier of the user who is creating the category.
   * @param category - The `category` parameter represents the category object that you want to create.
   * @returns an object with the properties "id" and "title".
   */
  async createCategory(userID, category) {
    const user = await userRepository.getUserById(userID);

    if (user.role !== "Admin") {
      throw createError.Unauthorized("You do not have permission.");
    }

    const createdCategory = await categoriesRepository.createCategory(category);

    return {
      id: createdCategory.id,
      title: createdCategory.title,
    };
  }

  async updateCategory(userID, categoryID, category) {}
  async deleteCategory(userID, categoryID) {}
}

export default new CategoriesService();
