/*
  Warnings:

  - Added the required column `emailVerified` to the `salon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "salon" ADD COLUMN     "emailVerified" BOOLEAN NOT NULL;
