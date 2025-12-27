/*
  Warnings:

  - Added the required column `subject` to the `maintenance_requests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "equipment" ADD COLUMN     "departmentId" INTEGER,
ADD COLUMN     "purchaseDate" TIMESTAMP(3),
ADD COLUMN     "serialNumber" TEXT,
ADD COLUMN     "warrantyInfo" TEXT;

-- AlterTable
ALTER TABLE "maintenance_requests" ADD COLUMN     "subject" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "equipment" ADD CONSTRAINT "equipment_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE SET NULL ON UPDATE CASCADE;
