/*
  Warnings:

  - Added the required column `end_date` to the `Destination` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_url` to the `Destination` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Destination` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `Destination` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Destination` ADD COLUMN `end_date` VARCHAR(191) NOT NULL,
    ADD COLUMN `image_url` VARCHAR(191) NOT NULL,
    ADD COLUMN `rating` VARCHAR(191) NOT NULL,
    ADD COLUMN `start_date` VARCHAR(191) NOT NULL;
