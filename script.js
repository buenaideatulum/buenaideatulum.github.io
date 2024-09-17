let puntos = 0;
let loggedIn = false;
let html5QrCode;

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevenir recarga

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === "admin" && password === "1234") {
        loggedIn = true;
        document.getElementById('loginDiv').style.display = 'none';
        document.getElementById('scannerDiv').style.display = 'block';
        document.getElementById('user').innerText = username;
    } else {
        alert("Nombre de usuario o contraseña incorrectos");
    }
});

document.getElementById('startScanBtn').addEventListener('click', function() {
    iniciarEscaneo();
    document.getElementById('startScanBtn').style.display = 'none';
    document.getElementById('qr-reader').style.display = 'block';
});

function iniciarEscaneo() {
    html5QrCode = new Html5Qrcode("qr-reader");

    html5QrCode.start(
        { facingMode: "environment" },  // Cámara trasera
        { fps: 10, qrbox: 250 }, 
        onScanSuccess, 
        onScanFailure
    ).catch(error => {
        console.error("Error al iniciar el escaneo: ", error);
        alert("No se puede acceder a la cámara. Verifica los permisos o usa HTTPS.");
    });
}

function onScanSuccess(decodedText) {
    const pointsElement = document.getElementById('points');
    const mensaje = document.getElementById('mensaje');
    const resetBtn = document.getElementById('resetBtn');
    
    if (decodedText === "1") {
        puntos += 1;
        pointsElement.innerText = puntos;
        mensaje.innerText = "";

        if (puntos >= 5) {
            mensaje.innerText = "¡Felicidades! Puedes canjear tus puntos por un gelato sencillo.";
            resetBtn.style.display = 'block';
        }
    } else if (decodedText === "0") {
        if (puntos >= 5) {
            mensaje.innerText = "Has canjeado tus puntos. ¡Disfruta tu gelato!";
            puntos = 0;
            pointsElement.innerText = puntos;
            resetBtn.style.display = 'none';
        } else {
            mensaje.innerText = "No tienes suficientes puntos
