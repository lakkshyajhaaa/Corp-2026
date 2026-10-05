import { prisma } from '../src/lib/db';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL || 'test@test.com';
  const plainPassword = process.env.ADMIN_PASSWORD || 'test';

  const passwordHash = await bcrypt.hash(plainPassword, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      passwordHash,
      role: 'ADMIN',
    },
    create: {
      email,
      passwordHash,
      role: 'ADMIN',
    },
  });

  console.log('Successfully seeded admin user:', user.email, 'with role:', user.role);
}

seedAdmin()
  .catch((e) => {
    console.error('Error seeding admin user:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
