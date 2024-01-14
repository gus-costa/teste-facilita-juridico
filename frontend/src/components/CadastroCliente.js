import { useState } from 'react';
import axios from 'axios';

export default function CadastroCliente() {
    const [novoCliente, setNovoCliente] = useState({ nome: '', email: '', telefone: '' });

    const cadastrarCliente = () => {
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/clientes`, novoCliente)
            .then(response => {
                alert(response.data.message);
                setNovoCliente({ nome: '', email: '', telefone: '' });
            })
            .catch(error => console.error(error));
    };

    return (
        <>
            <h2>Cadastrar Novo Cliente</h2>
            <input type="text" placeholder="Nome" value={novoCliente.nome} onChange={(e) => setNovoCliente({ ...novoCliente, nome: e.target.value })} />
            <input type="text" placeholder="Email" value={novoCliente.email} onChange={(e) => setNovoCliente({ ...novoCliente, email: e.target.value })} />
            <input type="text" placeholder="Telefone" value={novoCliente.telefone} onChange={(e) => setNovoCliente({ ...novoCliente, telefone: e.target.value })} />
            <button onClick={cadastrarCliente}>Cadastrar</button>
        </>
    );
}