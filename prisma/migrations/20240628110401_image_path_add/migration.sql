/*
  Warnings:

  - You are about to drop the column `image` on the `salon` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "salon" DROP COLUMN "image",
ADD COLUMN     "imagePath" TEXT;
