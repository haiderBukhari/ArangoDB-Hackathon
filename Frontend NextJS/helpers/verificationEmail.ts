import nodemailer from "nodemailer";

interface EmailVerification {
    email1: string;
    userName: string;
    emailType: "verification" | "password";
    verificationLink: string | null;
    key: string | undefined;
}

export const SendEmail = ({
    email1,
    userName,
    emailType,
    verificationLink,
    key,
}: EmailVerification) => {
    const transporter = nodemailer.createTransport({
        port: 587,
        host: "smtp.gmail.com",
        secure: false,
        auth: {
            user: process.env.SERVICE,
            pass: process.env.ApplicationPassword,
        },
    });

    let emailBody: string;
    let subject: string;

    if (emailType === "verification") {
        subject = "Email Verification Math Tutor";
        emailBody = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <div style="background-color: #22BC66; padding: 20px; text-align: center;">
                    <h1 style="color: #fff; margin: 0;">Math Tutor</h1>
                </div>
                <div style="padding: 20px; color: #333;">
                    <h2>Hi ${userName},</h2>
                    <p>Thank you for signing up for Math Tutor! We’re excited to have you on board.</p>
                    <p>To get started, please verify your email address by clicking the button below:</p>
                    <div style="text-align: center; margin: 20px 0;">
                        <a href="${verificationLink}" style="background-color: #22BC66; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-size: 16px;">
                            Verify Email
                        </a>
                    </div>
                    <p>If you didn’t sign up for Math Tutor, you can safely ignore this email.</p>
                    <p>Cheers,<br>The Math Tutor Team</p>
                </div>
                <div style="background-color: #f9f9f9; padding: 10px 20px; text-align: center; font-size: 12px; color: #999;">
                    If the button above doesn’t work, copy and paste this link into your browser: <br>
                    <a href="${verificationLink}" style="color: #22BC66;">${verificationLink}</a>
                    <br><br>
                    &copy; 2025 Integry. All rights reserved.
                </div>
            </div>
        `;
    } else if (emailType === "password") {
        subject = "Password Reset Math Tutor";
        emailBody = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <div style="background-color: #FF5733; padding: 20px; text-align: center;">
                    <h1 style="color: #fff; margin: 0;">Math Tutor</h1>
                </div>
                <div style="padding: 20px; color: #333;">
                    <h2>Hi ${userName},</h2>
                    <p>We received a request to reset your password.</p>
                    <p>Your reset code is:</p>
                    <h3 style="background-color: #f0f0f0; padding: 10px; border-radius: 5px; text-align: center;">${key}</h3>
                    <p>To reset your password, click the button below:</p>
                    <div style="text-align: center; margin: 20px 0;">
                        <a href="https://localhost:3000/reset-password" style="background-color: #FF5733; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-size: 16px;">
                            Reset Password
                        </a>
                    </div>
                    <p>If you didn’t request a password reset, please contact our support team.</p>
                    <p>Cheers,<br>The Math Tutor Team</p>
                </div>
                <div style="background-color: #f9f9f9; padding: 10px 20px; text-align: center; font-size: 12px; color: #999;">
                    If the button above doesn’t work, copy and paste this link into your browser: <br>
                    <a href="https://localhost:3000/reset-password" style="color: #FF5733;">https://localhost:3000/reset-password</a>
                    <br><br>
                    &copy; 2025 Integry. All rights reserved.
                </div>
            </div>
        `;
    } else {
        throw new Error("Invalid email type provided.");
    }

    const mailOptions = {
        from: process.env.SERVICE,
        to: email1,
        subject,
        html: emailBody,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Email sent successfully:", info.response);
        }
    });
};
