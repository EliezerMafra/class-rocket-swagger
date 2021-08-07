import { Request, Response, NextFunction } from "express";

async function Authenticate(request: Request, response: Response, next: NextFunction) {
  const token = request.headers.authorization;

  if (!token) {
    return response.status(401).json({ error: "Token não encontrado" });
  }

  const [, user] = token.split(" ");

  if (user === "admin") {
    return next();
  }

  return response.status(401).json({ error: "Você não possui permissão" });
}

export { Authenticate };
