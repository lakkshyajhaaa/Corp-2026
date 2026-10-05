'use server';

import { prisma } from '@/lib/db';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitStartupRegistration(formData: {
  startupName: string;
  founderName: string;
  email: string;
  phone: string;
  description: string;
  stage: string;
  pitchDeck?: string;
}) {
  try {
    const existingRegistration = await prisma.startupRegistration.findUnique({
      where: { email: formData.email },
    });

    if (existingRegistration) {
      return { success: false, error: 'A startup with this email has already registered.' };
    }

    await prisma.startupRegistration.create({
      data: {
        startupName: formData.startupName,
        founderName: formData.founderName,
        email: formData.email,
        phone: formData.phone,
        description: formData.description,
        stage: formData.stage,
        pitchDeck: formData.pitchDeck || null,
        status: 'PENDING',
      },
    });

    if (process.env.RESEND_API_KEY) {
      const contactFooter = `
        <hr style="margin-top: 30px; border: none; border-top: 1px solid #eee;" />
        <p style="color: #666; font-size: 14px;">
          <strong>Questions? Contact Us:</strong><br />
          Email: gkalra_be25@thapar.edu<br />
          Phone: +91-9671454725
        </p>
      `;

      // Email to startup founder
      await resend.emails.send({
        from: 'Prizmora <updates@gandmarao.saasforlife.co.in>',
        to: [formData.email],
        subject: 'Innoventia Startup Fair - Registration Received',
        html: `<p>Hi ${formData.founderName},</p>
               <p>We've successfully received your registration for <strong>${formData.startupName}</strong> at the Innoventia Startup Fair.</p>
               <p>Your application is currently under review. We will get back to you with the next steps shortly.</p>
               ${contactFooter}`,
      });

      // Notification to Admin
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
      await resend.emails.send({
        from: 'Prizmora <updates@gandmarao.saasforlife.co.in>',
        to: [adminEmail],
        subject: `New Startup Registration: ${formData.startupName}`,
        html: `<p>A new startup has registered for Innoventia.</p>
               <ul>
                 <li><strong>Startup:</strong> ${formData.startupName}</li>
                 <li><strong>Founder:</strong> ${formData.founderName}</li>
                 <li><strong>Email:</strong> ${formData.email}</li>
                 <li><strong>Phone:</strong> ${formData.phone}</li>
                 <li><strong>Stage:</strong> ${formData.stage}</li>
                 <li><strong>Pitch Deck:</strong> ${formData.pitchDeck || 'Not provided'}</li>
               </ul>
               <p><strong>Description:</strong><br/>${formData.description}</p>
               ${contactFooter}`,
      });
    }

    return { success: true };
  } catch (error) {
    console.error('Startup registration error:', error);
    return { success: false, error: 'Failed to submit startup registration. Please try again later.' };
  }
}
