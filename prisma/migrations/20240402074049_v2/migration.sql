/*
  Warnings:

  - You are about to drop the column `date` on the `timeBlocks` table. All the data in the column will be lost.
  - Changed the type of `EndTime` on the `timeBlocks` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `StartTime` on the `timeBlocks` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "timeBlocks" DROP COLUMN "date",
DROP COLUMN "EndTime",
ADD COLUMN     "EndTime" TIMESTAMP(3) NOT NULL,
DROP COLUMN "StartTime",
ADD COLUMN     "StartTime" TIMESTAMP(3) NOT NULL;
