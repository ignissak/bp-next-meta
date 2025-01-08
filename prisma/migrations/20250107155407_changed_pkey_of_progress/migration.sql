/*
  Warnings:

  - The primary key for the `Progress` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Progress` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,courseId,entryId]` on the table `Progress` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Progress" DROP CONSTRAINT "Progress_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "Progress_userId_courseId_entryId_key" ON "Progress"("userId", "courseId", "entryId");
