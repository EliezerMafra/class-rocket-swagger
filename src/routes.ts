import { Router } from "express";
import { v4 as uuidV4 } from "uuid";
import { Authenticate } from "./middleware";

const router = Router();

interface IProduct {
  id: string;
  code: number;
  name: string;
  price: number;
}

const products: IProduct[] = [];

router.post("/product", Authenticate, (request, response) => { // cadastrar produto
  const { name, price } = request.body;

  const productNameAlreadyExists = products.find((i) => i.name === name);

  if (productNameAlreadyExists) {
    return response.status(400).json({ error: "Já existe um produto com este nome" });
  }

  const product: IProduct = {
    id: uuidV4(),
    code: products.length + 10,
    name,
    price,
  };

  products.push(product);

  return response.status(201).json(product);
});

router.get("/product/all", (request, response) => { // listar produtos
  if (products.length === 0) {
    return response.status(400).json({ error: "Não existe produto cadastrado" });
  }

  return response.status(200).json(products);
});

router.get("/product/one", (request, response) => { // buscar produto por nome
  const { name } = request.query;

  const productNameIncludeAlreadyExists = products.filter((i) => i.name.includes(String(name)));

  if (!productNameIncludeAlreadyExists[0]) {
    return response.status(400).json({ error: "Produto não encontrado" });
  }

  return response.status(200).json(productNameIncludeAlreadyExists);
});

router.get("/product/:code", (request, response) => { // buscar produto pelo código
  const { code } = request.params;

  const productCodeFind = products.find((i) => String(i.code) === String(code));

  if (!productCodeFind) {
    return response.status(400).json({ error: "Produto não encontrado" });
  }

  return response.status(200).json(productCodeFind);
});

router.put("/product/:code", Authenticate, (request, response) => { // alterar produto pelo código
  const { code } = request.params;
  const { name, price } = request.body;

  const productIndex = products.findIndex((i) => String(i.code) === String(code));

  if (productIndex === -1) {
    return response.status(400).json({ error: "Produto não encontrado" });
  }

  const productNameFind = products.find((i) => i.name === name);

  if (productNameFind) {
    return response.status(400).json({ error: "Já existe um produto com este nome" });
  }

  const productFind = products.find((i) => String(i.code) === String(code));

  const product: IProduct = {
    id: productFind.id,
    code: productFind.code,
    name: name || productFind.name,
    price: price || productFind.price,
  };

  products[productIndex] = product;

  return response.status(201).json(product);
});

export { router };
