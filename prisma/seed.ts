import { PrismaClient } from '@prisma/client';
import bycrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bycrypt.hash('prince3231', 10);
  await prisma.user.create({
    data: {
      username: 'hubert',
      email: 'hubert@email.com',
      image_url: '',
      password: hashedPassword,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
