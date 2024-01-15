# Documentação da API

## Listar Clientes
- **Endpoint:** `GET /clientes`
- **Descrição:** Retorna a lista de todos os clientes cadastrados.
- **Parâmetros de Consulta:**
    - `nome` (opcional): Filtra os clientes pelo nome.
    - `email` (opcional): Filtra os clientes pelo e-mail.
    - `telefone` (opcional): Filtra os clientes pelo telefone.
- **Exemplo de Uso:**
```http
GET http://localhost:3001/clientes?nome=Joao&telefone=123456789
```
- **Resposta de Exemplo:**
```json
[
  {
    "id": 1,
    "nome": "Joao Silva",
    "email": "joao@example.com",
    "telefone": "123456789",
    "coordenada_x": 10.0,
    "coordenada_y": 20.0
  },
  {
    "id": 2,
    "nome": "Maria Oliveira",
    "email": "maria@example.com",
    "telefone": "987654321",
    "coordenada_x": 15.0,
    "coordenada_y": 25.0
  }
]
```

## Cadastrar Cliente
- **Endpoint:** `POST /clientes`
- **Descrição:** Cadastra um novo cliente na base de dados.
- **Corpo da Requisição:**
```json
{
  "nome": "Nome do Cliente",
  "email": "cliente@example.com",
  "telefone": "987654321",
  "coordenada_x": 30.0,
  "coordenada_y": 40.0
}
```
- **Exemplo de Uso:**
```http
POST http://localhost:3001/clientes
```
- **Resposta de Exemplo:**
```json
{
  "message": "Cliente cadastrado com sucesso"
}
```

## Excluir Cliente
- **Endpoint:** `DELETE /clientes/:id`
- **Descrição:** Remove um cliente na base de dados.
- **Exemplo de Uso:**
```http
DELETE http://localhost:3001/clientes/1
```
- **Resposta de Exemplo:**
```json
{
  "message": "Cliente excluído com sucesso"
}
```

## Calcular Rota Otimizada
- **Endpoint:** `GET /rota-otimizada`
- **Descrição:** Retorna a lista de clientes ordenada para otimização de rota.
- **Parâmetros de Consulta:**
    - `cliente[]` (opcional): Filtra os clientes pelo id.
- **Exemplo de Uso:**
```http
GET http://localhost:3001/rota-otimizada?cliente[]=1&cliente[]=2
```
- **Resposta de Exemplo:**
```json
[
  {
    "id": 1,
    "nome": "Joao Silva",
    "email": "joao@example.com",
    "telefone": "123456789",
    "coordenada_x": 10.0,
    "coordenada_y": 20.0
  },
  {
    "id": 2,
    "nome": "Maria Oliveira",
    "email": "maria@example.com",
    "telefone": "987654321",
    "coordenada_x": 15.0,
    "coordenada_y": 25.0
  },
  // ...
]
```