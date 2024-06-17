//verify-especie32.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { idade } = req.body;

  const regra = await prisma.regraEspecie32.findFirst({
    where: {
      idade: idade > 59 ? '> 59 anos' : '< 60',
    },
  });

  if (!regra) {
    return res.status(404).json({ mensagem: 'Regra não encontrada' });
  }

  const mensagem = idade > 59 ? 'Preenche os requisitos da espécie 32' : regra.duracao;
  res.status(200).json({ mensagem });
};

export default handler;
