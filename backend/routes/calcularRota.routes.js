const express = require('express');
const { calcularRota } = require('../controllers/calcularRota.controllers');

const router = express.Router();

router.get('/', calcularRota);

module.exports = router;
