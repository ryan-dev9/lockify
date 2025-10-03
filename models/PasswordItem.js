import mongoose from "mongoose";

const PasswordSchema = new mongoose.Schema({
  site: String,
  username: String,
  password: String,  // store encrypted blob, not plain text
  notes: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export default mongoose.models.PasswordItem || mongoose.model("PasswordItem", PasswordSchema);
