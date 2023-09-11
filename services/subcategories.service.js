import createError from "http-errors";
import usersService from "./users.service.js";
import categoriesService from "./categories.service.js";
import subcategoryRepository from "../repositories/subcategory.repository.js";
import logger from "../utils/logger.util.js";

class SubcategoriesService {
  /**
   * The function "countSubcategories" asynchronously counts the number of subcategories for a given category ID.
   * @param categoryID - The categoryID parameter is the ID of the category for which you want to count the subcategories.
   * @returns the count of subcategories for a given category ID.
   */
  async countSubcategories(categoryID) {
    const countSubcategories = await subcategoryRepository.countSubcategories(categoryID);
    return countSubcategories;
  }

  /**
   * The function `getSubcategories` retrieves subcategories for a given category ID.
   * @param categoryID - The categoryID parameter is the ID of the category for which you want to
   * retrieve the subcategories.
   * @returns an object with a property "subcategories" which is an array of subcategories.
   */
  async getSubcategories(categoryID) {
    const category = await categoriesService.getCategory(categoryID);
    const subcategories = await subcategoryRepository.getSubcategories(category.id);

    return {
      category: {
        id: category.id,
        title: category.title,
        subcategories: subcategories.map((subcategory) => {
          return {
            id: subcategory.id,
            title: subcategory.title,
            sort_order: subcategory.sort_order,
            count_books: null,
          };
        }),
        count_subcategories: await this.countSubcategories(category.id),
      },
    };
  }

  /**
   * The function retrieves a subcategory based on its ID and throws an error if the subcategory is not
   * found or has been deleted.
   * @param subcategoryID - The subcategoryID parameter is the unique identifier of the subcategory
   * that you want to retrieve.
   * @returns The subcategory object is being returned.
   */
  async getSubcategory(subcategoryID) {
    const subcategory = await subcategoryRepository.getSubcategory(subcategoryID);

    if (!subcategory) {
      throw createError.NotFound("The requested subcategory was not found.");
    }

    if (subcategory.status == false) {
      throw createError.BadRequest("This subcategory has already been deleted or does not exist.");
    }

    return subcategory;
  }

  /**
   * The function creates a subcategory for a given category and returns the created subcategory along
   * with its associated category.
   * @param userID - The userID parameter represents the ID of the user who is creating the  subcategory.
   * @param categoryID - The categoryID parameter is the ID of the category under which the subcategory
   * will be created.
   * @param subcategory - The `subcategory` parameter is an object.
   * @returns an object that contains the details of the created subcategory.
   */
  async createSubcategory(userID, categoryID, subcategory) {
    await usersService.isUserAdmin(userID);
    const category = await categoriesService.getCategory(categoryID);

    const createdSubcategory = await subcategoryRepository.createSubcategory({
      title: subcategory.title,
      sort_order: subcategory.sort_order,
      category_id: categoryID,
    });

    return {
      subcategory: {
        id: createdSubcategory.id,
        title: createdSubcategory.title,
        sort_order: createdSubcategory.sort_order,
        category: {
          id: category.id,
          title: category.title,
        },
      },
    };
  }

  /**
   * The function updates a subcategory, checks if the user is an admin, retrieves the subcategory and
   * category information, and returns the updated subcategory with its associated category.
   * @param userID - The userID parameter represents the ID of the user who is performing the update operation.
   * @param subcategoryID - The subcategoryID parameter is the unique identifier of the subcategory
   * that needs to be updated.
   * @param subcategory - The `subcategory` parameter is an object that represents the updated
   * subcategory.
   * @returns an object with the following properties:
   * - id: The ID of the updated subcategory.
   * - title: The title of the updated subcategory.
   * - sort_order: The sort order of the updated subcategory.
   * - category: An object representing the category of the updated subcategory, with properties:
   *   - id: The ID of the category.
   *   - title: The title of the category.
   */
  async updateSubcategory(userID, subcategoryID, subcategory) {
    await usersService.isUserAdmin(userID);
    await this.getSubcategory(subcategoryID);

    const updatedSubcategory = await subcategoryRepository.updateSubcategory(
      subcategoryID,
      subcategory
    );

    const category = await categoriesService.getCategory(updatedSubcategory.category_id);

    return {
      id: updatedSubcategory.id,
      title: updatedSubcategory.title,
      sort_order: updatedSubcategory.sort_order,
      category: {
        id: category.id,
        title: category.title,
      },
    };
  }

  async deleteSubcategory(userID, subcategoryID) {
    await usersService.isUserAdmin(userID);
    const subcategory = await this.getSubcategory(subcategoryID);

    await subcategoryRepository.deleteSubcategory(subcategory);

    return;
  }
}

export default new SubcategoriesService();
