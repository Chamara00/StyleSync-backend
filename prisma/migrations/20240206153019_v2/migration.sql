-- CreateTable
CREATE TABLE `breaks` (
    `salonId` INTEGER NOT NULL,
    `dayName` VARCHAR(191) NOT NULL,
    `breaks` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`salonId`, `dayName`, `breaks`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `breaks` ADD CONSTRAINT `breaks_salonId_fkey` FOREIGN KEY (`salonId`) REFERENCES `salon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `breaks` ADD CONSTRAINT `breaks_dayName_fkey` FOREIGN KEY (`dayName`) REFERENCES `openDays`(`dayName`) ON DELETE RESTRICT ON UPDATE CASCADE;
