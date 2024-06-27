import express from "express";
import { followUserController } from "../controllers/followUserController.js";
const router = express.Router();

router.post("/create", followUserController.create);
router.get("/", followUserController.getAll);
router.delete("/:id", followUserController.deleteUser);
router.post("/mail_service", followUserController.sendMail);

export default router;
