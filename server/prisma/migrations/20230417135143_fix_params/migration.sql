/*
  Warnings:

  - You are about to drop the column `city` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `postcode` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `Destination` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Destination` table. All the data in the column will be lost.
  - Added the required column `image_url` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Activity` DROP COLUMN `city`,
    DROP COLUMN `postcode`,
    ADD COLUMN `image_url` VARCHAR(191) NOT NULL,
    ADD COLUMN `rating` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Destination` DROP COLUMN `image_url`,
    DROP COLUMN `rating`;
