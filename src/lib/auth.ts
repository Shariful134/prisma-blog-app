import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from '../lib/prisma'; // your prisma client instance
import nodemailer from 'nodemailer';

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql', // or "mysql", "sqlite", ...etc
  }),
  trustedOrigin: [process.env.APP_URL!],
  user: {
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: 'USER',
        required: false,
      },
      phone: {
        type: 'string',
        required: false,
      },
      status: {
        type: 'string',
        defaultValue: 'ACTIVE',
        required: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      const verificationURL = `${process.env.APP_URL}/verify-email?token=${token}`;
      const info = await transporter.sendMail({
        from: '"Shariful_Prisma_Blog" <shariful.prisma@gmail.com>', // sender address
        to: user.email, // list of recipients
        subject: 'Verify Your Email - Shariful Prisma Blog', // subject line
        text: `
Hello ${user.name},

Thank you for joining Shariful Prisma Blog!

Please verify your email address using this link:

${url}

If you didn't create an account, please ignore this email.
      `,
        // plain text body
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; padding:30px 10px; background:#f4f6f9; font-family:Arial,sans-serif;">

  <div style="max-width:500px; margin:auto; background:#ffffff;
              border-radius:12px; padding:35px 25px;">

    <h2 style="text-align:center; color:#2563eb;">
      Shariful Prisma Blog
    </h2>

    <h2 style="color:#222; text-align:center;">
      Verify Your Email Address
    </h2>

    <p>Hello ${user.name},</p>

    <p style="color:#555; line-height:1.7;">
      Thank you for joining Shariful Prisma Blog!
      Please verify your email address to activate your account.
    </p>

    <div style="text-align:center; margin:30px 0;">
      <a href="${verificationURL}"
         style="background:#2563eb; color:white;
                padding:14px 28px; text-decoration:none;
                border-radius:7px; display:inline-block;
                font-weight:bold;">
        Verify My Email
      </a>
    </div>

    <p style="color:#777; font-size:13px;">
      If the button doesn't work, copy and paste this link
      into your browser:
    </p>

    <p style="word-break:break-all; font-size:12px;">
      <a href="${verificationURL}">${verificationURL}</a>
    </p>

    <hr style="border:none; border-top:1px solid #eee;">

    <p style="color:#999; font-size:12px; text-align:center;">
      If you didn't create an account, you can ignore this email.
    </p>

    <p style="color:#999; font-size:12px; text-align:center;">
      © 2026 Shariful Prisma Blog
    </p>

  </div>
</body>
</html>
      `,
      });

      console.log('Message sent: %s', info.messageId);
    },
  },
});
