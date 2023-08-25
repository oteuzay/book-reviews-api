import { Router } from "express";
import authRoute from "./auth.route.js";
import authorsRoute from "./authors.route.js";
import swaggerRoute from "./swagger.route.js";

const router = Router();

router.use("/api-docs", swaggerRoute);
router.use("/auth", authRoute);
router.use("/authors", authorsRoute);

export default router;
