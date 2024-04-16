/*
  Warnings:

  - Added the required column `site_url` to the `WebCredential` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WebCredential" ADD COLUMN     "site_url" TEXT NOT NULL;
