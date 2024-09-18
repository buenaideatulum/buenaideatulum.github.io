// Función para obtener la fecha actual en formato YYYY-MM-DD
function getTodayDate() {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Formato: YYYY-MM-DD
}

// Función para guardar el marcador del usuario y la última fecha de escaneo en Firestore
async function saveScore(userId, newScore) {
    const userDoc = doc(db, "users", userId);
    const today = getTodayDate();
    try {
        // Actualiza el marcador del usuario y la fecha del último escaneo
        await updateDoc(userDoc, { score: newScore, lastScanned: today });
    } catch (error) {
        // Si el usuario no existe, lo crea con el marcador inicial y la fecha del último escaneo
        await setDoc(userDoc, { score: newScore, lastScanned: today });
    }
}

// Función para obtener el marcador y la última fecha de escaneo del usuario desde Firestore
async function getUserScore(userId) {
    const userDoc = doc(db, "users", userId);
    const docSnap = await getDoc(userDoc);

    if (docSnap.exists()) {
        const data = docSnap.data();
        return { score: data.score, lastScanned: data.lastScanned };
    } else {
        return { score: 0, lastScanned: null }; // Si no tiene marcador, se inicia en 0
    }
}

// Función para escanear QR
document.getElementById('take-photo').addEventListener('click', async () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const qrCode = jsQR(imageData.data, canvas.width, canvas.height);

    if (qrCode) {
        const userId = auth.currentUser.uid;
        const { score, lastScanned } = await getUserScore(userId);
        const today = getTodayDate();

        // Verifica si ya se escaneó un QR hoy
        if (lastScanned === today) {
            alert('Ya has escaneado un código hoy. Intenta de nuevo mañana.');
        } else {
            if (score < 5) {
                score++; // Solo suma si el marcador es menor a 5
                if (score === 5) {
                    alert('Felicidades, tienes un café gratis');
                }
            } else {
                alert('Tu marcador ya está en 5, ¡disfruta tu café gratis!');
            }
            
            scoreDisplay.textContent = score;
            saveScore(userId, score);
        }

        output.textContent = `Código QR detectado: ${qrCode.data}`;
    } else {
        output.textContent = 'No se detectó ningún código QR.';
    }
});
