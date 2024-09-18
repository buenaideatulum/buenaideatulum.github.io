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
const maxScore = 5;

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
        
        // Obtiene el marcador del usuario desde Firestore
        score = await getUserScore(user.uid);
        scoreDisplay.textContent = score;

        // Inicia la cámara
        startCamera();
    })
    .catch((error) => {
        alert('Error al iniciar sesión: ' + error.message);
        console.error('Error al iniciar sesión:', error);
    });
});

// Escanear código QR
document.getElementById('take-photo').addEventListener('click', function() {
    if (score < maxScore) {
        // Simular el escaneo del código QR y sumar al marcador
        score++;
        scoreDisplay.textContent = score;

        // Guarda el nuevo marcador en Firestore
        saveScore(auth.currentUser.uid, score);

        // Si el marcador alcanza el máximo, mostrar el mensaje de logro y confeti
        if (score === maxScore) {
            showAchievement();
        }
    }
});

function showAchievement() {
    // Mostrar mensaje de logro
    output.textContent = "¡Has reunido 5 compras, ahora puedes canjear este logro por un café!";
    output.style.color = "blue"; // Color agradable y amigable
    output.style.fontSize = "1.5em"; // Tamaño más grande
    output.style.fontWeight = "bold";
    output.style.display = 'block';

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
