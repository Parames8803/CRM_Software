import Lead from "../models/lead.js";
import Product from "../models/Product.js";
import Proposal from "../models/proposal.js";
// import { generateProposal } from "../utils/generateProposal.js";
import { generateRandomId } from "../utils/randomId.js";

export const createProposal = async (req, res) => {
  try {
    const {
      companyName,
      customerName,
      phone,
      address,
      email,
      city,
      state,
      country,
      proposalSubject,
      payment,
      delivery,
      date,
      remarks,
      accountManager,
      selectedProductsList,
    } = req.body;

    const leadData = await Lead.findOne({
      companyName: companyName.toLowerCase(),
      deletedAt: null,
    });
    console.log(leadData);
    if (leadData) {
      return res.status(400).json({ message: "Lead already exists" });
    }

    // Generate proposalId synchronously
    const createdProposalId = generateRandomId();

    // Wait for proposalId to be generated
    const proposalId = await createdProposalId;

    const lead = await Lead.create({
      companyName: companyName.toLowerCase(),
      customerName,
      phone,
      address,
      email,
      city,
      state,
      country,
    });

    const proposal = await Proposal.create({
      proposalId, // Use the generated proposalId
      proposalSubject,
      paymentTerm: payment,
      deliveryTerm: delivery,
      validity: date,
      remarks,
      accountManager,
      leadId: lead._id,
      status: "Open",
    });

    await Lead.updateOne(
      { _id: lead._id },
      { $push: { proposals: proposal._id } }
    );

    let totalAmount = 0;

    for (let x of selectedProductsList) {
      let productDetails = await Product.findOne({ name: x.name }); // Assuming you want to find one product by name
      if (productDetails) {
        let resObject = {
          productId: productDetails._id,
          quantity: x.quantity,
        };
        await Proposal.updateOne(
          { _id: proposal._id },
          { $push: { products: resObject } }
        );
        totalAmount += (productDetails.price + productDetails.gst) * x.quantity;
      }
    }

    await Proposal.updateOne({ _id: proposal._id }, { totalAmount });

    return res
      .status(200)
      .json({ status: true, message: "Proposal created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getProposals = async (req, res) => {
  try {
    const proposals = await Proposal.find({ deletedAt: null })
      .select("proposalId createdAt totalAmount status")
      .populate("leadId");
    return res.status(200).json({ status: true, proposals });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getProposalById = async (req, res) => {
  try {
    const { id } = req.params;
    const proposal = await Proposal.findOne({
      _id: id,
      deletedAt: null,
    }).populate("leadId products.productId");
    if (proposal) {
      return res.status(200).json({ status: true, proposal });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteProposalById = async (req, res) => {
  try {
    const { id } = req.params;
    const proposal = await Proposal.findOne({ _id: id });
    const lead = await Lead.updateOne(
      { _id: proposal.leadId },
      {
        $pull: { proposals: proposal._id },
      }
    );
    const result = await Proposal.updateOne(
      { _id: id },
      { deletedAt: Date.now() }
    );
    console.log(result);
    return res
      .status(200)
      .json({ status: true, message: "Proposal deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const toggleProposalStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    let data = await Proposal.findOne({ _id: id, deletedAt: null });
    if (status == "Open") data.status = "Gain";
    if (status == "Gain") data.status = "Open";
    data.save();
    return res
      .status(200)
      .json({ status: true, message: "Proposal updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// export const handleProposalPrintPDF = async (req, res) => {
//   try {
//     const { data } = req.body;
//     const result = await generateProposal(data);
//     if (result) {
//       res.status(200).json({ status: true, message: "Success" });
//     } else {
//       res.status(400).json({ status: false, message: "Failed" });
//     }
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ status: false, message: "Something went wrong" });
//   }
// };
