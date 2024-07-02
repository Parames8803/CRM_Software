import mongoose, { Schema } from "mongoose";

const leadsSchema = new Schema(
  {
    companyName: { type: String },
    customerName: { type: String },
    phone: { type: Number },
    address: { type: String },
    email: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    proposals: [{ type: Schema.Types.ObjectId, ref: "Proposal" }],
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

const Lead = mongoose.model("Lead", leadsSchema);

export default Lead;
