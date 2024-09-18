let score = 0;
const maxScore = 5;

document.getElementById("take-photo").addEventListener("click", function() {
    if (score < maxScore) {
        // Simular el escaneo del código QR y sumar al marcador
        score++;
        document.getElementById("score").textContent = score;

        // Si el marcador alcanza el máximo, mostrar el mensaje de logro y confeti
        if (score === maxScore) {
            showAchievement();
        }
    }
});

function showAchievement() {
    // Mostrar mensaje de logro
    const output = document.getElementById("output");
    output.textContent = "¡Has reunido 5 compras, ahora puedes canjear este logro por un café!";
    output.style.color = "#5f72ff"; // Color azul para el texto
    output.style.fontSize = "1.5em"; // Tamaño más grande
    output.style.fontWeight = "bold";

    // Mostrar confeti
    launchConfetti();
}

function launchConfetti() {
    const confettiCanvas = document.createElement("canvas");
    confettiCanvas.id = "confettiCanvas";
    confettiCanvas.style.position = "fixed";
    confettiCanvas.style.top = 0;
    confettiCanvas.style.left = 0;
    confettiCanvas.style.width = "100%";
    confettiCanvas.style.height = "100%";
    document.body.appendChild(confettiCanvas);

    const confettiSettings = { target: confettiCanvas };
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();

    // Detener el confeti después de unos segundos
    setTimeout(() => {
        confetti.clear();
        document.body.removeChild(confettiCanvas);
    }, 5000);
}
