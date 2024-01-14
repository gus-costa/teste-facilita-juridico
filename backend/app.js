const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const clientesRouter = require('./routes/clientes.routes');
const calcularRotaRouter = require('./routes/calcularRota.routes');

const app = express();
const port = process.env.APP_PORT || 3001;

app.use(bodyParser.json());

// ativar CORS em ambiente de desenvolvimento
if (process.env.NODE_ENV === 'dev') {
    app.use(cors());
    console.log('CORS ativado');
}

// Rotas dos clientes
app.use('/clientes', clientesRouter);
app.use('/calcular-rota', calcularRotaRouter);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
