'use server';

import { prisma } from '@/lib/db';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitRegistration(formData: {
  name: string;
  email: string;
  rollNo: string;
  phone: string;
  gender: string;
  events: string[];
  teamDetails?: string; // JSON string
}) {
  try {
    const existingRegistration = await prisma.eventRegistration.findUnique({
      where: { email: formData.email },
    });

    if (existingRegistration) {
      return { success: false, error: 'A registration with this email already exists.' };
    }

    if (formData.events.includes('hr_conclave')) {
      // Find all event registrations
      const allRegs = await prisma.eventRegistration.findMany();
      // Filter those that contain hr_conclave
      const hrCount = allRegs.filter(r => {
        try {
          const events = JSON.parse(r.events || '[]');
          return events.includes('hr_conclave');
        } catch {
          return false;
        }
      }).length;

      if (hrCount >= 850) {
        return { success: false, error: 'HR-Conclave has reached its maximum capacity of 850 passes.' };
      }
    }

    if (formData.events.includes('corpeureka')) {
      const allRegs = await prisma.eventRegistration.findMany();
      let totalCorpEurekaParticipants = 0;

      allRegs.forEach(r => {
        try {
          const events = JSON.parse(r.events || '[]');
          if (events.includes('corpeureka')) {
            totalCorpEurekaParticipants += 1; // The leader
            if (r.teamDetails) {
              const teamData = JSON.parse(r.teamDetails);
              if (teamData.mates && Array.isArray(teamData.mates)) {
                totalCorpEurekaParticipants += teamData.mates.length;
              }
            }
          }
        } catch {
          // ignore parsing errors
        }
      });

      let incomingParticipants = 1; // The leader
      if (formData.teamDetails) {
        try {
          const incomingTeam = JSON.parse(formData.teamDetails);
          if (incomingTeam.mates && Array.isArray(incomingTeam.mates)) {
            incomingParticipants += incomingTeam.mates.length;
          }
        } catch {}
      }

      if (totalCorpEurekaParticipants + incomingParticipants > 220) {
        return { success: false, error: `CorpEureka has only ${Math.max(0, 220 - totalCorpEurekaParticipants)} seats left. Your team size exceeds this capacity.` };
      }
    }

    await prisma.eventRegistration.create({
      data: {
        name: formData.name,
        email: formData.email,
        rollNo: formData.rollNo,
        phone: formData.phone,
        gender: formData.gender,
        events: JSON.stringify(formData.events),
        teamDetails: formData.teamDetails || null,
        status: 'APPROVED',
      },
    });

    // Send confirmation email to the student
    if (process.env.RESEND_API_KEY) {
      const contactFooter = `
        <hr style="margin-top: 30px; border: none; border-top: 1px solid #eee;" />
        <p style="color: #666; font-size: 14px;">
          <strong>Questions? Contact Us:</strong><br />
          Email: gkalra_be25@thapar.edu<br />
          Phone: +91-9671454725
        </p>
      `;

      await resend.emails.send({
        from: 'Prizmora <updates@gandmarao.saasforlife.co.in>', // Replace with your verified domain
        to: [formData.email],
        subject: 'Event Registration Confirmed!',
        html: `<p>Hi ${formData.name},</p><p>Your registration for the following events has been confirmed: <strong>${formData.events.join(', ')}</strong>.</p><p>Your pass is currently APPROVED.</p>${contactFooter}`,
      });

      // Send notification email to the admin
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
      await resend.emails.send({
        from: 'Prizmora <updates@gandmarao.saasforlife.co.in>', // Replace with your verified domain
        to: [adminEmail],
        subject: 'New Student Registration',
        html: `<p>A new student has registered for events.</p>
               <ul>
                 <li><strong>Name:</strong> ${formData.name}</li>
                 <li><strong>Email:</strong> ${formData.email}</li>
                 <li><strong>Roll No:</strong> ${formData.rollNo}</li>
                 <li><strong>Events:</strong> ${formData.events.join(', ')}</li>
               </ul>${contactFooter}`,
      });
    }

    return { success: true };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: 'Failed to submit registration. Please try again later.' };
  }
}
