import Bug from "../models/Bug";
import Team from "../models/Team"

export const generateBugId = async (): Promise<number> => {
  let bugId: number = 0;
  let exists = true;

  while (exists) {
    bugId = Math.floor(100000 + Math.random() * 900000);
    const existing = await Bug.findOne({ bugId: bugId });
    if (!existing) exists = false;
  }
  return bugId;
};

export const createBug = async (req: any, res: any) => {
  const { title, description, priority, assignedToUser, assignedToTeam } = req.body;

  try {
    const bugId = await generateBugId();

    let team = null;

    if (assignedToTeam && req.user.role === "admin") {
      team = await Team.findOne({ teamId: Number(assignedToTeam) });
      if (!team) {
        return res.status(404).json({ message: "Equipe não encontrada" });
      }
    }

    const newBug = await Bug.create({
      bugId,
      title,
      description,
      priority,
      assignedToUser: assignedToUser || undefined,
      assignedToTeam: team ? team._id : undefined,
    });

    res.status(201).json(newBug);
  } catch (err: any) {
    console.error("Erro ao criar bug:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getBugById = async (req: any, res: any) => {
  const { bugId } = req.params;
  try {
    const bug = await Bug.findOne({ bugId: Number(bugId) })
      .populate("assignedToTeam", "name")
      .exec();

    if (!bug) {
      return res.status(404).json({ message: "Bug não encontrado" });
    }

    res.json(bug);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar bug" });
  }
};

export const updateBug = async (req: any, res: any) => {
  const { bugId } = req.params;
  const { title, description, status, priority, assignedToUser, assignedToTeam } = req.body;

  try {
    let update: any = { title, description, status, priority, assignedToUser };

    if (req.user.role === "admin" && assignedToTeam) {
      const team = await Team.findOne({ teamId: Number(assignedToTeam) });
      if (!team) {
        return res.status(404).json({ error: "Equipe não encontrada" });
      }
      update.assignedToTeam = team._id;
    }

    const updatedBug = await Bug.findOneAndUpdate(
      { bugId: Number(bugId) },
      update,
      { new: true }
    );

    if (!updatedBug) {
      return res.status(404).json({ error: "Bug não encontrado" });
    }

    res.status(200).json(updatedBug);
  } catch (err: any) {
    console.error("Erro ao atualizar bug:", err);
    res.status(500).json({ error: err.message });
  }
};

export const deleteBug = async (req: any, res: any) => {
  const { bugId } = req.params;

  try {
    const deletedBug = await Bug.findOneAndDelete({ bugId: Number(bugId) });
    if (!deletedBug) return res.status(404).json({ error: "Bug não encontrado" });

    res.status(200).json({ message: "Bug deletado com sucesso" });
  } catch (err: any) {
    console.error("Erro ao deletar bug:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getAllBugs = async (req: any, res: any) => {
  try {
    const bugs = await Bug.find()
      .populate("assignedToTeam", "name")
      .populate("assignedToUser", "name email")
      .exec();

    res.json(bugs);
  } catch (err) {
    console.error("Erro ao buscar bugs:", err);
    res.status(500).json({ message: "Erro ao buscar bugs" });
  }
};

export default {
  generateBugId,
  createBug,
  getBugById,
  updateBug,
  deleteBug,
  getAllBugs
};
