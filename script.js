document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const playPauseButton = document.getElementById('play-pause');
    const progressBar = document.getElementById('progress-bar');
    const soundcloudEmbed = document.getElementById('soundcloud-embed');

    let isPlaying = false;

    // Dynamisch Content laden
    function loadPlayer(source, isSoundCloud = false) {
        if (isSoundCloud) {
            // SoundCloud-Embed anzeigen
            audio.style.display = 'none';
            soundcloudEmbed.style.display = 'block';
            soundcloudEmbed.innerHTML = `
                <iframe 
                    width="100%" 
                    height="300" 
                    scrolling="no" 
                    frameborder="no" 
                    allow="autoplay" 
                    src="https://w.soundcloud.com/player/?url=${encodeURIComponent(source)}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true">
                </iframe>`;
        } else {
            // Lokale Datei abspielen
            soundcloudEmbed.style.display = 'none';
            audio.style.display = 'block';
            audio.src = source;
        }
    }

    // Play/Pause Button
    playPauseButton.addEventListener('click', () => {
        if (soundcloudEmbed.style.display === 'block') {
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

    // Update Progress Bar für lokale Datei
    audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = progress + '%';
        }
    });

    // Beispielaufrufe
    // Lokale MP3-Datei laden
    // loadPlayer('your-audio-file.mp3');

    // SoundCloud-Track laden
    loadPlayer('https://soundcloud.com/artist-name/track-name', true);
});
