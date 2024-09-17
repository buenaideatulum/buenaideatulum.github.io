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
        iniciarEscaneo();
    } else {
        alert("Nombre de usuario o contraseña incorrectos");
    }
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
    const resultDiv = document.getElementById('result');
    const mensaje = document.getElementById('mensaje');
    const resetBtn = document.getElementById('resetBtn');
    
    if (decodedText === "1") {
        puntos += 1;
        resultDiv.innerText = `Puntos acumulados: ${puntos}`;
        mensaje.innerText = "";

        if (puntos >= 5) {
            mensaje.innerText = "¡Felicidades! Puedes canjear tus puntos por un gelato sencillo.";
            resetBtn.style.display = 'block';
        }
    } else if (decodedText === "0") {
        if (puntos >= 5) {
            mensaje.innerText = "Has canjeado tus puntos. ¡Disfruta tu gelato!";
            puntos = 0;
            resultDiv.innerText = `Puntos acumulados: ${puntos}`;
            resetBtn.style.display = 'none';
        } else {
            mensaje.innerText = "No tienes suficientes puntos para canjear.";
        }
    }
}

function onScanFailure(error) {
    console.warn(`Error de escaneo: ${error}`);
}

document.getElementById('resetBtn').addEventListener('click', function() {
    puntos = 0;
    document.getElementById('result').innerText = `Puntos acumulados: ${puntos}`;
    document.getElementById('resetBtn').style.display = 'none';
});
