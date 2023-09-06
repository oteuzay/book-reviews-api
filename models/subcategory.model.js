import { DataTypes } from "sequelize";
import sequelize from "../database/index.database.js";

import Category from "./category.model.js";

const Subcategory = sequelize.define(
  "Subcategory",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sort_order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
    tableName: "subcategory",
  }
);

Subcategory.belongsTo(Category, {
  foreignKey: "category_id",
});

export default Subcategory;
