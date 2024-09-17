// Inicialización de los puntos
let puntos = 0;
let html5QrCode;

// Función que se ejecuta cuando se escanea un QR con éxito
function onScanSuccess(decodedText) {
    console.log(`Código escaneado: ${decodedText}`);
    
    const resultDiv = document.getElementById('result');
    const mensaje = document.getElementById('mensaje');
    const resetBtn = document.getElementById('resetBtn');
    
    if (decodedText === "1") {
        // Sumar puntos
        puntos += 1;
        resultDiv.innerText = `Puntos acumulados: ${puntos}`;
        mensaje.innerText = ""; // Limpiar mensajes anteriores

        // Si acumula 5 puntos, mostrar mensaje de canje
        if (puntos >= 5) {
            mensaje.innerText = "¡Felicidades! Puedes canjear tus puntos por un gelato sencillo.";
            resetBtn.style.display = 'block';
        }
    } else if (decodedText === "0") {
        // Canjear puntos (reiniciar los puntos)
        if (puntos >= 5) {
            mensaje.innerText = "Has canjeado tus puntos. ¡Disfruta tu gelato!";
            puntos = 0;
            resultDiv.innerText = `Puntos acumulados: ${puntos}`;
            resetBtn.style.display = 'none'; // Ocultar el botón después de canjear
        } else {
            // Si no tiene suficientes puntos, mostrar mensaje
            mensaje.innerText = "No tienes suficientes puntos para canjear.";
        }
    }
}

// Función que se ejecuta si el escaneo falla
function onScanFailure(error) {
    console.warn(`Error de escaneo: ${error}`);
}

// Inicialización del lector de QR al hacer clic en el botón
document.getElementById('startScanBtn').addEventListener('click', async function() {
    try {
        // Verificar si el navegador permite acceso a la cámara
        const qrReader = document.getElementById('qr-reader');
        qrReader.style.display = 'block'; // Mostrar el lector de QR
        
        // Asincronía para iniciar el escaneo
        html5QrCode = new Html5Qrcode("qr-reader");
        await html5QrCode.start(
            { facingMode: "environment" }, // Cámara trasera
            { fps: 10, qrbox: 250 }, 
            onScanSuccess, 
            onScanFailure
        );
    } catch (error) {
        console.error("Error al iniciar el escaneo de QR: ", error);
        alert("No se puede acceder a la cámara. Verifica los permisos o usa HTTPS.");
    }
});

// Función para reiniciar los puntos manualmente si es necesario
document.getElementById('resetBtn').addEventListener('click', function() {
    puntos = 0;
    document.getElementById('result').innerText = `Puntos acumulados: ${puntos}`;
    document.getElementById('mensaje').innerText = "";
    document.getElementById('resetBtn').style.display = 'none';
});
