import Team from "../models/Team";
import User from "../models/User";
import Bug from "../models/Bug";

export const generateTeamId = async (): Promise<number> => {
  let teamId: number = 0;
  let exists = true;
  while (exists) {
    teamId = Math.floor(1000 + Math.random() * 9000);
    const existing = await Team.findOne({ teamId });
    if (!existing) exists = false;
  }
  return teamId;
};

export const createTeam = async (req: any, res: any) => {
  const { name, description, members, assignedBugs } = req.body;

  const bugIdList: (string | number)[] = Array.isArray(assignedBugs)
    ? assignedBugs
    : typeof assignedBugs === "string"
    ? assignedBugs.split(",").map((id: string) => id.trim())
    : [];

  const foundBugs = await Bug.find({ bugId: { $in: bugIdList } });

  if (foundBugs.length !== bugIdList.length) {
    const foundBugIds = foundBugs.map((b: any) => String(b.bugId));
    const notFound = bugIdList.filter((bugId: any) => !foundBugIds.includes(String(bugId)));


  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Apenas administradores podem criar equipes" });
  }

  try {
    const teamId = await generateTeamId();

    const emailList: string[] = members
      ? members.split(",").map((email: string) => email.trim().toLowerCase())
      : [];

    const users = await User.find({ email: { $in: emailList } });

    const foundBugs = await Bug.find({ bugId: { $in: assignedBugs} });

    if (users.length !== emailList.length) {
      const foundEmails = users.map((u) => u.email);
      const notFound = emailList.filter((email) => !foundEmails.includes(email));
      return res.status(400).json({
        message: `Os seguintes membros não foram encontrados: ${notFound.join(", ")}`,
      });
    }

    if (foundBugs.length !== assignedBugs.length) {
      const foundBugIds = foundBugs.map((b: any) => b.bugId);
      const notFound = assignedBugs.filter((bugId: any) => !foundBugIds.includes(bugId));
      return res.status(400).json({
        message: `Os seguintes bugs não foram encontrados: ${notFound.join(", ")}`,
      });
    }

    const bugIds = foundBugs.map((bug: any) => bug._id);
    const memberIds = users.map((user: any) => user._id);

    const newTeam = await Team.create({
      teamId,
      name,
      description,
      members: memberIds,
      bugs: bugIds
    });

    res.status(201).json(newTeam);
  } catch (err: any) {
    console.error("Erro ao criar equipe:", err);
    res.status(500).json({ error: err.message });
    }
  };
}

export const getTeamById = async (req: any, res: any) => {
    const { teamId } = req.params;
    try {
        const team = await Team.findOne({ teamId: Number(teamId) })
        .populate("members", "name email");
        if (!team) {
            return res.status(404).json({ message: "Equipe não encontrada" });
        }
        res.json(team);
    } catch (err) {
        res.status(500).json({ message: "Erro ao buscar equipe" });
    }
};

export const updateTeam = async (req: any, res: any) => {
  const { teamId } = req.params;
  const { name, description, members, bugs } = req.body;

  try {
    const emailList: string[] = Array.isArray(members)
      ? members.map((email: string) => email.trim().toLowerCase())
      : typeof members === "string"
      ? members.split(",").map((email: string) => email.trim().toLowerCase())
      : [];

    const users = await User.find({ email: { $in: emailList } });

    if (users.length !== emailList.length) {
      const foundEmails = users.map((u) => u.email);
      const notFound = emailList.filter((email) => !foundEmails.includes(email));
      return res.status(400).json({
        message: `Os seguintes membros não foram encontrados: ${notFound.join(", ")}`,
      });
    }

    const memberIds = users.map((user) => user._id);

    const bugIdList: (string | number)[] = Array.isArray(bugs)
      ? bugs
      : typeof bugs === "string"
      ? bugs.split(",").map((id: string) => id.trim())
      : [];

    const bugDocs = await Bug.find({ bugId: { $in: bugIdList } });

    if (bugDocs.length !== bugIdList.length) {
      const foundBugIds = bugDocs.map((b) => String(b.bugId));
      const notFound = bugIdList.filter((id) => !foundBugIds.includes(String(id)));
      return res.status(400).json({
        message: `Os seguintes bugs não foram encontrados: ${notFound.join(", ")}`,
      });
    }

    const bugObjectIds = bugDocs.map((bug) => bug._id);

    const updatedTeam = await Team.findOneAndUpdate(
      { teamId: Number(teamId) },
      {
        name,
        description,
        members: memberIds,
        bugs: bugObjectIds,
      },
      { new: true }
    );

    if (!updatedTeam) {
      return res.status(404).json({ error: "Equipe não encontrada" });
    }

    res.status(200).json(updatedTeam);
  } catch (err: any) {
    console.error("Erro ao atualizar equipe:", err);
    res.status(500).json({ error: err.message });
  }
};

export const deleteTeam = async (req: any, res: any) => {
  const { teamId } = req.params;

  try {
    const deletedTeam = await Team.findOneAndDelete({ teamId: Number(teamId) });
    if (!deletedTeam) return res.status(404).json({ error: "Equipe não encontrada" });

    res.status(200).json({ message: "Equipe deletada com sucesso" });
  } catch (err: any) {
    console.error("Erro ao deletar equipe:", err);
    res.status(500).json({ error: err.message });
  }
}

export const getAllTeams = async (req: any, res: any) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Apenas administradores podem ver as equipes" });
  }

  try {
    const teams = await Team.find()
      .populate("members", "name email")
      .sort({ createdAt: -1 });

    res.json(teams);
  } catch (err: any) {
    console.error("Erro ao buscar equipes:", err);
    res.status(500).json({ message: "Erro ao buscar equipes" });
  }
};

export default {
  createTeam,
  getTeamById,
  updateTeam,
  deleteTeam,
  getAllTeams
};