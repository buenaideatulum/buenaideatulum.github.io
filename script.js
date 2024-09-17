// Importa e inicializa Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

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

// Elementos del DOM
const registerBtn = document.getElementById('register-btn');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const appDiv = document.getElementById('app');
const authDiv = document.getElementById('auth');
const userNameSpan = document.getElementById('user-name');

// Registro de usuario
registerBtn.addEventListener('click', async () => {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        alert('Registro exitoso');
        console.log(`Usuario registrado: ${user.email}`);
    } catch (error) {
        alert(`Error en el registro: ${error.message}`);
        console.error(error);
    }
});

// Inicio de sesión
loginBtn.addEventListener('click', async () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        authDiv.style.display = 'none';
        appDiv.style.display = 'block';
        userNameSpan.textContent = user.email;
        console.log(`Usuario inició sesión: ${user.email}`);
    } catch (error) {
        alert(`Error al iniciar sesión: ${error.message}`);
        console.error(error);
    }
});

// Cerrar sesión
logoutBtn.addEventListener('click', async () => {
    try {
        await signOut(auth);
        authDiv.style.display = 'block';
        appDiv.style.display = 'none';
        console.log('Usuario cerró sesión');
    } catch (error) {
        alert(`Error al cerrar sesión: ${error.message}`);
        console.error(error);
    }
});
