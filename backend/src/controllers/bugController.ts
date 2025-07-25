import Bug from "../models/Bug";
import { Jwt } from "jsonwebtoken";

export const createBug = async (req: any, res: any) => {
  const { id, title, description, priority, assignedTo } = req.body;

  try {
    const newBug = await Bug.create({
      id,
      title,
      description,
      priority,
      assignedTo,
    });

    res.status(201).json(newBug);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getBugs = async (req: any, res: any) => {
  try {
    const bugs = await Bug.find().populate("assignedTo", "name email");
    res.status(200).json(bugs);
  } catch (err: any) {
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
  createBug,
  getBugs,
  updateBug,
  deleteBug,
};
