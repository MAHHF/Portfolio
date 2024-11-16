document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("waveCanvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = "logos/your-image.png"; // Pfad zu deinem Bild

    let time = 0;
    let isHovered = false; // Flag, um den Hover-Status zu verfolgen

    // Funktion, um die Wellenanimation zu erstellen
    function drawWave() {
        if (!isHovered) return; // Verhindern, dass Animation läuft, wenn nicht gehovered

        ctx.clearRect(0, 0, canvas.width, canvas.height); // Canvas leeren

        const waveHeight = 20; // Höhe der Wellen
        const waveLength = 50; // Wellenlänge
        const speed = 0.1; // Geschwindigkeit

        // Berechnung für Wellen
        for (let y = 0; y < canvas.height; y++) {
            const offset = waveHeight * Math.sin((y / waveLength) + time); // Berechnung der Verschiebung
            ctx.drawImage(
                img,
                0, y, img.width, 1, // Bildteil
                offset, y, img.width, 1 // Position auf Canvas
            );
        }

        time += speed; // Zeit für die Animation aktualisieren
        requestAnimationFrame(drawWave); // Neue Animation anfordern
    }

    // Bild wird geladen und Animation gestartet
    img.onload = () => {
        canvas.width = img.width; // Breite auf Bildgröße setzen
        canvas.height = img.height; // Höhe auf Bildgröße setzen
        drawWave(); // Animation starten
    };

    // Starten der Animation bei Hover
    canvas.addEventListener('mouseover', () => {
        isHovered = true;
        drawWave(); // Animation starten
    });

    // Stoppen der Animation bei Verlassen des Canvas
    canvas.addEventListener('mouseout', () => {
        isHovered = false; // Animation stoppen
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Canvas leeren, wenn Hover endet
    });
});
