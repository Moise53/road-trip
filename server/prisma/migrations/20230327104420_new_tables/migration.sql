-- CreateTable
CREATE TABLE `Destination` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `start` VARCHAR(191) NOT NULL,
    `end` VARCHAR(191) NOT NULL,
    `travel_id` INTEGER NOT NULL,
    `rank` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Activity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `postcode` VARCHAR(191) NOT NULL,
    `destination_id` INTEGER NOT NULL,
    `type` ENUM('accommodations', 'restaurants', 'bars', 'transports', 'events') NOT NULL,
    `lat` VARCHAR(191) NOT NULL,
    `lon` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Destination` ADD CONSTRAINT `Destination_travel_id_fkey` FOREIGN KEY (`travel_id`) REFERENCES `Travel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Activity` ADD CONSTRAINT `Activity_destination_id_fkey` FOREIGN KEY (`destination_id`) REFERENCES `Destination`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
