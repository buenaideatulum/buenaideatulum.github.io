// Inicio de sesión
document.getElementById('login-btn').addEventListener('click', async () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Comprueba si los campos no están vacíos
    if (email === '' || password === '') {
        alert('Por favor, llena todos los campos.');
        console.log('Campos de correo o contraseña vacíos');
        return;
    }

    console.log('Intentando iniciar sesión con', email);

    signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
        // Inicio de sesión exitoso
        const user = userCredential.user;
        console.log('Inicio de sesión exitoso', user);

        // Oculta la pantalla de autenticación y muestra la pantalla de la app
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
        // Manejo de errores
        alert('Error al iniciar sesión: ' + error.message);
        console.error('Error al iniciar sesión:', error.code, error.message);
    });
});
