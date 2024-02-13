/*
  Warnings:

  - The primary key for the `service` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `servicestaff` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `serviceName` on the `servicestaff` table. All the data in the column will be lost.
  - You are about to drop the column `serviceName` on the `timeblock` table. All the data in the column will be lost.
  - Added the required column `id` to the `service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceId` to the `serviceStaff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceId` to the `timeBlock` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `servicestaff` DROP FOREIGN KEY `serviceStaff_serviceName_fkey`;

-- DropForeignKey
ALTER TABLE `timeblock` DROP FOREIGN KEY `timeBlock_serviceName_fkey`;

-- AlterTable
ALTER TABLE `service` DROP PRIMARY KEY,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `servicestaff` DROP PRIMARY KEY,
    DROP COLUMN `serviceName`,
    ADD COLUMN `serviceId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`serviceId`, `staffId`);

-- AlterTable
ALTER TABLE `timeblock` DROP COLUMN `serviceName`,
    ADD COLUMN `serviceId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `timeBlock` ADD CONSTRAINT `timeBlock_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `serviceStaff` ADD CONSTRAINT `serviceStaff_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
