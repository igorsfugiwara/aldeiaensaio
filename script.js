document.addEventListener('DOMContentLoaded', function () {
    const ring = document.getElementById('ring');
    const ringSizeDisplay = document.getElementById('ringSize');
    const diameterValue = document.getElementById('diameterValue');
    const decreaseButton = document.getElementById('decreaseButton');
    const increaseButton = document.getElementById('increaseButton');
    const ruler = document.getElementById('ruler');
    const sizeRange = document.getElementById('sizeRange');

    // Desenha a régua
    function drawRuler() {
        const step = 100 / (35 - 7); // Passo de cada marca na régua
        for (let i = 7; i <= 35; i++) {
            const mark = document.createElement('div');
            mark.classList.add('mark');
            mark.style.left = `${(i - 7) * step}%`; // Define a posição da marca na régua
            ruler.appendChild(mark);
        }
    }

// Retorna o diâmetro correspondente a um tamanho de anel em pixels
function getDiameter(size) {
    // Valores convertidos para pixels
    const diametersInPixels = {
        7: 57, 8: 58, 9: 59, 10: 60, 11: 61, 12: 62, 13: 64, 14: 65, 15: 66, 16: 67,
        17: 69, 18: 70, 19: 71, 20: 72, 21: 73, 22: 75, 23: 76, 24: 77, 25: 78, 26: 79,
        27: 81, 28: 82, 29: 83, 30: 84, 31: 85, 32: 87, 33: 88, 34: 89, 35: 90
    };
    return diametersInPixels[size];
}
// Update ring size and diameter
function updateRingSize(size) {
    const ringDiameter = getDiameter(size); // Obtém o diâmetro correspondente ao tamanho do anel
    const ringSize = ringDiameter; // O tamanho do anel deve ser igual ao diâmetro
    ringSizeDisplay.textContent = size;
    ring.style.width = `${ringSize}px`;
    ring.style.height = `${ringSize}px`;
    diameterValue.textContent = `${(ringDiameter / 4).toFixed(2)} mm`; // Corrigido para converter de pixels para milímetros
    ruler.style.width = `${ringSize}px`; // Ajuste para a largura da régua
    ruler.innerHTML = ''; // Limpa a régua antes de desenhar
    drawRuler(); // Desenha a régua
}

    // Event listener para o botão de diminuir
    decreaseButton.addEventListener('click', function () {
        const currentSize = parseInt(ringSizeDisplay.textContent);
        if (currentSize > 7) {
            updateRingSize(currentSize - 1);
            sizeRange.value = currentSize - 1; // Atualiza o valor do size range
        }
    });

    // Event listener para o botão de aumentar
    increaseButton.addEventListener('click', function () {
        const currentSize = parseInt(ringSizeDisplay.textContent);
        if (currentSize < 35) {
            updateRingSize(currentSize + 1);
            sizeRange.value = currentSize + 1; // Atualiza o valor do size range
        }
    });

    // Event listener para o controle de faixa de tamanho
    sizeRange.addEventListener('input', function () {
        updateRingSize(parseInt(sizeRange.value));
        ringSizeDisplay.textContent = sizeRange.value; // Atualiza o valor exibido ao lado do controle deslizante
    });

    // Inicialização
    updateRingSize(16);
});

document.addEventListener('DOMContentLoaded', function () {
    const mobileMenu = document.getElementById('mobile-menu');
    const menu = document.querySelector('nav ul');

    mobileMenu.addEventListener('click', function () {
        mobileMenu.classList.toggle('active');
        menu.classList.toggle('active');
    });
});