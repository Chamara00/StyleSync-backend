/*
  Warnings:

  - Made the column `password` on table `salon` required. This step will fail if there are existing NULL values in that column.
  - Made the column `username` on table `salon` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "customer" ADD COLUMN     "image" BYTEA;

-- AlterTable
ALTER TABLE "salon" ADD COLUMN     "image" BYTEA,
ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "username" SET NOT NULL;

-- AlterTable
ALTER TABLE "staff" ADD COLUMN     "image" BYTEA;
