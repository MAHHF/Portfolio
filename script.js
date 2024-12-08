document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio-player');
    const playButton = document.querySelector('.play-button');
    const pauseButton = document.querySelector('.pause-button');
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);

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

    function drawPulse() {
        requestAnimationFrame(drawPulse);
        analyser.getByteFrequencyData(dataArray);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const maxRadius = Math.min(centerX, centerY) * 0.9;

        const averageFrequency = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;

        // Outer pulsating circle
        const outerRadius = maxRadius * (averageFrequency / 256);
        const gradient = ctx.createRadialGradient(centerX, centerY, outerRadius * 0.3, centerX, centerY, outerRadius);
        gradient.addColorStop(0, `rgba(255, 100, 255, 0.7)`);
        gradient.addColorStop(1, `rgba(50, 50, 200, 0)`);

        ctx.beginPath();
        ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Additional pulsating blobs
        for (let i = 0; i < 5; i++) {
            const angle = (Math.PI * 2 * i) / 5;
            const blobRadius = maxRadius * 0.3 * (dataArray[i * 10] / 256);
            const x = centerX + Math.cos(angle) * (outerRadius * 0.5);
            const y = centerY + Math.sin(angle) * (outerRadius * 0.5);

            const blobGradient = ctx.createRadialGradient(x, y, 0, x, y, blobRadius);
            blobGradient.addColorStop(0, `rgba(255, 200, 100, 0.7)`);
            blobGradient.addColorStop(1, `rgba(255, 50, 50, 0)`);

            ctx.beginPath();
            ctx.arc(x, y, blobRadius, 0, Math.PI * 2);
            ctx.fillStyle = blobGradient;
            ctx.fill();
        }
    }

    // Start visualization when audio plays
    audio.addEventListener('play', () => {
        audioContext.resume().then(() => {
            drawPulse();
        });
    });

    // Play/Pause Buttons
    playButton.addEventListener('click', () => {
        if (audio.paused) audio.play();
    });
    pauseButton.addEventListener('click', () => {
        if (!audio.paused) audio.pause();
    });
});
