//verify-limite-idade.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { idade } = req.body;

  const regras = await prisma.regraLimiteIdade.findMany();

  const bancosElegiveis = regras
    .filter((regra) => {
      if (!regra.idade) return false;
      const [minIdade, maxIdade] = regra.idade.split(' A ').map(Number);
      return idade >= minIdade && idade <= maxIdade;
    })
    .map((regra) => regra.banco);

  if (bancosElegiveis.length > 0) {
    res.status(200).json({ mensagem: 'Preenche os requisitos do limite de idade' });
  } else {
    res.status(200).json({ mensagem: 'Não preenche os requisitos do limite de idade' });
  }
};

export default handler;
