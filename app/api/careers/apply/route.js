// app/api/careers/apply/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const formData = await request.formData();
    
    // Extract form data
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message') || '';
    const resume = formData.get('resume');
    
    // Validate required fields
    if (!name || !email || !phone || !resume) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      );
    }
    
    // Get admin email from environment variables
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@Finovest.com';
    const adminName = process.env.ADMIN_NAME || 'Admin User';
    
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: process.env.EMAIL_PORT || 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    
    // Convert resume file to buffer for attachment
    const resumeBuffer = Buffer.from(await resume.arrayBuffer());
    const resumeFileName = resume.name || 'resume.pdf';
    
    // Email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_FROM || '"Finovest Careers" <noreply@Finovest.com>',
      to: adminEmail,
      subject: `New Career Application: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af;">New Career Application Received</h2>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Applicant Details:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280;"><strong>Name:</strong></td>
                <td style="padding: 8px 0; color: #374151;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;"><strong>Email:</strong></td>
                <td style="padding: 8px 0; color: #374151;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;"><strong>Phone:</strong></td>
                <td style="padding: 8px 0; color: #374151;">${phone}</td>
              </tr>
              ${message ? `
              <tr>
                <td style="padding: 8px 0; color: #6b7280;"><strong>Message:</strong></td>
                <td style="padding: 8px 0; color: #374151;">${message}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 8px 0; color: #6b7280;"><strong>Submitted At:</strong></td>
                <td style="padding: 8px 0; color: #374151;">${new Date().toLocaleString()}</td>
              </tr>
            </table>
          </div>
          
          <p style="color: #4b5563;">
            The applicant's resume is attached to this email. Please review the application and follow up with the candidate.
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              This email was automatically generated from the Finovest Careers portal.
            </p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: resumeFileName,
          content: resumeBuffer,
          contentType: resume.type || 'application/pdf',
        },
      ],
    };
    
    // Email to applicant (confirmation)
    const applicantMailOptions = {
      from: process.env.EMAIL_FROM || '"Finovest Careers" <noreply@Finovest.com>',
      to: email,
      subject: 'Thank You for Your Application - Finovest',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1e40af; margin-bottom: 10px;">Thank You for Your Application!</h1>
            <p style="color: #6b7280;">We have received your application for a career opportunity at Finovest.</p>
          </div>
          
          <div style="background-color: #f0f9ff; padding: 25px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">Application Details:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280;"><strong>Applicant Name:</strong></td>
                <td style="padding: 8px 0; color: #374151;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;"><strong>Position Applied:</strong></td>
                <td style="padding: 8px 0; color: #374151;">Multiple Opportunities</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;"><strong>Application Date:</strong></td>
                <td style="padding: 8px 0; color: #374151;">${new Date().toLocaleDateString()}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;"><strong>Reference ID:</strong></td>
                <td style="padding: 8px 0; color: #374151;">MARG-${Date.now().toString().slice(-8)}</td>
              </tr>
            </table>
          </div>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">What Happens Next?</h3>
            <ol style="color: #4b5563; padding-left: 20px;">
              <li style="margin-bottom: 8px;">Our HR team will review your application</li>
              <li style="margin-bottom: 8px;">If your profile matches our requirements, we will contact you for the next steps</li>
              <li style="margin-bottom: 8px;">The selection process may include interviews and assessments</li>
              <li>You will be notified about the status of your application via email</li>
            </ol>
          </div>
          
          <div style="margin-top: 30px; padding: 20px; background-color: #fef3c7; border-radius: 8px; border-left: 4px solid #d97706;">
            <h3 style="color: #92400e; margin-top: 0;">Important Information:</h3>
            <ul style="color: #92400e; padding-left: 20px;">
              <li style="margin-bottom: 5px;">Please ensure your contact information is accurate</li>
              <li style="margin-bottom: 5px;">Keep an eye on your email (including spam folder) for updates</li>
              <li>The typical response time is 7-10 business days</li>
            </ul>
          </div>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
            <p style="color: #6b7280; font-size: 14px;">
              For any queries, please contact our HR department at <a href="mailto:hr@Finovest.com" style="color: #3b82f6;">hr@Finovest.com</a>
            </p>
            <p style="color: #9ca3af; font-size: 12px; margin-top: 10px;">
              Finovest Chit Fund Pvt. Ltd.<br />
              Building Trust Since 1962
            </p>
          </div>
        </div>
      `,
    };
    
    // Send emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(applicantMailOptions);
    
    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully. Confirmation email sent.',
      referenceId: `MARG-${Date.now().toString().slice(-8)}`
    });
    
  } catch (error) {
    console.error('Error processing application:', error);
    return NextResponse.json(
      { error: 'Failed to process application. Please try again later.' },
      { status: 500 }
    );
  }
}