/*
  Warnings:

  - The `image` column on the `salon` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "salon" DROP COLUMN "image",
ADD COLUMN     "image" BYTEA;
