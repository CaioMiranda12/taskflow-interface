/*
  Warnings:

  - Added the required column `updatedat` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedat` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "updatedat" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "updatedat" TIMESTAMP(3) NOT NULL;
