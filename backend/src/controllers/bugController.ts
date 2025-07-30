import Bug from "../models/Bug";

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
  const { title, description, priority, assignedTo } = req.body;

  try {
    const bugId = await generateBugId();

    const newBug = await Bug.create({
      bugId,
      title,
      description,
      priority,
      assignedTo: assignedTo || undefined,
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
    const bug = await Bug.findOne({ bugId: Number(bugId) });
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
  const { title, description, status, priority, assignedTo } = req.body;

  try {
    const updatedBug = await Bug.findOneAndUpdate(
      { bugId: Number(bugId) },
      { title, description, status, priority, assignedTo },
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
  const { id } = req.params;

  try {
    const deletedBug = await Bug.findByIdAndDelete(id);
    if (!deletedBug) return res.status(404).json({ error: "Bug not found" });

    res.status(200).json({ message: "Bug deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  generateBugId,
  createBug,
  getBugById,
  updateBug,
  deleteBug,
};
