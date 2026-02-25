import nodemailer from "nodemailer";

let transporter;

export async function initMailer() {
  const account = await nodemailer.createTestAccount();

  transporter = nodemailer.createTransport({
    host: account.smtp.host,
    port: account.smtp.port,
    secure: account.smtp.secure,
    auth: {
      user: account.user,
      pass: account.pass,
    },
  });

  console.log("Ethereal account created:");
  console.log("User:", account.user);
}

export function getTransporter() {
  if (!transporter) {
    throw new Error("Mailer not initialized. Call initMailer() first.");
  }
  return transporter;
}