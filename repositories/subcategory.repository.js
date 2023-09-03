import Subcategory from "../models/subcategory.model.js";

class SubcategoryRepository {
  /**
   * The function retrieves all subcategories based on a given category ID.
   * @param categoryID - The categoryID parameter is the ID of the category for which you want to
   * retrieve the subcategories.
   * @returns a promise that resolves to an array of subcategories that belong to the specified category ID.
   */
  async getSubcategories(categoryID) {
    return await Subcategory.findAll({ where: { category_id: categoryID } });
  }

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

  async updateSubcategory(subcategoryID, subcategory) {
    const [updatedRowCount] = await Subcategory.update(subcategory, {
      where: { id: subcategoryID },
      returning: true,
    });

    if (updatedRowCount === 0) {
      return null;
    }

    return await Subcategory.findOne({
      attributes: ["id", "title"],
      where: { id: subcategoryID },
    });
  }

  async deleteSubcategory(subcategory) {
    subcategory.status = false;
    return await subcategory.save();
  }
}

export default new SubcategoryRepository();
