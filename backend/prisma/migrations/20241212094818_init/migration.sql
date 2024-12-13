/*
  Warnings:

  - You are about to drop the `Icon` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `emoji` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Icon` DROP FOREIGN KEY `Icon_activityId_fkey`;

-- AlterTable
ALTER TABLE `Activity` ADD COLUMN `emoji` VARCHAR(191) NOT NULL,
    MODIFY `endAt` DATETIME(3) NULL;

-- DropTable
DROP TABLE `Icon`;
