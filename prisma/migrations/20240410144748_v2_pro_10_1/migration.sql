/*
  Warnings:

  - The primary key for the `breaks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `salonId` on the `breaks` table. All the data in the column will be lost.
  - The primary key for the `openDays` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `salonId` on the `openDays` table. All the data in the column will be lost.
  - Added the required column `staffId` to the `breaks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `staffId` to the `openDays` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "breaks" DROP CONSTRAINT "breaks_salonId_dayName_fkey";

-- DropForeignKey
ALTER TABLE "openDays" DROP CONSTRAINT "openDays_salonId_fkey";

-- AlterTable
ALTER TABLE "breaks" DROP CONSTRAINT "breaks_pkey",
DROP COLUMN "salonId",
ADD COLUMN     "staffId" INTEGER NOT NULL,
ADD CONSTRAINT "breaks_pkey" PRIMARY KEY ("staffId", "dayName", "breakStart");

-- AlterTable
ALTER TABLE "openDays" DROP CONSTRAINT "openDays_pkey",
DROP COLUMN "salonId",
ADD COLUMN     "staffId" INTEGER NOT NULL,
ADD CONSTRAINT "openDays_pkey" PRIMARY KEY ("staffId", "dayName");

-- AddForeignKey
ALTER TABLE "openDays" ADD CONSTRAINT "openDays_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "breaks" ADD CONSTRAINT "breaks_staffId_dayName_fkey" FOREIGN KEY ("staffId", "dayName") REFERENCES "openDays"("staffId", "dayName") ON DELETE RESTRICT ON UPDATE CASCADE;
