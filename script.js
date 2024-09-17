// Registro
document.getElementById('register-btn').addEventListener('click', () => {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    if (username && password) {
        // Guarda el usuario en localStorage
        localStorage.setItem(username, JSON.stringify({ password: password, score: 0 }));
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
    } else {
        alert('Por favor, completa los campos.');
    }
});
