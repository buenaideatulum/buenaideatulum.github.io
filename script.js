// Importa los módulos necesarios desde Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";

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
const analytics = getAnalytics(app);

// Registro de usuario
document.getElementById('register-btn').addEventListener('click', () => {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Registro exitoso
            const user = userCredential.user;
            alert('Registro exitoso');
            console.log(`Usuario registrado: ${user.email}`);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`Error: ${errorMessage}`);
            console.error(`Error en registro: ${errorCode} - ${errorMessage}`);
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
            console.log(`Usuario iniciado sesión: ${user.email}`);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`Error: ${errorMessage}`);
            console.error(`Error en inicio de sesión: ${errorCode} - ${errorMessage}`);
        });
});

// Monitorea el estado de autenticación
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Usuario está autenticado
        document.getElementById('auth').style.display = 'none';
        document.getElementById('app').style.display = 'block';
        document.getElementById('user-name').textContent = user.email;
    } else {
        // Usuario no está autenticado
        document.getElementById('auth').style.display = 'block';
        document.getElementById('app').style.display = 'none';
    }
});
