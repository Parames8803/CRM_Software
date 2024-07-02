import express from "express";
import userRoutes from "./userRoutes.js";
import taskRoutes from "./taskRoutes.js";
import followUserRoutes from "./followUserRoutes.js";
import leadsRoutes from "./leadsRoutes.js";
import productsRoutes from "./productsRoutes.js";
import proposalRoutes from "./proposalRoutes.js";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/task", taskRoutes);
router.use("/follow_users", followUserRoutes);
router.use("/products", productsRoutes);
router.use("/leads", leadsRoutes);
router.use("/proposals", proposalRoutes);

export default router;
