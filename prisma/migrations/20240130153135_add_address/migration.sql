/*
  Warnings:

  - You are about to drop the column `adrress` on the `salon` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `salon` DROP COLUMN `adrress`,
    ADD COLUMN `addressId` INTEGER NULL;

-- CreateTable
CREATE TABLE `address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `line1` VARCHAR(191) NOT NULL,
    `iine2` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `salon` ADD CONSTRAINT `salon_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `address`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
