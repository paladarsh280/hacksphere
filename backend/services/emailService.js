




import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const getOTPTemplate = (otp) => {
 return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your OTP Code</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%); border-radius: 16px 16px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                Togethra
              </h1>
              <p style="margin: 10px 0 0; color: #ffe6f0; font-size: 14px;">
                Preserve Moments. Share Emotions. Stay Together.
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px; color: #333333; font-size: 24px; text-align: center;">
                Verify Your Email
              </h2>
              <p style="margin: 0 0 30px; color: #666666; font-size: 16px; line-height: 1.6; text-align: center;">
                Use the OTP below to securely verify your email and start uploading your precious
                photos, videos, and emotional memories with your family.
                <br /><br />
                This code is valid for <strong>5 minutes</strong>.
              </p>

              <!-- OTP Box -->
              <div style="text-align: center; margin: 30px 0;">
                <div style="display: inline-block; padding: 20px 40px; background: linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%); border-radius: 12px;">
                  <span style="font-size: 36px; font-weight: 700; color: #ffffff; letter-spacing: 8px;">
                    ${otp}
                  </span>
                </div>
              </div>

              <!-- Security Warning -->
              <div style="background-color: #fff3f6; border-left: 4px solid #ff4d6d; padding: 15px; border-radius: 4px; margin: 30px 0;">
                <p style="margin: 0; color: #a61e4d; font-size: 14px;">
                  🔐 <strong>Security Reminder:</strong> Never share this OTP with anyone.
                  Togethra will never ask for your verification code.
                </p>
              </div>

              <p style="margin: 0; color: #999999; font-size: 14px; text-align: center;">
                If you didn’t request this email, you can safely ignore it.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #f8f9fa; border-radius: 0 0 16px 16px; text-align: center;">
              <p style="margin: 0 0 10px; color: #999999; font-size: 14px;">
                © ${new Date().getFullYear()} Togethra. All rights reserved.
              </p>
              <p style="margin: 0; color: #999999; font-size: 12px;">
                Sharing life’s moments with love 💗 | support@togethra.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

};

// ✅ Send OTP Function
export const sendOTP = async (to, otp) => {
  try {
    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to,
      subject: "🔐 Your Traveela Verification Code",
      html: getOTPTemplate(otp),
    });

    console.log("OTP sent successfully:", data);
    return data;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
};




console.log(`${process.env.FROM_EMAIL}`)
// Password Reset Email
export const sendResetEmail = async (email, resetUrl) => {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: [email],
      subject: '🔐 Password Reset Request',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background-color: #f4f4f4;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: #ffffff;
              border-radius: 10px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              text-align: center;
            }
            .header h1 {
              font-size: 28px;
              margin-bottom: 10px;
            }
            .content {
              padding: 40px 30px;
            }
            .content p {
              color: #555;
              font-size: 16px;
              line-height: 1.6;
              margin-bottom: 20px;
            }
            .button-container {
              text-align: center;
              margin: 30px 0;
            }
            .button {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 15px 40px;
              text-decoration: none;
              border-radius: 50px;
              font-size: 16px;
              font-weight: bold;
              display: inline-block;
            }
            .link-box {
              background: #f8f9fa;
              padding: 15px;
              border-radius: 5px;
              word-break: break-all;
              font-size: 14px;
              color: #666;
              margin: 20px 0;
            }
            .footer {
              background: #f8f9fa;
              padding: 20px;
              text-align: center;
              color: #888;
              font-size: 12px;
            }
            .warning {
              background: #fff3cd;
              border-left: 4px solid #ffc107;
              padding: 15px;
              margin: 20px 0;
              border-radius: 0 5px 5px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔐 Password Reset</h1>
              <p>We received a request to reset your password</p>
            </div>
            
            <div class="content">
              <p>Hello,</p>
              <p>Someone requested a password reset for your account. If this was you, click the button below to create a new password:</p>
              
              <div class="button-container">
                <a href="${resetUrl}" class="button">Reset My Password</a>
              </div>
              
              <p>Or copy and paste this link in your browser:</p>
              <div class="link-box">${resetUrl}</div>
              
              <div class="warning">
                <strong>⏰ This link expires in 1 hour.</strong>
              </div>
              
              <p>If you didn't request this password reset, you can safely ignore this email. Your password will remain unchanged.</p>
            </div>
            
            <div class="footer">
              <p>© ${new Date().getFullYear()} Your App Name. All rights reserved.</p>
              <p>This is an automated email, please do not reply.</p>
            </div>
          </div>
        </body>
        </html>
      `
    });

    if (error) {
      console.error('Resend Error:', error);
      throw new Error(error.message);
    }

    console.log('✅ Reset email sent:', data?.id);
    return { success: true, data };

  } catch (error) {
    console.error('❌ Email sending failed:', error);
    throw error;
  }
};

// Password Changed Confirmation Email
export const sendPasswordChangedEmail = async (email) => {
  try {
    const { data, error } = await resend.emails.send({
      from:process.env.EMAIL_FROM,
      to: [email],
      subject: '✅ Password Changed Successfully',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            .container {
              max-width: 600px;
              margin: 0 auto;
              font-family: Arial, sans-serif;
              padding: 30px;
              background: #ffffff;
              border-radius: 10px;
            }
            .success-icon {
              text-align: center;
              font-size: 60px;
              margin-bottom: 20px;
            }
            h1 {
              color: #28a745;
              text-align: center;
            }
            .info-box {
              background: #e8f5e9;
              padding: 20px;
              border-radius: 5px;
              margin: 20px 0;
            }
            .warning-box {
              background: #fff3cd;
              padding: 15px;
              border-radius: 5px;
              margin: 20px 0;
              border-left: 4px solid #ffc107;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="success-icon">✅</div>
            <h1>Password Changed!</h1>
            
            <div class="info-box">
              <p><strong>Your password has been changed successfully.</strong></p>
              <p>Time: ${new Date().toLocaleString()}</p>
            </div>
            
            <div class="warning-box">
              <p>⚠️ If you did not make this change, please contact our support team immediately.</p>
            </div>
          </div>
        </body>
        </html>
      `
    });

    if (error) throw new Error(error.message);
    
    return { success: true, data };

  } catch (error) {
    console.error('❌ Confirmation email failed:', error);
    // Don't throw - this is optional notification
  }
};







export const sendUnlockEmail = async (email, memory) => {
  try {
    // Safety check (DO NOT THROW)
    if (!email || typeof email !== "string") {
      console.warn("⚠️ Unlock email skipped: invalid email", email);
      return;
    }

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email, // ✅ string only
      subject: "🎉 A Memory Capsule Has Been Unlocked!",
    html: `
<!DOCTYPE html>
<html>
<body style="margin:0; padding:0; font-family:'Segoe UI', Tahoma, sans-serif; background:#f6f7fb;">
  <div style="max-width:600px; margin:40px auto; background:#ffffff; padding:40px 35px; border-radius:18px; box-shadow:0 8px 20px rgba(0,0,0,0.08);">

    <!-- Title -->
    <h2 style="margin:0 0 16px; color:#2d2d2d; text-align:center; font-weight:600;">
      A memory found its way to you 💌
    </h2>

    <!-- Divider -->
    <div style="width:60px; height:4px; background:#ff7aa2; margin:20px auto 30px; border-radius:2px;"></div>

    <!-- Memory Text -->
    <p style="color:#555; font-size:16px; line-height:1.7; text-align:center; margin:0 0 30px;">
      ${memory?.text || "Someone thought of you and shared a moment close to their heart."}
    </p>

    <!-- Soft Message -->
    <p style="color:#777; font-size:15px; line-height:1.6; text-align:center; margin:0 0 35px;">
      Some moments are too meaningful to stay alone.  
      This one was saved with love — and meant just for you.
    </p>

    <!-- Closing -->
    <p style="color:#999; font-size:14px; text-align:center; margin:0;">
      Take a quiet moment when you’re ready 🤍
    </p>

  </div>
</body>
</html>
`,

    });

    if (error) {
      console.error("⚠️ Resend unlock email error:", error);
      return;
    }

    console.log("✅ Unlock email sent:", data?.id);
    return data;

  } catch (err) {
    console.error("⚠️ Unlock email failed:", err.message);
    // ❗ DO NOT throw
  }
};


export const sendCollabInviteEmail = async (email, memory) => {
  try {
    // Safety check (DO NOT THROW)
    if (!email || typeof email !== "string") {
      console.warn("⚠️ Collaboration invite skipped: invalid email", email);
      return;
    }

    if (!memory || !memory._id) {
      console.warn("⚠️ Collaboration invite skipped: invalid memory object", memory);
      return;
    }

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "Memory Capsule <onboarding@resend.dev>",
      to: email, // ✅ string only
      subject: "👨‍👩‍👧 You’re invited to collaborate on a memory",
     html: `
<!DOCTYPE html>
<html>
<body style="margin:0; padding:0; font-family:'Segoe UI', Tahoma, sans-serif; background:#f6f7fb;">
  <div style="max-width:600px; margin:40px auto; background:#ffffff; padding:40px 35px; border-radius:18px; box-shadow:0 8px 20px rgba(0,0,0,0.08);">

    <!-- Title -->
    <h2 style="margin:0 0 14px; color:#2d2d2d; text-align:center; font-weight:600;">
      You’ve been invited into a shared moment 💞
    </h2>

    <!-- Divider -->
    <div style="width:60px; height:4px; background:#ff7aa2; margin:18px auto 28px; border-radius:2px;"></div>

    <!-- Message -->
    <p style="color:#555; font-size:16px; line-height:1.7; text-align:center; margin:0 0 26px;">
      ${memory?.text || "Someone wants to share a meaningful part of their life with you."}
    </p>

    <!-- Soft Explanation -->
    <p style="color:#777; font-size:15px; line-height:1.6; text-align:center; margin:0 0 34px;">
      By accepting this invitation, you’ll be able to view, add to, and protect this memory together —
      just like moments are meant to be shared.
    </p>

    <!-- CTA Button -->
    <div style="text-align:center;">
      <a
        href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/accept-collab/${memory._id}?email=${encodeURIComponent(email)}"
        style="
          display:inline-block;
          padding:14px 28px;
          background:linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%);
          color:#ffffff;
          border-radius:30px;
          text-decoration:none;
          font-size:15px;
          font-weight:600;
          box-shadow:0 6px 14px rgba(255,122,162,0.35);
        "
      >
        Accept the Invitation
      </a>
    </div>

    <!-- Footer Note -->
    <p style="margin:36px 0 0; color:#999; font-size:14px; text-align:center;">
      Take your time — this invitation will be waiting for you 🤍
    </p>

  </div>
</body>
</html>
`,

    });

    if (error) {
      console.error("⚠️ Resend collaboration invite error:", error);
      return;
    }

    console.log("✅ Collaboration invite sent:", data?.id);
    return data;

  } catch (err) {
    console.error("⚠️ Collaboration invite failed:", err.message);
    // ❗ DO NOT throw
  }
};

