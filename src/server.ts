import express from "express";
import swagger from "swagger-ui-express";
import { router } from "./routes";
import swaggerJson from "./swagger.json";

const app = express();

app.use(express.json());

app.use(
  "/documentation", // caminho para acessar a documentação
  swagger.serve, // executa o servidor do Swagger
  swagger.setup(swaggerJson), // arquivo com a documentação
);

app.get("/terms", (request, response) => response.json({ message: "Termos de serviço" }));

app.use(router);

app.listen(3333, () => console.log("Server is running on port 3333"));
