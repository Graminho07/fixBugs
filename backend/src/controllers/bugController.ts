import Bug from "../models/Bug";

const generateBugId = async (): Promise<number> => {
  let id: number = 0;
  let exists = true;

  while (exists) {
    id = Math.floor(100000 + Math.random() * 900000);
    const existing = await Bug.findOne({ bugId: id });
    if (!existing) exists = false;
  }
  return id;
};


export const createBug = async (req: any, res: any) => {
  const { title, description, priority, assignedTo } = req.body;

  if (!assignedTo || typeof assignedTo !== "string") {
    return res.status(400).json({ error: "assignedTo é obrigatório e deve ser string" });
  }

  try {
    const bugId = await generateBugId();

    const newBug = await Bug.create({
      bugId,
      title,
      description,
      priority,
      assignedTo,
    });

    res.status(201).json(newBug);
  } catch (err: any) {
    console.error("Erro ao criar bug:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getBugs = async (req: any, res: any) => {
  try {
    const bugs = await Bug.find().populate("assignedTo", "name email");
    res.status(200).json(bugs);
  } catch (err: any) {
    console.error("Erro ao buscar bugs:", err);
    res.status(500).json({ error: err.message });
  }
};

export const updateBug = async (req: any, res: any) => {
  const { id } = req.params;
  const { title, description, status, priority, assignedTo } = req.body;

  try {
    const updatedBug = await Bug.findByIdAndUpdate(
      id,
      { title, description, status, priority, assignedTo },
      { new: true }
    ).populate("assignedTo", "name email");

    if (!updatedBug) {
      return res.status(404).json({ error: "Bug not found" });
    }

    res.status(200).json(updatedBug);
  } catch (err: any) {
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
  getBugs,
  updateBug,
  deleteBug,
};
