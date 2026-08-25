-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('NEW_LEAD', 'PROPOSAL_SENT', 'SITE_VISIT', 'QUALIFIED', 'WON', 'LOST');

-- CreateTable
CREATE TABLE "lead" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "project" TEXT NOT NULL,
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW_LEAD',
    "value" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lead_pkey" PRIMARY KEY ("id")
);
