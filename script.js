const audio = new Audio('path-to-your-audio-file.mp3');
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

// Canvas-Setup
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Funktion zum Zeichnen des Ultraschall-Effekts
function drawUltrasound() {
    requestAnimationFrame(drawUltrasound);
    analyser.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const barWidth = (canvas.width / bufferLength) * 2.5;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
        const value = dataArray[i];
        const y = (value / 256) * canvas.height; // Normierte Höhe
        const barHeight = canvas.height - y;

        // Verwende einen Farbverlauf für die Wellen-Visualisierung
        ctx.strokeStyle = `rgba(${value}, ${255 - value}, 255, 0.8)`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, canvas.height / 2);
        ctx.lineTo(x, canvas.height / 2 - y);
        ctx.stroke();

        x += barWidth + 1;
    }
}

// Audio starten und das Spektrogramm zeichnen
audio.play();
audioContext.resume().then(() => {
    drawUltrasound();
});
