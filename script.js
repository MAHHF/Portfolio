// Event Listener, der wartet, bis der DOM vollständig geladen ist, bevor der Code ausgeführt wird
document.addEventListener('DOMContentLoaded', () => {
    // Audio-Element aus dem Dokument holen
    const audio = document.getElementById('audio-player');
    
    // Buttons für Play und Pause holen
    const playButton = document.querySelector('.play-button');
    const pauseButton = document.querySelector('.pause-button');

    // Ein Canvas-Element erstellen und es zum Body der Webseite hinzufügen
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);

    // 2D-Kontext des Canvas holen, um auf dem Canvas zeichnen zu können
    const ctx = canvas.getContext('2d');

    // Einen Audio-Kontext erstellen, um die Audio-Daten zu verarbeiten
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();  // Einen Analyser-Knoten für die Frequenzanalyse erstellen

    // Eine Quelle für den Audio-Player erstellen und sie mit dem Analyser verbinden
    const source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);  // Den Analyser-Knoten mit dem Audio-Ausgang verbinden

    // Die FFT-Größe festlegen (bestimmt die Auflösung der Frequenzanalyse)
    analyser.fftSize = 512;
    const bufferLength = analyser.frequencyBinCount;  // Anzahl der Frequenzbänder
    const dataArray = new Uint8Array(bufferLength);  // Ein Array zur Speicherung der Frequenzdaten

    // Funktion, um die Canvas-Größe an die Fenstergröße anzupassen
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // Event Listener für Fenstergrößenänderungen, um die Canvas-Größe anzupassen
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();  // Die Canvas-Größe gleich beim Laden der Seite anpassen

    // Funktion, um das Pulsieren zu zeichnen
    function drawPulse() {
        // Diese Funktion wird wiederholt aufgerufen, um die Animation zu aktualisieren
        requestAnimationFrame(drawPulse);

        // Die aktuellen Frequenzdaten in das Datenarray laden
        analyser.getByteFrequencyData(dataArray);

        // Das Canvas löschen, um eine neue Frame zu zeichnen
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Mittelpunkt des Canvas berechnen
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        // Maximale Radienbegrenzung für die pulsierende Anzeige
        const maxRadius = Math.min(centerX, centerY) * 0.9;

        // Durchschnittliche Frequenz berechnen, um die Größe des äußeren Kreises zu bestimmen
        const averageFrequency = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;

        // Äußeren pulsierenden Kreis zeichnen
        const outerRadius = maxRadius * (averageFrequency / 256);
        const gradient = ctx.createRadialGradient(centerX, centerY, outerRadius * 0.3, centerX, centerY, outerRadius);
        gradient.addColorStop(0, `rgba(255, 100, 255, 0.7)`);  // Äußere Farbe
        gradient.addColorStop(1, `rgba(50, 50, 200, 0)`);  // Innere Farbe (transparent)

        ctx.beginPath();
        ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Zusätzliche pulsierende Blasen zeichnen
        for (let i = 0; i < 5; i++) {
            const angle = (Math.PI * 2 * i) / 5;  // Position der Blasen in einem Kreis
            const blobRadius = maxRadius * 0.3 * (dataArray[i * 10] / 256);  // Größe der Blase basierend auf Frequenzdaten
            const x = centerX + Math.cos(angle) * (outerRadius * 0.5);  // X-Position der Blase
            const y = centerY + Math.sin(angle) * (outerRadius * 0.5);  // Y-Position der Blase

            // Einen radialen Farbverlauf für die Blase erstellen
            const blobGradient = ctx.createRadialGradient(x, y, 0, x, y, blobRadius);
            blobGradient.addColorStop(0, `rgba(255, 200, 100, 0.7)`);  // Innere Farbe
            blobGradient.addColorStop(1, `rgba(255, 50, 50, 0)`);  // Äußere Farbe (transparent)

            ctx.beginPath();
            ctx.arc(x, y, blobRadius, 0, Math.PI * 2);
            ctx.fillStyle = blobGradient;
            ctx.fill();
        }
    }

    // Event Listener, um die Visualisierung zu starten, wenn die Wiedergabe des Audio-Elements beginnt
    audio.addEventListener('play', () => {
        audioContext.resume().then(() => {
            drawPulse();  // Die Funktion zum Zeichnen starten
        });
    });

    // Event Listener für die Play-Schaltfläche
    playButton.addEventListener('click', () => {
        if (audio.paused) audio.play();  // Audio abspielen, wenn es pausiert ist
    });

    // Event Listener für die Pause-Schaltfläche
    pauseButton.addEventListener('click', () => {
        if (!audio.paused) audio.pause();  // Audio pausieren, wenn es gerade läuft
    });
});
