/*
  Warnings:

  - You are about to drop the column `token` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "token",
ADD COLUMN     "connectedAccounts" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "isMain" BOOLEAN NOT NULL DEFAULT true;
