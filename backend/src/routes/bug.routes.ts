import { Router } from "express";
import {
  createBug,
  updateBug,
  deleteBug,
  getBugs,
} from "../controllers/bugController";

const router = Router();

router.post("/createBug", createBug);
router.get("/getBugs", getBugs);
router.put("/updateBug/:id", updateBug);
router.delete("/deleteBug/:id", deleteBug);

export default router;
