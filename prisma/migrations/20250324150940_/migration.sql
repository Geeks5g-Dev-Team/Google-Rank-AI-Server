/*
  Warnings:

  - You are about to drop the column `locations` on the `Business` table. All the data in the column will be lost.
  - Added the required column `location` to the `Business` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Business" DROP COLUMN "locations",
ADD COLUMN     "imagePrompt" TEXT DEFAULT '',
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "phones" TEXT[],
ADD COLUMN     "targetLocations" TEXT[],
ADD COLUMN     "website" TEXT;
