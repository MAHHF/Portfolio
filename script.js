document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio-player');
    const playButton = document.querySelector('.play-button');
    const pauseButton = document.querySelector('.pause-button');
    const progressBar = document.getElementById('progress-bar');
    const canvas = document.getElementById('ultrasound-spectrogram');
    const ctx = canvas.getContext('2d');

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    analyser.fftSize = 1024;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    canvas.width = window.innerWidth;
    canvas.height = 200; // Feste Höhe für die Visualisierung

    function drawUltrasound() {
        requestAnimationFrame(drawUltrasound);
        analyser.getByteFrequencyData(dataArray);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / bufferLength) * 2.5;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            const value = dataArray[i];
            const y = (value / 256) * canvas.height;
            ctx.strokeStyle = `rgba(${value}, ${255 - value}, 255, 0.8)`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x, canvas.height / 2);
            ctx.lineTo(x, canvas.height / 2 - y);
            ctx.stroke();
            x += barWidth + 1;
        }
    }

    function animatePulses() {
        analyser.getByteFrequencyData(dataArray);
        
        // Durchschnittswert berechnen
        let average = 0;
        for (let i = 0; i < dataArray.length; i++) {
            average += dataArray[i];
        }
        average /= dataArray.length;

        // Anpassung der Pulsgröße basierend auf der Lautstärke
        const scale = 1 + (average / 256); // Berechneter Skalierungsfaktor
        const pulses = document.querySelectorAll('.pulse');
        pulses.forEach((pulse) => {
            pulse.style.transform = `scale(${scale})`;
            pulse.style.opacity = 0.5 + (scale - 1) * 0.5; // Ändern der Transparenz
        });

        requestAnimationFrame(animatePulses);
    }

    // Start der Animation, wenn das Audio abgespielt wird
    audio.addEventListener('play', () => {
        audioContext.resume().then(() => {
            drawUltrasound();
            animatePulses();
        });
    });

    // Play/Pause Button Event
    playButton.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        }
    });

    pauseButton.addEventListener('click', () => {
        if (!audio.paused) {
            audio.pause();
        }
    });

    // Fortschrittsanzeige aktualisieren
    audio.addEventListener('timeupdate', () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = progress + '%';
    });
});
