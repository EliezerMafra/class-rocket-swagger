import { Request, Response, NextFunction } from "express";

async function EnsuredAuthenticated(request: Request, response: Response, next: NextFunction) {
  const token = request.headers.authorization;

  if (!token) {
    return response.status(401).send();
  }

  const [, user] = token.split(" ");

  if (user === "admin") {
    return next();
  }

  return response.status(401).send();
}

export { EnsuredAuthenticated };
