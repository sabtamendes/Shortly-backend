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
Crie um arquivo <span style="color: green"> .env </span> na raiz do projeto e defina as seguintes variáveis de ambiente:
``` env
 MONGO_URI=<URL_BASE_DA_API>
``` 
</details>


<details>
<summary><strong>Utilização</strong> 💡</summary>
    
Para rodar o projeto em um servidor de desenvolvimento, execute o seguinte comando:

``` bash
npm start
  ou
npm run dev
```

</details>

<details>
<summary><strong>Estruturação</string> 🌳</summary>

- src
  - controllers
    - signup.controllers.js
    - signin.controllers.js
    - urls.controllers.js
    - users.controllers.js
    - ranking.controllers.js
  - database
    - database.js 
  - middlewares
    - token.middlewares.js
    - signup.middlewares.js
    - signin.middlewares.js
    - urls.middlewares.js
    - users.middlewares.js
  - repositories
    - token.repositories.js
    - signup.repositories.js
    - signin.repositories.js
    - urls.repositories.js
    - users.repositories.js
    - ranking.repositories.js
  - routes
    - signup.routes.js
    - signin.routes.js
    - urls.routes.js
    - users.routes.js
    - ranking.routes.js
  - schemas
    - signup.schemas.js
    - signin.schemas.js
    - urls.schemas.js
  - index.js

</details>

<details>
<summary><strong>Tecnologias e Ferramentas 🔧💻</strong></summary>

- node 14.0.0
- bcrypt 5.1.0
- cors 2.8.5
- dotenv 16.0.3
- express 4.18.2
- joi 17.7.0
- jsonwebtoken 8.5.1
- nanoid 4.0.0
- pg 8.8.0
- uuid 9.0.0

</details>
