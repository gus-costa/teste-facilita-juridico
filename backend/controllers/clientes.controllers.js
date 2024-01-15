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
    const { nome, email, telefone, coordenada_x, coordenada_y } = req.body;

    let mensagem = null;
    if (!nome || nome.length < 3) mensagem = 'O nome é inválido';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) mensagem = 'O email é inválido';
    else if (!([10, 11].includes(telefone.replace(/[^0-9]/g, '').length))) mensagem = 'O telefone é inválido';
    else if (!!coordenada_x && (isNaN(parseFloat(coordenada_x)) || !isFinite(coordenada_x))) mensagem = 'Coordenada X é inválida';
    else if (!!coordenada_y && (isNaN(parseFloat(coordenada_y)) || !isFinite(coordenada_y))) mensagem = 'Coordenada Y é inválida';

    if (mensagem !== null) return res.status(400).json({ error: mensagem });

    try {
        await db.query('INSERT INTO clientes (nome, email, telefone, coordenada_x, coordenada_y) VALUES ($1, $2, $3, $4, $5)', [nome, email, telefone, coordenada_x === '' ? null : coordenada_x,  coordenada_y === '' ? null : coordenada_y]);
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