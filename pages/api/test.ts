import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Cria um usuário de teste
  const user = await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Test User',
      email: 'testuser@example.com',
    },
  });

  res.status(200).json({ message: 'Usuário garantido no banco de dados', user });
};

export default handler;
