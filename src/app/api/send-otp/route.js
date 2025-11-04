import nodemailer from "nodemailer";
import { setOtp } from "../../../../lib/otpStore";

export async function POST(req) {
  try {
    const { name, email } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const OTP = Math.floor(100000 + Math.random() * 900000);

    setOtp(email, OTP);

    const htmlContent = `
    <!doctype html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>HoliDesk — OTP Verification</title>
      <style>
        /* Basic resets */
        body,table,td,p{margin:0;padding:0;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;color:#333333}
        img{border:0;display:block}
        a{color:inherit;text-decoration:none}

        /* Container */
        .email-wrap{width:100%;background:#f4f6f8;padding:24px 0}
        .email-table{max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e6e9ee}

        /* Header */
        .header{padding:20px 24px;background:linear-gradient(90deg,#00aaff 0%,#0088cc 100%);color:#ffffff}
        .logo{font-weight:700;font-size:20px}
        .preheader{display:none!important;visibility:hidden;opacity:0;height:0;width:0}

        /* Body */
        .body{padding:28px 24px}
        .greeting{font-size:16px;margin-bottom:12px}
        .intro{font-size:14px;line-height:1.5;color:#555;margin-bottom:20px}

        /* OTP box */
        .otp-box{display:block;background:#f7fbff;border:1px dashed #cfeefe;padding:18px;border-radius:8px;text-align:center;margin:0 auto 20px;max-width:320px}
        .otp{font-size:28px;font-weight:700;letter-spacing:6px;color:#0b72a7}
        .otp-expire{font-size:12px;color:#888;margin-top:8px}

        /* CTA */
        .cta{display:inline-block;padding:12px 20px;border-radius:6px;background:#00aaff;color:#fff;font-weight:600;margin-top:8px}

        /* Note */
        .note{font-size:13px;color:#666;margin-top:18px}

        /* Footer */
        .footer{padding:18px 24px;background:#fbfcfe;font-size:12px;color:#7a7a7a;text-align:center}
        .support{color:#0b72a7}

        /* Responsive */
        @media only screen and (max-width:420px){
          .body{padding:20px}
          .header{padding:16px}
          .logo{font-size:18px}
          .otp{font-size:24px}
        }
      </style>
    </head>
    <body>
      <!-- Preheader Text (hidden) -->
      <div class="preheader">Your HoliDesk verification code — use it to confirm your action. Expires in 10 minutes.</div>

      <div class="email-wrap">
        <table class="email-table" width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td class="header">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="vertical-align:middle">
                    <!-- Logo / product name -->
                    <div class="logo">HoliDesk</div>
                  </td>
                  <td style="text-align:right;vertical-align:middle;font-size:13px;opacity:0.95">Leave Management • OTP</td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td class="body">
              <p class="greeting">Hi ${name},</p>

              <p class="intro">Use the one-time password (OTP) below to complete your action in <strong>HoliDesk — Leave Management System</strong>. This code is for your security; do not share it with anyone.</p>

              <div style="text-align:center">
                <div class="otp-box">
                  <div style="font-size:12px;color:#2b6b87;margin-bottom:6px">Your verification code</div>
                  <div class="otp">${OTP}</div>
                  <div class="otp-expire">This code will expire in <strong>10 minutes</strong>.</div>
                </div>
              </div>

              <p class="note">If you didn't request this code, you can safely ignore this email. Someone may have entered your email address by mistake, or a malicious actor attempted to access your account — if you're concerned, change your account password and contact us.</p>

              <p style="margin-top:14px;font-size:13px;color:#555">Thanks,<br><strong>HoliDesk Team</strong></p>

              <hr style="border:none;border-top:1px solid #eef3f6;margin:20px 0">

            </td>
          </tr>

          <tr>
            <td class="footer">
              HoliDesk • Leave Management System<br>
              © <span id="year">2025</span> HoliDesk. All rights reserved.
            </td>
          </tr>
        </table>
      </div>
    </body>
    </html>

    `

    const mailOptions = {
      from: `HoliDesk ${process.env.EMAIL_USER}`,
      to: email,
      subject: "Verify your email to countinue",
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);

    if (info.accepted && info.accepted.length > 0) {
      return Response.json({ success: true, message: "Email sent successfully!" });
    } else {
      console.log("Error in Sending Email: ", info.rejected);
      return Response.json({ success: false, error: error.message }, { status: 500 });
    }

  } catch (error) {
    console.error("Email sending error:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
