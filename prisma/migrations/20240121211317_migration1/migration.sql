-- CreateTable
CREATE TABLE "animal" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "especie" TEXT NOT NULL,

    CONSTRAINT "animal_pkey" PRIMARY KEY ("id")
);
