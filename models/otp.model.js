import { model, Schema } from "mongoose";
import { AppError } from "../utils/AppError.js";
import { mailSender } from "../utils/mailSender.js";
import { User } from "./user.model.js";

const OTPSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5, // Delete document after 5 minutes
  },
});

async function sendVerificationEmail(email, otp) {
  try {
    const body = `
        <h2>Please confirm your OTP</h2>
        <p><strong>${otp}</strong></p>
        `;
    const mailResponse = mailSender(email, "Account Verification Email", body);
    console.log("Email sent successfully: ", mailResponse);
  } catch (error) {
    console.log("Error occured while sending verification email:", error);
    throw AppError(
      500,
      "Error occured while sending verification email",
      error,
      error.stack
    );
  }
}

OTPSchema.pre("save", async function (next) {
  if (this.isNew) {
    const user = await User.findById(this.user);
    await sendVerificationEmail(user.email, this.otp);
  }

  next();
});

export const OTP = model("OTP", OTPSchema);
