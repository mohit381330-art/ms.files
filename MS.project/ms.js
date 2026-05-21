
    let myProgressBar = document.getElementById('myprogressbar');
    let masterPlay = document.getElementById('masterPlay');
    let gif = document.getElementById('gif');
    let currentSongIndex = 0;
    let songs = [
        { songName: "MONTEGEM-ALIQIMIA", filePath: "MONTAGEM ALQUIMIA - h6itam.mp3", coverPath: "covers/1.mp3" },
        { songName: "FUNK-SERENO", filePath: "FUNK SERENO - ICEDMANE.mp3", coverPath: "covers/3.mp3" },
        { songName: "SHIV AMITDHARA", filePath: "Sampoorna Shiv Amritwani Complete By Anuradha Paudwal Full Audio Song Juke Box I Shri Shiv Amritwani(MP3_160K).mp3", coverPath: "covers/5.mp3" },
        { songName: "MERI JINDGI SAWARI", filePath: "Tere Jaisa Yaar Kahan (Lyrical Video)  Kishore Kumar  Yaarana  Revibe  Hindi Songs.mp3", coverPath: "covers/6.mp3" },
        { songName: "EAGLE SONG", filePath: "Wyr Gemi - Eagle-Downringtone.com.mp3", coverPath: "covers/7.mp3" },
        { songName: "WORKOUT HANUMAN CHALISA", filePath: "हनुमान चालीसा Hanuman Chalisa I GULSHAN KUMAR I HARIHARAN_ Full HD Video I Shree Hanuman Chalisa(MP3_160K).mp3", coverPath: "covers/8.mp3" },
    ];
    
    let audioElement = new Audio();
    audioElement.src = songs[0].filePath;
    
    document.addEventListener('DOMContentLoaded', () => {
        let nextBtn = document.getElementById('nextbtn');
        
        masterPlay.addEventListener('click', () => {
            console.log('Play button clicked');
            if (audioElement.paused || audioElement.currentTime <= 0)  {
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
            currentSongIndex = (currentSongIndex + 1) % songs.length;
            audioElement.src = songs[currentSongIndex].filePath;
            audioElement.play();
            masterPlay.textContent = '⏸';
            gif.style.opacity = 1;
            console.log('Playing: ' + songs[currentSongIndex].songName);
        });
        
        audioElement.addEventListener('timeupdate', () => {
             progress = (audioElement.currentTime / audioElement.duration) * 100;
            myProgressBar.value = progress;
        });
        myProgressBar.addEventListener('change', () => {
            audioElement.currentTime = myProgressBar.value*audioElement.duration/100;
        });
    });


  
