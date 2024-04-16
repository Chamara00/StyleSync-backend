/*
  Warnings:

  - You are about to drop the `timeBlocks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "appointment" DROP CONSTRAINT "appointment_TimeBlockId_fkey";

-- DropForeignKey
ALTER TABLE "timeBlocks" DROP CONSTRAINT "timeBlocks_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "timeBlocks" DROP CONSTRAINT "timeBlocks_staffId_fkey";

-- DropTable
DROP TABLE "timeBlocks";
