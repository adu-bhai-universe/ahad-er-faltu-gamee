/* ====== EKHANE BONDHUDER NAAM BODLAO / ADD KORO ====== */
const NAMES=[
["Arthi","👩‍🎤"],["Sejuti","🧚‍♀️"],["Tanha","😎"],["Mumu","🐮"],["Sabriha","🦸‍♀️"],
["Nahid","🤓"],["Ashraful","🍔"],["Mahim","🤪"],["Talha","🥷"],
["Ahad","😏"],["Mahin","🎮"],["Afnan","🐧"],["Orpita","🦋"],["Shakkor","🧃"]
];
/* Dare gulo: {n} er jaygay bondhur naam boshbe */
const DARES=[
"shobar shamne ekta nach koro, 30 second 💃","nijer shobcheye lojjar ghotona bolo 🙈","10 second-e 5 ta animal-er awaj dao 🐔",
"group-e 'ami tomader shobai ke bhalobashi' message pathao ❤️","ekta gaan gaao, bhul hole abar 🎤","ekta ajob joke bolo, keu na hashle dui bar 😂",
"nijer phone-er last search shobar ke dekhao 📱","shobar jonno ekhoni ekta treat order koro 🍕","shobar ek-jon-ke compliment koro, kintu hasha jabe na 😶",
"5 minute shudhu robot-er moto kotha bolo 🤖","nijer ekta secret bolo (choto holeo cholbe) 🤫","shobar shamne 10 ta push-up dao 💪"
];
/* "Ke korbe?" prosno */
const QS=[
"Ke shobcheye age biye korbe? 💍","Ke shobcheye beshi late kore ashe? ⏰","Ke biye-te shobcheye beshi khabe? 🍛",
"Ke class-e ghumiye pore? 😴","Ke shobcheye beshi selfie tole? 🤳","Ke ekdin kotha na bole nikhoj hoye jabe? 🕵️",
"Ke shobar age ekta ajob jinish-e bhoy pabe? 😱","Ke bhut dekhle shobar age dour dibe? 👻","Ke shobcheye beshi 'ami ashchi' bole ar ashe na? 🚶",
"Ke lottery jitle shobcheye age bondhuder bhule jabe? 🎰","Ke shobcheye beshi drama kore? 🎭","Ke shobcheye beshi phone-e thake? 📱"
];
const ZINGER=["ar kono shondeho nei! 😂","shobai jane eta! 🤝","eta nia tarka-i korbe na 🙅","protibar-i eta-i hoy 😆","shobar bhote ekdom clear 🗳️"];

const $=id=>document.getElementById(id);
const N=NAMES.length,tally={};
const col=i=>"hsl("+Math.round(i*360/N)+",85%,62%)";
const pick=a=>a[Math.floor(Math.random()*a.length)];
const nm=i=>'<span class="nm">'+NAMES[i][1]+" "+NAMES[i][0]+'</span>';

function chips(){$("chips").innerHTML=NAMES.map((f,i)=>
 '<span class="chip" style="background:'+col(i)+'">'+f[0]+': '+(tally[i]||0)+'</span>').join("");}
chips();

/* ---------- Tabs ---------- */
document.querySelectorAll(".tab").forEach(b=>b.onclick=()=>{
 document.querySelectorAll(".tab").forEach(t=>t.classList.toggle("on",t===b));
 $("wheel").hidden=b.dataset.m!=="wheel";$("who").hidden=b.dataset.m!=="who";});

/* ---------- Wheel ---------- */
const cv=$("cv"),ctx=cv.getContext("2d"),R=170,A=2*Math.PI/N;
let rot=0,busy=false;
function draw(){ctx.clearRect(0,0,340,340);
 for(let i=0;i<N;i++){const s=rot+i*A;
  ctx.beginPath();ctx.moveTo(R,R);ctx.arc(R,R,R,s,s+A);ctx.fillStyle=col(i);ctx.fill();
  ctx.strokeStyle="#10162f";ctx.lineWidth=2;ctx.stroke();
  ctx.save();ctx.translate(R,R);ctx.rotate(s+A/2);ctx.textAlign="right";ctx.fillStyle="#10162f";
  ctx.font="bold 15px Trebuchet MS,sans-serif";ctx.fillText(NAMES[i][0]+" "+NAMES[i][1],R-14,5);ctx.restore();}}
draw();
$("spin").onclick=()=>{if(busy)return;busy=true;$("spin").disabled=true;
 const start=rot,total=Math.PI*2*(5+Math.random()*3)+Math.random()*Math.PI*2,dur=4200,t0=performance.now();
 $("res").textContent="Ghurche... 🌀";
 (function step(t){const p=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-p,3);
  rot=start+total*e;draw();
  if(p<1)return requestAnimationFrame(step);
  const ang=((-Math.PI/2-rot)%(2*Math.PI)+2*Math.PI)%(2*Math.PI),i=Math.floor(ang/A);
  tally[i]=(tally[i]||0)+1;chips();
  $("res").innerHTML="<span>"+nm(i)+" ke ekhoni: <b>"+pick(DARES)+"</b></span>";
  busy=false;$("spin").disabled=false;})(t0);};

/* ---------- Ke Korbe? ---------- */
$("ask").onclick=()=>{if(busy)return;busy=true;$("ask").disabled=true;
 $("q").textContent=pick(QS);$("slot").classList.remove("done");$("res").textContent="Bondhura vote dicche... 🗳️";
 let n=0,delay=60;const win=Math.floor(Math.random()*N);
 (function go(){const i=n<22?Math.floor(Math.random()*N):win;
  $("slot").textContent=NAMES[i][1]+" "+NAMES[i][0];n++;
  if(n<=24){delay+=n*4;return setTimeout(go,delay);}
  $("slot").classList.add("done");tally[win]=(tally[win]||0)+1;chips();
  $("res").innerHTML="<span>🏆 "+nm(win)+" — "+pick(ZINGER)+"</span>";
  busy=false;$("ask").disabled=false;})();};
