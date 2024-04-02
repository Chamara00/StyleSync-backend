/*
  Warnings:

  - Added the required column `customerId` to the `timeBlocks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "timeBlocks" ADD COLUMN     "customerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "timeBlocks" ADD CONSTRAINT "timeBlocks_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
