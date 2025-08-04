import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    teamId: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    description: { type: String, required: false },
    bugs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bug" }],
  },
  { timestamps: true }
);

const Team = mongoose.model("Team", teamSchema);
export default Team;