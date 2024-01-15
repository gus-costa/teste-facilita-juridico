import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function CadastroCliente({ exibir, onFechar }) {
    const [novoCliente, setNovoCliente] = useState({ nome: '', email: '', telefone: '', coordenada_x: 0, coordenada_y: 0 });

    const cadastrarCliente = () => {
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/clientes`, novoCliente)
            .then(response => {
                alert(response.data.message);
                setNovoCliente({ nome: '', email: '', telefone: '', coordenada_x: 0, coordenada_y: 0 });
                onFechar(true);
            })
            .catch(error => console.error(error));
    };

    return (
        <Modal show={exibir} onHide={onFechar}>
            <Modal.Header closeButton>
                <Modal.Title>Cadastrar Novo Cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" placeholder="Nome" value={novoCliente.nome} onChange={(e) => setNovoCliente({ ...novoCliente, nome: e.target.value })} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email" value={novoCliente.email} onChange={(e) => setNovoCliente({ ...novoCliente, email: e.target.value })} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Telefone</Form.Label>
                        <Form.Control type="text" placeholder="Telefone" value={novoCliente.telefone} onChange={(e) => setNovoCliente({ ...novoCliente, telefone: e.target.value })} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Coordenada X</Form.Label>
                        <Form.Control type="text" placeholder="Coordenada X" value={novoCliente.coordenada_x} onChange={(e) => setNovoCliente({ ...novoCliente, coordenada_x: e.target.value })} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Coordenada Y</Form.Label>
                        <Form.Control type="text" placeholder="Coordenada Y" value={novoCliente.coordenada_y} onChange={(e) => setNovoCliente({ ...novoCliente, coordenada_y: e.target.value })} />
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onFechar}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={cadastrarCliente}>
                    Cadastrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}