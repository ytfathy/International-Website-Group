(function(){
const D=window.SITE,$=s=>document.querySelector(s),main=$('#main');
const ytId=u=>{const m=(u||'').match(/(?:youtu\.be\/|shorts\/|v=|embed\/)([\w-]{11})/);return m?m[1]:null};
const isShort=u=>/shorts\//.test(u||'');
const grade=id=>D.grades.find(g=>g.id===id),subj=id=>D.subjects.find(s=>s.id===id);
const vid=(g,s)=>D.videos.find(v=>v.grade===g&&v.subject===s&&ytId(v.url));
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const thumb=u=>ytId(u)?`<img class="thumb" alt="" loading="lazy" src="https://i.ytimg.com/vi/${ytId(u)}/hqdefault.jpg" onerror="this.remove()">`:'';
const player=(u,t)=>`<div class="video-wrap ${isShort(u)?'short':''}"><iframe src="https://www.youtube.com/embed/${ytId(u)}?rel=0" title="${esc(t)}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>`;

/* ---------- guide character ---------- */
let curMsg='';
function say(t){curMsg=t;$('#msg').textContent=t;const b=$('#bubble');b.style.animation='none';b.offsetHeight;b.style.animation=''}
function speak(){if(!('speechSynthesis' in window))return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(curMsg);u.lang='en-US';u.rate=.95;
  u.onstart=()=>$('#guide').classList.add('talking');u.onend=u.onerror=()=>$('#guide').classList.remove('talking');speechSynthesis.speak(u)}
$('#speak').onclick=speak;
if(!('speechSynthesis' in window))$('#speak').hidden=true;
$('#mascot').onclick=()=>{const a=$('.arm');a.style.animation='none';a.offsetHeight;a.style.animation='wave 1.4s ease-in-out 2'};
$('#toggle').onclick=()=>{const g=$('#guide'),h=g.classList.toggle('hidden');$('#toggle').textContent=h?'':'✕';$('#toggle').setAttribute('aria-label',h?'Show guide':'Hide guide');if(h&&window.speechSynthesis)speechSynthesis.cancel()};

/* ---------- card builders ---------- */
const subjCard=(g,s)=>{const v=vid(g,s.id),nm=esc(s.name)+(s.native?` – <span lang="ar">${s.native}</span>`:'');
  return v?`<a class="card ${s.color}" href="#/video/${g}/${s.id}">${thumb(v.url)}<span class="em">${s.emoji}</span><h3>${nm}</h3><p>Watch the demo</p><span class="tag">▶ Video</span></a>`
  :`<div class="card ${s.color} soon" role="group" aria-label="${esc(s.name)} coming soon"><span class="em">${s.emoji}</span><h3>${nm}</h3><p>Video on its way</p><span class="tag">⏳ Coming Soon</span></div>`};
const review=()=>{const v=D.videos.find(v=>v.subject==='review'&&ytId(v.url));
  return v?`<a class="card special big" href="#/review">${thumb(v.url)}<span class="em">⭐</span><h3>${esc(v.title)}</h3><p>${esc(v.description)}</p><span class="tag">▶ Watch the review</span></a>`:''};
const crumbs=a=>$('#crumbs').innerHTML=a.map((x,i)=>i<a.length-1?`<a href="${x[1]}">${x[0]}</a><span>›</span>`:`<b aria-current="page">${x[0]}</b>`).join('');
const reveal=()=>{const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});document.querySelectorAll('.rv').forEach(el=>io.observe(el))};

/* ---------- pages ---------- */
const P={};
P.home=()=>({title:'International Education Egypt – Interactive Learning',desc:D.name+': educational apps, kids games and ads.',nav:'home',crumbs:[['Home','#/']],
 msg:"Hello and welcome to International Education Egypt! I'm your learning guide. Let me show you our amazing educational applications, interactive games, and creative learning experiences. Let's explore!",
 html:`<section class="hero"><img class="logo" src="assets/logo.png" alt="International Education Egypt logo" width="320" height="320"><h1>Welcome to International Education Egypt</h1><p class="sub">Discover a New World of Interactive Learning</p></section>
 <div class="grid"><a class="card blue big" href="#/apps"><span class="em">📚</span><h3>Educational Apps &amp; Demos</h3><p>Explore our educational applications by grade and subject.</p></a>
 <a class="card coral big" href="#/ads"><span class="em">🎬</span><h3>Our Advertisements</h3><p>Discover our creative promotional videos and campaigns.</p></a></div>
 <section class="sec rv"><h2>What We Create</h2><div class="tiles"><div class="tile"><b>📱</b><h3>Educational Apps</h3><p>Apps for Grade 6 and Grade 8 subjects.</p></div><div class="tile"><b>🎮</b><h3>Educational Games</h3><p>Playable games in our Kids Zone.</p></div><div class="tile"><b>🎥</b><h3>Video Content</h3><p>Demonstrations and promotional videos.</p></div></div></section>
 <section class="sec rv"><h2>Interactive Learning Experiences</h2><p style="text-align:center;max-width:640px;margin:auto">Watch real demonstrations of our apps, then jump into a game. Everything is organised by grade and subject so it is easy to find.</p></section>
 <section class="sec rv"><h2>Explore Our Educational Games</h2><div class="grid"><a class="card yellow" href="#/kids"><span class="em">🏝️</span><h3>${esc(D.game.title)}</h3><p>Open the Kids Zone and play.</p></a></div></section>
 <section class="sec rv"><h2>Why Choose International Education Egypt?</h2><div class="tiles"><div class="tile"><b>🎯</b><h3>By grade &amp; subject</h3><p>Find content quickly.</p></div><div class="tile"><b>👀</b><h3>Real demos</h3><p>See the apps in action.</p></div><div class="tile"><b>🕹️</b><h3>Play to learn</h3><p>Interactive games for kids.</p></div><div class="tile"><b>🌐</b><h3>Arabic &amp; English</h3><p>Including Arabic and German subjects.</p></div></div></section>
 ${contact()}`});
function contact(){const c=D.contact,L=[['email','✉️','Email',c.email&&'mailto:'+c.email],['phone','📞','Phone',c.phone&&'tel:'+c.phone],['facebook','📘','Facebook',c.facebook],['instagram','📸','Instagram',c.instagram],['youtube','▶️','YouTube',c.youtube],['tiktok','🎵','TikTok',c.tiktok]].filter(x=>x[3]);
 return `<section class="sec rv"><h2>Contact &amp; Social Media</h2>${L.length?`<div class="row" style="justify-content:center">${L.map(x=>`<a class="btn alt" href="${esc(x[3])}" target="_blank" rel="noopener">${x[1]} ${x[2]}</a>`).join('')}</div>`:'<p class="notice" style="text-align:center">Contact details will appear here soon.</p>'}</section>`}

P.apps=()=>({title:'Educational Apps & Demos – International Education Egypt',desc:'Explore our educational apps by grade and subject.',nav:'apps',crumbs:[['Home','#/'],['Apps & Demos','#/apps']],
 msg:'Welcome to Educational Apps & Demos! Pick a grade card to see its subjects, or open the Grade 8 Quarter 1 review.',
 html:`<h1>Educational Apps &amp; Demos</h1><p>Choose a grade to see its subjects.</p><div class="grid">${D.grades.map(g=>`<a class="card ${g.color} big" href="#/grade/${g.id}"><span class="em">${g.emoji}</span><h3>${g.name}</h3><p>${g.blurb}</p></a>`).join('')}<a class="card turquoise big" href="#/kids"><span class="em">🎈</span><h3>Kids Zone</h3><p>Interactive games for young learners.</p></a></div>${review()?'<h2>Special</h2><div class="grid">'+review()+'</div>':''}`});

P.grade=id=>{const g=grade(id);if(!g)return P.nf();return{title:`${g.name} – International Education Egypt`,desc:`${g.name} subjects and demonstration videos.`,nav:'apps',crumbs:[['Home','#/'],['Apps & Demos','#/apps'],[g.name,'#/grade/'+id]],
 msg:`This is ${g.name}. Choose a subject to watch its demonstration. Subjects marked Coming Soon will have a video later.`,
 html:`<h1>${g.name}</h1><div class="row"><a class="btn alt" href="#/apps">← Back to Apps &amp; Demos</a></div><div class="grid">${D.subjects.map(s=>subjCard(id,s)).join('')}</div>${id==='8'&&review()?'<h2>Special</h2><div class="grid">'+review()+'</div>':''}`}};

function videoPage(gid,sid){const g=grade(gid),isR=sid==='review',s=isR?{name:'Quarter 1 All Subjects Review'}:subj(sid),v=isR?D.videos.find(v=>v.subject==='review'&&ytId(v.url)):vid(gid,sid);
 if(!g||!s||!v)return P.nf();
 const others=D.subjects.filter(x=>x.id!==sid&&vid(gid,x.id));
 return{title:`${v.title} – International Education Egypt`,desc:v.description,nav:'apps',crumbs:[['Home','#/'],['Apps & Demos','#/apps'],[g.name,'#/grade/'+gid],[s.name,'']],
 msg:isR?`Welcome to the Grade 8 Quarter 1 All Subjects Review! Watch this video for a review across the subjects.`:`Welcome to ${g.name} ${s.name}! Watch the demonstration to see this educational app in action.`,
 html:`<h1>${esc(v.title)}</h1><p><b>${g.name}</b> · ${esc(s.name)}${s.native?` · <span lang="ar">${s.native}</span>`:''}</p>${player(v.url,v.title)}<p style="max-width:900px;margin:auto">${esc(v.description)}</p>
 <div class="row"><a class="btn alt" href="#/grade/${gid}">← Back to Subjects</a></div>
 ${others.length?`<section class="sec"><h2>Explore Other Subjects</h2><div class="grid">${others.map(x=>subjCard(gid,x)).join('')}</div></section>`:''}`}}

P.kids=()=>({title:'Kids Zone – International Education Egypt',desc:D.game.description,nav:'kids',crumbs:[['Home','#/'],['Kids Zone','#/kids']],
 msg:"Ready to play? Let's explore this educational game and see how learning can become an exciting adventure!",
 html:`<h1>Kids Zone 🎈</h1><div class="grid"><div class="card yellow big"><span class="em">🏝️ ✖️ 🦸</span><h3>${esc(D.game.title)}</h3><p>${esc(D.game.description)}</p><p style="margin-top:16px"><a class="btn" href="#/kids/play">Play Game</a></p></div></div><div class="row"><a class="btn alt" href="#/apps">← Back to Apps &amp; Demos</a></div>`});

P.play=()=>({title:`Play ${D.game.title} – International Education Egypt`,desc:D.game.description,nav:'kids',crumbs:[['Home','#/'],['Kids Zone','#/kids'],['Play','#/kids/play']],
 msg:"Let's play! Choose an island and answer the multiplication missions. Good luck, hero!",
 html:`<h1>${esc(D.game.title)}</h1><div class="row"><a class="btn alt" href="#/kids">← Back to Kids Zone</a></div><div id="gm"><p>Loading game…</p></div>`,
 after(){fetch(D.game.file,{method:'HEAD'}).then(r=>{if(!r.ok)throw 0;$('#gm').innerHTML=`<iframe class="game-frame" src="${D.game.file}" title="${esc(D.game.title)}" allow="autoplay; fullscreen"></iframe>`}).catch(()=>{$('#gm').innerHTML=`<div class="notice">The game file <b>${esc(D.game.file)}</b> was not found. Copy your original Math Mission HTML file into the <b>games</b> folder with that exact name, then reload this page.</div>`})}});

P.ads=()=>{return{title:'Our Ads – International Education Egypt',desc:'Promotional videos and campaigns.',nav:'ads',crumbs:[['Home','#/'],['Our Ads','#/ads']],
 msg:D.ads.length?'Welcome to Our Ads! Watch our creative promotional videos and campaigns.':'Welcome to Our Ads! Our promotional videos will be added here soon.',
 html:`<h1>Our Ads 🎬</h1>${D.ads.length?`<div class="filters" id="flt">${D.adCategories.map((c,i)=>`<button class="chip ${i?'':'on'}" data-c="${c}">${c}</button>`).join('')}</div>`:''}<div class="grid" id="adg"></div>`,
 after(){const g=$('#adg');const draw=c=>{const L=D.ads.filter(a=>ytId(a.url)&&(c==='All'||a.category===c));
  g.innerHTML=L.map((a,i)=>`<a class="card blue big" href="#/ad/${D.ads.indexOf(a)}">${thumb(a.url)}<span class="em">▶️</span><h3>${esc(a.title)}</h3><p>${esc(a.description||'')}</p><span class="tag">${esc(a.category||'')}</span></a>`).join('')
  ||(D.ads.length?'<p class="notice">No videos in this category yet.</p>':Array.from({length:D.adPlaceholders},(_,i)=>`<div class="card ${['coral','purple','turquoise'][i%3]} soon big"><span class="em">🎥</span><h3>Campaign video</h3><p>Our next promotional video is being prepared.</p><span class="tag">⏳ Coming Soon</span></div>`).join(''))};
  draw('All');const f=$('#flt');if(f)f.onclick=e=>{const c=e.target.dataset.c;if(!c)return;f.querySelectorAll('.chip').forEach(x=>x.classList.toggle('on',x===e.target));draw(c)}}}};
P.ad=i=>{const a=D.ads[+i];if(!a||!ytId(a.url))return P.nf();return{title:`${a.title} – Our Ads`,desc:a.description||a.title,nav:'ads',crumbs:[['Home','#/'],['Our Ads','#/ads'],[a.title,'']],
 msg:`Watch this campaign: ${a.title}.`,html:`<h1>${esc(a.title)}</h1>${player(a.url,a.title)}<p style="max-width:900px;margin:auto">${esc(a.description||'')}</p><div class="row"><a class="btn alt" href="#/ads">← Back to Our Ads</a></div>`}};
P.nf=()=>({title:'Page not found – International Education Egypt',desc:'Page not found.',nav:'',crumbs:[['Home','#/'],['Not found','']],msg:"Oops! I can't find that page. Let's go back home together.",html:'<h1>Page not found</h1><p>That page does not exist.</p><a class="btn" href="#/">Go to Home</a>'});

/* ---------- router ---------- */
function route(){const p=location.hash.replace(/^#\/?/,'').split('/').filter(Boolean);let r;
 if(!p.length)r=P.home();else if(p[0]==='apps')r=P.apps();else if(p[0]==='grade')r=P.grade(p[1]);else if(p[0]==='video')r=videoPage(p[1],p[2]);
 else if(p[0]==='review')r=videoPage('8','review');else if(p[0]==='kids')r=p[1]==='play'?P.play():P.kids();else if(p[0]==='ads')r=P.ads();else if(p[0]==='ad')r=P.ad(p[1]);else r=P.nf();
 document.title=r.title;let m=document.querySelector('meta[name=description]');m.content=r.desc;
 main.classList.remove('enter');main.innerHTML=r.html;main.offsetHeight;main.classList.add('enter');
 crumbs(r.crumbs);say(r.msg);r.after&&r.after();
 document.querySelectorAll('#nav a').forEach(a=>a.classList.toggle('on',a.dataset.r===r.nav));
 $('#nav').classList.remove('open');$('#burger').setAttribute('aria-expanded','false');
 window.scrollTo({top:0});main.focus({preventScroll:true});reveal()}
window.addEventListener('hashchange',route);
$('#burger').onclick=()=>{const o=$('#nav').classList.toggle('open');$('#burger').setAttribute('aria-expanded',o)};
$('#yr').textContent=new Date().getFullYear();
/* floating background icons */
if(!matchMedia('(prefers-reduced-motion:reduce)').matches)$('#bg').innerHTML=['📚','⭐','✏️','🔬','➗','🌍','💡','🎓','✨','📐'].map((e,i)=>`<i style="left:${(i*37+8)%95}%;font-size:${22+i%4*10}px;animation-duration:${22+i*4}s;animation-delay:-${i*5}s">${e}</i>`).join('');
route();
})();
