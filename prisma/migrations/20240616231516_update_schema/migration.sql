/*
  Warnings:

  - You are about to drop the column `banco` on the `RegraEspecie21` table. All the data in the column will be lost.
  - You are about to drop the column `regraGeral` on the `RegraEspecie21` table. All the data in the column will be lost.
  - You are about to drop the column `banco` on the `RegraEspecie32` table. All the data in the column will be lost.
  - You are about to drop the column `regraGeral` on the `RegraEspecie32` table. All the data in the column will be lost.
  - You are about to drop the column `maxTed` on the `RegraLimiteIdade` table. All the data in the column will be lost.
  - You are about to drop the column `minTed` on the `RegraLimiteIdade` table. All the data in the column will be lost.
  - You are about to drop the column `obs` on the `RegraLimiteIdade` table. All the data in the column will be lost.
  - You are about to drop the column `prazoMaximo` on the `RegraLimiteIdade` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RegraEspecie21" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "idade" TEXT,
    "duracao" TEXT
);
INSERT INTO "new_RegraEspecie21" ("createdAt", "duracao", "id", "idade", "updatedAt") SELECT "createdAt", "duracao", "id", "idade", "updatedAt" FROM "RegraEspecie21";
DROP TABLE "RegraEspecie21";
ALTER TABLE "new_RegraEspecie21" RENAME TO "RegraEspecie21";
CREATE TABLE "new_RegraEspecie32" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "idade" TEXT,
    "duracao" TEXT
);
INSERT INTO "new_RegraEspecie32" ("createdAt", "duracao", "id", "idade", "updatedAt") SELECT "createdAt", "duracao", "id", "idade", "updatedAt" FROM "RegraEspecie32";
DROP TABLE "RegraEspecie32";
ALTER TABLE "new_RegraEspecie32" RENAME TO "RegraEspecie32";
CREATE TABLE "new_RegraLimiteIdade" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "banco" TEXT,
    "idade" TEXT
);
INSERT INTO "new_RegraLimiteIdade" ("banco", "createdAt", "id", "idade", "updatedAt") SELECT "banco", "createdAt", "id", "idade", "updatedAt" FROM "RegraLimiteIdade";
DROP TABLE "RegraLimiteIdade";
ALTER TABLE "new_RegraLimiteIdade" RENAME TO "RegraLimiteIdade";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
