-- AlterTable
ALTER TABLE "Chit" ALTER COLUMN "phone_number_1" SET DATA TYPE BIGINT USING phone_number_1::bigint,
ALTER COLUMN "phone_number_2" SET DATA TYPE BIGINT USING phone_number_2::bigint;
