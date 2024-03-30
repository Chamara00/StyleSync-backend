/*
  Warnings:

  - You are about to drop the column `customerId` on the `timeBlocks` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `timeBlocks` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `timeBlocks` table. All the data in the column will be lost.
  - Added the required column `EndTime` to the `timeBlocks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `IsBook` to the `timeBlocks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `StartTime` to the `timeBlocks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "timeBlocks" DROP CONSTRAINT "timeBlocks_customerId_fkey";

-- AlterTable
ALTER TABLE "timeBlocks" DROP COLUMN "customerId",
DROP COLUMN "status",
DROP COLUMN "time",
ADD COLUMN     "EndTime" TEXT NOT NULL,
ADD COLUMN     "IsBook" BOOLEAN NOT NULL,
ADD COLUMN     "StartTime" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "appointment" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "TimeBlockId" INTEGER NOT NULL,
    "isCancle" BOOLEAN NOT NULL,

    CONSTRAINT "appointment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_TimeBlockId_fkey" FOREIGN KEY ("TimeBlockId") REFERENCES "timeBlocks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
