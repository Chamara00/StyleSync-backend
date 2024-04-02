/*
  Warnings:

  - You are about to drop the column `customerId` on the `timeBlocks` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "timeBlocks" DROP CONSTRAINT "timeBlocks_customerId_fkey";

-- AlterTable
ALTER TABLE "timeBlocks" DROP COLUMN "customerId";
