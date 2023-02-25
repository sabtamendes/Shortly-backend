# Shortly

##   Documentação do Projeto 📄👀
Passar uma URL gigante de um meme, vídeo ou qualquer outra coisa na internet para um(a) amigo(a) é uma situação embaraçosa. Tudo piora quando a pessoa que recebe o link não tem como abri-lo diretamente e é obrigada a escrever o link caractere por caractere.
Para evitar este tipo de situação e de quebra conseguir monitorar os acessos a este link, surgiram os `encurtadores de URL` 
<details>
<summary><strong>Instalação</strong> 🛠️</summary>
 
Para rodar o projeto, primeiro clone este repositório usando o comando:

``` bash
git clone https://github.com/seu-usuario/nome-do-projeto.git
```
Em seguida, instale as dependências usando o gerenciador de pacotes de sua escolha. Recomendo o uso do npm:
  
``` bash
npm install
```
Crie um arquivo .env na raiz do projeto e defina as seguintes variáveis de ambiente:
``` sql 
PORT= localhost
DATABASE_URL=postgres://seu-usuario:senha@localhost:5432/nome-do-banco
``` 

Onde:

- `PORT` é a porta que o servidor irá escutar.
- `DATABASE_URL` é a URL de conexão do Postgres. 
- O valor `seu-usuario` e `senha` devem ser substituídos pelos seus próprios dados de autenticação do Postgres. 
- `localhost:5432` é o endereço e porta do seu servidor Postgres. 
- `nome-do-banco` é o nome do banco de dados que você criou no seu servidor Postgres.
    
    
</details>


<details>
<summary><strong>Utilização</strong> 💡</summary>
    
Para rodar o projeto em um servidor local, execute o seguinte comando:

``` bash
npm start
  ou
npm run dev
```

</details>

<details>
<summary><strong>Estruturação</strong> 🌳</summary>

### 🧱 Estrutura em camadas
- `src/`                         diretório principal do projeto
  - `controllers/`               diretório com os controladores
    - `signup.controllers.js`      controlador responsável pelo registro de usuário
    - `signin.controllers.js`      controlador responsável pelo login de usuário
    - `urls.controllers.js`        controlador responsável por manipular URLs encurtadas
    - `users.controllers.js`       controlador responsável por manipular usuários
    - `ranking.controllers.js`     controlador responsável por manipular rankings
  - `database/`                  diretório com o arquivo de configuração do banco de dados
    - `database.js`                configuração do banco de dados
  - `middlewares/`               diretório com os middlewares
    - `token.middlewares.js`       middleware responsável pela verificação do token
    - `signup.middlewares.js`      middleware responsável pela validação do registro de usuário
    - `signin.middlewares.js`      middleware responsável pela validação do login de usuário
    - `urls.middlewares.js`        middleware responsável pela validação da URL encurtada
    - `users.middlewares.js`       middleware responsável pela validação de usuário
  - `repositories/`              diretório com os repositórios
    - `token.repositories.js`      repositório responsável pelo token
    - `signup.repositories.js`     repositório responsável pelo registro de usuário
    - `signin.repositories.js`     repositório responsável pelo login de usuário
    - `urls.repositories.js`       repositório responsável pela manipulação de URLs encurtadas
    - `users.repositories.js`      repositório responsável pela manipulação de usuários
    - `ranking.repositories.js`    repositório responsável pela manipulação de rankings
  - `routes/`                    diretório com as rotas
    - `signup.routes.js`           rota responsável pelo registro de usuário
    - `signin.routes.js`           rota responsável pelo login de usuário
    - `urls.routes.js`             rota responsável por manipular URLs encurtadas
    - `users.routes.js`            rota responsável por manipular usuários
    - `ranking.routes.js`          rota responsável por manipular rankings
  - `schemas/`                   diretório com os esquemas de validação
    - `signup.schemas.js`          esquema de validação do registro de usuário
    - `signin.schemas.js`          esquema de validação do login de usuário
    - `urls.schemas.js`            esquema de validação da URL encurtada
  - `index.js`                     esquema principal do projeto


</details>

<details>
<summary><strong>Tecnologias e Ferramentas 🔧💻</strong></summary>

  #### 💻📦 Links úteis:

- [Node 14.0.0](https://nodejs.org/en/blog/release/v14.0.0/)
- [Express 4.18.2](https://www.npmjs.com/package/express)
- [Pg 8.8.0](https://www.npmjs.com/package/pg)
- [Bcrypt 5.1.0](https://www.npmjs.com/package/bcrypt)
- [Cors 2.8.5](https://www.npmjs.com/package/cors)
- [Dotenv 16.0.3](https://www.npmjs.com/package/dotenv)
- [Joi 17.7.0](https://www.npmjs.com/package/joi)
- [Jsonwebtoken 8.5.1](https://www.npmjs.com/package/jsonwebtoken)
- [Nanoid 4.0.0](https://www.npmjs.com/package/nanoid)
- [Uuid 9.0.0](https://www.npmjs.com/package/uuid)

</details>

<details>
  <summary>API</summary>

   ## 🌐 Utilização da API
   
   <details>
    <summary><strong>signup</strong></summary>
   
   `POST /signup`: cadastro do usuário.
   
   ### Requisição
    
  ```json 
{
    "name": "Fulana",
    "email": "fulana@email.com.br",
    "password": "123456",
    "confirmPassword": "123456"
}    
  ```
   ### Resposta
   
   Sucesso
   
   ```css
   
   HTTP/1.1 201 Created
   
   ``` 
   
   Erro
   
   - body incorreto:
    
   ```http 
   HTTP/1.1 401 Unauthorized
   ```
   - email já está cadastrado:
   
   ```http 
   HTTP/1.1 409 Conflict
   ```
   </details>
   
   
   <details>
    <summary><strong>signin</strong></summary>
   
   `POST /signin`: acesso à conta.
   
   ### Requisição
    
  ```json 
{
    "email": "fulana@email.com.br",
    "password": "123456"
}    
  ```
   ### Resposta
   
   Sucesso
   
   ```css
   
    HTTP/1.1 200 OK
   
   {  "token": "f87c5453-14b3-43d3-8fb1-739b4385c287" }
   
   ``` 
   
   Erro
   
   - body incorreto:
    
   ```http 
   HTTP/1.1 422 Unauthorized
   
   {
    "errors": [
        "O endereço de e-mail deve ser válido.",
        "A senha deve ter pelo menos 6 caracteres."
     ]
   }
   
   ```
   - usuário e/ou senha não compatível ou não exista:
   
   ```http 
   HTTP/1.1 401 Unauthorized
   ```
   </details>
   
  <details>
    <summary><strong>urls</strong></summary>
   
  <details>
     <summary>urls/shorten</summary>
     
   `POST /urls/shorten`: encurtar a url.
   
   ### Requisição
   
   Authorization: Bearer { token }
   
  ```json 
{
    "url": "https://...",
    "password": "123456"
}    
  ```
   ### Resposta
   
   Sucesso
   
   ```css
   
    HTTP/1.1 201 Created
   
   {  "shortUrl": "b4385c287" }
   
   ``` 
   
   Erro
   
   - body incorreto:
    
   ```http 
   HTTP/1.1 422 Unauthorized
   
   {
    "errors": [
        "formato url incorreta.",
     ]
   }
   
   ```
   - header não enviado ou inválido:
   
   ```http 
   HTTP/1.1 401 Unauthorized
   ```
   </details>
    
  <details>
   <summary>urls/:id</summary>
     
   `GET /urls/:id`: encurtar a url.
   
   ### Requisição
   
   Path Params id
   
   ### Resposta
   
   Sucesso
   
   ```jsx 

      HTTP/1.1 200 OK 
   ```
   
   ```javascript 
   {
        "id": 1,
        "shortUrl": "bd8235a0",
        "url": "https://..."
   }    
   ```
     
   Erro
   
   - url encurtada não existe:
    
   ```javascript 

      HTTP/1.1 404 NOT FOUND

   ```
   
  </details>
    
  <details>
   <summary>/urls/open/:shortUrl</summary>
     
  `GET /urls/open/:shortUrl`: redirecionar à url.
   
   ### Requisição
   
   Path Params shortUrl
   
   ### Resposta
   
   Sucesso
   
   Usuário será redirecionado para o link correspondente à url encurtada, e a contagem de visitas do link será incremenntada em 1.
   ```jsx 

      HTTP/1.1 302 FOUND 
   ```
   
   Erro
   
   - url encurtada não existe:
    
   ```javascript 

      HTTP/1.1 404 NOT FOUND

   ```
   
   </details>
    
    
      
  <details>
   <summary>/urls/:id</summary>
     
  `DELETE /urls/:id`: redirecionar à url.
   
   ### Requisição
   
     Authorization: Bearer { token }
   
   ### Resposta
   
   Sucesso
   
   ```jsx 

      HTTP/1.1 204 NO CONTENT 
   ```
   
   Erro
   
   - header não enviado ou inválido:
   
   ```http 
   HTTP/1.1 401 Unauthorized
   ```
   - url encurtada não pertence ao usuário:
   
   ```http 
   HTTP/1.1 401 Unauthorized
   ```
   - url encurtada não existe:
   
   ```http 
   HTTP/1.1 404 NOT FOUND
   ```
   
   </details>
    
    
    
      
  <details>
   <summary>users/me</summary>
     
  `GET users/me`: redirecionar à url.
   
   ### Requisição
   
     Authorization: Bearer { token }
   
   ### Resposta
   
   Sucesso
   
   ```jsx
   HTTP/1.1 200 OK
   ```
   
   ```jsx 

     {
       "id": id do usuário,
       "name": nome do usuário,
       "visitCount": soma da quantidade de visitas de todos os links do usuário,
       "shortenedUrls": 
       [
          {
           "id": 1,
           "shortUrl": "...",
           "url": "...",
           "visitCount": soma da quantidade de visitas do link
          },
          {
           "id": 2,
           "shortUrl": "...",
           "url": "...",
           "visitCount": soma da quantidade de visitas do link
          }
       ]
     }
 
   ```
   
   Erro
   
   - header não enviado ou inválido:
   
   ```http 
   HTTP/1.1 401 Unauthorized
   ```
   - caso usuário não exista:
   
   ```http 
   HTTP/1.1 404 NOT FOUND
   ```
   
   </details>
    
    
    
 </details>
   
</details>
