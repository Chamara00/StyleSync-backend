/*
  Warnings:

  - You are about to drop the column `duration` on the `servicestaff` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `servicestaff` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `servicestaff` DROP COLUMN `duration`,
    DROP COLUMN `price`;
