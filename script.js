document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const playPauseButton = document.getElementById('play-pause');
    const progressBar = document.getElementById('progress-bar');
    const soundcloudIframe = document.getElementById('soundcloud-player');
    const canvas = document.getElementById('ultrasound-spectrogram');
    const ctx = canvas.getContext('2d');

    let isPlaying = false;
    let widget;

    // Initialize SoundCloud Widget API if iframe is present
    if (soundcloudIframe) {
        widget = SC.Widget(soundcloudIframe);
    }

    // Function to load the audio or SoundCloud player
    function loadPlayer(source, isSoundCloud = false) {
        if (isSoundCloud) {
            // Show SoundCloud embed and hide local audio
            audio.style.display = 'none';
            soundcloudIframe.style.display = 'block';
            soundcloudIframe.src = `https://w.soundcloud.com/player/?url=${encodeURIComponent(source)}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`;
        } else {
            // Show local audio and hide SoundCloud embed
            soundcloudIframe.style.display = 'none';
            audio.style.display = 'block';
            audio.src = source;

            // Initialize Web Audio API for visualizations
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const analyser = audioContext.createAnalyser();
            const sourceNode = audioContext.createMediaElementSource(audio);
            sourceNode.connect(analyser);
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
            audio.addEventListener('play', () => {
                audioContext.resume().then(() => {
                    drawUltrasound();
                });
            });
        }
    }

    // Play/Pause Button Event
    playPauseButton.addEventListener('click', () => {
        if (soundcloudIframe.style.display === 'block') {
            alert('Steuerung von SoundCloud-Links erfolgt direkt im eingebetteten Player.');
        } else {
            if (isPlaying) {
                audio.pause();
                playPauseButton.style.background = 'radial-gradient(circle, #ff5722 0%, #e64a19 70%)';
            } else {
                audio.play();
                playPauseButton.style.background = 'radial-gradient(circle, #4caf50 0%, #388e3c 70%)';
            }
            isPlaying = !isPlaying;
        }
    });

    // Update Progress Bar for local audio
    audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = progress + '%';
        }
    });

    // Initialize SoundCloud Widget API events if the widget is set
    if (widget) {
        widget.bind(SC.Widget.Events.PLAY_PROGRESS, (event) => {
            const progress = (event.currentPosition / event.duration) * 100;
            progressBar.style.width = progress + '%';
        });

        widget.bind(SC.Widget.Events.READY, () => {
            widget.getCurrentSound((sound) => {
                document.querySelector('.player-title').textContent = sound.title || 'SoundCloud Track';
                document.querySelector('.player-artist').textContent = sound.user.username || 'Unbekannter Künstler';
            });
        });
    }

    // Example call to load different types of audio
    // loadPlayer('your-audio-file.mp3');
    loadPlayer('https://soundcloud.com/artist-name/track-name', true);
});
