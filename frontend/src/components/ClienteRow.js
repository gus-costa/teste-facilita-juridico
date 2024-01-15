import { useState } from "react";
import axios from 'axios';
import { telefone } from "../utils/mascara";

export default function ClienteRow({ cliente }) {
    const [exibir, setExibir] = useState(true);
    const exclirCliente = () => {
        axios.delete(`${process.env.REACT_APP_API_BASE_URL}/clientes/${cliente.id}`)
            .then(response => {
                alert(response.data.message);
                setExibir(false);
            })
            .catch(error => {
                alert(error.response.data.error);
                console.error(error);
            });
    };

    return exibir ? <li className="list-group-item py-3 d-flex justify-content-between align-items-center"><p className="m-0"><strong>{cliente.nome}</strong> - {cliente.email} - {telefone(cliente.telefone)}</p><button className="btn btn-link" onClick={exclirCliente}>excluir</button></li> : null;
}