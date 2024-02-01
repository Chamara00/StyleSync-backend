/*
  Warnings:

  - The primary key for the `salonstaff` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `salonstaff` table. All the data in the column will be lost.
  - The primary key for the `servicestaff` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `servicestaff` table. All the data in the column will be lost.
  - The primary key for the `staffcontact` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `staffcontact` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[contactNo]` on the table `staffContact` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `staff` DROP FOREIGN KEY `staff_blockId_fkey`;

-- AlterTable
ALTER TABLE `salon` MODIFY `openDay` DATETIME(3) NULL,
    MODIFY `openTime` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `salonstaff` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`salonId`, `staffID`);

-- AlterTable
ALTER TABLE `servicestaff` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`serviceId`, `staffId`);

-- AlterTable
ALTER TABLE `staff` MODIFY `blockId` INTEGER NULL;

-- AlterTable
ALTER TABLE `staffcontact` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`staffId`, `contactNo`);

-- CreateIndex
CREATE UNIQUE INDEX `staffContact_contactNo_key` ON `staffContact`(`contactNo`);

-- AddForeignKey
ALTER TABLE `staff` ADD CONSTRAINT `staff_blockId_fkey` FOREIGN KEY (`blockId`) REFERENCES `timeBlock`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
