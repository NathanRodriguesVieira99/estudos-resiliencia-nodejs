import { fastify } from "fastify";

const server = fastify();

server.listen(() => {
  console.log("Server running on http://localhost:3001");
});
