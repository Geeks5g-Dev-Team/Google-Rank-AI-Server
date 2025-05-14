-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "postContent" TEXT NOT NULL DEFAULT '',
    "postImage" TEXT DEFAULT '',
    "postUrl" TEXT DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "reviewContent" TEXT NOT NULL DEFAULT '',
    "replyContent" TEXT DEFAULT '',
    "reviewUrl" TEXT DEFAULT '',
    "stars" INTEGER NOT NULL DEFAULT 0,
    "author" TEXT DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Business"("locationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Business"("locationId") ON DELETE RESTRICT ON UPDATE CASCADE;
