const $ = (id) => document.getElementById(id);
const clock = $("clock");
function updateClock(){clock.textContent = new Date().toLocaleTimeString([], {hour12:false});}
updateClock(); setInterval(updateClock,1000);

// Decorative terminal output only: it does not access or hack any system.
const terminal = $("terminal");
const commands = [
  ["[BOOT]", " initializing creative kernel..."],
  ["[AUTH]", " local session verified"],
  ["[SCAN]", " mapping virtual node graph"],
  ["[DATA]", " packet stream synchronized"],
  ["[PY]", " compiling imagination.py"],
  ["[SYS]", " rendering ambient interface"],
  ["[NET]", " tracing simulated routes"],
  ["[OK]", " all creative systems nominal"],
  ["[MIDI]", " audio interface standing by"],
  ["[DEV]", " building something meaningful"]
];
function addTerminalLine(){
  const [tag, message] = commands[Math.floor(Math.random()*commands.length)];
  const line = document.createElement("div");
  line.className = "terminal-line";
  const time = new Date().toLocaleTimeString([], {hour12:false});
  line.innerHTML = '<span>'+time+' '+tag+'</span>'+message;
  terminal.appendChild(line);
  while(terminal.children.length > 8) terminal.removeChild(terminal.firstChild);
}
for(let i=0;i<6;i++) addTerminalLine();
setInterval(addTerminalLine, 1450 + Math.random()*650);

// Browser pages cannot read real Windows CPU/GPU utilisation directly.
// These animated values are explicitly labelled DEMO, not hardware telemetry.
function demoMeter(valueId, barId, base, range){
  const value = Math.max(2, Math.min(98, Math.round(base + (Math.random()-.5)*range)));
  $(valueId).textContent = value + "%";
  $(barId).style.width = value + "%";
}
function updateDemoMeters(){
  demoMeter("cpuValue","cpuBar",24,22);
  demoMeter("gpuValue","gpuBar",36,30);
  demoMeter("ramValue","ramBar",54,10);
}
updateDemoMeters(); setInterval(updateDemoMeters, 1800);

const overlay = $("musicOverlay");
const audio = $("audio");
const fileInput = $("audioFile");
function openMusic(){overlay.classList.add("open");overlay.setAttribute("aria-hidden","false");}
function closeMusic(){overlay.classList.remove("open");overlay.setAttribute("aria-hidden","true");}
$("expandMusic").addEventListener("click",openMusic);
$("closeMusic").addEventListener("click",closeMusic);
document.addEventListener("keydown",(event)=>{if(event.key==="Escape")closeMusic();});
fileInput.addEventListener("change",()=>{
  const file = fileInput.files && fileInput.files[0];
  if(!file)return;
  if(audio.dataset.objectUrl) URL.revokeObjectURL(audio.dataset.objectUrl);
  const objectUrl = URL.createObjectURL(file);
  audio.dataset.objectUrl = objectUrl;
  audio.src = objectUrl;
  $("trackTitle").textContent = file.name;
  $("studioTrack").textContent = file.name;
  openMusic();
  audio.play().catch(()=>{}); // Some browsers require a second manual play click.
});
window.addEventListener("beforeunload",()=>{if(audio.dataset.objectUrl)URL.revokeObjectURL(audio.dataset.objectUrl);});