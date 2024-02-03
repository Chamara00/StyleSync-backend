/*
  Warnings:

  - You are about to drop the `salonopendays` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `salonopendays` DROP FOREIGN KEY `salonOpenDays_salonId_fkey`;

-- DropTable
DROP TABLE `salonopendays`;

-- CreateTable
CREATE TABLE `openDays` (
    `dayName` VARCHAR(191) NOT NULL,
    `openStatus` BOOLEAN NOT NULL,
    `openHours` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`dayName`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `salonOpenDay` (
    `salonId` INTEGER NOT NULL,
    `dayName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`salonId`, `dayName`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `salonOpenDay` ADD CONSTRAINT `salonOpenDay_salonId_fkey` FOREIGN KEY (`salonId`) REFERENCES `salon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `salonOpenDay` ADD CONSTRAINT `salonOpenDay_dayName_fkey` FOREIGN KEY (`dayName`) REFERENCES `openDays`(`dayName`) ON DELETE RESTRICT ON UPDATE CASCADE;
