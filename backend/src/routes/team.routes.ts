import { Router } from "express";
import { createTeam, generateTeamId, getTeamById, updateTeam, getAllTeams } from "../controllers/teamController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/generateTeamId", generateTeamId);
router.post("/createTeam", authMiddleware, createTeam);
router.get("/team/:teamId", getTeamById);
router.put("/team/:teamId/edit", updateTeam)
router.get("/teams", authMiddleware, getAllTeams)

export default router;