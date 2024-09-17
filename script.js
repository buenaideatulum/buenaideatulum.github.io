// Inicialización de los puntos
let puntos = 0;
let html5QrCode = new Html5Qrcode("qr-reader");

console.log("JavaScript cargado correctamente.");  // Mensaje de depuración para verificar que el archivo JS se ha cargado.

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

// Verificar si se puede acceder a la cámara
async function iniciarEscaneo() {
    try {
        console.log("Intentando iniciar el escaneo...");
        
        await html5QrCode.start(
            { facingMode: { exact: "environment" } },  // Cámara trasera
            { fps: 10, qrbox: 250 }, 
            onScanSuccess, 
            onScanFailure
        );

        console.log("Escaneo iniciado correctamente.");
    } catch (error) {
        console.error("Error al iniciar el escaneo: ", error);
        alert(`No se puede acceder a la cámara. Verifica los permisos o usa HTTPS.\n\nError: ${error.message}`);
    }
}

iniciarEscaneo();  // Iniciar el escaneo al cargar la página.
