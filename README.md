# Rocketseat - Code/drops #85 | Swagger
Aprendendo a como utilizar o **Swagger** para criar uma documentação online com a **Daniele Evangelista** da Rocketseat pelo Code/drops #85

[Link do vídeo pelo Youtube](https://youtu.be/WhFx2heoFrA)
[Documentação do Swagger no formato deles ](https://petstore.swagger.io/)

# Realizando a instalação
Podemos usar este comando, para o TypeScript vamos precisar instalar as tipagens
```bs
yarn add swagger-ui-express
yarn add @types/swagger-ui-express -D
```

# Definindo as configurações
Precisamos criar um arquivo no formato de `json` para criar a documentação dele, este arquivo deve ser importado dentro do arquivo que vai cuidar das rotas

Devemos realizar a importação da dependência dentro do arquivo que vai gerenciar as rotas, ele deve ficar delas iniciarem, e informar esta configuração
```ts
app.use(
  "/documentation", // caminho para acessar a documentação
  swagger.serve, // executa o servidor do Swagger
  swagger.setup(swaggerJson), // arquivo com a documentação
);
```

# Criando a documentação
Não possui segredo na sua criação mais é muita informação que precisamos passar, para uma melhor verificação podemos utilizar este arquivo [src/swagger.json](https://github.com/deibsoncogo/Swagger/blob/master/src/swagger.json)
