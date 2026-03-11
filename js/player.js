// player.js cafe25 v1.2
document.addEventListener("DOMContentLoaded",()=>{
  const audio=document.getElementById("city23Audio");
  const btnPlay=document.getElementById("audioBtn");
  const trackInfo=document.getElementById("trackInfo");
  const canvasEl=document.getElementById("visualizer");

  if(!audio) return;

  audio.volume=0.75;
  const AudioContext=window.AudioContext||window.webkitAudioContext;
  const audioCtx=new AudioContext();
  const analyser=audioCtx.createAnalyser();
  analyser.fftSize=256;
  const source=audioCtx.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(audioCtx.destination);

  if(canvasEl){
    WaveformVisualizer.init({canvasEl,analyser});
    WaveformVisualizer.drawStatic(); 
  }

  btnPlay.addEventListener("click",async()=>{
    if(audioCtx.state==="suspended") await audioCtx.resume();
    if(audio.paused){
      await audio.play();
      btnPlay.classList.add("is-playing");
      WaveformVisualizer.start();
    }else{
      audio.pause();
      btnPlay.classList.remove("is-playing");
      WaveformVisualizer.stop();
    }
  });

  async function requestSongInfo(){
    try{
      const res=await fetch("https://songservice.radiomax.technology/city23-at/songinfo.json");
      const data=await res.json();
      if(trackInfo&&data) trackInfo.innerText=`${data.artist||""} - ${data.title||""}`;
    }catch(e){console.warn("Failed to fetch song info",e);}
  }

  requestSongInfo();
  setInterval(requestSongInfo,2000);
});