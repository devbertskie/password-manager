-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('User', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email_verified" TIMESTAMP(3),
    "role" "UserRole" NOT NULL DEFAULT 'User',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "image_url" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WebCredential" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "site_url" TEXT NOT NULL,
    "is_important" BOOLEAN NOT NULL DEFAULT false,
    "user_or_email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WebCredential_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailCredential" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "site_url" TEXT NOT NULL,
    "is_important" BOOLEAN NOT NULL DEFAULT false,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailCredential_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailVerification" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "attempt" INTEGER NOT NULL DEFAULT 1,
    "expires_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailVerification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasswordVerification" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "attempt" INTEGER NOT NULL DEFAULT 1,
    "expires_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PasswordVerification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "WebCredential_title_key" ON "WebCredential"("title");

-- CreateIndex
CREATE UNIQUE INDEX "EmailCredential_title_key" ON "EmailCredential"("title");

-- CreateIndex
CREATE UNIQUE INDEX "EmailVerification_email_token_key" ON "EmailVerification"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordVerification_email_token_key" ON "PasswordVerification"("email", "token");

-- AddForeignKey
ALTER TABLE "WebCredential" ADD CONSTRAINT "WebCredential_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailCredential" ADD CONSTRAINT "EmailCredential_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
