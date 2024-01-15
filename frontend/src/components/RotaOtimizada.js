import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function RotaOtimizada({ exibir, onFechar }) {
    const [rotaOtimizada, setRotaOtimizada] = useState([]);
    const [carregandoRegistros, setCarregandoRegistros] = useState(false);

    useEffect(() => {
        if (!exibir) return;
        setCarregandoRegistros(true);
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/calcular-rota`)
            .then(response => setRotaOtimizada(response.data.rota))
            .catch(error => console.error(error))
            .finally(() => setCarregandoRegistros(false));
    }, [exibir])

    let i = 1;

    return (
        <Modal show={exibir} onHide={onFechar}>
            <Modal.Header closeButton>
                <Modal.Title>Rota Otimizada</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-3">Os clientes estão em ordem otimizada para rota:</div>
                {carregandoRegistros ? (
                    <p className="text-center my-5 h4">Aguarde...</p>
                ) : rotaOtimizada.length > 0 ? (
                    <ul className="list-group">
                        {rotaOtimizada.map(cliente => (
                            <li key={cliente.id} className="list-group-item"><strong>{i++}.</strong> {cliente.nome} [{cliente.coordenada_x}, {cliente.coordenada_y}]</li>
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