import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["developer", "admin", "tester"],
      required: true,
    },
    bugs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bug" }],
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
