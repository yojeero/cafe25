// PWA install
  const installBtn = document.getElementById('installBtn');
  let deferredPrompt;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();          
    deferredPrompt = e;          
    installBtn.style.display = 'block'; 
  });

  installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return; 

    installBtn.style.display = 'none';

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    console.log('PWA installation outcome:', outcome); 

    deferredPrompt = null; 
  });

  window.addEventListener('appinstalled', () => {
    console.log('PWA was installed!');
    installBtn.style.display = 'none';
  });


//  vynil spin
const audioBtn = document.getElementById('audioBtn');
const audioWrap = document.querySelector('.audio-wrap');

let rotation = 0;       
let speed = 0;          
let targetSpeed = 0;   
let animFrame = null;

function rotateVinyl() {
  rotation += speed;
  audioWrap.style.transform = `rotate(${rotation}deg)`;

  speed += (targetSpeed - speed) * 0.05;

  animFrame = requestAnimationFrame(rotateVinyl);
}

audioBtn.addEventListener('click', () => {
  audioBtn.classList.toggle('is-playing');
  audioWrap.classList.toggle('is-playing');

  if (audioWrap.classList.contains('is-playing')) {
    targetSpeed = 1.4; 
    if (!animFrame) rotateVinyl();
  } else {
    targetSpeed = 0; 
  }
});
