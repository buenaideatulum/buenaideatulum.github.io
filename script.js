document.addEventListener('DOMContentLoaded', () => {
    // Confirmación de carga del archivo script.js
    console.log("El archivo script.js ha sido cargado.");

    // Registro de usuario
    document.getElementById('register-btn').addEventListener('click', () => {
        console.log('Botón de registro presionado');
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;

        if (username && password) {
            // Guarda el usuario en localStorage
            localStorage.setItem(username, JSON.stringify({ password: password, score: 0 }));
            alert('Registro exitoso. Ahora puedes iniciar sesión.');
            console.log(`Usuario registrado: ${username}`);
        } else {
            alert('Por favor, completa los campos.');
            console.log('Faltan datos en el formulario de registro');
        }
    });

    // Inicio de sesión
    document.getElementById('login-btn').addEventListener('click', () => {
        console.log('Botón de inicio de sesión presionado');
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        const user = JSON.parse(localStorage.getItem(username));

        if (user && user.password === password) {
            // Inicio de sesión exitoso
            currentUser = username;
            score = user.score;
            document.getElementById('auth').style.display = 'none';
            document.getElementById('app').style.display = 'block';
            document.getElementById('user-name').textContent = username;
            scoreDisplay.textContent = score;
            startCamera();
            console.log(`Usuario ${username} inició sesión con éxito`);
        } else {
            alert('Usuario o contraseña incorrectos.');
            console.log('Datos incorrectos en el inicio de sesión');
        }
    });

    // Aquí irían las demás funciones como el escaneo de QR
});
