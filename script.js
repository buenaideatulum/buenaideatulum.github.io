// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id",
    measurementId: "your-measurement-id"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Función para iniciar sesión
document.getElementById('login-btn').addEventListener('click', () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Usuario autenticado correctamente
        const user = userCredential.user;
        console.log('Usuario autenticado:', user);

        // Muestra la pantalla principal
        document.getElementById('auth').style.display = 'none';
        document.getElementById('app').style.display = 'block';
    })
    .catch((error) => {
        // Maneja errores de autenticación
        console.error('Error al iniciar sesión:', error);
        alert('Error al iniciar sesión: ' + error.message);
    });
});

// Función para registrar un nuevo usuario
document.getElementById('register-btn').addEventListener('click', () => {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Usuario registrado correctamente
        const user = userCredential.user;
        console.log('Usuario registrado:', user);

        // Muestra la pantalla principal
        document.getElementById('auth').style.display = 'none';
        document.getElementById('app').style.display = 'block';
    })
    .catch((error) => {
        // Maneja errores de registro
        console.error('Error al registrar usuario:', error);
        alert('Error al registrar usuario: ' + error.message);
    });
});
