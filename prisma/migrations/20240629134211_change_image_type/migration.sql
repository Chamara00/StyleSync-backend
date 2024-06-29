/*
  Warnings:

  - You are about to drop the column `imagePath` on the `salon` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "customer" ALTER COLUMN "image" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "salon" DROP COLUMN "imagePath",
ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "staff" ALTER COLUMN "image" SET DATA TYPE TEXT;
