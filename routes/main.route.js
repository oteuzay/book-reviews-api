import { Router } from "express";
import authRoute from "./auth.route.js";
import usersRoute from "./users.route.js";
import authorsRoute from "./authors.route.js";
import categoriesRoute from "./categories.route.js";
import subcategoriesRoute from "./subcategories.route.js";
import swaggerRoute from "./swagger.route.js";

const router = Router();

router.use("/auth", authRoute);
router.use("/users", usersRoute);
router.use("/authors", authorsRoute);
router.use("/categories", categoriesRoute);
router.use("/subcategories", subcategoriesRoute);
router.use("/api-docs", swaggerRoute);

export default router;
