/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `salon` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `salon_email_key` ON `salon`(`email`);
