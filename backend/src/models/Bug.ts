import mongoose from "mongoose";

const bugSchema = new mongoose.Schema(
  {
    bugId: { type: Number, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["open", "in-progress", "resolved", "closed"],
      default: "open",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    assignedToUser: { type: String, default: "" },
    assignedToTeam: { type: String, default: "" },
  },
  { timestamps: true }
);

const Bug = mongoose.model("Bug", bugSchema);
export default Bug;
