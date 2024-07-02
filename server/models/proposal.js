import mongoose, { Schema } from "mongoose";

const proposalSchema = new Schema(
  {
    proposalId: { type: String },
    proposalSubject: { type: String },
    paymentTerm: { type: String },
    deliveryTerm: { type: String },
    validity: { type: String },
    remarks: { type: String },
    accountManager: { type: String },
    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number },
      },
    ],
    status: { type: String, default: "open" },
    totalAmount: { type: Number },
    leadId: { type: Schema.Types.ObjectId, ref: "Lead" },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

const Proposal = mongoose.model("Proposal", proposalSchema);

export default Proposal;
