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
    assignedToUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    assignedToTeam: { type: mongoose.Schema.Types.ObjectId, ref: "Team", default: null },
  },
  { timestamps: true }
);

const Bug = mongoose.model("Bug", bugSchema);
export default Bug;
