import express from "express";
import {
  getProposalById,
  createProposal,
  getProposals,
  deleteProposalById,
  toggleProposalStatus,
  // handleProposalPrintPDF,
} from "../controllers/proposalController.js";
import { protectRoute } from "../middlewares/authMiddlewave.js";
const router = express.Router();

router.post("/create", protectRoute, createProposal);
router.get("/", protectRoute, getProposals);
router.get("/:id", protectRoute, getProposalById);
router.delete("/:id", protectRoute, deleteProposalById);
router.post("/switch", protectRoute, toggleProposalStatus);
// router.post("/print", protectRoute, handleProposalPrintPDF);

export default router;
