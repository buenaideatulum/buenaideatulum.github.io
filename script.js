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

    // Comprueba si los campos no están vacíos
    if (email === '' || password === '') {
        alert('Por favor, llena todos los campos.');
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
        // Inicio de sesión exitoso
        const user = userCredential.user;
        document.getElementById('auth').style.display = 'none';
        document.getElementById('app').style.display = 'block';
        document.getElementById('user-name').textContent = user.email;

        // Mensaje de depuración
        console.log('Inicio de sesión exitoso:', user.email);

        score = await getUserScore(user.uid);
        scoreDisplay.textContent = score;

        startCamera();
    })
    .catch((error) => {
        alert('Error al iniciar sesión: ' + error.message);
        console.error('Error al iniciar sesión:', error);
    });
});
