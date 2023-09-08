import createError from "http-errors";
import usersService from "./users.service.js";
import subcategoriesService from "./subcategories.service.js";
import categoriesRepository from "../repositories/category.repository.js";

class CategoriesService {
  /**
   * The function "countCategories" asynchronously retrieves the count of categories from the categories repository.
   * @returns The count of categories.
   */
  async countCategories() {
    const countCategories = await categoriesRepository.countCategories();
    return countCategories;
  }

  /**
   * The function `getCategories` retrieves a list of categories.
   * @returns an object with two properties: `categories` and `count_categories`.
   */
  async getCategories() {
    const countCategories = await this.countCategories();
    const getCategories = await categoriesRepository.getCategories();

    const categoriesPromises = getCategories.map(async (category) => {
      return {
        id: category.id,
        title: category.title,
        sort_order: category.sort_order,
        count_subcategories: await subcategoriesService.countSubcategories(category.id),
      };
    });

    const categories = await Promise.all(categoriesPromises);

    return {
      categories: categories,
      count_categories: countCategories,
    };
  }

  /**
   * The function `getCategory` retrieves a category based on its ID and throws an error if the
   * category is not found or has been deleted.
   * @param categoryID - The categoryID parameter is the unique identifier of the category that you
   * want to retrieve.
   * @returns The category object is being returned.
   */
  async getCategory(categoryID) {
    const category = await categoriesRepository.getCategory(categoryID);

    if (!category) {
      throw createError.NotFound("The requested category was not found.");
    }

    if (category.status == false) {
      throw createError.BadRequest("This category has already been deleted or does not exist.");
    }

    return category;
  }

  /**
   * The function creates a category and returns its id, title, and sort order.
   * @param userID - The userID parameter is the unique identifier of the user who is creating the category.
   * @param category - The `category` parameter is an object that represents the category to be
   * created. It typically contains properties such as `title` (the title of the category) and
   * `sort_order` (the sorting order of the category).
   * @returns an object with the properties "id", "title", and "sort_order".
   */
  async createCategory(userID, category) {
    await usersService.isUserAdmin(userID);

    const createdCategory = await categoriesRepository.createCategory(category);

    return {
      id: createdCategory.id,
      title: createdCategory.title,
      sort_order: createdCategory.sort_order,
    };
  }

  /**
   * The function updates a category by calling other functions to check user admin status, retrieve
   * the category, and update the category in the repository, and then returns the updated category's
   * id, title, and sort order.
   * @param userID - The userID parameter represents the ID of the user who is performing the category update.
   * @param categoryID - The category ID is a unique identifier for the category that needs to be updated.
   * @param category - The `category` parameter is an object that represents the updated category
   * information. It typically includes properties such as `id`, `title`, and `sort_order`.
   * @returns an object with the properties "id", "title", and "sort_order".
   */
  async updateCategory(userID, categoryID, category) {
    await usersService.isUserAdmin(userID);
    await this.getCategory(categoryID);

    const updatedCategory = await categoriesRepository.updateCategory(categoryID, category);

    return {
      id: updatedCategory.id,
      title: updatedCategory.title,
      sort_order: updatedCategory.sort_order,
    };
  }

  /**
   * The function `deleteCategory` deletes a category if the user is an admin and the category does not
   * contain any subcategories.
   * @param userID - The userID parameter represents the ID of the user who is trying to delete the category.
   * @param categoryID - The categoryID parameter is the unique identifier of the category that needs to be deleted.
   * @returns Nothing is being returned.
   */
  async deleteCategory(userID, categoryID) {
    await usersService.isUserAdmin(userID);
    const category = await this.getCategory(categoryID);
    const countSubcategories = await subcategoriesService.countSubcategories(categoryID);

    if (countSubcategories !== 0) {
      throw createError.BadRequest(
        "This category cannot be deleted because it contains subcategories."
      );
    }

    await categoriesRepository.deleteCategory(category);

    return;
  }
}

export default new CategoriesService();
