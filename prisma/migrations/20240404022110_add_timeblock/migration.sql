-- CreateTable
CREATE TABLE "timeBlocks" (
    "id" SERIAL NOT NULL,
    "StartTime" TIMESTAMP(3) NOT NULL,
    "EndTime" TIMESTAMP(3) NOT NULL,
    "IsBook" BOOLEAN NOT NULL,
    "duration" INTEGER NOT NULL,
    "staffId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,

    CONSTRAINT "timeBlocks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "timeBlocks" ADD CONSTRAINT "timeBlocks_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timeBlocks" ADD CONSTRAINT "timeBlocks_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_TimeBlockId_fkey" FOREIGN KEY ("TimeBlockId") REFERENCES "timeBlocks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
