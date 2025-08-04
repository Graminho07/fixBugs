import { Router } from "express";
import { createTeam, generateTeamId, getTeamById, updateTeam, deleteTeam, getAllTeams } from "../controllers/teamController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/generateTeamId", generateTeamId);
router.post("/createTeam", authMiddleware, createTeam);
router.get("/team/:teamId", getTeamById);
router.put("/team/:teamId/edit", updateTeam);
router.delete("/deleteTeam/:teamId", authMiddleware, deleteTeam);
router.get("/teams", authMiddleware, getAllTeams)

export default router;