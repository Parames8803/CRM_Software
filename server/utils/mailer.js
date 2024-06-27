import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  tls: {
    rejectUnauthorized: false,
  },
  service: "gmail",
  auth: {
    user: "parameswaran8803@gmail.com",
    pass: "zuilnlbysuwnkhmt",
  },
});

export default async function sendEmail(to, subject, text) {
  try {
    let info = await transporter.sendMail({
      from: "Parameswaran E <parameswaran8803@gmail.com>",
      to: to,
      subject: subject,
      text: text,
      //   html: html,
    });

    console.log("Email sent: " + info.response);
    return info.response;
  } catch (err) {
    console.error("Error sending email: ", err);
    throw err;
  }
}
