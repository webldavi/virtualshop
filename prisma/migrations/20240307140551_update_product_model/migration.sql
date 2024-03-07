/*
  Warnings:

  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `imageUrl` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ALTER COLUMN "imageUrl" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");
