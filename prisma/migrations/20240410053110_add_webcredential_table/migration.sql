-- CreateTable
CREATE TABLE "WebCredential" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "WebCredential_title_key" ON "WebCredential"("title");
