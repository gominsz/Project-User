/*
  Warnings:

  - You are about to drop the column `genres` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Book` DROP COLUMN `genres`;

-- CreateTable
CREATE TABLE `Genres` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_BookToGenres` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_BookToGenres_AB_unique`(`A`, `B`),
    INDEX `_BookToGenres_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_BookToGenres` ADD CONSTRAINT `_BookToGenres_A_fkey` FOREIGN KEY (`A`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BookToGenres` ADD CONSTRAINT `_BookToGenres_B_fkey` FOREIGN KEY (`B`) REFERENCES `Genres`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
