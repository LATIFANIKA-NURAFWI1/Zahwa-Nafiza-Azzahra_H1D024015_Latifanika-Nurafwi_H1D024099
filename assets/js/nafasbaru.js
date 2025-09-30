// Utilities
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);
const store = {
  get(k, d){ try{ return JSON.parse(localStorage.getItem(k)) ?? d }catch{ return d } },
  set(k, v){ localStorage.setItem(k, JSON.stringify(v)) }
};

// Dark mode toggle
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = store.get('nb_theme', prefersDark ? 'dark' : 'light');
setTheme(savedTheme);
$('#darkToggle')?.addEventListener('click', ()=> setTheme(document.documentElement.classList.contains('dark') ? 'light' : 'dark'));
function setTheme(mode){
  document.documentElement.classList.toggle('dark', mode==='dark');
  document.documentElement.classList.toggle('light', mode!=='dark');
  store.set('nb_theme', mode);
}

// Mobile menu
$('#menuBtn')?.addEventListener('click', ()=> $('#mobileMenu').classList.toggle('hidden'));

// Scroll reveal
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('active'); observer.unobserve(e.target); }
  })
}, { threshold: 0.12 });
$$('.reveal').forEach(el=> observer.observe(el));

// Navigation Guard
const SECTIONS = ['home','features','challenge','health','money','news','contact','about'];
function hideAllSections(){ SECTIONS.forEach(id => { const el = document.getElementById(id); if (el && !el.classList.contains('hidden')) el.classList.add('hidden'); }); }
function highlightActive(sec){ $$('#navDesktop a[data-sec], #mobileMenu a[data-sec]').forEach(a => { const isActive = a.getAttribute('data-sec') === sec; a.classList.toggle('bg-white/20', isActive); a.classList.toggle('font-semibold', isActive); }); }
function showSectionFromNav(sec){ if (!SECTIONS.includes(sec)) sec = 'home'; hideAllSections(); const el = document.getElementById(sec); if (el) { el.classList.remove('hidden'); el.classList.add('reveal','active'); } highlightActive(sec); const mm=$('#mobileMenu'); if (mm && !mm.classList.contains('hidden')) mm.classList.add('hidden'); history.replaceState({}, document.title, location.pathname); const g=$('#guardMsg'); if (g) g.classList.add('hidden'); }
function blockDirectAccess(){ if (location.hash && location.hash !== '#home') { hideAllSections(); const g=$('#guardMsg'); if (g) g.classList.remove('hidden'); const home=document.getElementById('home'); if (home) home.classList.remove('hidden'); highlightActive('home'); history.replaceState({}, document.title, location.pathname); } else { hideAllSections(); const home=document.getElementById('home'); if (home) home.classList.remove('hidden'); highlightActive('home'); } }
function initNavGuard(){
  $$('#navDesktop a[data-sec], #mobileMenu a[data-sec]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const sec = a.getAttribute('data-sec');
      showSectionFromNav(sec);
      const targetSel = a.getAttribute('data-scroll');
      if (targetSel) { setTimeout(() => { const t = document.querySelector(targetSel); if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 50); }
    });
  });
  $$('a[href^="#"]').forEach(a => { if (!a.hasAttribute('data-sec')) { a.addEventListener('click', (e) => { e.preventDefault(); const g=$('#guardMsg'); if (g) g.classList.remove('hidden'); showSectionFromNav('home'); }); } });
  blockDirectAccess();
}

// Challenge (subset used)
const DUR = [1,3,5,7,14,30];
let challenge = store.get('nb_challenge', { durationDays: 0, progressDays: 0, badges: [] });
let selected = challenge.durationDays || 7;
function renderDur(){ const wrap = document.getElementById('durationWrap'); if(!wrap) return; wrap.innerHTML=''; DUR.forEach(d=>{ const btn=document.createElement('button'); btn.className='px-4 py-2 rounded-xl border bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 '+(selected===d?'ring-2 ring-sky-400':''); btn.textContent=d+' hari'; btn.onclick=()=>{ selected=d; updateChallengeUI(); }; wrap.appendChild(btn); }); }
function start(){ challenge={ durationDays:selected, progressDays:0, badges:[] }; store.set('nb_challenge', challenge); updateChallengeUI(); }
function progressCh(){ if(!challenge.durationDays) return; if(challenge.progressDays>=challenge.durationDays) return; challenge.progressDays++; if(challenge.progressDays%5===0) challenge.badges.push('milestone-'+challenge.progressDays); store.set('nb_challenge', challenge); updateChallengeUI(); }
function reset(){ challenge={ durationDays:0, progressDays:0, badges:[] }; store.set('nb_challenge', challenge); selected=7; updateChallengeUI(); }
function updateChallengeUI(){ if(!document.getElementById('durText')) return; document.getElementById('durText').textContent = challenge.durationDays? (challenge.durationDays+' hari') : selected+' (belum mulai)'; document.getElementById('progText').textContent = challenge.durationDays? `${challenge.progressDays}/${challenge.durationDays} hari` : '0/0 hari'; document.getElementById('badgeText').textContent = challenge.badges?.length? challenge.badges.join(', ') : '-'; const pct = challenge.durationDays? Math.min(100, Math.round(challenge.progressDays*100/challenge.durationDays)) : 0; document.getElementById('progFill').style.width = pct + '%'; }

// Money
let chart; function calcMoney(){
  const daily = Number($('#daily')?.value || 0);
  const price = Number($('#price')?.value || 0);
  const cppRaw = Number($('#cpp')?.value || 20);
  const cpp = cppRaw > 0 ? cppRaw : 20; // guard invalid/zero cpp
  const dateVal = $('#qdate')?.value;

  let days = 0, saved = 0;
  if (dateVal) {
    const diff = Date.now() - new Date(dateVal).getTime();
    days = Math.max(0, Math.floor(diff / 86400000));
    const packs = cpp ? (daily / cpp) : 0;
    saved = Math.round(days * packs * price);
  }

  if ($('#days')) $('#days').textContent = days;
  if ($('#saved')) $('#saved').textContent = saved.toLocaleString('id-ID');

  const labels = Array.from({ length: Math.min(30, Math.max(1, days || 7)) }, (_, i) => 'Hari ' + (i + 1));
  const perDay = cpp ? (daily / cpp) * price : 0;
  const data = labels.map((_, i) => Math.round(perDay * (i + 1)));
  const ctx = document.getElementById('moneyChart');
  if (ctx) {
    if (chart) chart.destroy();
    chart = new Chart(ctx, {
      type: 'line',
      data: { labels, datasets: [{ label: 'Hemat (IDR)', data, fill: true, borderColor: '#4CAF50', backgroundColor: 'rgba(76,175,80,.15)', tension: .25 }] },
      options: { responsive: true, plugins: { legend: { display: true } }, scales: { y: { ticks: { callback: v => v.toLocaleString('id-ID') } } } }
    });
  }

  // Store with consistent key 'date' for health integration. Keep 'qdate' for backward compat.
  store.set('nb_money', { daily, price, cpp, date: dateVal, qdate: dateVal });
}
function loadMoney(){
  const s = store.get('nb_money', null);
  if (!s) return;
  if ($('#daily')) $('#daily').value = s.daily || '';
  if ($('#price')) $('#price').value = s.price || '';
  if ($('#cpp')) $('#cpp').value = s.cpp || 20;
  // migrate old key qdate -> date if needed
  const effectiveDate = s.date || s.qdate || '';
  if (!s.date && s.qdate) {
    store.set('nb_money', { ...s, date: s.qdate });
  }
  if (effectiveDate && $('#qdate')) $('#qdate').value = effectiveDate;
}
$('#calcBtn')?.addEventListener('click', calcMoney);

// Health simplified
const IMPACTS = [ { day:1, text:'Hari 1: Kadar CO dalam darah mulai menurun.' }, { day:3, text:'Hari 3: Pernapasan terasa lebih lega.' }, { day:14, text:'Hari 14: Sirkulasi darah mulai meningkat.' }, { day:365, text:'1 Tahun: Risiko penyakit jantung menurun.' } ];
function healthTarget(){ const ch = store.get('nb_challenge', null); return ch?.durationDays || 30; }
function calcDaysSinceQuit(){
  const m = store.get('nb_money', null);
  const dt = m?.date || m?.qdate; // support old saved data
  if (dt) {
    const diff = Date.now() - new Date(dt).getTime();
    return Math.max(0, Math.floor(diff / 86400000));
  }
  return store.get('ht_manualDays', 0);
}
function setManualDays(d){ store.set('ht_manualDays', d); }
function switchHTab(key){ ['progress','impact','tips'].forEach(k=>{ const panel=document.getElementById('htab-'+k); if(panel) panel.classList.toggle('hidden', k!==key); }); document.querySelectorAll('[data-htab]').forEach(b=>{ const active=b.getAttribute('data-htab')===key; b.classList.toggle('bg-sky-500', active); b.classList.toggle('text-white', active); b.classList.toggle('bg-slate-100', !active); b.classList.toggle('dark:bg-slate-700', !active); }); }
function renderHealthSimple(){ const tabBtns=document.querySelectorAll('[data-htab]'); tabBtns.forEach(b=> b.addEventListener('click', ()=> switchHTab(b.getAttribute('data-htab')))); const target=healthTarget(); const days=calcDaysSinceQuit(); const pct=Math.max(0, Math.min(100, Math.round((days/target)*100))); if($('#ht_days')) $('#ht_days').textContent=days; if($('#ht_bar')) $('#ht_bar').style.width=pct+'%'; const sum=[ `Target ${target} hari`, days>=1?'Detak jantung mulai normal':'Mulai hari ini lebih baik', days>=3?'Pernapasan lebih lega':'Tetap hidrasi & istirahat', days>=14?'Sirkulasi membaik':'Terus bergerak ringan setiap hari' ]; const ul=$('#ht_summary'); if(ul){ ul.innerHTML=''; sum.forEach(s=>{ const li=document.createElement('li'); li.textContent=s; ul.appendChild(li); }); } const imp=$('#ht_impacts'); if(imp){ imp.innerHTML=''; IMPACTS.forEach(i=>{ const reached=days>=i.day; const li=document.createElement('li'); li.className='flex items-start gap-3 p-3 rounded-xl '+(reached?'bg-emerald-50 dark:bg-emerald-900/20':'bg-slate-50 dark:bg-slate-800'); const icon=document.createElement('div'); icon.className='h-7 w-7 rounded-full grid place-items-center '+(reached?'bg-emerald-500 text-white':'bg-slate-300 text-slate-700'); icon.innerHTML='<i class="fa-solid '+(reached?'fa-check':'fa-heart-pulse')+'"></i>'; const text=document.createElement('div'); text.textContent=i.text; li.appendChild(icon); li.appendChild(text); imp.appendChild(li); }); }
  const tip=days>=14?'Coba meditasi singkat untuk jaga konsistensi.':days>=7?'Olahraga ringan bantu paru-paru makin kuat.':days>=3?'Minum air hangat dan peregangan ringan.':'Minum banyak air hari ini.'; if($('#ht_tip')) $('#ht_tip').textContent=tip; const up=$('#ht_update'); if(up){ up.onclick=()=>{ const m=store.get('nb_money', null); if(!m?.date){ const cur=store.get('ht_manualDays', 0); setManualDays(cur+1); renderHealthSimple(); } else { renderHealthSimple(); } }; }
}

// Contact form
function initContactForm(){ const form=document.getElementById('contactForm'); if(!form) return; form.addEventListener('submit',(e)=>{ e.preventDefault(); const name=$('#cf_name').value.trim(); const email=$('#cf_email').value.trim(); const msg=$('#cf_msg').value.trim(); if(!name||!email||!msg) return; const all=store.get('nb_contacts', []); all.push({ name, email, msg, at:new Date().toISOString() }); store.set('nb_contacts', all); const status=$('#cf_status'); if(status) status.classList.remove('hidden'); form.reset(); }); }

// Init
function init(){ document.getElementById('year') && (document.getElementById('year').textContent=new Date().getFullYear()); renderDur(); updateChallengeUI(); loadMoney(); initNavGuard(); initContactForm(); renderHealthSimple(); switchHTab('progress'); }
window.addEventListener('DOMContentLoaded', init);
