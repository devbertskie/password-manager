/*
  Warnings:

  - Added the required column `userId` to the `WebCredential` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WebCredential" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "WebCredential" ADD CONSTRAINT "WebCredential_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
