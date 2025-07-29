import { Router } from "express";
import {
  generateBugId,
  createBug,
  updateBug,
  deleteBug,
  getBug,
} from "../controllers/bugController";

const router = Router();

router.post("/generateBugId", generateBugId)
router.post("/createBug", createBug);
router.get("/bug/:bugId", getBug);
router.put("/updateBug/:id", updateBug);
router.delete("/deleteBug/:id", deleteBug);

export default router;
