import fastify from "fastify";
import fastifyCors from "fastify-cors";
import fastifyFormBody from "fastify-formbody"; // Adicionado para suportar o corpo da requisição

import { prisma } from "./lib/prisma";

const server = fastify();
server.register(fastifyCors);
// server.register(fastifyFormBody); // Registrando o suporte para o corpo da requisição

server.get("/animal", async function (req, reply) {
  const animal = await prisma.animal.findMany();
  reply.send(animal);
});

server.post("/animal", async (req, reply) => {
  await prisma.animal.create({
    data: {
      nome: req.body.nome,
      especie: req.body.especie,
    },
  });
  reply.send({ message: "/animal" });
  console.log("Animal adicionado com sucesso!");
});

server.delete("/animal/:animalId", async (req, reply) => {
  await prisma.animal.delete({
    where: {
      id: Number(req.params.animalId),
    },
  });
  reply.send({ message: "/animal" });
  console.log("Animal deletado com sucesso!");
});

server.listen({ port: 3001 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

server.put("/animal/:animalId", async (req, reply) => {
  const animalId = Number(req.params.animalId);

  try {
    const updatedAnimal = await prisma.animal.update({
      where: { id: animalId },
      data: {
        nome: req.body.nome,
        especie: req.body.especie,
      },
    });

    reply.send(updatedAnimal);
    console.log("Animal atualizado com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar o animal:", error);
    reply.status(500).send({ error: "Erro ao atualizar o animal." });
  }
});
