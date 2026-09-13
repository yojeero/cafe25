      <div class="cover">
        <div class="cover-disc"></div>
      </div>

      // css
      
.cover {
  @apply 
    relative

    w-full 

    flex items-center justify-center 
    flex-1

    min-h-0
  ;

  --vinyl-rotation: 0deg;
  transform: rotate(var(--vinyl-rotation));
} 

.cover-disc {
  @apply 
    relative 

    w-[70%] max-w-[280px] aspect-square    
  ;

  --vinyl-rotation: 0deg;
  transform: rotate(var(--vinyl-rotation));
  animation: idle-float 4s ease-in-out infinite;
}

@keyframes idle-float {
  0%, 100% { transform: rotate(var(--vinyl-rotation)) translateY(0); }
  50% { transform: rotate(var(--vinyl-rotation)) translateY(-4px); }
}

.cover-disc::before {
  @apply 
    absolute inset-0 

    bg-[url('/images/v6.webp')] 
    bg-center bg-cover bg-no-repeat

    rounded-full 

    z-[-1]
  ;

  content: "";
}

.cover-disc::after {
  @apply 
    absolute inset-0 
    
    rounded-full 
    
    mix-blend-overlay
  ;
  
  content: "";
  background: radial-gradient(
    circle at 30% 30%,
    rgba(255,255,255,0.25),
    transparent 60%
  );  
}

//  vynil spin
const audioBtn = document.getElementById('audioBtn');
const audioCover = document.querySelector('.cover-disc');

let rotation = 0;       
let speed = 0;          
let targetSpeed = 0;   
let animFrame = null;

function rotateVinyl() {
  rotation += speed;

  audioCover.style.setProperty('--vinyl-rotation', `${rotation}deg`);

  speed += (targetSpeed - speed) * 0.05;

  animFrame = requestAnimationFrame(rotateVinyl);
}

audioBtn.addEventListener('click', () => {
  audioBtn.classList.toggle('is-playing');

  if (audioBtn.classList.contains('is-playing')) {
    targetSpeed = 1.4; 
    if (!animFrame) rotateVinyl();
  } else {
    targetSpeed = 0; 
  }
});