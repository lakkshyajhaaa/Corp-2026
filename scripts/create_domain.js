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

resend.domains.create({ name: 'gandmarao.saasforlife.co.in' })
  .then((res) => {
    console.log('Domain created successfully:', res);
  })
  .catch((err) => {
    console.error('Failed to create domain:', err);
  });
