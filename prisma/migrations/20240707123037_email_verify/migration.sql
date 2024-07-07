-- AlterTable
ALTER TABLE "customer" ADD COLUMN     "OTP" TEXT,
ADD COLUMN     "isVerified" BOOLEAN DEFAULT false;
