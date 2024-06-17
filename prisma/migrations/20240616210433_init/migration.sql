/*
  Warnings:

  - You are about to drop the `AnalysisResult` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AnalysisResult";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "MinimoParcelas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "banco" TEXT,
    "regraGeralMinimo" TEXT,
    "bancosQueNaoPortam" TEXT
);

-- CreateTable
CREATE TABLE "RegraEspecie32" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "banco" TEXT,
    "regraGeral" TEXT
);

-- CreateTable
CREATE TABLE "RegraEspecie21" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "banco" TEXT,
    "regraGeral" TEXT
);

-- CreateTable
CREATE TABLE "RegraRefinanciamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "banco" TEXT,
    "minPmtsPagas" TEXT,
    "juncaoParcela" TEXT,
    "agregaMargem" TEXT,
    "margemNegativa" TEXT
);

-- CreateTable
CREATE TABLE "RegraLimiteIdade" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "banco" TEXT,
    "idade" TEXT,
    "prazoMaximo" TEXT,
    "maxTed" TEXT,
    "minTed" TEXT
);
