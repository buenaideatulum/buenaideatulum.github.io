import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
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
const db = getFirestore(app);
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

// Función para guardar el marcador del usuario en Firestore
async function saveScore(userId, newScore) {
    const userDoc = doc(db, "users", userId);
    try {
        // Actualiza el marcador del usuario
        await updateDoc(userDoc, { score: newScore });
    } catch (error) {
        // Si el usuario no existe, lo crea con el marcador inicial
        await setDoc(userDoc, { score: newScore });
    }
}

// Función para obtener el marcador del usuario desde Firestore
async function getUserScore(userId) {
    const userDoc = doc(db, "users", userId);
    const docSnap = await getDoc(userDoc);

    if (docSnap.exists()) {
        return docSnap.data().score;
    } else {
        return 0; // Si no tiene marcador, se inicia en 0
    }
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
document.getElementById('login-btn').addEventListener('click', async () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
        // Inicio de sesión exitoso
        const user = userCredential.user;
        document.getElementById('auth').style.display = 'none';
        document.getElementById('app').style.display = 'block';
        document.getElementById('user-name').textContent = user.email;
        
        // Mensaje de depuración
        console.log('Pantalla de Autenticación oculta y Pantalla de Escaneo mostrada.');

        score = await getUserScore(user.uid);
        scoreDisplay.textContent = score;

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
        if (score < 5) {  // Verifica si el score es menor a 5
            score++;      // Incrementa el score
            if (score === 5) { // Mostrar el mensaje de felicitación
                const messageContent = document.getElementById('message-content');
                messageContent.textContent = "¡Felicidades! Has juntado 5 puntos, ¡tienes un café gratis!";
                document.getElementById('congrats-message').style.display = 'block';
            }
        }
    } else if (qrCode.data === "0") {
            score = 0;      // Reinicia el score
            alert('¡Lo lograste! Tienes un café gratis hoy.');
        }
        scoreDisplay.textContent = score;

        // Guarda el marcador actualizado en Firestore
        const userId = auth.currentUser.uid;
        saveScore(userId, score);
    } else {
        output.textContent = 'No se detectó ningún código QR.';
    }
});
