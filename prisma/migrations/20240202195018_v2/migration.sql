/*
  Warnings:

  - The primary key for the `salonopendays` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `openDays` on the `salonopendays` table. All the data in the column will be lost.
  - Added the required column `dayName` to the `salonOpenDays` table without a default value. This is not possible if the table is not empty.
  - Added the required column `openStatus` to the `salonOpenDays` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `salonopendays` DROP PRIMARY KEY,
    DROP COLUMN `openDays`,
    ADD COLUMN `dayName` VARCHAR(191) NOT NULL,
    ADD COLUMN `openStatus` BOOLEAN NOT NULL,
    ADD PRIMARY KEY (`salonId`, `dayName`);
