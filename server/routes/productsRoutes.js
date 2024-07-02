import express from "express";
import {
  createProducts,
  getProducts,
} from "../controllers/productController.js";
import { protectRoute } from "../middlewares/authMiddlewave.js";
const router = express.Router();

router.post("/create", protectRoute, createProducts);
router.get("/", protectRoute, getProducts);

export default router;
