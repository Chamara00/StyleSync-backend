/*
  Warnings:

  - You are about to drop the column `openDay` on the `salon` table. All the data in the column will be lost.
  - You are about to drop the column `openTime` on the `salon` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `salon` DROP COLUMN `openDay`,
    DROP COLUMN `openTime`;

-- CreateTable
CREATE TABLE `salonOpenDays` (
    `salonId` INTEGER NOT NULL,
    `openDays` VARCHAR(191) NOT NULL,
    `openHours` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`salonId`, `openDays`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `salonOpenDays` ADD CONSTRAINT `salonOpenDays_salonId_fkey` FOREIGN KEY (`salonId`) REFERENCES `salon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
