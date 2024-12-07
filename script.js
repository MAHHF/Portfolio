
// Audio-Element und Visualisierungscontainer referenzieren
const audio = document.getElementById('audio');
const container = document.getElementById('visualization-container');
const pulses = document.querySelectorAll('.pulse');

// Web Audio API initialisieren
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();
const source = audioContext.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(audioContext.destination);

// Einstellungen für die Analyse
analyser.fftSize = 256;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

// Animations-Funktion
function animate() {
    analyser.getByteFrequencyData(dataArray);

    // Die Lautstärke aus den Frequenzdaten berechnen
    let average = 0;
    for (let i = 0; i < dataArray.length; i++) {
        average += dataArray[i];
    }
    average /= dataArray.length;

    // Die Größe der pulsierenden Formen basierend auf der Lautstärke einstellen
    pulses.forEach((pulse, index) => {
        let scale = 1 + (average / 256);
        pulse.style.transform = `scale(${scale})`;
    });

    requestAnimationFrame(animate);
}

// Audio starten und Animation starten
audio.onplay = () => {
    audioContext.resume().then(() => {
        animate();
    });
};
