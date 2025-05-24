import { configDotenv } from "dotenv";
import nodemailer from "nodemailer";

configDotenv();

export const mailSender = (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      service: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });

    let info = transporter.sendMail(
      {
        from: process.env.MAIL_USER,
        to: email,
        subject: title,
        html: body,
      },
      (err, info) => console.log(err)
    );
    return info;
  } catch (error) {
    console.log(error.message);
  }
};
