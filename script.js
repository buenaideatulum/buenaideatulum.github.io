import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";

// Configuración de Firebase
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
const analytics = getAnalytics(app);

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const output = document.getElementById('output');
const scoreDisplay = document.getElementById('score');
let score = 0;

// Función para acceder a la cámara trasera
function startCamera() {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" } } })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(error => {
        console.error('Error al acceder a la cámara: ', error);
        alert('No se puede acceder a la cámara, verifica los permisos.');
    });
}

// Registro de usuario
document.getElementById('register-btn').addEventListener('click', () => {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Registro exitoso
        const user = userCredential.user;
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        console.log('Usuario registrado:', user.email);
    })
    .catch((error) => {
        alert('Error al registrarse: ' + error.message);
        console.error('Error al registrarse:', error);
    });
});

// Inicio de sesión
document.getElementById('login-btn').addEventListener('click', () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Inicio de sesión exitoso
        const user = userCredential.user;
        document.getElementById('auth').style.display = 'none';
        document.getElementById('app').style.display = 'block';
        document.getElementById('user-name').textContent = user.email;
        startCamera();
    })
    .catch((error) => {
        alert('Error al iniciar sesión: ' + error.message);
        console.error('Error al iniciar sesión:', error);
    });
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
    } else {
        output.textContent = 'No se detectó ningún código QR.';
    }
});
