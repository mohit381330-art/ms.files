console.log("Welcome to Joytify");
// to initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay=document.getElementById('masterPlay');
let songs = [
    { songName: "NCS-MORTALS", filePath: "songs/1.mp3", coverPath: "covers/1.mp3" },
    { songName: "MONTEGEM-ALIQIMIA", filePath: "songs/1.mp3", coverPath: "covers/1.mp3" },
    { songName: "FUNK-SERENO", filePath: "songs/1.mp3", coverPath: "covers/1.mp3" },
    { songName: "FATHER SAAB", filePath: "songs/1.mp3", coverPath: "covers/1.mp3" },
    { songName: "JAI OR VEERU", filePath: "songs/1.mp3", coverPath: "covers/1.mp3" },
];
// audioElement.play();

// listen to Events
document.addEventListener('time') 