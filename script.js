document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("waveCanvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = "logos/your-image.png"; // Pfad zu deinem Bild

    let time = 0;

    // Funktion, um die Wellenanimation zu erstellen
    function drawWave() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const waveHeight = 20; // Höhe der Wellen
        const waveLength = 50; // Wellenlänge
        const speed = 0.1; // Geschwindigkeit

        for (let y = 0; y < img.height; y++) {
            const offset = waveHeight * Math.sin((y / waveLength) + time);
            ctx.drawImage(
                img,
                0, y, img.width, 1,
                offset, y, img.width, 1
            );
        }

        time += speed;
        requestAnimationFrame(drawWave);
    }

    // Bild wird geladen und Animation gestartet
    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        drawWave();
    };
});
