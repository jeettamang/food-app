import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE,
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});
const sendMail = async ({ to, subject, message }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Foot-App" <${process.env.SMTP_EMAIL}>`,
      to,
      subject,
      html: message,
    });
    return info?.messageId;
  } catch (error) {
    console.error("Email send failed:", error);
    throw new Error("Failed to send email");
  }
};

export { sendMail };
