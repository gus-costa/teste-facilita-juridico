export default function ClienteRow({ cliente }) {
    return <li>{cliente.nome} - {cliente.email} - {cliente.telefone}</li>
}