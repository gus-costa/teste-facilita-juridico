# Sistema de Gerenciamento de Clientes com Otimizador de Rota

Este é um sistema simples de gerenciamento de clientes para uma empresa de limpeza em residências. A aplicação permite cadastrar, visualizar clientes e calcular uma rota otimizada para visitá-los.

## Tecnologias Utilizadas

- Backend: Node.js v16, Express, PostgreSQL
- Frontend: React, Bootstrap

## Configuração

### Backend

- [Documentação da API](./backend/README.md)

1. Certifique-se de ter o Node.js v16 e o PostgreSQL instalados em seu ambiente de desenvolvimento.
2. Execute o script SQL para criar o banco de dados e a tabela:

    ```bash
    psql -h localhost -U seu_usuario -d sua_base_de_dados -f db.sql
    ```

3. Instale as dependências.

    ```bash
    cd backend
    npm install
    ```

4. Configure os parâmetros do arquivo `.env` de acordo com seu ambiente de desenvolvimento.

5. Inicie o servidor:

    ```bash
    npm start
    ```


### Frontend

1. No diretório raiz do projeto, entre na pasta do frontend:

    ```bash
    cd frontend
    ```

2. Instale as dependências e inicie o aplicativo React:

    ```bash
    npm install
    npm start
    ```

3. Acesse a aplicação no navegador através de http://localhost:3000.

## Funcionalidades
- Cadastro e visualização de clientes com informações como nome, email, telefone, coordenada X e coordenada Y.
- Cálculo de rota otimizada para visitar os clientes, começando e terminando na empresa.

## Uso
1. Cadastre novos clientes na seção de clientes no frontend.
2. Visualize a lista de clientes cadastrados e clique no botão "Calcular Rota Otimizada" para obter a ordem de visitação otimizada.
3. A ordem da rota otimizada será exibida em uma modal.