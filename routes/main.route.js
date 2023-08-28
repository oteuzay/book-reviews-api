import { Router } from "express";
import authRoute from "./auth.route.js";
import authorsRoute from "./authors.route.js";
import categoriesRoute from "./categories.route.js";
import swaggerRoute from "./swagger.route.js";

const router = Router();

router.use("/auth", authRoute);
router.use("/authors", authorsRoute);
router.use("/categories", categoriesRoute);
router.use("/api-docs", swaggerRoute);

export default router;
