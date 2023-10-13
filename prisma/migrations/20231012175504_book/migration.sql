-- CreateTable
CREATE TABLE `Book` (
    `id` VARCHAR(191) NOT NULL,
    `authors` VARCHAR(191) NULL,
    `publication_date` DATETIME(3) NULL,
    `description` VARCHAR(191) NULL,
    `genres` VARCHAR(191) NOT NULL,
    `publishing_company` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
