// cafe video background v4.1
document.addEventListener("DOMContentLoaded", () => {

  const videoBtn = document.querySelector(".video-btn");
  const heroYoutube = document.getElementById("heroYoutube");
  const heroWrap = document.querySelector(".hero");

  if (!videoBtn || !heroYoutube) return;

  const VIDEO_ID = "7NTPBzGUuJs";
  const START_TIME = 70;

  let iframe = null;
  let isPlaying = false;

  function createIframe() {
    const el = document.createElement("iframe");
    el.src =
      `https://www.youtube.com/embed/${VIDEO_ID}?` +
      `autoplay=1&mute=1&controls=0&rel=0` +
      `&playsinline=1&start=${START_TIME}` +
      `&loop=1&playlist=${VIDEO_ID}`;
    el.className = "hero-iframe";
    el.allow = "autoplay; encrypted-media; picture-in-picture";
    el.allowFullscreen = true;
    return el;
  }

  function fadeIn() {
    heroYoutube.style.display = "block";
    requestAnimationFrame(() => heroYoutube.style.opacity = "1");
  }

  function fadeOut() {
    heroYoutube.style.opacity = "0";
    setTimeout(() => {
      heroYoutube.style.display = "none";
      heroYoutube.innerHTML = "";
    }, 600);
  }

  function updateUI() {
    videoBtn.classList.toggle("is-playing", isPlaying);
  }

  function play() {
    if (isPlaying) return;

    iframe = createIframe();
    heroYoutube.innerHTML = "";
    heroYoutube.appendChild(iframe);

    fadeIn();
    isPlaying = true;
    updateUI();
  }

  function stop() {
    if (!isPlaying) return;

    fadeOut();
    isPlaying = false;
    updateUI();
    iframe = null;
  }

  videoBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    isPlaying ? stop() : play();
  });

  heroWrap?.addEventListener("dblclick", () => {
    if (!document.fullscreenElement) {
      heroWrap.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  });

});