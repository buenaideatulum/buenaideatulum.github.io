import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

// Tu configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDJg1Kag-ttvBkWI-AO2Mvsj4GnSRbd74E",
    authDomain: "authenticationqr-a08d4.firebaseapp.com",
    projectId: "authenticationqr-a08d4",
    storageBucket: "authenticationqr-a08d4.appspot.com",
    messagingSenderId: "230256201537",
    appId: "1:230256201537:web:7696b4351c13d4e95a9bc0",
    measurementId: "G-LQD0PNH8PT"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Registro
document.getElementById('register-btn').addEventListener('click', async () => {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, username + "@example.com", password);
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), { username, score: 0 });
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
    } catch (error) {
        alert('Error en el registro: ' + error.message);
    }
});

// Inicio de sesión
document.getElementById('login-btn').addEventListener('click', async () => {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, username + "@example.com", password);
        const user = userCredential.user;
        const docSnap = await getDoc(doc(db, "users", user.uid));
        const userData = docSnap.data();
        currentUser = user.uid;
        score = userData.score;
        document.getElementById('auth').style.display = 'none';
        document.getElementById('app').style.display = 'block';
        document.getElementById('user-name').textContent = userData.username;
        scoreDisplay.textContent = score;
        startCamera();
    } catch (error) {
        alert('Error en el inicio de sesión: ' + error.message);
    }
});

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
        scoreDisplay.textContent = score;

        // Guarda el marcador del usuario
        setDoc(doc(db, "users", currentUser), { score: score }, { merge: true });
    } else {
        output.textContent = 'No se detectó ningún código QR.';
    }
});
