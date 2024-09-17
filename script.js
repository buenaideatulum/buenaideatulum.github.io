// Inicializa Firebase Authentication y Firestore
const auth = firebase.auth();
const db = firebase.firestore();

// Registro de usuarios
document.getElementById('register-btn').addEventListener('click', () => {
    const email = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Usuario registrado exitosamente
            const user = userCredential.user;

            // Guardar usuario en Firestore
            db.collection('users').doc(user.uid).set({
                email: email,
                score: 0 // Inicializa el marcador en 0
            })
            .then(() => {
                alert('Registro exitoso. Ahora puedes iniciar sesión.');
            })
            .catch((error) => {
                console.error('Error al guardar el usuario en Firestore:', error);
            });
        })
        .catch((error) => {
            console.error('Error al registrar el usuario:', error);
            alert(error.message);
        });
});
