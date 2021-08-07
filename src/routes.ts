import { Router } from "express";
import { v4 as uuidV4 } from "uuid";
import { EnsuredAuthenticated } from "./middleware";

const router = Router();

interface IProductDTO {
  id: string;
  name: string;
  description: string;
  price: number;
}

const products: IProductDTO[] = [];

router.get("/product/findByName", (request, response) => { // buscar produto - nome
  const { name } = request.query;
  return response.status(200).json(products.filter((i) => i.name.includes(String(name))));
});

router.get("/product/:id", (request, response) => { // buscar produto - id
  const { id } = request.params;
  return response.status(200).json(products.find((i) => i.id === id));
});

router.post("/product", EnsuredAuthenticated, (request, response) => { // criar produto
  const { name, description, price } = request.body;

  const productAlreadyExists = products.find((i) => i.name === name);

  if (productAlreadyExists) {
    return response.status(400).json({ error: "Já existe este produto cadastrado!" });
  }

  const product: IProductDTO = {
    id: uuidV4(),
    name,
    description,
    price,
  };

  products.push(product);

  return response.status(201).json(product);
});

router.put("/product/:id", EnsuredAuthenticated, (request, response) => { // alterar produto
  const { id } = request.params;
  const { name, description, price } = request.body;

  const productIndex = products.findIndex((i) => i.id === id);

  if (productIndex === -1) {
    return response.status(400).json({ error: "Produto não existe!" });
  }

  const product: IProductDTO = Object.assign({
    name,
    description,
    price,
  });

  products[productIndex] = product;

  return response.status(200).json(product);
});

export { router };
