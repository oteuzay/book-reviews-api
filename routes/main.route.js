import { Router } from "express";
import authRoute from "./auth.route.js";
import swaggerRoute from "./swagger.route.js";

const router = Router();

router.use("/api-docs", swaggerRoute);
router.use("/auth", authRoute);

export default router;
