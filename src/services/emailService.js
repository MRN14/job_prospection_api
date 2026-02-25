import { getTransporter } from "../config/mailer.js";
import nodemailer from "nodemailer";

export async function sendEmail(to, subject, text) {
  const transporter = getTransporter();

  const info = await transporter.sendMail({
    from: "Example App <no-reply@example.com>",
    to,
    subject,
    text,
  });

  console.log("Message sent:", info.messageId);
  console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
}