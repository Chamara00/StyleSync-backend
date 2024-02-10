/*
  Warnings:

  - You are about to drop the column `openHours` on the `opendays` table. All the data in the column will be lost.
  - You are about to drop the column `openStatus` on the `opendays` table. All the data in the column will be lost.
  - Added the required column `closeHour` to the `openDays` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isOpen` to the `openDays` table without a default value. This is not possible if the table is not empty.
  - Added the required column `openHour` to the `openDays` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `opendays` DROP COLUMN `openHours`,
    DROP COLUMN `openStatus`,
    ADD COLUMN `closeHour` VARCHAR(191) NOT NULL,
    ADD COLUMN `isOpen` BOOLEAN NOT NULL,
    ADD COLUMN `openHour` VARCHAR(191) NOT NULL;
