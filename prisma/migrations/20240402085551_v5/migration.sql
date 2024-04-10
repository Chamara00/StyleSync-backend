/*
  Warnings:

  - Made the column `EndTime` on table `timeBlocks` required. This step will fail if there are existing NULL values in that column.
  - Made the column `StartTime` on table `timeBlocks` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "timeBlocks" ALTER COLUMN "EndTime" SET NOT NULL,
ALTER COLUMN "StartTime" SET NOT NULL;
