// Welcome message to console for debugging
console.log("Welcome to Joytify");
document.addEventListener('DOMContentLoaded', () => {
    // ========== INITIALIZE VARIABLES ==========
    let songIndex = 0;
    let audioElement = new Audio('MONTAGEM ALQUIMIA - h6itam.mp3');
    let masterPlay = document.getElementById('masterPlay');
    let myProgressBar = document.getElementById('myprogressbar');
    let gif = document.getElementById('gif');
    // Array of song objects containing metadata for each song (name, file path, coverpath)
    let songs = [
        { songName: "NCS-MORTALS", filePath: "songs/1.mp3", coverPath: "covers/1.mp3" },
        { songName: "MONTEGEM-ALIQIMIA", filePath: ".vscode/MONTAGEM ALQUIMIA - h6itam.mp3", coverPath: "covers/1.mp3" },
        { songName: "FUNK-SERENO", filePath: "songs/3.mp3", coverPath: "covers/3.mp3" },
        { songName: "FATHER SAAB", filePath: "songs/4.mp3", coverPath: "covers/4.mp3" },
        { songName: "SHIV AMITDHARA", filePath: "songs/5.mp3", coverPath: "covers/5.mp3" },
        { songName: "MERI JINDGI SAWARI", filePath: "songs/6.mp3", coverPath: "covers/6.mp3" },
        { songName: "EAGLE SONG", filePath: "songs/7.mp3", coverPath: "covers/7.mp3" },
        { songName: "WORKOUT HANUMAN CHALISA", filePath: "songs/8.mp3", coverPath: "covers/8.mp3" },
        { songName: "PAL EK PAL", filePath: "songs/9.mp3", coverPath: "covers/9.mp3" },
    ];
    songs.forEach((element) => {

    });
    // ========== PLAY/PAUSE BUTTON EVENT LISTENER ==========
    // Handle play/pause button click
    masterPlay.addEventListener('click', () => {
        console.log('Play button clicked');
        // Check if audio is paused or hasn't started yet
        if (audioElement.paused || audioElement.currentTime <= 0) {
            // Start playing the audio
            audioElement.play();
            // Change button icon from play (▶) to pause (⏸)
            masterPlay.textContent = '⏸';
            // Show animated music GIF by setting opacity to visible
            gif.style.opacity = 1;
            console.log('Playing...');
        } else {
            // Pause the audio if it's currently playing
            audioElement.pause();
            // Change button icon from pause (⏸) to play (▶)
            masterPlay.textContent = '▶';
            // Hide animated music GIF by setting opacity to hidden
            gif.style.opacity = 0;
            console.log('Paused');
        }
    });
    // ========== PROGRESS BAR UPDATE EVENT LISTENER ==========
    // Update progress bar as the song plays
    audioElement.addEventListener('timeupdate', () => {
        // Calculate progress percentage (current time / total duration * 100)
         progress = (audioElement.currentTime / audioElement.duration) * 100;
        // Update progress bar value
        myProgressBar.value = progress;
    });
    // ========== PROGRESS BAR SEEK EVENT LISTENER ==========
    // Allow user to seek to different part of song by dragging progress bar
    myProgressBar.addEventListener('change', () => {
        // Calculate time to seek (percentage * total duration)
        audioElement.currentTime = myProgressBar.value*audioElement.duration/100;
    });
});
  