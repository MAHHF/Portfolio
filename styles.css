document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio-player');
    const playButton = document.querySelector('.play-button');
    const pauseButton = document.querySelector('.pause-button');
    const canvas = document.getElementById('visualizer-canvas');
    const ctx = canvas.getContext('2d');

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    analyser.fftSize = 512;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function drawVisualizer() {
        requestAnimationFrame(drawVisualizer);
        analyser.getByteFrequencyData(dataArray);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Fixe Zentrierung, mit 400px vom oberen Rand
        const centerX = canvas.width / 2;
        const centerY = 400; // Fixe Position 400px vom Top

        // Berechnung des durchschnittlichen Frequenzwerts für den Radius
        const averageFrequency = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
        const radius = Math.min(canvas.width, canvas.height) * (averageFrequency / 512); // Skaliert den Radius

        // Weicher pulsierender Effekt
        const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.2, centerX, centerY, radius);
        gradient.addColorStop(0, 'rgba(255, 100, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
    }

    // Start der Visualisierung
    audio.addEventListener('play', () => {
        audioContext.resume().then(() => {
            drawVisualizer();
        });
    });

    // Play/Pause-Buttons
    playButton.addEventListener('click', () => {
        if (audio.paused) audio.play();
    });
    pauseButton.addEventListener('click', () => {
        if (!audio.paused) audio.pause();
    });
});
