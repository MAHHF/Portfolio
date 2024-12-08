document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('ultrasound-spectrogram');
    const ctx = canvas.getContext('2d');
    const audio = new Audio('path-to-your-audio-file.mp3'); // Deine Audiodatei hier einfügen
    const playButton = document.querySelector('.play-button');
    const pauseButton = document.querySelector('.pause-button');
    const progressBar = document.getElementById('progress-bar');

    // Audio Context und Analyser initialisieren
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    analyser.fftSize = 1024;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // Canvas-Größe einstellen
    canvas.width = window.innerWidth;
    canvas.height = 200;

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

    // Play/Pause-Funktionalität
    playButton.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            audioContext.resume().then(() => {
                drawUltrasound();
            });
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

    // Audio automatisch abspielen und das Spektrogramm starten
    audio.addEventListener('play', () => {
        audioContext.resume().then(() => {
            drawUltrasound();
        });
    });
});
