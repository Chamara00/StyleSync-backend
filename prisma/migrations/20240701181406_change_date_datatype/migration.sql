/*
  Warnings:

  - The primary key for the `appointmentBlock` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `customerAppointmentBlock` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `serviceAppointmentBlock` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "customerAppointmentBlock" DROP CONSTRAINT "customerAppointmentBlock_date_startTime_staffId_fkey";

-- DropForeignKey
ALTER TABLE "serviceAppointmentBlock" DROP CONSTRAINT "serviceAppointmentBlock_date_startTime_staffId_fkey";

-- AlterTable
ALTER TABLE "appointmentBlock" DROP CONSTRAINT "appointmentBlock_pkey",
ALTER COLUMN "date" SET DATA TYPE TEXT,
ADD CONSTRAINT "appointmentBlock_pkey" PRIMARY KEY ("date", "startTime", "staffId");

-- AlterTable
ALTER TABLE "customerAppointmentBlock" DROP CONSTRAINT "customerAppointmentBlock_pkey",
ALTER COLUMN "date" SET DATA TYPE TEXT,
ADD CONSTRAINT "customerAppointmentBlock_pkey" PRIMARY KEY ("customerId", "date", "startTime", "staffId");

-- AlterTable
ALTER TABLE "serviceAppointmentBlock" DROP CONSTRAINT "serviceAppointmentBlock_pkey",
ALTER COLUMN "date" SET DATA TYPE TEXT,
ADD CONSTRAINT "serviceAppointmentBlock_pkey" PRIMARY KEY ("serviceId", "date", "startTime", "staffId");

-- AddForeignKey
ALTER TABLE "customerAppointmentBlock" ADD CONSTRAINT "customerAppointmentBlock_date_startTime_staffId_fkey" FOREIGN KEY ("date", "startTime", "staffId") REFERENCES "appointmentBlock"("date", "startTime", "staffId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "serviceAppointmentBlock" ADD CONSTRAINT "serviceAppointmentBlock_date_startTime_staffId_fkey" FOREIGN KEY ("date", "startTime", "staffId") REFERENCES "appointmentBlock"("date", "startTime", "staffId") ON DELETE RESTRICT ON UPDATE CASCADE;
