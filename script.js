document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const playPauseButton = document.getElementById('play-pause');
    const progressBar = document.getElementById('progress-bar');
    const soundcloudEmbed = document.getElementById('soundcloud-embed');
    const soundcloudIframe = document.getElementById('soundcloud-player');

    let isPlaying = false;

    // Initialize SoundCloud Widget API if iframe is present
    let widget;
    if (soundcloudIframe) {
        widget = SC.Widget(soundcloudIframe);
    }

    // Function to load the audio or SoundCloud player
    function loadPlayer(source, isSoundCloud = false) {
        if (isSoundCloud) {
            // Show SoundCloud embed and hide local audio
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
            // Show local audio and hide SoundCloud embed
            soundcloudEmbed.style.display = 'none';
            audio.style.display = 'block';
            audio.src = source;
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
    const player = document.getElementById('custom-player');
    if (player.requestFullscreen) {
        player.requestFullscreen();
    }
});

    // Play/Pause Button Event
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

    // Example calls to load different types of audio
    // loadPlayer('your-audio-file.mp3');
    loadPlayer('https://soundcloud.com/artist-name/track-name', true);
});
