/*
  Warnings:

  - You are about to drop the column `addressId` on the `salon` table. All the data in the column will be lost.
  - You are about to drop the `address` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `salon` DROP FOREIGN KEY `salon_addressId_fkey`;

-- AlterTable
ALTER TABLE `salon` DROP COLUMN `addressId`,
    ADD COLUMN `city` VARCHAR(191) NULL,
    ADD COLUMN `country` VARCHAR(191) NULL,
    ADD COLUMN `line1` VARCHAR(191) NULL,
    ADD COLUMN `line2` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `address`;
