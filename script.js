// Inicialización de los puntos
let puntos = 0;
let html5QrCode = new Html5Qrcode("qr-reader");

function onScanSuccess(decodedText) {
    console.log(`Código escaneado: ${decodedText}`);
    
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

// Iniciar escaneo automáticamente al cargar la página
html5QrCode.start(
    { facingMode: { exact: "environment" } }, // Cámara trasera
    { fps: 10, qrbox: 250 }, 
    onScanSuccess, 
    onScanFailure
);
