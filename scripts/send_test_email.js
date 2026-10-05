import fs from 'fs';
import { Resend } from 'resend';

// Basic .env.local parser
const envFile = fs.readFileSync('.env.local', 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    env[match[1].trim()] = match[2].trim().replace(/^"|"$/g, '');
  }
});

const resend = new Resend(env['RESEND_API_KEY']);

resend.emails.send({
  from: 'Test <updates@gandmarao.saasforlife.co.in>',
  to: ['parthdhimman@gmail.com'],
  subject: 'Test Email from Prizmora',
  html: '<p>This is a test email sent to verify the Resend domain configuration.</p>'
})
.then((res) => {
  console.log('Email sent successfully:', res);
})
.catch((err) => {
  console.error('Failed to send email:', err);
});
