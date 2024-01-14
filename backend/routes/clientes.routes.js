const express = require('express');
const clientesCtrl = require('../controllers/clientes.controllers');

const router = express.Router();

router.get('/', clientesCtrl.filtrarClientes);
router.post('/', clientesCtrl.cadastrarCliente);
router.delete('/:id', clientesCtrl.excluirCliente);

module.exports = router;