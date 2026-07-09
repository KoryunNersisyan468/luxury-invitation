-- CreateEnum
CREATE TYPE "InvitationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "Invitation"
  ADD COLUMN "category" TEXT NOT NULL DEFAULT 'wedding',
  ADD COLUMN "style" TEXT NOT NULL DEFAULT 'elegant',
  ADD COLUMN "status" "InvitationStatus" NOT NULL DEFAULT 'PENDING';

UPDATE "Invitation"
SET "status" = CASE WHEN "isPublic" = true THEN 'APPROVED'::"InvitationStatus" ELSE 'PENDING'::"InvitationStatus" END;

ALTER TABLE "Invitation" ALTER COLUMN "isPublic" SET DEFAULT false;

-- CreateTable
CREATE TABLE "InvitationCategory" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "fields" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvitationCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvitationTemplate" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "style" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "previewUrl" TEXT,
    "config" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvitationTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UploadedImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "folder" TEXT,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UploadedImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InvitationCategory_slug_key" ON "InvitationCategory"("slug");

-- CreateIndex
CREATE INDEX "InvitationTemplate_category_style_idx" ON "InvitationTemplate"("category", "style");

-- CreateIndex
CREATE UNIQUE INDEX "UploadedImage_publicId_key" ON "UploadedImage"("publicId");

-- AddForeignKey
ALTER TABLE "UploadedImage" ADD CONSTRAINT "UploadedImage_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
