/*
  Warnings:

  - The primary key for the `allServices` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "allServices" DROP CONSTRAINT "allServices_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "allServices_pkey" PRIMARY KEY ("id");
