import { NextResponse } from 'next/server';
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { to, subject, formData } = await request.json();

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASSWORD, // Your Gmail app password
      },
    });

    // Email HTML content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(to right, #3b82f6, #1d4ed8); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #1f2937; }
            .value { color: #4b5563; }
            .divider { border-top: 2px solid #e5e7eb; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Enquiry - Finovest Chit Fund</h1>
              <p>Submitted on: ${new Date().toLocaleString()}</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${formData.name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${formData.email}</div>
              </div>
              <div class="field">
                <div class="label">Phone Number:</div>
                <div class="value">${formData.phone}</div>
              </div>
              <div class="field">
                <div class="label">Chit Value:</div>
                <div class="value">${formData.chitValue}</div>
              </div>
              <div class="field">
                <div class="label">Tenure:</div>
                <div class="value">${formData.tenure}</div>
              </div>
              <div class="field">
                <div class="label">Occupation:</div>
                <div class="value">${formData.occupation}</div>
              </div>
              <div class="field">
                <div class="label">Monthly Income:</div>
                <div class="value">${formData.monthlyIncome}</div>
              </div>
              <div class="field">
                <div class="label">State:</div>
                <div class="value">${formData.state}</div>
              </div>
              <div class="field">
                <div class="label">Branch:</div>
                <div class="value">${formData.branch}</div>
              </div>
              <div class="divider"></div>
              <div class="field">
                <div class="label">Additional Message:</div>
                <div class="value">${formData.message || 'No additional message provided.'}</div>
              </div>
              <div class="field">
                <div class="label">Consent Given:</div>
                <div class="value">${formData.consent ? 'Yes' : 'No'}</div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Email options
    const mailOptions = {
      from: `"Finovest Enquiry" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      html: htmlContent,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully' 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}