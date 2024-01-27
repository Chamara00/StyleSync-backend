/*
  Warnings:

  - A unique constraint covering the columns `[contactNo]` on the table `salon` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `salon_contactNo_key` ON `salon`(`contactNo`);
