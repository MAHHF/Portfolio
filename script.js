const audio = document.getElementById('audio');
const playPauseButton = document.getElementById('play-pause');
const progressBar = document.getElementById('progress-bar');

let isPlaying = false;

// Play/Pause Button Click Event
playPauseButton.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playPauseButton.style.background = 'radial-gradient(circle, #ff5722 0%, #e64a19 70%)';
    } else {
        audio.play();
        playPauseButton.style.background = 'radial-gradient(circle, #4caf50 0%, #388e3c 70%)';
    }
    isPlaying = !isPlaying;
});

// Update Progress Bar
audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = progress + '%';
});

// Reset Progress Bar on End
audio.addEventListener('ended', () => {
    isPlaying = false;
    playPauseButton.style.background = 'radial-gradient(circle, #ff5722 0%, #e64a19 70%)';
    progressBar.style.width = '0%';
});
