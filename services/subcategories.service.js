import createError from "http-errors";
import usersService from "./users.service.js";
import categoriesService from "./categories.service.js";
import subcategoryRepository from "../repositories/subcategory.repository.js";

class SubcategoriesService {
  /**
   * The function "getSubcategories" retrieves a category and its corresponding subcategories based on
   * a given category ID.
   * @param categoryID - The categoryID parameter is the unique identifier of a category.
   * @returns an object with two properties: "category" and "subcategories".
   */
  async getSubcategories(categoryID) {
    const category = await categoriesService.getCategory(categoryID);
    const subcategories = await subcategoryRepository.getSubcategories(categoryID);

    return {
      category: category,
      subcategories: subcategories,
    };
  }

  /**
   * The function creates a subcategory with a given title under a specified category, after checking
   * if the user is an admin and if the category exists.
   * @param userID - The userID parameter represents the ID of the user who is creating the subcategory.
   * @param categoryID - The categoryID parameter is the unique identifier of the category to which the
   * subcategory belongs.
   * @param subcategory - The `subcategory` parameter is an object that contains the details of the
   * subcategory to be created. It should have a `title` property which represents the title or name of
   * the subcategory.
   * @returns an object with the title of the created subcategory.
   */
  async createSubcategory(userID, categoryID, subcategory) {
    await usersService.isUserAdmin(userID);
    await categoriesService.getCategory(categoryID);

    const createdSubcategory = await subcategoryRepository.createSubcategory({
      title: subcategory.title,
      category_id: categoryID,
    });

    return {
      title: createdSubcategory.title,
    };
  }
}

export default new SubcategoriesService();
