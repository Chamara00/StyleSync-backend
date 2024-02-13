/*
  Warnings:

  - Added the required column `duration` to the `service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `serviceStaff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `serviceStaff` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `service` ADD COLUMN `duration` VARCHAR(191) NOT NULL,
    ADD COLUMN `price` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `servicestaff` ADD COLUMN `duration` VARCHAR(191) NOT NULL,
    ADD COLUMN `price` INTEGER NOT NULL;
