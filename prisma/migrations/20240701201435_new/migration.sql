/*
  Warnings:

  - The primary key for the `appointmentBlock` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `customerAppointmentBlock` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `serviceAppointmentBlock` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `bookingTime` to the `appointmentBlock` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `date` on the `appointmentBlock` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `isReject` to the `customerAppointmentBlock` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `date` on the `customerAppointmentBlock` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `date` on the `serviceAppointmentBlock` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "customerAppointmentBlock" DROP CONSTRAINT "customerAppointmentBlock_date_startTime_staffId_fkey";

-- DropForeignKey
ALTER TABLE "serviceAppointmentBlock" DROP CONSTRAINT "serviceAppointmentBlock_date_startTime_staffId_fkey";

-- AlterTable
ALTER TABLE "appointmentBlock" DROP CONSTRAINT "appointmentBlock_pkey",
ADD COLUMN     "bookingTime" TIMESTAMP(3) NOT NULL,
DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "appointmentBlock_pkey" PRIMARY KEY ("date", "startTime", "staffId");

-- AlterTable
ALTER TABLE "customerAppointmentBlock" DROP CONSTRAINT "customerAppointmentBlock_pkey",
ADD COLUMN     "isReject" BOOLEAN NOT NULL,
DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "customerAppointmentBlock_pkey" PRIMARY KEY ("customerId", "date", "startTime", "staffId");

-- AlterTable
ALTER TABLE "serviceAppointmentBlock" DROP CONSTRAINT "serviceAppointmentBlock_pkey",
DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "serviceAppointmentBlock_pkey" PRIMARY KEY ("serviceId", "date", "startTime", "staffId");

-- AddForeignKey
ALTER TABLE "customerAppointmentBlock" ADD CONSTRAINT "customerAppointmentBlock_date_startTime_staffId_fkey" FOREIGN KEY ("date", "startTime", "staffId") REFERENCES "appointmentBlock"("date", "startTime", "staffId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "serviceAppointmentBlock" ADD CONSTRAINT "serviceAppointmentBlock_date_startTime_staffId_fkey" FOREIGN KEY ("date", "startTime", "staffId") REFERENCES "appointmentBlock"("date", "startTime", "staffId") ON DELETE RESTRICT ON UPDATE CASCADE;
