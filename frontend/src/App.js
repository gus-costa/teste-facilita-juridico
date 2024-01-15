import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar os estilos do Bootstrap
import './App.css';
import CadastroCliente from './components/CadastroCliente';
import ClienteRow from './components/ClienteRow';
import RotaOtimizada from './components/RotaOtimizada';

function App() {
    const [clientes, setClientes] = useState([]);
    const [filtro, setFiltro] = useState({ campo: 'nome', valor: '' });
    const [exibirCadastro, setExibirCadastro] = useState(false);
    const [exibirRota, setExibirRota] = useState(false);
    const [carregandoRegistros, setCarregandoRegistros] = useState(false);
    const filtroRef = useRef();

    useEffect(() => {
        filtroRef.current = filtro;
    });

    const listarClientes = useCallback(() => {
        const filtro = filtroRef.current;
        setCarregandoRegistros(true);
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/clientes${filtro.valor ? `?${filtro.campo}=${filtro.valor}` : ''}`)
            .then(response => setClientes(response.data))
            .catch(error => console.error(error))
            .finally(() => setCarregandoRegistros(false));
    }, [filtroRef]);

    useEffect(() => {
        listarClientes()
    }, [listarClientes]);

    const handleFecharCadastro = (atualizar = false) => {
        if (atualizar) listarClientes();
        setExibirCadastro(false);
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-4">
                <h1>Clientes</h1>
                <button className="btn btn-primary" onClick={() => setExibirCadastro(true)}>+ Cliente</button>
            </div>
            <CadastroCliente exibir={exibirCadastro} onFechar={handleFecharCadastro} />
            <div className="row justify-content-end mb-3">
                <div className="col-lg-4">
                    <div className="input-group">
                        <select className="form-select" value={filtro.campo} onChange={(e) => setFiltro({ ...filtro, campo: e.target.value })}>
                            <option value="nome">Nome</option>
                            <option value="email">E-mail</option>
                            <option value="telefone">Telefone</option>
                        </select>
                        <input type="text" placeholder="Filtrar" className="form-control" value={filtro.valor} onChange={(e) => setFiltro({ ...filtro, valor: e.target.value })} />
                        <button className="btn btn-outline-secondary" type="button" onClick={listarClientes}>Filtrar</button>
                    </div>
                </div>
            </div>
            {carregandoRegistros ? (
                <div className="text-center h4 my-5">
                    Aguarde...
                </div>
            ) : clientes.length > 0 ? (
                <ul className="list-group">
                    {clientes.map(cliente => (
                        <ClienteRow key={cliente.id} cliente={cliente} />
                    ))}
                </ul>
            ) : (
                <div className="text-center h4 my-5">
                    Nenhum cliente para listar.
                </div>
            )}
            <h2 className="mt-4">Calcular Rota Otimizada</h2>
            <p>Clique no botão abaixo para calcular a rota otimizada entre os clientes.</p>
            <button className="btn btn-primary" onClick={() => setExibirRota(true)}>Calcular</button>
            <RotaOtimizada exibir={exibirRota} onFechar={() => setExibirRota(false)} />
        </div>
    );
}

export default App;
