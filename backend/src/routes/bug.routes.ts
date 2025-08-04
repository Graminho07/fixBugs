import { Router } from "express";
import {
  generateBugId,
  createBug,
  updateBug,
  deleteBug,
  getBugById,
  getAllBugs
} from "../controllers/bugController";

import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/generateBugId", generateBugId);
router.post("/createBug", authMiddleware, createBug);
router.get("/bug/:bugId", getBugById);
router.put("/bug/:bugId/edit", authMiddleware, updateBug);
router.delete("/deleteBug/:bugId", authMiddleware, deleteBug);
router.get("/bugs", authMiddleware, getAllBugs);

export default router;
