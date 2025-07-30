import { Router } from "express";
import {
  generateBugId,
  createBug,
  updateBug,
  deleteBug,
  getBugById,
} from "../controllers/bugController";

const router = Router();

router.post("/generateBugId", generateBugId)
router.post("/createBug", createBug);
router.get("/bug/:bugId", getBugById);
router.put("/bug/:bugId/edit", updateBug);
router.delete("/deleteBug/:id", deleteBug);

export default router;
