-- CreateTable
CREATE TABLE "gallery_image" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "imagekitFileId" TEXT,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gallery_image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "gallery_image_slug_key" ON "gallery_image"("slug");
