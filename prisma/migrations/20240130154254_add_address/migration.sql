/*
  Warnings:

  - You are about to drop the column `iine2` on the `address` table. All the data in the column will be lost.
  - Added the required column `line2` to the `address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `address` DROP COLUMN `iine2`,
    ADD COLUMN `line2` VARCHAR(191) NOT NULL;
