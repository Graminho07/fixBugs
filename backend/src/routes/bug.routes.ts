import { Router } from "express";
import {
  generateBugId,
  createBug,
  updateBug,
  deleteBug,
  getBugs,
} from "../controllers/bugController";

const router = Router();

router.post("/generateBugId", generateBugId)
router.post("/createBug", createBug);
router.get("/getBugs", getBugs);
router.put("/updateBug/:id", updateBug);
router.delete("/deleteBug/:id", deleteBug);

export default router;
