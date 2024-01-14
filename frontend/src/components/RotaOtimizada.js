import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function RotaOtimizada({ exibir, onFechar }) {
    const [rotaOtimizada, setRotaOtimizada] = useState([]);

    useEffect(() => {
        if (!exibir) return;
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/calcular-rota`)
            .then(response => setRotaOtimizada(response.data.rota))
            .catch(error => console.error(error));
    }, [exibir])

    return (
        <Modal show={exibir} onHide={onFechar}>
            <Modal.Header closeButton>
                <Modal.Title>Rota Otimizada</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-3">Os clientes estão em ordem otimizada para rota:</div>
                {rotaOtimizada.length > 0 ? (
                    <ul className="list-group">
                        {rotaOtimizada.map(cliente => (
                            <li key={cliente.id} className="list-group-item">{cliente.nome} - {cliente.coordenada_x},{cliente.coordenada_y}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center my-5 h4">Não há clientes para listar</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onFechar}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}