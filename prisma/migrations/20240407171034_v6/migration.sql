/*
  Warnings:

  - You are about to drop the column `EndTime` on the `timeBlocks` table. All the data in the column will be lost.
  - You are about to drop the column `IsBook` on the `timeBlocks` table. All the data in the column will be lost.
  - You are about to drop the column `StartTime` on the `timeBlocks` table. All the data in the column will be lost.
  - Added the required column `endTime` to the `timeBlocks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isBook` to the `timeBlocks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `timeBlocks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "timeBlocks" DROP COLUMN "EndTime",
DROP COLUMN "IsBook",
DROP COLUMN "StartTime",
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "isBook" BOOLEAN NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;
