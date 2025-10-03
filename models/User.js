// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  passwordHash: String, // for login if you have local auth
  // other fields...
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
