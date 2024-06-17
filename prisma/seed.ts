const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Apagar dados antigos
  await prisma.minimoParcelas.deleteMany();
  await prisma.regraEspecie32.deleteMany();
  await prisma.regraEspecie21.deleteMany();
  await prisma.regraRefinanciamento.deleteMany();
  await prisma.regraLimiteIdade.deleteMany();

  // Inserir novos dados

  // Dados da planilha "MÍNIMO DE PARCELAS PARA PORTAR"
  await prisma.minimoParcelas.createMany({
    data: [
      {
        banco: "BANRISUL",
        regraGeralMinimo: "Regra geral: 0** parcelas pagas \n● Inbursa ( 012 ) 3 pagas \n● Pan (623) 15 pagas \n● Safra (422 ) 12 pagas",
        bancosQueNaoPortam: "Portam todos que estão na CIP com exceção de: \n● Barigui (330) \n● Digio (335)",
      },
      {
        banco: "BMG",
        regraGeralMinimo: "Regra Geral: 01 Parcela paga \n● Daycoval (707) 15 pagas \n● Safra (422) 12 pagas",
        bancosQueNaoPortam: "● Agibank (121) \n● Facta (149/935) \n● Olé (033) \n● Itaú BBA (184) \n● Mercantil (389)",
      },
      {
        banco: "BRADESCO",
        regraGeralMinimo: "Regra geral: 12 parcelas pagas",
        bancosQueNaoPortam: "Portam todos que estão na CIP.",
      },
      {
        banco: "CREFISA",
        regraGeralMinimo: "Para saldos entre R$1.000,00 e R$3.000,00 - 0** Parcelas pagas. \nPara saldos superiores a esse valor, necessário 03 parcelas pagas",
        bancosQueNaoPortam: "Portam todos que estão na CIP.",
      },
      {
        banco: "CETELEM",
        regraGeralMinimo: "SUSPENSO",
        bancosQueNaoPortam: "SUSPENSO",
      },
      {
        banco: "C6",
        regraGeralMinimo: "Regra Geral: 0** parcelas pagas \n● Facta (149/935) 24 pagas \n● Inbursa (012) 19 pagas \n● Safra (422) \n● Pan (623) 18 Pagas",
        bancosQueNaoPortam: "● Agibank ( 121 ) \n● Daycoval ( 707 )",
      },
      {
        banco: "DAYCOVAL",
        regraGeralMinimo: "● Regra geral: 0** pagas \n● Bancos de Rede - 06 pagas \n● Facta (149/935) - 24 pagas \n● Agibank (121) - 15 pagas \n● Pan (623) e Inbursa (021) - 12 pagas",
        bancosQueNaoPortam: "● Safra ( 422 ) \n● C6 ( 626 / 336 )",
      },
      {
        banco: "FACTA FINANCEIRA",
        regraGeralMinimo: "Regra Geral: 0** parcelas pagas \n● Pan (623) 30 Pagas \n● DAYCOVAL(707) \n● C6 (336/626) e ● SANTANDER(033) 24 Pagas \n● Paraná(254) e Agibank (121) 15 pagas \n● BMG(318) 12 pagas",
        bancosQueNaoPortam: "● Socicred ( 917 ) \n● Zema (359) \n● Paulista (611) - Se originado pela Facta \n● Inbursa ( 012 ) \n● BRB ( 070 ) \n● PINE ( 643 )",
      },
      {
        banco: "ITAÚ CONSIGNADO",
        regraGeralMinimo: "● Bancos de rede: 0** pagas \n● Bancos de origem Corban: 360 dias da data de averbação \n● Facta ( 149/935 ) 14 pagas",
        bancosQueNaoPortam: "Portam todos que estão na CIP.",
      },
      {
        banco: "INBURSA",
        regraGeralMinimo: "Regra geral: 04 parcelas pagas \n● C6 (336/626) 19 pagas \n● Pan (623) \n● Agibank (121) e Daycoval ( 707 ) 13 pagas",
        bancosQueNaoPortam: "● Facta ( 149 / 935 ) \n● Safra ( 422 ) \n● Banco Alfa e Financeira ( 025 / 927 )",
      },
      {
        banco: "MÁXIMA",
        regraGeralMinimo: "SUSPENSO",
        bancosQueNaoPortam: "SUSPENSO",
      },
      {
        banco: "SANTANDER / OLÉ",
        regraGeralMinimo: "Regra geral Santander: 12 parcelas pagas. Regra geral Olé Consignado: 0** parcelas pagas.",
        bancosQueNaoPortam: "Portam todos que estão na CIP.",
      },
      {
        banco: "PAN",
        regraGeralMinimo: "Regra geral: 0** parcelas pagas \n● Facta ( 149/935 ) 30 Pagas \n● C6 (623/336) 18 Pagas \n● Itau (029/341) \n● Safra (422) 15 Pagas \n● Daycoval (707) \n● Inbursa (012) \n● Zema ( 359 ) 12 Pagas",
        bancosQueNaoPortam: "● Máxima ( 243 ) \n● Agibank (121)",
      },
      {
        banco: "PARANÁ",
        regraGeralMinimo: "Regra geral: 12 parcelas pagas.",
        bancosQueNaoPortam: "● Facta (149/935) \n● Barigui (330/914/999)",
      },
      {
        banco: "PAGBANK",
        regraGeralMinimo: "Regra geral: 12 parcelas pagas.",
        bancosQueNaoPortam: "Portam todos que estão na CIP.",
      },
      {
        banco: "SAFRA",
        regraGeralMinimo: "Regra geral: 0** parcelas pagas \n● C6 (623/336) 18 pagas \n● Pan ( 623 ) 15 Pagas \n● Banrisul ( 041 ) 12 Pagas",
        bancosQueNaoPortam: "● Daycoval (707)",
      },
      {
        banco: "SANTINVEST",
        regraGeralMinimo: "REGRA BANCO: 0** pagas",
        bancosQueNaoPortam: "Portam todos que estão na CIP.",
      },
      {
        banco: "BRB",
        regraGeralMinimo: "Regra geral: 01 parcelas pagas",
        bancosQueNaoPortam: "● Facta ( 149 / 935 ) \n● Banco Pine ( 643 )",
      },
      {
        banco: "HAPPY CONSIG",
        regraGeralMinimo: "Regra geral: 00** parcelas pagas",
        bancosQueNaoPortam: "● Facta(149/935) \n● BRB (070) \n● Agibank (121)",
      },
    ],
  });

  // Dados da planilha "REGRA ESPECIE 32 Aposentadoria por invalidez previdenciária"
  await prisma.regraEspecie32.createMany({
    data: [
      { idade: '> 59 anos', duracao: 'SEM REGRAS' },
      { idade: '< 60', duracao: '15 anos de carta de concessão' },
    ],
  });

  // Dados da planilha "REGRA ESPECIE 21 - Pensão por morte previdenciária"
  await prisma.regraEspecie21.createMany({
    data: [
      { idade: '< 21 anos', duracao: '3 anos' },
      { idade: '21< idade ≤26', duracao: '6 anos' },
      { idade: '27< idade ≤ 29', duracao: '10 anos' },
      { idade: '30< idade ≤ 40', duracao: '15 anos' },
      { idade: '41< idade ≤ 43', duracao: '20 anos' },
      { idade: '> 44', duracao: 'Vitalício' },
    ],
  });

  // Dados da planilha "REGRA PARA REFINANCIAMENTO"
  await prisma.regraRefinanciamento.createMany({
    data: [
      {
        banco: "BANRISUL",
        minPmtsPagas: "OPERAÇÃO DE MIN DE 5 MIL – MIN 5 PAGAS. OS DEMAIS - MÍN DE 10 PAGAS.",
        juncaoParcela: "ATÉ 3 CONTRATOS DE UMA UNICA VEZ",
        agregaMargem: "SIM, DESDE QUE O CLIENTE POSSUIA 1 LINHA DISPONIVEL P/ DESCONTO EMPRESTIMO",
        margemNegativa: "PERMITIDO",
      },
      {
        banco: "BMG",
        minPmtsPagas: "MÍN. 06 PMT PAGAS",
        juncaoParcela: "NÃO PERMITIDO",
        agregaMargem: "PERMITIDO",
        margemNegativa: "SIM, APÓS O RETORNO DO ARQUIVO INSS, AJUSTADO AUTOMATICAMENTE",
      },
      {
        banco: "BRADESCO",
        minPmtsPagas: "A PARTIR DE 0 PAGAS.",
        juncaoParcela: "PERMITIDO, PRODUTO 85",
        agregaMargem: "PRODUTO 85 AGREGAR NO MÍNIMO 8 PARCELAS.",
        margemNegativa: "PERMITIDO",
      },
      {
        banco: "CREFISA",
        minPmtsPagas: "REFIN INDISPONÍVEL",
        juncaoParcela: "REFIN INDISPONÍVEL",
        agregaMargem: "REFIN INDISPONÍVEL",
        margemNegativa: "REFIN INDISPONÍVEL",
      },
      {
        banco: "CETELEM",
        minPmtsPagas: "MÍN 03 PAGAS",
        juncaoParcela: "NÃO PERMITIDO",
        agregaMargem: "PERMITIDO",
        margemNegativa: "PERMITIDO",
      },
      {
        banco: "C6",
        minPmtsPagas: "MÍN. 06 PAGAS NOS PRAZOS DE 84x OU 7% NOS DEMAIS PRAZOS",
        juncaoParcela: "PERMITIDO",
        agregaMargem: "PERMITIDO",
        margemNegativa: "PERMITIDO",
      },
      {
        banco: "DAYCOVAL",
        minPmtsPagas: "MÍN. 03 PAGAS",
        juncaoParcela: "PERMITIDO",
        agregaMargem: "PERMITIDO",
        margemNegativa: "PERMITIDO",
      },
      {
        banco: "FACTA FINANCEIRA",
        minPmtsPagas: "SEM MÍNIMO DE PAGAS. Liquido mínimo refin: R$250,00.",
        juncaoParcela: "NÃO PERMITIDO",
        agregaMargem: "PERMITIDO. Mínimo de 30,00 de margem.",
        margemNegativa: "NÃO PERMITIDO",
      },
      {
        banco: "ITAÚ CONSIGNADO",
        minPmtsPagas: "7% DE PARCELAS PAGAS",
        juncaoParcela: "NÃO PERMITIDO",
        agregaMargem: "PERMITIDO",
        margemNegativa: "PERMITIDO",
      },
      {
        banco: "INBURSA",
        minPmtsPagas: "A PARTIR DE 0 PAGAS",
        juncaoParcela: "PERMITIDO",
        agregaMargem: "PERMITIDO",
        margemNegativa: "NÃO PERMITE",
      },
      {
        banco: "SANTANDER / OLÉ",
        minPmtsPagas: "MIN 01 PAGA",
        juncaoParcela: "PERMITIDO",
        agregaMargem: "PERMITIDO",
        margemNegativa: "PERMITIDO",
      },
      {
        banco: "PAN",
        minPmtsPagas: "INDEPENTE, DESDE TEM QUE ACRESCENTE 12 OU 18 PMTS NO NOVO CONTRATO",
        juncaoParcela: "PERMITIDO",
        agregaMargem: "PERMITIDO",
        margemNegativa: "PERMITIDO",
      },
      {
        banco: "PARANÁ",
        minPmtsPagas: "ZERO PAGAS",
        juncaoParcela: "PERMITIDO",
        agregaMargem: "PERMITIDO PARA CLIENTES COM 09 LINHAS",
        margemNegativa: "SIM, COM REGRAS FINAIS 05, 14,15,16,17,18,32,33,34,81,94 E 95",
      },
      {
        banco: "PAGBANK",
        minPmtsPagas: "APÓS 15% PAGAS",
        juncaoParcela: "PERMITIDO",
        agregaMargem: "PERMITIDO",
        margemNegativa: "PERMITIDO",
      },
    ],
  });

  // Dados da planilha "REGRA PARA LIMITE DE IDADE"
  await prisma.regraLimiteIdade.createMany({
    data: [
      { banco: 'BANRISUL', idade: '18 A 79' },
      { banco: 'BMG', idade: '22 a 79' },
      { banco: 'BRADESCO', idade: '21 a 70' },
      { banco: 'BRB', idade: '21 A 78' },
      { banco: 'CREFISA (com seguro prestamista)', idade: '18 A 81' },
      { banco: 'CREFISA (novo sem seguro portabilidade demais operações)', idade: '18 A 79' },
      { banco: 'C6', idade: '21 A 79' },
      { banco: 'DAYCOVAL', idade: '21 A 79' },
      { banco: 'FACTA FINANCEIRA', idade: '22 A 76' },
      { banco: 'ITAÚ CONSIGNADO', idade: '21 A 77' },
      { banco: 'INBURSA', idade: '22 A 75' },
      { banco: 'SAFRA', idade: '26 A 75' },
      { banco: 'SANTANDER', idade: '18 A 80' },
      { banco: 'OLÉ', idade: '25 A 80' },
      { banco: 'PAGBANK', idade: '18 A 79' },
    ],
  });
}

main()
  .then(() => console.log("Seed data created successfully."))
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
