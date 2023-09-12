import Subcategory from "../models/subcategory.model.js";

class SubcategoryRepository {
  /**
   * The function counts the number of subcategories that have a status of true and belong to a
   * specific category.
   * @param categoryID - The categoryID parameter is the ID of the category for which you want to count
   * the number of subcategories.
   * @returns The count of subcategories that have a status of true.
   */
  async countSubcategories(categoryID) {
    return await Subcategory.count({
      where: {
        status: true,
        category_id: categoryID,
      },
    });
  }

  /**
   * The function retrieves all subcategories based on a given category ID.
   * @param categoryID - The categoryID parameter is the ID of the category for which you want to
   * retrieve the subcategories.
   * @returns a promise that resolves to an array of subcategories that belong to the specified category ID.
   */
  async getSubcategories(categoryID) {
    return await Subcategory.findAll({
      where: { category_id: categoryID, status: true },
      order: [["sort_order", "ASC"]],
    });
  }

  /**
   * The function retrieves a subcategory by its ID using Sequelize's `findByPk` method.
   * @param subcategoryID - The subcategoryID parameter is the unique identifier of the subcategory
   * that you want to retrieve from the database.
   * @returns the result of the `findByPk` method, which is a promise that resolves to the subcategory
   * with the specified ID.
   */
  async getSubcategory(subcategoryID) {
    return await Subcategory.findByPk(subcategoryID);
  }

  /**
   * The function creates a new subcategory using the provided data.
   * @param subcategory - The parameter "subcategory" is an object that contains the information needed
   * to create a new subcategory.
   * @returns a promise that resolves to the created subcategory.
   */
  async createSubcategory(subcategory) {
    return await Subcategory.create(subcategory);
  }

  /**
   * The function updates a subcategory in a database and returns the updated subcategory.
   * @param subcategoryID - The subcategoryID parameter is the unique identifier of the subcategory
   * that needs to be updated.
   * @param subcategory - The `subcategory` parameter is an object that contains the updated values for
   * the subcategory.
   * @returns either null if no rows were updated, or a Subcategory object with the specified
   * attributes if a row was updated.
   */
  async updateSubcategory(subcategoryID, subcategory) {
    const [updatedRowCount] = await Subcategory.update(subcategory, {
      where: { id: subcategoryID },
      returning: true,
    });

    if (updatedRowCount === 0) {
      return null;
    }

    return await Subcategory.findOne({
      attributes: ["id", "title", "sort_order", "category_id"],
      where: { id: subcategoryID },
    });
  }

  /**
   * The function deletes a subcategory by setting its status to false and saving it.
   * @param subcategory - The parameter "subcategory" is an object representing a subcategory.
   * @returns the saved subcategory object.
   */
  async deleteSubcategory(subcategory) {
    subcategory.status = false;
    return await subcategory.save();
  }
}

export default new SubcategoryRepository();
