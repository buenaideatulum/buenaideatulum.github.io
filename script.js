document.getElementById('startScanBtn').addEventListener('click', async function() {
    try {
        const qrReader = document.getElementById('qr-reader');
        qrReader.style.display = 'block'; // Mostrar el lector de QR
        
        html5QrCode = new Html5Qrcode("qr-reader");
        await html5QrCode.start(
            { facingMode: "environment" }, // Cámara trasera
            { fps: 10, qrbox: 250 }, 
            onScanSuccess, 
            onScanFailure
        );
    } catch (error) {
        console.error("Error al iniciar el escaneo de QR: ", error); // Muestra más detalles
        alert(`No se puede acceder a la cámara. Verifica los permisos o usa HTTPS.\n\nError: ${error.message}`);
    }
});
