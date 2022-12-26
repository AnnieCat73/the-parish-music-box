//Navigation for mobile and tablet

const closeBtn = document.querySelector(".close-nav");
const openBtn = document.querySelector(".open-nav");
const navMenu = document.querySelector(".menu-inside");

//Attach eventlisteners and toggle navigation-open class
openBtn.addEventListener("click", () => {
  navMenu.classList.toggle("navigation-open");
});

closeBtn.addEventListener("click", () => {
  navMenu.classList.toggle("navigation-open");
});

//Navigate to sections from the mobile menu/
//Get to sections from mobile menu
const aboutLink = document.querySelector("#js-about");
console.log(aboutLink);
const musicLink = document.querySelector("#js-music");
const reviewsLink = document.querySelector("#js-reviews");
const galleryLink = document.querySelector("#js-gallery");
const contactLink = document.querySelector("#js-contact");

//Get to about section
aboutLink.addEventListener("click", () => {
  navMenu.classList.remove("navigation-open");
});

//Get to music/streaming section
musicLink.addEventListener("click", () => {
  navMenu.classList.remove("navigation-open");
});

//Get to reviews section
reviewsLink.addEventListener("click", () => {
  navMenu.classList.remove("navigation-open");
});

//Get to gallery section
galleryLink.addEventListener("click", () => {
  navMenu.classList.remove("navigation-open");
});
//Get to contact section
contactLink.addEventListener("click", () => {
  navMenu.classList.remove("navigation-open");
});

//Masterplay
const music = new Audio("audio/Bring It On.MP3");

let masterPlay = document.getElementById("masterPlay");

masterPlay.addEventListener("click", () => {
  if (music.paused || music.currentTime <= 0) {
    music.play();
    masterPlay.classList.remove("bi-play-fill");
    masterPlay.classList.add("bi-pause-fill");
  } else {
    music.pause();
    masterPlay.classList.add("bi-play-fill");
    masterPlay.classList.remove("bi-pause-fill");
  }
});

let currentStart = document.getElementById("currentStart");
let currentEnd = document.getElementById("currentEnd");
let seek = document.getElementById("seek");
let bar2 = document.getElementById("bar2");
let dot = document.getElementsByClassName("dot")[0];

music.addEventListener("timeupdate", () => {
  let musicCurr = music.currentTime;
  let musicDur = music.duration;

  let min = Math.floor(musicDur / 60);
  let sec = Math.floor(musicDur % 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }

  currentEnd.innerText = `${min}:${sec}`;

  let min1 = Math.floor(musicCurr / 60);
  let sec1 = Math.floor(musicCurr % 60);
  if (sec1 < 10) {
    sec1 = `0${sec1}`;
  }

  currentStart.innerText = `${min1}:${sec1}`;

  let progressbar = parseInt((music.currentTime / music.duration) * 100);
  seek.value = progressbar;
  let seekbar = seek.value;
  bar2.style.width = `${seekbar}%`;
  dot.style.left = `${seekbar}%`;
});

seek.addEventListener("change", () => {
  music.currentTime = (seek.value * music.duration) / 100;
});

music.addEventListener("ended", () => {
  masterPlay.classList.add("bi-play-fill");
  masterPlay.classList.remove("bi-pause-fill");
});

let volIcon = document.getElementById("vol-icon");
let vol = document.getElementById("vol");
let volDot = document.getElementById("vol-dot");
let volBar = document.getElementsByClassName("vol-bar")[0];

vol.addEventListener("change", () => {
  if (vol.value == 0) {
    volIcon.classList.remove("bi-volume-down-fill");
    volIcon.classList.add("bi-volume-mute-fill");
    volIcon.classList.remove("bi-volume-up-fill");
  }
  if (vol.value > 0) {
    volIcon.classList.add("bi-volume-down-fill");
    volIcon.classList.remove("bi-volume-mute-fill");
    volIcon.classList.remove("bi-volume-up-fill");
  }
  if (vol.value > 50) {
    volIcon.classList.remove("bi-volume-down-fill");
    volIcon.classList.remove("bi-volume-mute-fill");
    volIcon.classList.add("bi-volume-up-fill");
  }

  let volA = vol.value;
  volBar.style.width = `${volA}%`;
  volDot.style.left = `${volA}%`;
  music.volume = volA / 100;
});

//Streaming
const audio = document.querySelector("audio");
const playPauseBtn = document.querySelector("#play-pause");
const nextBtn = document.querySelector("#next");
const preveBtn = document.querySelector("#previous");
const songList = document.querySelector(".song-list");
const title = document.querySelector("#title");
const record = document.querySelector(".record");
const volSlider = document.querySelector(".slider");
console.log(audio);

let songArray = [];
let songHeading = "";
let songIndex = 0;
let isPlaying = false;

function loadAudio() {
  audio.src = songArray[songIndex];
  let songListItems = songList.getElementsByTagName("li");
  songHeading = songListItems[songIndex].getAttribute("data-name");
  title.innerText = songHeading;
  //Highlight song title inside playlist
  for (i = 0; i < songListItems.length; i++) {
    songListItems[i].classList.remove("active");
  }
  songList.getElementsByTagName("li")[songIndex].classList.add("active");
}

function loadSongs() {
  let songs = songList.getElementsByTagName("li");
  for (i = 0; i < songs.length; i++) {
    songArray.push(songs[i].getAttribute("data-src"));
  }
  loadAudio();
}
loadSongs();

function playAudio() {
  audio.play();
  playPauseBtn.querySelector("i.fas").classList.remove("fa-play");
  playPauseBtn.querySelector("i.fas").classList.add("fa-pause");
  isPlaying = true;
  record.classList.add("record-animation");
}

function pauseAudio() {
  audio.pause();
  playPauseBtn.querySelector("i.fas").classList.remove("fa-pause");
  playPauseBtn.querySelector("i.fas").classList.add("fa-play");
  isPlaying = false;
  record.classList.remove("record-animation");
}
function nextSong() {
  songIndex++;
  if (songIndex > songArray.length - 1) {
    songIndex = 0;
  }
  loadAudio();
  playAudio();
}
function previousSong() {
  songIndex--;
  if (songIndex > songArray.length - 1) {
    songIndex = 0;
  }
  loadAudio();
  playAudio();
}

playPauseBtn.addEventListener(
  "click",
  function () {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  },
  false
);

nextBtn.addEventListener(
  "click",
  function () {
    nextSong();
  },
  false
);

preveBtn.addEventListener(
  "click",
  function () {
    previousSong();
  },
  false
);

songList.addEventListener(
  "click",
  function (e) {
    songIndex = e.target.closest("li").getAttribute("data-index");
    loadAudio();
    playAudio();
  },
  false
);

audio.addEventListener("ended", function () {
  nextSong();
});

volSlider.addEventListener(
  "input",
  function () {
    audio.volume = volSlider.value / 100;
  },
  false
);

//Carousel/Slider
("use strict");
// Select all slides
const slides = document.querySelectorAll(".slide");

// loop through slides and set each slides translateX
slides.forEach((slide, indx) => {
  slide.style.transform = `translateX(${indx * 100}%)`;
});

// select next slide button
const nextSlide = document.querySelector(".btn-next");

// current slide counter
let curSlide = 0;
// maximum number of slides
let maxSlide = slides.length - 1;

// add event listener and navigation functionality
nextSlide.addEventListener("click", function () {
  // check if current slide is the last and reset current slide
  if (curSlide === maxSlide) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  //   move slide by -100%
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
  });
});

// select next slide button
const prevSlide = document.querySelector(".btn-prev");

// add event listener and navigation functionality
prevSlide.addEventListener("click", function () {
  // check if current slide is the first and reset current slide to last
  if (curSlide === 0) {
    curSlide = maxSlide;
  } else {
    curSlide--;
  }

  //   move slide by 100%
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
  });
});

//Contact Form
const form = document.querySelector("form[name='contact-form']");
const nameInput = document.querySelector("input[name='name']");
const emailInput = document.querySelector("input[name='email']");

const messageInput = document.querySelector("textarea[name='message']");
const thankYou = document.querySelector(".thank-you");

//console.log(form);

nameInput.isValid = () => !!nameInput.value;
emailInput.isValid = () => isValidEmail(emailInput.value);

messageInput.isValid = () => !!messageInput.value;

const inputFields = [nameInput, emailInput, messageInput];

const isValidEmail = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const isValidPhone = (phone) => {
  const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return re.test(String(phone).toLowerCase());
};

let isFormValid = false;
isValidationOn = false;

const resetEl = (el) => {
  el.classList.remove("invalid");
  el.nextElementSibling.classList.add("hide");
};

const invalidateEl = (el) => {
  el.classList.add("invalid");
  el.nextElementSibling.classList.remove("hide");
};

const validateInputs = () => {
  if (!isValidationOn) return;

  isFormValid = true;
  inputFields.forEach(resetEl);

  if (!nameInput.value) {
    isFormValid = false;
    invalidateEl(nameInput);
  }
  if (!isValidEmail(emailInput.value)) {
    isFormValid = false;
    invalidateEl(emailInput);
  }
  if (!messageInput.value) {
    isFormValid = false;
    invalidateEl(messageInput);
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  isValidationOn = true;

  validateInputs();
  if (isFormValid) {
    form.remove();
    thankYou.classList.remove("hide");
  } // FOR THANK YOU msg may not need this*/
  input.value = "";
});

inputFields.forEach((input) => input.addEventListener("input", validateInputs));
inputFields.forEach((input) => (input.value = ""));
