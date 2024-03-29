let songs = [
  {
    name: "song 1",
    path: "./Assets/music/song1.mp3",
    artist: "artist 1",
    cover: "./Assets/images/song1.jpg",
  },
  {
    name: "song 2",
    path: "./Assets/music/song2.mp3",
    artist: "artist 2",
    cover: "./Assets/images/song2.jpg",
  },
  {
    name: "song 3",
    path: "./Assets/music/song3.mp3",
    artist: "artist 3",
    cover: "./Assets/images/song3.jpg",
  },
  {
    name: "song 4",
    path: "./Assets/music/song4.mp3",
    artist: "artist 4",
    cover: "./Assets/images/song4.jpg",
  },
  {
    name: "song 5",
    path: "./Assets/music/song5.mp3",
    artist: "artist 5",
    cover: "./Assets/images/song5.jpg",
  },
  {
    name: "song 6",
    path: "./Assets/music/song6.mp3",
    artist: "artist 6",
    cover: "./Assets/images/song6.jpg",
  },
  {
    name: "song 7",
    path: "./Assets/music/song7.mp3",
    artist: "artist 7",
    cover: "./Assets/images/song7.jpg",
  },
];

//  for play photos automatically after 3 sec.

const carousel = [...document.querySelectorAll(".carousel img")];

let carouselImageIndex = 0;

const changeCarousel = () => {
  carousel[carouselImageIndex].classList.toggle("active");

  if (carouselImageIndex >= carousel.length - 1) {
    carouselImageIndex = 0;
  } else {
    carouselImageIndex++;
  }

  carousel[carouselImageIndex].classList.toggle("active");
};

setInterval(() => {
  changeCarousel();
}, 3000);

// navigation

// toggling music player

const musicPlayerSection = document.querySelector(".music-player-section");

let clickCount = 1;

musicPlayerSection.addEventListener("click", () => {
  if (clickCount >= 2) {
    musicPlayerSection.classList.add("active");
    clickCount = 1;
    return;
  }
  clickCount++;
  setTimeout(() => {
    clickCount = 1;
  }, 250);
});

// back from music player

const backToHomeBtn = document.querySelector(".music-player-section .back-btn");

backToHomeBtn.addEventListener("click", () => {
  musicPlayerSection.classList.remove("active");
});

//   now access the playlists

const playlistSection = document.querySelector(".playlist");
const navBtn = document.querySelector(".music-player-section .nav-btn");

navBtn.addEventListener("click", () => {
  playlistSection.classList.add("active");
});

// back from playlist to music player

const backTOMusicPlayer = document.querySelector(".playlist .back-btn");

backTOMusicPlayer.addEventListener("click", () => {
  playlistSection.classList.remove("active");
});

// navigation done now ---------------------------

// now from here we'll start to add function for musics.
let currentMusic = 0;

const music = document.querySelector("#audio-source");
const seekBar = document.querySelector(".music-seek-bar");
const songName = document.querySelector(".current-song-name");
const artistName = document.querySelector(".artist-name");
const coverImage = document.querySelector(".cover");
const currentMusicTime = document.querySelector(".current-time");
const musicDuration = document.querySelector(".duration");
const queue = [...document.querySelectorAll(".queue")]; // to Select all queue

// select all the buttons here

const forwardBtn = document.querySelector("ion-icon.fa-forward");
const backwardBtn = document.querySelector("ion-icon.fa-backward");
const playBtn = document.querySelector("ion-icon.fa-play");
const pauseBtn = document.querySelector("ion-icon.fa-pause");
const repeatBtn = document.querySelector("span.fa-redo");
const volumeBtn = document.querySelector("span.fa-volume-up");
const volumeSlider = document.querySelector(".volume-slider");

// function for setting up music

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
  currentMusicTime.innerHTML = "00 : 00";
  queue.forEach((item) => item.classList.remove("active"));
  queue[currentMusic].classList.add("active");
};

setMusic(0);

// format duration in 00 : 00 format

const formatTime = (time) => {
  let min = Math.floor(time / 60);
  if (min < 10) {
    min = `0` + min;
  }

  let sec = Math.floor(time % 60);
  if (sec < 10) {
    sec = `0` + sec;
  }

  return `${min} : ${sec}`;
};

// now we'll add play/pause event

// play btn event

playBtn.addEventListener("click", () => {
  music.play();
  playBtn.classList.remove("active");
  pauseBtn.classList.add("active");
});

// pause btn event

pauseBtn.addEventListener("click", () => {
  music.pause();
  pauseBtn.classList.remove("active");
  playBtn.classList.add("active");
});

// forward btn

forwardBtn.addEventListener("click", () => {
  if (currentMusic >= songs.length - 1) {
    currentMusic = 0;
  } else {
    currentMusic++;
  }
  setMusic(currentMusic);
  playBtn.click();
});

// backward btn

backwardBtn.addEventListener("click", () => {
  if (currentMusic <= 0) {
    currentMusic = songs.length - 1;
  } else {
    currentMusic--;
  }
  setMusic(currentMusic);
  playBtn.click();
});

// seekBar event

setInterval(() => {
  seekBar.value = music.currentTime;
  currentMusicTime.innerHTML = formatTime(music.currentTime);
  if(Math.floor(music.currentTime) == Math.floor(seekBar.max)){
      if(repeatBtn.className.includes('active')){
          setMusic(currentMusic);
          playBtn.click();
      } else{
          forwardBtn.click();
      }
  }
}, 500)

seekBar.addEventListener('change', () => {
  music.currentTime = seekBar.value;
})


// repeat button

repeatBtn.addEventListener("click", () => {
  repeatBtn.classList.toggle("active");
});

// volume section

volumeBtn.addEventListener("click", () => {
  volumeBtn.classList.toggle("active");
  volumeSlider.classList.toggle("active");
});

volumeSlider.addEventListener("input", () => {
  music.volume = volumeSlider.value;
});

queue.forEach((item, i) => {
  item.addEventListener("click", () => {
    setMusic(i);
    playBtn.click();
  });
});
