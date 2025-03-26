import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { feedbackType, message, email } = body;


    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })
    const mailOptions = {
      from: email || process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Feedback - ${feedbackType}`,
      text: message,
      html: `
        <h2>New Feedback Submission</h2>
        <p><strong>Feedback Type:</strong> ${feedbackType}</p>
        ${email ? `<p><strong>Contact Email:</strong> ${email}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    console.log('contact form submitted', { feedbackType, message, email });


    return NextResponse.json({ message: 'Email sent successfully!' },
      { status: 200 }

    );
  } catch (error) {
    console.log('contact form error', error);

    return NextResponse.json({ message: 'Email failed to send!' },
      { status: 500 },
    );
  }
}
