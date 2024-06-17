//verify-especie21.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { idade } = req.body;

  // Verifica a regra específica para espécie 21
  const regra = await prisma.regraEspecie21.findFirst({
    where: {
      idade: {
        equals: idade <= 21 ? '< 21 anos' :
                idade <= 26 ? '21< idade ≤26' :
                idade <= 29 ? '27< idade ≤ 29' :
                idade <= 40 ? '30< idade ≤ 40' :
                idade <= 43 ? '41< idade ≤ 43' : '> 44'
      },
    },
  });

  if (!regra) {
    return res.status(404).json({ mensagem: 'Regra não encontrada' });
  }

  const mensagem = idade > 44 ? 'Vitalício' : regra.duracao;
  res.status(200).json({ mensagem });
};

export default handler;
