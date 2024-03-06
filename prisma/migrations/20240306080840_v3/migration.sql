/*
  Warnings:

  - You are about to drop the `timeBlock` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "staff" DROP CONSTRAINT "staff_blockId_fkey";

-- DropForeignKey
ALTER TABLE "timeBlock" DROP CONSTRAINT "timeBlock_customerId_fkey";

-- DropForeignKey
ALTER TABLE "timeBlock" DROP CONSTRAINT "timeBlock_serviceId_fkey";

-- DropTable
DROP TABLE "timeBlock";

-- CreateTable
CREATE TABLE "timeBlocks" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "duration" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,

    CONSTRAINT "timeBlocks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "timeBlocks" ADD CONSTRAINT "timeBlocks_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timeBlocks" ADD CONSTRAINT "timeBlocks_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff" ADD CONSTRAINT "staff_blockId_fkey" FOREIGN KEY ("blockId") REFERENCES "timeBlocks"("id") ON DELETE SET NULL ON UPDATE CASCADE;
