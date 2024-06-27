import express from "express";
import userRoutes from "./userRoutes.js";
import taskRoutes from "./taskRoutes.js";
import followUserRoutes from "./followUserRoutes.js";

const router = express.Router();

router.use("/user", userRoutes); //api/user/login
router.use("/task", taskRoutes);
router.use("/follow_users", followUserRoutes);

export default router;
