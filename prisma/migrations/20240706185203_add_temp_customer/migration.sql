-- AlterTable
ALTER TABLE "customer" ADD COLUMN     "isTemporary" BOOLEAN DEFAULT false;

-- CreateTable
CREATE TABLE "tempToken" (
    "token" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tempToken_pkey" PRIMARY KEY ("token")
);

-- AddForeignKey
ALTER TABLE "tempToken" ADD CONSTRAINT "tempToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
