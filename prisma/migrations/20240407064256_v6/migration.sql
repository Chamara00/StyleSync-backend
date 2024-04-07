/*
  Warnings:

  - The primary key for the `appointment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `appointment` table. All the data in the column will be lost.
  - You are about to drop the column `isCancle` on the `appointment` table. All the data in the column will be lost.
  - Added the required column `isCancel` to the `appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "appointment" DROP CONSTRAINT "appointment_pkey",
DROP COLUMN "id",
DROP COLUMN "isCancle",
ADD COLUMN     "isCancel" BOOLEAN NOT NULL,
ADD CONSTRAINT "appointment_pkey" PRIMARY KEY ("customerId", "TimeBlockId");
