// Función para escanear QR
document.getElementById('take-photo').addEventListener('click', () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const qrCode = jsQR(imageData.data, canvas.width, canvas.height);

    if (qrCode) {
        output.textContent = `Código QR detectado: ${qrCode.data}`;
        if (qrCode.data === "1") {
            score++;
        } else if (qrCode.data === "0") {
            score = 0;
            alert('¡Lo lograste! Tienes un café gratis hoy.');
        }
        
        // Verificar si el marcador ha llegado a 5
        if (score === 5) {
            displayCongratsMessage();
        }

        scoreDisplay.textContent = score;

        // Guarda el marcador actualizado en Firestore
        const userId = auth.currentUser.uid;
        saveScore(userId, score);
    } else {
        output.textContent = 'No se detectó ningún código QR.';
    }
});

// Función para mostrar el mensaje de celebración
function displayCongratsMessage() {
    const congratsMessage = document.createElement('div');
    congratsMessage.innerHTML = `
        <div class="glass-message">
            <h2>¡Felicidades!</h2>
            <p>Has reunido 5 compras, ahora puedes canjear este logro por un café.</p>
        </div>
    `;
    document.body.appendChild(congratsMessage);

    // Confeti
    confetti.start(2000);  // Duración de 2 segundos
}
