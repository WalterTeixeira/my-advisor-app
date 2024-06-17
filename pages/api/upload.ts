import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import pdf from 'pdf-parse';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const file = await new Promise<Buffer>((resolve, reject) => {
    const data: Buffer[] = [];
    req.on('data', chunk => data.push(chunk));
    req.on('end', () => resolve(Buffer.concat(data)));
    req.on('error', reject);
  });

  if (!file) {
    return res.status(400).json({ error: 'Nenhum arquivo enviado' });
  }

  const data = await pdf(file);

  // Extraindo as informações da página 1
  const firstPageText = data.text.split('\n').slice(0, 100).join('\n');
  const lines = firstPageText.split('\n');

  // Debug: Exibir o conteúdo da primeira página para verificar o formato
  console.log('Conteúdo da primeira página:', firstPageText);

  // Padrões de correspondência para as informações específicas
  const nomeClienteIndex = lines.findIndex((line: string) => line.includes('EMPRÉSTIMO CONSIGNADO'));
  const nomeCliente = nomeClienteIndex !== -1 ? lines[nomeClienteIndex + 1].trim() : null;
  const tipoBeneficioIndex = lines.findIndex((line: string) => line.includes('Benefício'));
  const tipoBeneficio = tipoBeneficioIndex !== -1
    ? lines[tipoBeneficioIndex + 1].replace('Nº Benefício:', '').trim()
    : null;
  const meioIndex = lines.findIndex((line: string) => line.includes('Meio'));
  const meio = meioIndex !== -1 ? lines[meioIndex + 1].trim() : null;
  const liberadoEmprestimo = lines.some((line: string) => line.includes('Liberado para empréstimo')) ? 'Sim' : 'Não';
  const elegivelEmprestimo = lines.some((line: string) => line.includes('Elegível para empréstimos')) ? 'Sim' : 'Não';

  // Extraindo a data de pagamento
  const pagoEmIndex = lines.findIndex((line: string) => line.includes('Pago em'));
  const pagoEm = pagoEmIndex !== -1 ? lines[pagoEmIndex + 1].trim() : 'Não encontrado';

  // Montando o objeto com as informações extraídas
  const extractedInfo = {
    nomeCliente: nomeCliente ? nomeCliente.trim() : 'Não encontrado',
    tipoBeneficio: tipoBeneficio || 'Não encontrado',
    meio: meio || 'Não encontrado',
    liberadoEmprestimo,
    elegivelEmprestimo,
    pagoEm
  };

  // Debug: Exibir as informações extraídas para verificar se estão corretas
  console.log('Informações extraídas:', extractedInfo);

  // Retornando as informações extraídas
  res.status(200).json({ extractedInfo });
};

export default handler;
