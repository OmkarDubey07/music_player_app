//  for play photos automatically after 3 sec.

const carousel = [...document.querySelectorAll(".carousel img")];
const carouselImageIndex = 0;

const changeCarousel = () => {
  carousel[carouselImageIndex].classList.toggle('active');

  if (carouselImageIndex >   carousel.length -1) {
    carouselImageIndex = 0;
  } else {
    carouselImageIndex++;
  }

  carousel[carouselImageIndex].classList.toggle('active');
};

setInterval(() => {
  changeCarousel();
}, 3000);

// navigation

// toggling music player

const musicPlayerSection = document.querySelector('.music-player-section');

let clickCount = 1;

musicPlayerSection.addEventListener('click', () => {
    if(clickCount >= 2){
        musicPlayerSection.classList.add('active');
        clickCount = 1;
        return;
    }
    clickCount++;
    setTimeout(() => {
        clickCount = 1;
    }, 250);
});

// back from music player 

const backToHomeBtn = document.querySelector('.music-player-section .back-btn');

backToHomeBtn.addEventListener('click' , () => {
  musicPlayerSection.classList.remove('active');
});

//   now access the playlists

const playlistSection = document.querySelector('.playlist');
const navBtn = document.querySelector('.music-player-section .nav-btn');

navBtn.addEventListener('click', () => {
    playlistSection.classList.add('active');
});

// back from playlist to music player

const backTOMusicPlayer  = document.querySelector('.playlist .back-btn');

backTOMusicPlayer.addEventListener('click', () => {
    playlistSection.classList.remove('active');
});

// navigation done now ---------------------------


// now from here we'll start to add function for musics.

const music = document.querySelector('#audio-source');
const seekBar = document.querySelector('.music-seek-bar');
const songName = document.querySelector('.current-song-name');
const artistName = document.querySelector('.artist-name');
const coverImage = document.querySelector('.cover');
const currentMusicTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.duration');
const queue = [...document.querySelectorAll('.queue')];         // to Select all queue

// select all the buttons here 

const forwardBtn = document.querySelector('ion-icon.fa-forward');
const backwardBtn = document.querySelector('ion-icon.fa-backward');
const playBtn = document.querySelector('ion-icon.fa-play');
const pauseBtn = document.querySelector('ion-icon.fa-pause');
const repeatBtn = document.querySelector('span.fa-redo');
const volumeBtn = document.querySelector('span.fa-volume-up');
const volumeSlider = document.querySelector('.volume-slider');


// function for setting up music 

let currentMusic = 0;
const setMusic = (i) => {
  seekBar.value = 0;
  let song = songs[i];
  currentMusic = i;

  music.src = song.path;

  songName.innerHTML = song.name;
  artistName.innerHTML = song.artist;
  coverImage.src = song.cover;

  setTimeout(() => {
      seekBar.max = music.duration;
      musicDuration.innerHTML = formatTime(music.duration);
  }, 300);
  currentMusicTime.innerHTML = '00 : 00';
  queue.forEach(item => item.classList.remove('active'));
  queue[currentMusic].classList.add('active');
}

setMusic(0);
