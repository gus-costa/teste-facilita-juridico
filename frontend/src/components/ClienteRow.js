export default function ClienteRow({ cliente }) {
    return <li className="list-group-item">{cliente.nome} - {cliente.email} - {cliente.telefone}</li>
}