const db = require('../db');

// Listar clientes
const listarClientes = async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM clientes');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar clientes' });
    }
};

// Filtrar clientes
const filtrarClientes = async (req, res) => {
    const { nome, email, telefone } = req.query;

    try {
        let query = 'SELECT * FROM clientes WHERE excluido_em IS NULL';
        const values = [];

        if (nome) {
            query += ` AND nome ILIKE $${values.length + 1}`;
            values.push(`%${nome}%`);
        }
        if (email) {
            query += ` AND email = $${values.length + 1}`;
            values.push(`${email}`);
        }
        if (telefone) {
            query += ` AND telefone = $${values.length + 1}`;
            values.push(`${telefone}`);
        }
        const { rows } = await db.query(query, values);

        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar clientes' });
    }
};

// Cadastrar cliente
const cadastrarCliente = async (req, res) => {
    const { nome, email, telefone } = req.body;
    try {
        await db.query('INSERT INTO clientes (nome, email, telefone) VALUES ($1, $2, $3)', [nome, email, telefone]);
        res.status(201).json({ message: 'Cliente cadastrado com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao cadastrar cliente' });
    }
};

// Excluir cliente
const excluirCliente = async (req, res) => {
    const id = req.params.id;
    try {
        await db.query('UPDATE clientes SET excluido_em = CURRENT_TIMESTAMP WHERE id = $1', [id]);
        res.status(200).json({ message: 'Cliente excluído com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao excluir cliente' });
    }
};

module.exports = {
    listarClientes,
    filtrarClientes,
    cadastrarCliente,
    excluirCliente,
};