import express from "express";
import { followUserController } from "../controllers/followUserController.js";
import { protectRoute } from "../middlewares/authMiddlewave.js";
const router = express.Router();

router.post("/create", protectRoute, followUserController.create);
router.get("/", protectRoute, followUserController.getAll);
router.delete("/:id", protectRoute, followUserController.deleteUser);
router.post("/mail_service", protectRoute, followUserController.sendMail);

export default router;
