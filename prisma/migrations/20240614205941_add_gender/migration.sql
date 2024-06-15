-- CreateTable
CREATE TABLE "salon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "location" TEXT,
    "line1" TEXT,
    "line2" TEXT,
    "city" TEXT,
    "country" TEXT,
    "password" TEXT,
    "username" TEXT,
    "contactNo" TEXT NOT NULL,
    "otp" TEXT,
    "emailVerified" BOOLEAN,

    CONSTRAINT "salon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "openDays" (
    "staffId" INTEGER NOT NULL,
    "dayName" TEXT NOT NULL,
    "isOpen" BOOLEAN NOT NULL,
    "openHour" TEXT,
    "closeHour" TEXT,

    CONSTRAINT "openDays_pkey" PRIMARY KEY ("staffId","dayName")
);

-- CreateTable
CREATE TABLE "breaks" (
    "staffId" INTEGER NOT NULL,
    "dayName" TEXT NOT NULL,
    "breakStart" TEXT NOT NULL,
    "breakEnd" TEXT NOT NULL,

    CONSTRAINT "breaks_pkey" PRIMARY KEY ("staffId","dayName","breakStart")
);

-- CreateTable
CREATE TABLE "customer" (
    "id" SERIAL NOT NULL,
    "gender" TEXT,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timeBlocks" (
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "dayName" TEXT NOT NULL,
    "staffId" INTEGER NOT NULL,

    CONSTRAINT "timeBlocks_pkey" PRIMARY KEY ("staffId","startTime","dayName")
);

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
CREATE TABLE "service" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "serviceType" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "duration" TEXT NOT NULL,

    CONSTRAINT "service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review" (
    "id" SERIAL NOT NULL,
    "time" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "customerId" INTEGER NOT NULL,
    "salonId" INTEGER NOT NULL,

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "article" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,
    "salonId" INTEGER NOT NULL,

    CONSTRAINT "article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staff" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,

    CONSTRAINT "staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "serviceStaff" (
    "serviceId" INTEGER NOT NULL,
    "staffId" INTEGER NOT NULL,

    CONSTRAINT "serviceStaff_pkey" PRIMARY KEY ("serviceId","staffId")
);

-- CreateTable
CREATE TABLE "salonStaff" (
    "salonId" INTEGER NOT NULL,
    "staffID" INTEGER NOT NULL,

    CONSTRAINT "salonStaff_pkey" PRIMARY KEY ("salonId","staffID")
);

-- CreateTable
CREATE TABLE "staffContact" (
    "staffId" INTEGER NOT NULL,
    "contactNo" TEXT NOT NULL,

    CONSTRAINT "staffContact_pkey" PRIMARY KEY ("staffId","contactNo")
);

-- CreateTable
CREATE TABLE "allServices" (
    "service" TEXT NOT NULL,
    "serviceType" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "duration" TEXT NOT NULL,

    CONSTRAINT "allServices_pkey" PRIMARY KEY ("service")
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

-- CreateIndex
CREATE UNIQUE INDEX "salon_email_key" ON "salon"("email");

-- CreateIndex
CREATE UNIQUE INDEX "salon_contactNo_key" ON "salon"("contactNo");

-- CreateIndex
CREATE UNIQUE INDEX "customer_email_key" ON "customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "staffContact_contactNo_key" ON "staffContact"("contactNo");

-- AddForeignKey
ALTER TABLE "openDays" ADD CONSTRAINT "openDays_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "breaks" ADD CONSTRAINT "breaks_staffId_dayName_fkey" FOREIGN KEY ("staffId", "dayName") REFERENCES "openDays"("staffId", "dayName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timeBlocks" ADD CONSTRAINT "timeBlocks_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointmentBlock" ADD CONSTRAINT "appointmentBlock_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_salonId_fkey" FOREIGN KEY ("salonId") REFERENCES "salon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article" ADD CONSTRAINT "article_salonId_fkey" FOREIGN KEY ("salonId") REFERENCES "salon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "serviceStaff" ADD CONSTRAINT "serviceStaff_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "serviceStaff" ADD CONSTRAINT "serviceStaff_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salonStaff" ADD CONSTRAINT "salonStaff_salonId_fkey" FOREIGN KEY ("salonId") REFERENCES "salon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salonStaff" ADD CONSTRAINT "salonStaff_staffID_fkey" FOREIGN KEY ("staffID") REFERENCES "staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staffContact" ADD CONSTRAINT "staffContact_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customerAppointmentBlock" ADD CONSTRAINT "customerAppointmentBlock_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customerAppointmentBlock" ADD CONSTRAINT "customerAppointmentBlock_date_startTime_staffId_fkey" FOREIGN KEY ("date", "startTime", "staffId") REFERENCES "appointmentBlock"("date", "startTime", "staffId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "serviceAppointmentBlock" ADD CONSTRAINT "serviceAppointmentBlock_date_startTime_staffId_fkey" FOREIGN KEY ("date", "startTime", "staffId") REFERENCES "appointmentBlock"("date", "startTime", "staffId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "serviceAppointmentBlock" ADD CONSTRAINT "serviceAppointmentBlock_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
