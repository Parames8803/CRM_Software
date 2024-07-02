import express from "express";
import {
  getProposalById,
  createProposal,
  getProposals,
  deleteProposalById,
} from "../controllers/proposalController.js";
import { protectRoute } from "../middlewares/authMiddlewave.js";
const router = express.Router();

router.post("/create", protectRoute, createProposal);
router.get("/", protectRoute, getProposals);
router.get("/:id", protectRoute, getProposalById);
router.delete("/:id", protectRoute, deleteProposalById);

export default router;
