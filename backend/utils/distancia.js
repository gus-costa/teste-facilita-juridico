const calcularDistancia = (point1, point2) => {
    // Exemplo simples de distância euclidiana
    return Math.sqrt((point1.coordenada_x - point2.coordenada_x) ** 2 + (point1.coordenada_y - point2.coordenada_y) ** 2);
};

module.exports = {
    calcularDistancia,
};