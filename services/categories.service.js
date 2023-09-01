import createError from "http-errors";
import usersService from "./users.service.js";
import categoriesRepository from "../repositories/category.repository.js";

class CategoriesService {
  /**
   * The function `getCategories` retrieves a list of categories and their count from a repository and
   * returns them in a specific format.
   * @returns an object with two properties: `categories` and `stats`.
   */
  async getCategories() {
    const countCategories = await categoriesRepository.countCategories();
    const categories = await categoriesRepository.getCategories();

    // TODO: Perform the 'map' operation in the service layer for better separation of concerns.
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
   * The function `getCategory` retrieves a category based on its ID and throws an error if the
   * category is not found.
   * @param categoryID - The categoryID parameter is the unique identifier of the category that we want
   * to retrieve from the categories repository.
   * @returns The category object is being returned.
   */
  async getCategory(categoryID) {
    const category = await categoriesRepository.getCategory(categoryID);

    if (!category) {
      throw createError.NotFound("The requested category was not found.");
    }

    return category;
  }

  /**
   * The function creates a category if the user is an admin and returns the created category's id and title.
   * @param userID - The userID parameter is the unique identifier of the user who is creating the category.
   * @param category - The `category` parameter represents the category object that you want to create.
   * @returns an object with the properties "id" and "title".
   */
  async createCategory(userID, category) {
    await usersService.isUserAdmin(userID);

    const createdCategory = await categoriesRepository.createCategory(category);

    return {
      id: createdCategory.id,
      title: createdCategory.title,
    };
  }

  /**
   * The function updates a category and returns the updated category's ID and title.
   * @param userID - The userID parameter represents the ID of the user who is performing the category update.
   * @param categoryID - The category ID is a unique identifier for the category that needs to be updated.
   * @param category - The `category` parameter is an object that represents the updated category information.
   * @returns an object with the properties "id" and "title" of the updated category.
   */
  async updateCategory(userID, categoryID, category) {
    await usersService.isUserAdmin(userID);
    await this.getCategory(categoryID);

    const updatedCategory = await categoriesRepository.updateCategory(categoryID, category);

    return {
      id: updatedCategory.id,
      title: updatedCategory.title,
    };
  }

  /**
   * The function `deleteCategory` deletes a category if it exists and the user is an admin.
   * @param userID - The userID parameter represents the ID of the user who is trying to delete the category.
   * @param categoryID - The categoryID parameter is the unique identifier of the category that needs to be deleted.
   * @returns Nothing is being returned.
   */
  async deleteCategory(userID, categoryID) {
    await usersService.isUserAdmin(userID);
    const category = await this.getCategory(categoryID);

    if (category.status == false) {
      throw createError.BadRequest("This category has already been deleted or does not exist.");
    }

    // TODO: Check if the category has any subcategories; if not, proceed with deletion.

    await categoriesRepository.deleteCategory(category);

    return;
  }
}

export default new CategoriesService();
