-- AlterTable
ALTER TABLE "EmailCredential" ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "WebCredential" ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false;
