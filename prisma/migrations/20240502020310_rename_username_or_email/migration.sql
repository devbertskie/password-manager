/*
  Warnings:

  - You are about to drop the column `email` on the `EmailCredential` table. All the data in the column will be lost.
  - You are about to drop the column `user_or_email` on the `WebCredential` table. All the data in the column will be lost.
  - Added the required column `username_or_email` to the `EmailCredential` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username_or_email` to the `WebCredential` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmailCredential" DROP COLUMN "email",
ADD COLUMN     "username_or_email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "WebCredential" DROP COLUMN "user_or_email",
ADD COLUMN     "username_or_email" TEXT NOT NULL;
