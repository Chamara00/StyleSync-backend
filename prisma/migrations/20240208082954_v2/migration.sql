/*
  Warnings:

  - The primary key for the `breaks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `breaks` on the `breaks` table. All the data in the column will be lost.
  - Added the required column `breakEnd` to the `breaks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `breakId` to the `breaks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `breakStart` to the `breaks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `breaks` DROP PRIMARY KEY,
    DROP COLUMN `breaks`,
    ADD COLUMN `breakEnd` VARCHAR(191) NOT NULL,
    ADD COLUMN `breakId` INTEGER NOT NULL,
    ADD COLUMN `breakStart` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`salonId`, `dayName`, `breakId`);

-- AlterTable
ALTER TABLE `opendays` MODIFY `closeHour` VARCHAR(191) NULL,
    MODIFY `openHour` VARCHAR(191) NULL;
