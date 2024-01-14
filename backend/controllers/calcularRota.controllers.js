const db = require('../db');
const { calcularDistancia } = require('../utils/distancia');

const calcularRota = async (req, res) => {
    try {
        // É possível filtrar os clientes a serem adicionados à rota - /calcular-rota?cliente[]=1&cliente[]=2
        const clientesFiltrar = req.query.cliente || [];
        
        let query = 'SELECT * FROM clientes WHERE coordenada_x IS NOT NULL AND coordenada_y IS NOT NULL';
        const values = [];

        if (clientesFiltrar.length > 0) {
            query += ' AND id = ANY($1)';
            values.push(clientesFiltrar);
        }
        
        const { rows } = await db.query(query, values);

        const clientes = rows;

        const n = clientes.length;
        const visited = new Array(n).fill(false);
        const rota = [];
        const coordenadasEmpresa = { coordenada_x: 0, coordenada_y: 0 };
        let distancia = 0;

        // Começar da empresa
        let currentCliente = coordenadasEmpresa;

        for (let i = 0; i < n; i++) {
            let nearestCliente = null;
            let minDistance = Infinity;

            // Encontrar o vizinho mais próximo não visitado
            for (let j = 0; j < n; j++) {
                if (!visited[j]) {
                    const distance = calcularDistancia(currentCliente, clientes[j]);
                    if (distance < minDistance) {
                        minDistance = distance;
                        nearestCliente = clientes[j];
                    }
                }
            }

            // Adicionar o vizinho mais próximo à rota
            rota.push(nearestCliente);
            visited[clientes.indexOf(nearestCliente)] = true;
            distancia += minDistance;
            currentCliente = nearestCliente;
        }

        // Retornar à empresa (adicionando a distância do último cliente à empresa)
        distancia += calcularDistancia(rota[rota.length - 1], coordenadasEmpresa);

        res.json({ rota, distancia });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao calcular rota otimizada' });
    }
};

module.exports = {
    calcularRota,
};