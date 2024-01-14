import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import './App.css';
import CadastroCliente from './components/CadastroCliente';
import ClienteRow from './components/ClienteRow';

function App() {
    const [clientes, setClientes] = useState([]);
    const [filtro, setFiltro] = useState({ campo: 'nome', valor: '' });
    const filtroRef = useRef();

    useEffect(() => {
        filtroRef.current = filtro;
    });

    const listarClientes = useCallback(() => {
        const filtro = filtroRef.current;
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/clientes${filtro.valor ? `?${filtro.campo}=${filtro.valor}` : ''}`)
            .then(response => setClientes(response.data))
            .catch(error => console.error(error));
    }, [filtroRef]);

    useEffect(() => {
        listarClientes()
    }, [listarClientes]);

    return (
        <div>
            <h1>Clientes</h1>
            <select value={filtro.campo} onChange={(e) => setFiltro({ ...filtro, campo: e.target.value })}>
                <option value="nome">Nome</option>
                <option value="email">E-mail</option>
                <option value="telefone">Telefone</option>
            </select>
            <input type="text" placeholder="Filtrar" value={filtro.valor} onChange={(e) => setFiltro({ ...filtro, valor: e.target.value })} />
            <button onClick={listarClientes}>Filtrar</button>
            <ul>
                {clientes.map(cliente => (
                    <ClienteRow key={cliente.id} cliente={cliente} />
                ))}
            </ul>
            <CadastroCliente />
        </div>
    );
}

export default App;
