import FollowUser from "../models/followuser.js";
import sendEmail from "../utils/mailer.js";

export const followUserController = {
  create: async (req, res) => {
    try {
      const data = req.body;
      const createdUsers = [];
      for (let x of data) {
        let user = await FollowUser.findOne({ email: x.Email });
        if (!user) {
          const user = await FollowUser.create({
            name: x.Name,
            email: x.Email,
            phone: x.Phone,
            interest: x.Interest,
          });
          createdUsers.push(user);
          res.status(201).json({
            status: true,
            message: "Follow up users uploaded successfully",
            createdUsers: createdUsers,
          });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ status: false, message: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const users = await FollowUser.find().select("name email phone interest");
      res.status(200).json(users.length > 0 ? users : []);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ status: false, message: error.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const id = req.params.id;
      await FollowUser.deleteOne({ _id: id });
      res.status(200).json({ status: true, message: "User deleted Success" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ status: false, message: error.message });
    }
  },

  sendMail: async (req, res) => {
    try {
      const to = req.body.onlyEmails;
      const subject = req.body.emailData.subject;
      const text = req.body.emailData.body;
      const result = await sendEmail(to, subject, text);
      res.status(200).json({ message: "Email sent Successfully" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ status: false, message: error.message });
    }
  },
};
