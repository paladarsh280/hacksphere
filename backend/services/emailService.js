import dotenv from "dotenv";
dotenv.config();
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send OTP email
 * @param {string} toEmail
 * @param {string} otp
 */
export const sendOtpEmail = async (toEmail, otp) => {
  try {
    const { data, error } = await resend.emails.send({
      from: `"HackSphere" <${process.env.FROM_EMAIL}>`,  // Fixed: wrapped name in quotes
      to: toEmail,
      subject: "Verify your email",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Email Verification</h2>
          <p>Your OTP is:</p>
          <h1 style="letter-spacing: 3px;">${otp}</h1>
          <p>This OTP is valid for <b>5 minutes</b>.</p>
        </div>
      `,
      text: `Your OTP is: ${otp}\n\nThis OTP is valid for 5 minutes.`, // Recommended: add plain text version
    });

    if (error) {
      console.error("Email send failed:", error);
      throw new Error("Failed to send OTP email");
    }

    return data;
  } catch (error) {
    console.error("Email send failed:", error);
    throw new Error("Failed to send OTP email");
  }
};