/*
  Warnings:

  - The primary key for the `opendays` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `salonopenday` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `salonId` to the `openDays` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `breaks` DROP FOREIGN KEY `breaks_dayName_fkey`;

-- DropForeignKey
ALTER TABLE `breaks` DROP FOREIGN KEY `breaks_salonId_fkey`;

-- DropForeignKey
ALTER TABLE `salonopenday` DROP FOREIGN KEY `salonOpenDay_dayName_fkey`;

-- DropForeignKey
ALTER TABLE `salonopenday` DROP FOREIGN KEY `salonOpenDay_salonId_fkey`;

-- AlterTable
ALTER TABLE `opendays` DROP PRIMARY KEY,
    ADD COLUMN `salonId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`salonId`, `dayName`);

-- DropTable
DROP TABLE `salonopenday`;

-- AddForeignKey
ALTER TABLE `openDays` ADD CONSTRAINT `openDays_salonId_fkey` FOREIGN KEY (`salonId`) REFERENCES `salon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `breaks` ADD CONSTRAINT `breaks_salonId_dayName_fkey` FOREIGN KEY (`salonId`, `dayName`) REFERENCES `openDays`(`salonId`, `dayName`) ON DELETE RESTRICT ON UPDATE CASCADE;
