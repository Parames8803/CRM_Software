import mongoose, { Schema } from "mongoose";

const followUserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String },
    phone: { type: Number },
    interest: { type: String },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

const FollowUser = mongoose.model("FollowUser", followUserSchema);

export default FollowUser;
