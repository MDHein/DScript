var slideShowCssLink = document.createElement("link");
slideShowCssLink.href = "https://cdn.jsdelivr.net/gh/MDHein/DScript@main/cdn/slide_style.css";
slideShowCssLink.rel = "stylesheet";
slideShowCssLink.type = "text/css";
document.head.appendChild(slideShowCssLink);

function createWiSlideShowIn(c) {
  const wiSSHTML = `<div class="wi-slideshow"><span class="wi-slideshow-prev material-symbols-rounded" onclick="changeSlide(-1)">arrow_back_ios</span><span class="wi-slideshow-next material-symbols-rounded" onclick="changeSlide(1)">arrow_forward_ios</span><div class="wi-slideshow-indicator-group"><span class="wi-slideshow-pause material-symbols-rounded" onclick="pauseSlideshow()">pause</span><span class="wi-slideshow-resume material-symbols-rounded" onclick="resumeSlideshow()">resume</span></div></div>`;
  c.insertAdjacentHTML("afterbegin", wiSSHTML);
}

function addNewSlide(url, n) {
  let wiSlideShow = document.querySelector('.wi-slideshow');
  let wiSlideShowPause = document.querySelector('.wi-slideshow-pause');
  let wiSSSlideHTML = `<div class="wi-slideshow-slide fade"><img src="${url}" alt="Slide ${n}"></div>`;
  let wiSSIndicatorHTML = `<span class="wi-slideshow-indicator" onclick="currentSlide(${n})"></span>`;
  wiSlideShow.insertAdjacentHTML("beforeend", wiSSSlideHTML);
  wiSlideShowPause.insertAdjacentHTML("beforebegin", wiSSIndicatorHTML);
}

let wiSlideIndex = 1;
let wiSlideShowInterval;

function plusSlides(n) {
  showSlides(wiSlideIndex += n);
}

function currentSlide(n) {
  showSlides(wiSlideIndex = n);
}

function showSlides(n) {
  const slides = document.querySelectorAll('.wi-slideshow-slide');
  const indicators = document.getElementsByClassName("wi-slideshow-indicator");

  if (n > slides.length) {
    wiSlideIndex = 1;
  }
  if (n < 1) {
    wiSlideIndex = slides.length;
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (let i = 0; i < indicators.length; i++) {
    indicators[i].className = indicators[i].className.replace(" wi-slideshow-active", "");
  }

  slides[wiSlideIndex - 1].style.display = "block";
  indicators[wiSlideIndex - 1].className += " wi-slideshow-active";
}

function changeSlide(n) {
  pauseSlideshow();
  plusSlides(n);
  resumeSlideshow();
}

function pauseSlideshow() {
  clearInterval(wiSlideShowInterval);
  document.querySelector('.wi-slideshow-pause').style.display = "none";
  document.querySelector('.wi-slideshow-resume').style.display = "inline-block";

  //console.log();
}

function resumeSlideshow() {
  wiSlideShowInterval = setInterval(() => {
    plusSlides(1);
  }, 3000); // Change slide every 3 seconds
  document.querySelector('.wi-slideshow-pause').style.display = "inline-block";
  document.querySelector('.wi-slideshow-resume').style.display = "none";
}