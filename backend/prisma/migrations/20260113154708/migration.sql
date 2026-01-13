-- CreateEnum
CREATE TYPE "BoxStatus" AS ENUM ('available', 'empty');

-- CreateTable
CREATE TABLE "boxes" (
    "id" TEXT NOT NULL,
    "status" "BoxStatus" NOT NULL,

    CONSTRAINT "boxes_pkey" PRIMARY KEY ("id")
);
