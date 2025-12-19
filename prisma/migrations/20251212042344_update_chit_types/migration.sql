-- CreateTable
CREATE TABLE "Chit" (
    "id" SERIAL NOT NULL,
    "chit_value" DOUBLE PRECISION NOT NULL,
    "location" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "phone_number_1" INTEGER,
    "phone_number_2" INTEGER,
    "monthly_contribution" DOUBLE PRECISION,
    "chit_group" TEXT,
    "duration_months" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Chit_state_idx" ON "Chit"("state");

-- CreateIndex
CREATE INDEX "Chit_branch_idx" ON "Chit"("branch");

-- CreateIndex
CREATE INDEX "Chit_chit_value_idx" ON "Chit"("chit_value");
