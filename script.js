// Importa las funciones necesarias de Firebase
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

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
const auth = getAuth();

// Función para registrar usuarios
document.getElementById('register-btn').addEventListener('click', () => {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    createUserWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
    })
    .catch((error) => {
        console.error('Error en el registro:', error);
        alert('Error en el registro.');
    });
});

// Función para iniciar sesión
document.getElementById('login-btn').addEventListener('click', () => {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    signInWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
        const user = userCredential.user;
        document.getElementById('auth').style.display = 'none';
        document.getElementById('app').style.display = 'block';
        document.getElementById('user-name').textContent = user.email;
        startCamera();
    })
    .catch((error) => {
        console.error('Error al iniciar sesión:', error);
        alert('Usuario o contraseña incorrectos.');
    });
});

// Función para acceder a la cámara
function startCamera() {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" } } })
    .then(stream => {
        const video = document.getElementById('video');
        video.srcObject = stream;
    })
    .catch(error => {
        console.error('Error al acceder a la cámara:', error);
        alert('No se puede acceder a la cámara, verifica los permisos.');
    });
}

// Función para tomar la foto y escanear el código QR
document.getElementById('take-photo').addEventListener('click', () => {
    const canvas = document.getElementById('canvas');
    const video = document.getElementById('video');
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const qrCode = jsQR(imageData.data, canvas.width, canvas.height);
    
    if (qrCode) {
        document.getElementById('output').textContent = `Código QR detectado: ${qrCode.data}`;
        if (qrCode.data === "1") {
            updateScore(1);
        } else if (qrCode.data === "0") {
            updateScore(0);
            alert('¡Lo lograste! Tienes un café gratis hoy.');
        }
    } else {
        document.getElementById('output').textContent = 'No se detectó ningún código QR.';
    }
});

// Función para actualizar el marcador del usuario
function updateScore(points) {
    const scoreDisplay = document.getElementById('score');
    let currentScore = parseInt(scoreDisplay.textContent);

    if (points === 0) {
        currentScore = 0;
    } else {
        currentScore += points;
    }

    scoreDisplay.textContent = currentScore;
}
