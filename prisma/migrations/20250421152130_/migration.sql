/*
  Warnings:

  - You are about to drop the column `isMain` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "gmbData" JSONB NOT NULL DEFAULT '{}';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isMain";
