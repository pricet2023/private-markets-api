/*
  Warnings:

  - You are about to alter the column `target_size_usd` on the `Fund` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `amount_usd` on the `Investment` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - Added the required column `investor_type` to the `Investor` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "InvestorType" AS ENUM ('Individual', 'Institution', 'FamilyOffice');

-- AlterTable
ALTER TABLE "Fund" ALTER COLUMN "target_size_usd" SET DATA TYPE DECIMAL(15,2),
ALTER COLUMN "created_at" SET DEFAULT date_trunc('second', now());

-- AlterTable
ALTER TABLE "Investment" ALTER COLUMN "amount_usd" SET DATA TYPE DECIMAL(15,2),
ALTER COLUMN "investment_date" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "investment_date" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "Investor" DROP COLUMN "investor_type",
ADD COLUMN     "investor_type" "InvestorType" NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT date_trunc('second', now());
