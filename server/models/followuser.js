import mongoose, { Schema } from "mongoose";

const followUserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String },
    phone: { type: Number },
    interest: { type: String },
  },
  { timestamps: true }
);

const FollowUser = mongoose.model("FollowUser", followUserSchema);

export default FollowUser;
