/*
  Warnings:

  - The primary key for the `service` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `service` table. All the data in the column will be lost.
  - The primary key for the `servicestaff` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `serviceId` on the `servicestaff` table. All the data in the column will be lost.
  - You are about to drop the column `serviceId` on the `timeblock` table. All the data in the column will be lost.
  - Added the required column `serviceName` to the `serviceStaff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceName` to the `timeBlock` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `servicestaff` DROP FOREIGN KEY `serviceStaff_serviceId_fkey`;

-- DropForeignKey
ALTER TABLE `timeblock` DROP FOREIGN KEY `timeBlock_serviceId_fkey`;

-- AlterTable
ALTER TABLE `service` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`name`);

-- AlterTable
ALTER TABLE `servicestaff` DROP PRIMARY KEY,
    DROP COLUMN `serviceId`,
    ADD COLUMN `serviceName` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`serviceName`, `staffId`);

-- AlterTable
ALTER TABLE `timeblock` DROP COLUMN `serviceId`,
    ADD COLUMN `serviceName` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `timeBlock` ADD CONSTRAINT `timeBlock_serviceName_fkey` FOREIGN KEY (`serviceName`) REFERENCES `service`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `serviceStaff` ADD CONSTRAINT `serviceStaff_serviceName_fkey` FOREIGN KEY (`serviceName`) REFERENCES `service`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
