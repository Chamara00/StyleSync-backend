/*
  Warnings:

  - The primary key for the `timeBlocks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `EndTime` on the `timeBlocks` table. All the data in the column will be lost.
  - You are about to drop the column `IsBook` on the `timeBlocks` table. All the data in the column will be lost.
  - You are about to drop the column `StartTime` on the `timeBlocks` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `timeBlocks` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `timeBlocks` table. All the data in the column will be lost.
  - You are about to drop the column `serviceId` on the `timeBlocks` table. All the data in the column will be lost.
  - You are about to drop the `appointment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dayName` to the `timeBlocks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `timeBlocks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `timeBlocks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "appointment" DROP CONSTRAINT "appointment_TimeBlockId_fkey";

-- DropForeignKey
ALTER TABLE "appointment" DROP CONSTRAINT "appointment_customerId_fkey";

-- DropForeignKey
ALTER TABLE "timeBlocks" DROP CONSTRAINT "timeBlocks_serviceId_fkey";

-- AlterTable
ALTER TABLE "timeBlocks" DROP CONSTRAINT "timeBlocks_pkey",
DROP COLUMN "EndTime",
DROP COLUMN "IsBook",
DROP COLUMN "StartTime",
DROP COLUMN "duration",
DROP COLUMN "id",
DROP COLUMN "serviceId",
ADD COLUMN     "dayName" TEXT NOT NULL,
ADD COLUMN     "endTime" TEXT NOT NULL,
ADD COLUMN     "startTime" TEXT NOT NULL,
ADD CONSTRAINT "timeBlocks_pkey" PRIMARY KEY ("staffId", "startTime", "dayName");

-- DropTable
DROP TABLE "appointment";

-- CreateTable
CREATE TABLE "appointmentBlock" (
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "staffId" INTEGER NOT NULL,
    "isBook" BOOLEAN NOT NULL,

    CONSTRAINT "appointmentBlock_pkey" PRIMARY KEY ("date","startTime","staffId")
);

-- CreateTable
CREATE TABLE "customerAppointmentBlock" (
    "customerId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TEXT NOT NULL,
    "staffId" INTEGER NOT NULL,
    "isCancel" BOOLEAN NOT NULL,

    CONSTRAINT "customerAppointmentBlock_pkey" PRIMARY KEY ("customerId","date","startTime","staffId")
);

-- CreateTable
CREATE TABLE "serviceAppointmentBlock" (
    "serviceId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TEXT NOT NULL,
    "staffId" INTEGER NOT NULL,

    CONSTRAINT "serviceAppointmentBlock_pkey" PRIMARY KEY ("serviceId","date","startTime","staffId")
);

-- AddForeignKey
ALTER TABLE "appointmentBlock" ADD CONSTRAINT "appointmentBlock_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customerAppointmentBlock" ADD CONSTRAINT "customerAppointmentBlock_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customerAppointmentBlock" ADD CONSTRAINT "customerAppointmentBlock_date_startTime_staffId_fkey" FOREIGN KEY ("date", "startTime", "staffId") REFERENCES "appointmentBlock"("date", "startTime", "staffId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "serviceAppointmentBlock" ADD CONSTRAINT "serviceAppointmentBlock_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "serviceAppointmentBlock" ADD CONSTRAINT "serviceAppointmentBlock_date_startTime_staffId_fkey" FOREIGN KEY ("date", "startTime", "staffId") REFERENCES "appointmentBlock"("date", "startTime", "staffId") ON DELETE RESTRICT ON UPDATE CASCADE;
