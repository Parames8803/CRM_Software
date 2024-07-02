import mongoose, { Schema } from "mongoose";

const followUserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    interest: { type: String },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

const FollowUser = mongoose.model("FollowUser", followUserSchema);

export default FollowUser;
