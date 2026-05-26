
let myProgressBar = document.getElementById('myprogressbar');
let masterPlay = document.getElementById('masterPlay');
let nextBtn = document.getElementById('nextbtn');
let gif = document.getElementById('gif');
let SongIndex = 0;
let songs = [
    { songName: "FUNK-SERENO", filePath: "FUNK SERENO - ICEDMANE.mp3" },
    { songName: "SHIV AMITDHARA", filePath: "Sampoorna Shiv Amritwani Complete By Anuradha Paudwal Full Audio Song Juke Box I Shri Shiv Amritwani(MP3_160K).mp3", },
    { songName: "MERI JINDGI SAWARI", filePath: "Tere Jaisa Yaar Kahan (Lyrical Video)  Kishore Kumar  Yaarana  Revibe  Hindi Songs.mp3" },
    { songName: "EAGLE SONG", filePath: "Wyr Gemi - Eagle-Downringtone.com.mp3" },
    { songName: "HANUMAN CHALISA", filePath: "हनुमान चालीसा Hanuman Chalisa I GULSHAN KUMAR I HARIHARAN_ Full HD Video I Shree Hanuman Chalisa(MP3_160K).mp3" },
];

let audioElement = new Audio();
audioElement.src = songs[SongIndex].filePath;
document.addEventListener('DOMContentLoaded', () => {
    masterPlay.addEventListener('click', () => {
        console.log('Play button clicked');
        if (audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.play();
            masterPlay.textContent = '⏸';
            gif.style.opacity = 1;
            console.log('Playing...');
        } else {
            audioElement.pause();
            masterPlay.textContent = '▶';
            gif.style.opacity = 0;
            console.log('Paused');
        }
    });

    nextBtn.addEventListener('click', () => {
        SongIndex = (SongIndex + 1) % songs.length;
        audioElement.src = songs[SongIndex].filePath;
        audioElement.play();
        masterPlay.textContent = '⏸';
        gif.style.opacity = 1;
        console.log('Playing: ' + songs[SongIndex].songName);
    });

    audioElement.addEventListener('timeupdate', () => {
        progress = (audioElement.currentTime / audioElement.duration) * 100;
        myProgressBar.value = progress;
    });
    myProgressBar.addEventListener('change', () => {
        audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
    });
});
