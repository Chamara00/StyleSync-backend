-- CreateTable
CREATE TABLE `allServices` (
    `service` VARCHAR(191) NOT NULL,
    `serviceType` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`service`, `serviceType`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
