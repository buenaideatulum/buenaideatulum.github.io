document.getElementById('take-photo').addEventListener('click', () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const qrCode = jsQR(imageData.data, canvas.width, canvas.height);

    if (qrCode) {
        output.textContent = `Código QR detectado: ${qrCode.data}`;
        if (qrCode.data === "1" && score < 5) {
            score++;
        }
        if (score === 5) {
            alert('Felicidades, tienes un café gratis');
            // Mostrar un mensaje de felicitaciones en lugar de la alerta
            const congratsMessage = document.createElement('div');
            congratsMessage.className = 'congrats-message glass';
            congratsMessage.textContent = 'Felicidades, tienes un café gratis';
            document.body.appendChild(congratsMessage);
        }
        scoreDisplay.textContent = score;

        // Guarda el marcador actualizado en Firestore
        const userId = auth.currentUser.uid;
        saveScore(userId, score);
    } else {
        output.textContent = 'No se detectó ningún código QR.';
    }
});
