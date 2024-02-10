/*
  Warnings:

  - The primary key for the `breaks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `breakId` on the `breaks` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `breaks_dayName_fkey` ON `breaks`;

-- AlterTable
ALTER TABLE `breaks` DROP PRIMARY KEY,
    DROP COLUMN `breakId`,
    ADD PRIMARY KEY (`salonId`, `dayName`, `breakStart`);
