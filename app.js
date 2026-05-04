'use strict';
/* MY ROUTINE v3 — Frontend (talks to Flask API) */

// ═══════════════════════════════════════
// CONFIG & CONSTANTS
// ═══════════════════════════════════════
const API = '';  // same origin — Flask serves static + API

const PRAYERS_LIST = [
  {name:'Fajr',   ar:'الفجر',  defaultTime:'05:14'},
  {name:'Dhuhr',  ar:'الظهر',  defaultTime:'12:21'},
  {name:'Asr',    ar:'العصر',  defaultTime:'15:43'},
  {name:'Maghrib',ar:'المغرب', defaultTime:'18:19'},
  {name:'Isha',   ar:'العشاء', defaultTime:'19:25'},
];

const HABITS_LIST = [
  {id:'fajr',    label:'Fajr on Time',          cat:'deen'},
  {id:'quran',   label:'Qurʾān (5+ min)',         cat:'deen'},
  {id:'qiyam',   label:'Qiyamu Completed',        cat:'deen'},
  {id:'reality3',label:'3 Reality Checks',        cat:'deen'},
  {id:'salah5',  label:'All 5 Ṣalāh on Time',    cat:'deen'},
  {id:'dhikr',   label:'Dhikr (100+)',             cat:'deen'},
  {id:'workout', label:'Workout Done',             cat:'fitness'},
  {id:'norice',  label:'No Extra Rice / Junk',     cat:'fitness'},
  {id:'water',   label:'Water Intake OK',          cat:'fitness'},
  {id:'nosoda',  label:'No Soda / Sugary Drinks',  cat:'fitness'},
  {id:'fruit',   label:'Ate Fruit',                cat:'fitness'},
  {id:'studyr',  label:'Study Recall (10+ min)',   cat:'mind'},
  {id:'wrapup',  label:'Daily Wrapup Done',        cat:'mind'},
  {id:'sleep23', label:'Sleep before 23:00',       cat:'mind'},
];

const SCHEDULE = [
  {time:'04:00',end:'04:30',title:'Warmup Exercises',sub:'Stretch · Light movement',type:'fitness'},
  {time:'04:30',end:'05:14',title:'Qiyamu al-Layl',sub:'Night prayer · Duʿāʾ',type:'deen'},
  {time:'05:14',end:'05:30',title:'Fajr Ṣalāh',sub:'Ṣalāh · Gratitude · Dhikr',type:'prayer'},
  {time:'05:30',end:'06:15',title:'Qurʾān',sub:'Recitation · Tafsīr · Memorization',type:'deen'},
  {time:'06:15',end:'06:30',title:'Morning Adhkār',sub:'Personal · Family · Forgiveness',type:'deen'},
  {time:'06:30',end:'07:15',title:'Workout',sub:'Push-ups · Squats · Plank / Cardio',type:'fitness'},
  {time:'07:15',end:'07:30',title:'Shower',sub:'Freshen up',type:'fitness'},
  {time:'07:30',end:'08:00',title:'Breakfast + Plan',sub:'Banana · Tea · Set targets',type:'food'},
  {time:'08:00',end:'08:15',title:'Mind Detox',sub:'No phone · Clear mind',type:'rest'},
  {time:'08:15',end:'10:00',title:'Working / Studying',sub:'Deep Work · Focus Mode',type:'study'},
  {time:'10:00',end:'10:15',title:'Water + Fruit',sub:'Hydrate · Refresh',type:'food'},
  {time:'10:15',end:'11:30',title:'Soft Skill Learning',sub:'Communication · Leadership',type:'study'},
  {time:'11:30',end:'12:00',title:'Reality Check — Light',sub:'Islamic video · Reminder',type:'reality'},
  {time:'12:21',end:'12:35',title:'Dhuhr Ṣalāh',sub:'Pray · Dhikr',type:'prayer'},
  {time:'12:35',end:'13:25',title:'Reality Check — Deep',sub:'ʿAqīdah · Fiqh · Sīrah',type:'deen'},
  {time:'13:25',end:'14:00',title:'Lunch',sub:'Less rice · Eat protein',type:'food'},
  {time:'14:00',end:'14:15',title:'Post-Lunch Walk',sub:'10–15 min',type:'fitness'},
  {time:'14:15',end:'14:55',title:'Qaylūlah / Rest',sub:'Nap · Silence',type:'rest'},
  {time:'14:55',end:'15:30',title:'Self Improvement',sub:'Projects · Skills',type:'study'},
  {time:'15:43',end:'16:00',title:'ʿAṣr Ṣalāh',sub:'Pray · Dhikr',type:'prayer'},
  {time:'16:00',end:'16:20',title:'Reality Check — Apply',sub:'Dhikr · Action Plan',type:'reality'},
  {time:'16:20',end:'17:00',title:'Cheerup + Activity',sub:'Walk · Talk · Refresh',type:'fitness'},
  {time:'17:00',end:'17:30',title:'Fruit / Snack',sub:'No junk',type:'food'},
  {time:'17:30',end:'18:15',title:'Learning / Studying',sub:'Active Recall · Practice',type:'study'},
  {time:'18:19',end:'18:35',title:'Maghrib Ṣalāh',sub:'Gratitude · Dhikr',type:'prayer'},
  {time:'18:35',end:'19:10',title:'Self Dev & Finance',sub:'Track income · Goals',type:'study'},
  {time:'19:10',end:'19:25',title:'Light Meal Prep',sub:'Small portion · No heavy rice',type:'food'},
  {time:'19:25',end:'19:45',title:'Ishāʾ Ṣalāh',sub:'Pray · Night Dhikr',type:'prayer'},
  {time:'19:45',end:'21:30',title:'Working / Studying',sub:'Deep Focus',type:'study'},
  {time:'21:30',end:'21:45',title:'Dinner',sub:'Light meal',type:'food'},
  {time:'21:45',end:'22:30',title:'Games & Movies',sub:'Wind down',type:'rest'},
  {time:'22:30',end:'23:00',title:'Daily Wrapup',sub:'3 questions · Reflection',type:'wrapup'},
  {time:'23:00',end:'04:00',title:'Long Rest (5 hrs)',sub:'Sleep · Recovery',type:'sleep'},
];

const WEEKLY_PLAN = [
  {day:'Mon',topic:'ʿAqīdah',sub:'Tawḥīd / Belief',workout:'Full Body'},
  {day:'Tue',topic:'Fiqh',sub:'Wuḍūʾ & Ṣalāh',workout:'Cardio'},
  {day:'Wed',topic:'Sīrah',sub:'Life of Prophet ﷺ',workout:'Full Body'},
  {day:'Thu',topic:'Asmāʾ al-Ḥusnā',sub:'Names of Allah',workout:'Cardio'},
  {day:'Fri',topic:'Jumuʿah',sub:'Sunnahs & Khuṭbah',workout:'Full Body'},
  {day:'Sat',topic:'Hadith & Akhlāq',sub:'Manners & Character',workout:'Light Activity'},
  {day:'Sun',topic:'Review & Duʿāʾ',sub:'Reflection & Planning',workout:'Rest'},
];

const AYAHS = [
  {ar:'إِنَّ مَعَ الْعُسْرِ يُسْرًا',trans:'"Indeed, with hardship will be ease."',ref:'Qurʾān 94:6'},
  {ar:'وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ',trans:'"Seek help through patience and prayer."',ref:'Qurʾān 2:45'},
  {ar:'وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ',trans:'"Whoever relies upon Allah — He is sufficient for him."',ref:'Qurʾān 65:3'},
  {ar:'إِنَّ اللَّهَ مَعَ الصَّابِرِينَ',trans:'"Indeed, Allah is with the patient."',ref:'Qurʾān 2:153'},
  {ar:'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',trans:'"Verily, in the remembrance of Allah do hearts find rest."',ref:'Qurʾān 13:28'},
  {ar:'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا',trans:'"For indeed, with hardship will be ease."',ref:'Qurʾān 94:5'},
  {ar:'رَبِّ زِدۡنِي عِلۡمًا',trans:'"My Lord, increase me in knowledge."',ref:'Qurʾān 20:114'},
];

const ACHIEVEMENTS = [
  {id:'first_day',  icon:'🌅',name:'First Step',      desc:'Complete your first day'},
  {id:'salah_3',    icon:'🕌',name:'3-Day Streak',    desc:'All 5 prayers for 3 consecutive days'},
  {id:'salah_7',    icon:'🏅',name:'Salah Week',      desc:'All 5 prayers for 7 consecutive days'},
  {id:'salah_30',   icon:'🏆',name:'Salah Month',     desc:'All 5 prayers for 30 consecutive days'},
  {id:'lost_3',     icon:'💪',name:'3kg Down',        desc:'Lost 3kg from starting weight'},
  {id:'lost_5',     icon:'🔥',name:'5kg Down',        desc:'Lost 5kg from starting weight'},
  {id:'lost_10',    icon:'⚡',name:'10kg Down',       desc:'Lost 10kg from starting weight'},
  {id:'goal',       icon:'🌟',name:'Goal Reached!',   desc:'Reached your goal weight'},
  {id:'quran_10',   icon:'📖',name:'Qurʾān Reader',  desc:'Logged reading for 10 days'},
  {id:'journal_7',  icon:'📝',name:'Reflective Mind', desc:'Journal entries for 7 days'},
  {id:'pomo_10',    icon:'⏱️',name:'Focus Master',   desc:'Completed 10 Pomodoro sessions'},
  {id:'habits_7',   icon:'✅',name:'Habit Hero',      desc:'All habits done for 7 days'},
];

const DOT_C = {prayer:'#2a8c60',deen:'#d4730a',fitness:'#3a8adf',study:'#3a5a8a',food:'#a06820',reality:'#f0b429',rest:'#3a4a6a',wrapup:'#9050b0',sleep:'#3040a0'};
const DAYS7 = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MEALS = ['Breakfast','Lunch','Dinner'];

// ═══════════════════════════════════════
// STATE
// ═══════════════════════════════════════
let currentDate = (() => {const d=new Date();d.setHours(0,0,0,0);return d;})();
let settings = {};
let dayCache = {};   // date → {prayers, habits, journal, ...}
let stats = {};
let currentTab = 'home';
let saveTimers = {};
let pomo = {running:false,phase:'focus',session:1,total:4,timeLeft:25*60,fullTime:25*60,timer:null};
let notifTimers = [];

// ═══════════════════════════════════════
// API HELPERS
// ═══════════════════════════════════════
async function api(path, method='GET', body=null) {
  const opts = {method, headers:{'Content-Type':'application/json'}};
  if (body) opts.body = JSON.stringify(body);
  try {
    const r = await fetch(API + '/api' + path, opts);
    return r.ok ? await r.json() : null;
  } catch(e) {
    console.warn('API error:', path, e);
    return null;
  }
}

// ═══════════════════════════════════════
// DATE HELPERS
// ═══════════════════════════════════════
function dk(d) { return d.toISOString().slice(0,10); }
function isToday(d) { const t=new Date();t.setHours(0,0,0,0);return d.getTime()===t.getTime(); }
function fmtDate(d) { return d.toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short',year:'numeric'}); }
function fmtHijri(d) { try{return new Intl.DateTimeFormat('en-u-ca-islamic',{day:'numeric',month:'long',year:'numeric'}).format(d);}catch(e){return '';} }
function getPrayerTime(name) { return (settings.prayer_times||{})[name] || PRAYERS_LIST.find(p=>p.name===name)?.defaultTime || '00:00'; }

function getNextPrayer() {
  const now = new Date();
  const nowM = now.getHours()*60+now.getMinutes();
  const list = PRAYERS_LIST.map(p => {
    const t=getPrayerTime(p.name);
    const [h,m]=t.split(':').map(Number);
    return {...p,mins:h*60+m,time:t};
  });
  const next = list.find(p=>p.mins>nowM) || list[0];
  let diff = next.mins - nowM;
  if(diff<0) diff+=1440;
  return {...next,diff};
}

function fmtCountdown(mins) {
  if(mins>60) return Math.floor(mins/60)+'h '+mins%60+'m';
  return mins+'m';
}

// ═══════════════════════════════════════
// REAL-TIME CLOCK
// ═══════════════════════════════════════
function startClock() {
  function tick() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2,'0');
    const mm = String(now.getMinutes()).padStart(2,'0');
    const ss = String(now.getSeconds()).padStart(2,'0');
    const clockEl = document.getElementById('liveClock');
    if(clockEl) clockEl.textContent = hh+':'+mm+':'+ss;

    const np = getNextPrayer();
    const npEl = document.getElementById('nextPrayerStrip');
    if(npEl) npEl.textContent = '🕌 '+np.name+' '+np.time+' (in '+fmtCountdown(np.diff)+')';

    // Update home next prayer countdown live
    const hcd = document.getElementById('hnpCountdown');
    if(hcd) hcd.textContent = 'in '+fmtCountdown(np.diff);

    // Highlight current schedule block
    if(currentTab==='schedule') {
      const nowM = now.getHours()*60+now.getMinutes();
      document.querySelectorAll('.tl-block').forEach((bl,i)=>{
        const s = SCHEDULE[i];
        if(!s) return;
        const [sh,sm]=s.time.split(':').map(Number);
        const [eh,em]=(SCHEDULE[i+1]||{time:'04:00'}).time.split(':').map(Number);
        const start=sh*60+sm, end=eh*60+em;
        bl.querySelector('.tl-card')?.classList.toggle('current', nowM>=start&&nowM<end);
      });
    }
  }
  tick();
  setInterval(tick, 1000);
}

// ═══════════════════════════════════════
// SETTINGS
// ═══════════════════════════════════════
async function loadSettings() {
  const s = await api('/settings');
  if(s) { settings = s; applyTheme(s.theme||'dark'); }
}

async function saveSetting(key, val) {
  settings[key] = val;
  await api('/settings','PUT',{[key]:val});
}

async function savePrayerTime(name, val) {
  if(!settings.prayer_times) settings.prayer_times={};
  settings.prayer_times[name] = val;
  await api('/settings','PUT',{prayer_times:settings.prayer_times});
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme==='dark'?'':theme);
  document.querySelectorAll('.theme-btn').forEach(b=>b.classList.remove('active'));
  const btn = document.getElementById('th-'+theme);
  if(btn) btn.classList.add('active');
}

function setTheme(t) { saveSetting('theme',t); applyTheme(t); }

// ═══════════════════════════════════════
// LOAD DAY DATA
// ═══════════════════════════════════════
async function loadDay(d) {
  const k = dk(d);
  const [prayerData, journalData] = await Promise.all([
    api('/prayers/'+k),
    api('/journal/'+k),
  ]);
  dayCache[k] = {
    prayers: {},
    qada: {},
    habits: {},
    ...(journalData?.journal || {}),
    studyLog: journalData?.study_log || [],
    revisionLog: journalData?.revision_log || [],
    exercises: journalData?.exercises || [],
    meals: {},
    pomoToday: journalData?.pomo_today || 0,
  };
  // Map prayers
  (prayerData?.prayers || []).forEach(p => { dayCache[k].prayers[p.prayer] = p.status; });
  (prayerData?.qada || []).forEach(q => { dayCache[k].qada[q.prayer] = q.count; });
  // Map habits
  const habitData = await api('/habits/'+k);
  (habitData || []).forEach(h => { dayCache[k].habits[h.habit_id] = h.done === 1; });
  // Map meals
  (journalData?.meals || []).forEach(m => { dayCache[k].meals[m.meal] = m.status; });
  return dayCache[k];
}

function getDay() { return dayCache[dk(currentDate)] || {}; }

// ═══════════════════════════════════════
// LOAD STATS
// ═══════════════════════════════════════
async function loadStats() {
  const s = await api('/stats');
  if(s) {
    stats = s;
    updateStripFromStats();
  }
}

function updateStripFromStats() {
  const data = getDay();
  const prayed = PRAYERS_LIST.filter(p=>data.prayers?.[p.name]==='prayed').length;
  const score = data.day_score || 0;
  const stripScore = document.getElementById('stripScore');
  const stripSalah = document.getElementById('stripSalah');
  if(stripScore) { stripScore.textContent=score; stripScore.style.color=score>=80?'var(--green-l)':score>=50?'var(--gold-l)':'var(--red-l)'; }
  if(stripSalah) stripSalah.textContent=prayed+'/5 🕌';
}

// ═══════════════════════════════════════
// TOGGLE PRAYER
// ═══════════════════════════════════════
async function togglePrayer(name) {
  const k = dk(currentDate);
  if(!dayCache[k]) dayCache[k]={prayers:{},habits:{},qada:{},meals:{}};
  const cur = dayCache[k].prayers[name] || 'none';
  const next = {none:'prayed',prayed:'missed',missed:'none'}[cur];
  dayCache[k].prayers[name] = next;
  // Optimistic UI
  renderPrayers(); renderHomePrayers();
  const res = await api('/prayers/'+k+'/'+name,'PUT',{status:next});
  if(res?.score !== undefined) {
    dayCache[k].day_score = res.score;
    updateStripFromStats();
  }
  scheduleNotifications();
}

// ═══════════════════════════════════════
// TOGGLE HABIT
// ═══════════════════════════════════════
async function toggleHabit(habitId, dayOffset) {
  const today = new Date(); today.setHours(0,0,0,0);
  const target = new Date(today); target.setDate(today.getDate()-dayOffset);
  if(target>today) return;
  const k = dk(target);
  if(!dayCache[k]) dayCache[k]={prayers:{},habits:{},qada:{},meals:{}};
  dayCache[k].habits[habitId] = !dayCache[k].habits[habitId];
  renderHabits();
  await api('/habits/'+k+'/'+habitId,'PUT',{done:dayCache[k].habits[habitId]});
  await loadStats();
}

// ═══════════════════════════════════════
// DEBOUNCED SAVE (journal fields)
// ═══════════════════════════════════════
function debounceSave(type, data) {
  const k = dk(currentDate);
  clearTimeout(saveTimers[k]);
  // Merge into cache
  if(!dayCache[k]) dayCache[k]={prayers:{},habits:{},qada:{},meals:{}};
  Object.assign(dayCache[k], data);
  saveTimers[k] = setTimeout(async ()=>{
    await api('/journal/'+k,'PUT',data);
    showToast();
    await loadStats();
    updateStripFromStats();
  }, 800);
}

async function forceSaveAll() {
  const k = dk(currentDate);
  const data = {};
  const fields = {journalText:'journal',improveText:'improve',prayerNotes:'prayer_notes',
    quranJuz:'quran_juz',quranPages:'quran_pages',quranSurah:'quran_surah',
    workoutNotes:'workout_notes',softSkillNote:'soft_skill',grat1:'grat1',grat2:'grat2',grat3:'grat3'};
  Object.entries(fields).forEach(([id,key])=>{
    const el=document.getElementById(id);
    if(el) data[key]=el.value;
  });
  await api('/journal/'+k,'PUT',data);
  showToast();
  await loadStats();
}

function showToast() {
  const t=document.getElementById('savedToast');
  if(t){t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2000);}
}

// ═══════════════════════════════════════
// WRAPUP
// ═══════════════════════════════════════
async function setDeen(val) {
  const k=dk(currentDate);
  const cur=(dayCache[k]||{}).deen_rating;
  const nv=cur===val?null:val;
  if(!dayCache[k]) dayCache[k]={prayers:{},habits:{},qada:{},meals:{}};
  dayCache[k].deen_rating=nv;
  await api('/journal/'+k,'PUT',{deen_rating:nv});
  renderWrapup();
}
async function setStudyRate(v) {
  const k=dk(currentDate);
  if(!dayCache[k]) dayCache[k]={prayers:{},habits:{},qada:{},meals:{}};
  dayCache[k].study_rate=dayCache[k].study_rate===v?null:v;
  await api('/journal/'+k,'PUT',{study_rate:dayCache[k].study_rate});
  renderWrapup();
}
async function setEnergyRate(v) {
  const k=dk(currentDate);
  if(!dayCache[k]) dayCache[k]={prayers:{},habits:{},qada:{},meals:{}};
  dayCache[k].energy_rate=dayCache[k].energy_rate===v?null:v;
  await api('/journal/'+k,'PUT',{energy_rate:dayCache[k].energy_rate});
  renderWrapup();
}

// ═══════════════════════════════════════
// WEIGHT
// ═══════════════════════════════════════
async function logWeight() {
  const wi=document.getElementById('weightInput');
  const bi=document.getElementById('bellyInput');
  const kg=parseFloat(wi?.value);
  const belly=parseFloat(bi?.value)||null;
  if(!kg||kg<30||kg>300){wi.style.borderColor='var(--red)';setTimeout(()=>wi.style.borderColor='',1e3);return;}
  await api('/weight','POST',{date:dk(currentDate),kg,belly_cm:belly});
  wi.value=''; if(bi) bi.value='';
  await loadStats();
  renderFitness();
}

async function deleteWeight(date) {
  await api('/weight/'+date,'DELETE');
  await loadStats();
  renderFitness();
}

// ═══════════════════════════════════════
// STUDY LOG
// ═══════════════════════════════════════
function showStudyAdd() {
  showModal('Add Study Entry', [
    {label:'Subject',id:'mSubject',placeholder:'e.g. Fiqh, Arabic, Math'},
    {label:'Minutes',id:'mMins',type:'number',placeholder:'25'},
  ], async ()=>{
    const subj=document.getElementById('mSubject')?.value?.trim();
    const mins=parseInt(document.getElementById('mMins')?.value)||25;
    if(!subj) return;
    await api('/study/'+dk(currentDate),'POST',{subject:subj,minutes:mins});
    closeModal();
    const data=await loadDay(currentDate);
    renderStudy();
  });
}

async function deleteStudy(id) {
  await api('/study/'+id,'DELETE');
  await loadDay(currentDate);
  renderStudy();
}

// ═══════════════════════════════════════
// EXERCISES
// ═══════════════════════════════════════
function showExerciseAdd() {
  showModal('Add Exercise', [
    {label:'Exercise Name',id:'mExName',placeholder:'e.g. Push-ups'},
    {label:'Sets',id:'mSets',type:'number',placeholder:'3'},
    {label:'Reps',id:'mReps',type:'number',placeholder:'15'},
  ], async ()=>{
    const name=document.getElementById('mExName')?.value?.trim();
    const sets=parseInt(document.getElementById('mSets')?.value)||0;
    const reps=parseInt(document.getElementById('mReps')?.value)||0;
    if(!name) return;
    await api('/exercises/'+dk(currentDate),'POST',{name,sets,reps});
    closeModal();
    await loadDay(currentDate);
    renderFitness();
  });
}

async function deleteExercise(id) {
  await api('/exercises/'+id,'DELETE');
  await loadDay(currentDate);
  renderFitness();
}

// ═══════════════════════════════════════
// REVISION
// ═══════════════════════════════════════
function showRevisionAdd() {
  showModal('Add Revision Entry', [
    {label:'What did you memorise / revise?',id:'mRevContent',placeholder:'Surah, Hadith, or Duʿāʾ...'},
  ], async ()=>{
    const content=document.getElementById('mRevContent')?.value?.trim();
    if(!content) return;
    await api('/revision/'+dk(currentDate),'POST',{content});
    closeModal();
    await loadDay(currentDate);
    renderQuran();
  });
}

async function deleteRevision(id) {
  await api('/revision/'+id,'DELETE');
  await loadDay(currentDate);
  renderQuran();
}

// ═══════════════════════════════════════
// MEALS
// ═══════════════════════════════════════
async function setMeal(meal, status) {
  const k=dk(currentDate);
  if(!dayCache[k]) dayCache[k]={prayers:{},habits:{},qada:{},meals:{}};
  const cur=(dayCache[k].meals||{})[meal];
  const nv=cur===status?'none':status;
  dayCache[k].meals[meal]=nv;
  renderFitness();
  await api('/meals/'+k+'/'+meal,'PUT',{status:nv});
}

// ═══════════════════════════════════════
// QADA
// ═══════════════════════════════════════
async function setQada(prayer, val) {
  const k=dk(currentDate);
  if(!dayCache[k]) dayCache[k]={prayers:{},habits:{},qada:{},meals:{}};
  dayCache[k].qada[prayer]=parseInt(val)||0;
  await api('/qada/'+k+'/'+prayer,'PUT',{count:dayCache[k].qada[prayer]});
}

// ═══════════════════════════════════════
// WORKOUT TYPE
// ═══════════════════════════════════════
async function setWorkoutType(type) {
  const k=dk(currentDate);
  if(!dayCache[k]) dayCache[k]={prayers:{},habits:{},qada:{},meals:{}};
  dayCache[k].workout_type=type;
  await api('/journal/'+k,'PUT',{workout_type:type});
  renderFitness();
}

// ═══════════════════════════════════════
// POMODORO
// ═══════════════════════════════════════
function startPomo(mode) {
  clearInterval(pomo.timer);
  const durations={focus:25*60,short:5*60,long:15*60};
  pomo.phase=mode; pomo.timeLeft=durations[mode]; pomo.fullTime=durations[mode]; pomo.running=true;
  document.getElementById('pomoOverlay').classList.remove('hidden');
  tickPomo();
}

function tickPomo() {
  updatePomoUI();
  pomo.timer=setInterval(()=>{
    if(!pomo.running){clearInterval(pomo.timer);return;}
    pomo.timeLeft--;
    if(pomo.timeLeft<=0){
      clearInterval(pomo.timer);
      if(pomo.phase==='focus'){
        api('/pomodoro','POST',{duration:25});
        if(Notification.permission==='granted') new Notification('✅ Focus done!',{body:'Time for a break!'});
        pomo.session=pomo.session%pomo.total+1;
        pomo.phase=pomo.session===1?'long':'short';
        pomo.timeLeft=pomo.phase==='long'?15*60:5*60;
        pomo.fullTime=pomo.timeLeft;
      } else {
        if(Notification.permission==='granted') new Notification('🔥 Break over!',{body:'Back to work!'});
        pomo.phase='focus'; pomo.timeLeft=25*60; pomo.fullTime=25*60;
      }
      pomo.running=true;
      tickPomo();
      return;
    }
    updatePomoUI();
  },1000);
}

function updatePomoUI(){
  const m=Math.floor(pomo.timeLeft/60),s=pomo.timeLeft%60;
  const phases={focus:'Focus Session',short:'Short Break',long:'Long Break'};
  document.getElementById('pomoClockDisplay').textContent=String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');
  document.getElementById('pomoPhaseLabel').textContent=phases[pomo.phase];
  document.getElementById('pomoSessionLabel').textContent='Session '+pomo.session+'/'+pomo.total;
  document.getElementById('pomoPauseBtn').textContent=pomo.running?'⏸':'▶';
  const pct=(1-pomo.timeLeft/pomo.fullTime)*100;
  const dash=283;
  const offset=dash-(pct/100*dash);
  const ring=document.getElementById('pomoRingFill');
  if(ring) ring.setAttribute('stroke-dashoffset',offset.toString());
  // Update mini widget
  const pw=document.getElementById('pomodoroWidget');
  if(pw){
    const mini=pw.querySelector('.pomo-mini-clock');
    if(mini) mini.textContent=String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');
  }
}

function pomoPause(){pomo.running=!pomo.running;if(pomo.running)tickPomo();else clearInterval(pomo.timer);updatePomoUI();}
function pomoSkip(){pomo.timeLeft=0;}
function closePomo(){clearInterval(pomo.timer);pomo.running=false;document.getElementById('pomoOverlay').classList.add('hidden');}

// ═══════════════════════════════════════
// MODAL HELPER
// ═══════════════════════════════════════
let modalCallback = null;
function showModal(title, fields, onConfirm) {
  document.getElementById('modalTitle').textContent=title;
  document.getElementById('modalBody').innerHTML=fields.map(f=>
    '<div><div class="modal-label">'+f.label+'</div>'+
    '<input class="modal-input" id="'+f.id+'" type="'+(f.type||'text')+'" placeholder="'+(f.placeholder||'')+'"></div>'
  ).join('');
  document.getElementById('modalBtns').innerHTML=
    '<button class="modal-btn" onclick="closeModal()">Cancel</button>'+
    '<button class="modal-btn primary" onclick="modalConfirm()">Save</button>';
  modalCallback=onConfirm;
  document.getElementById('modalOverlay').classList.remove('hidden');
  setTimeout(()=>document.querySelector('.modal-input')?.focus(),100);
}
function modalConfirm(){if(modalCallback)modalCallback();}
function closeModal(){document.getElementById('modalOverlay').classList.add('hidden');modalCallback=null;}

// ═══════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════
async function switchTab(name) {
  currentTab=name;
  document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
  const panel=document.getElementById('tab-'+name);
  if(panel) panel.classList.add('active');
  const tabOrder=['home','prayers','habits','fitness','study'];
  const idx=tabOrder.indexOf(name);
  if(idx>=0) document.querySelectorAll('.nav-btn')[idx]?.classList.add('active');
  document.querySelector('.main-content').scrollTop=0;
  await renderTab(name);
}

function toggleMore(){document.getElementById('moreMenu').classList.toggle('hidden');}

async function changeDay(delta) {
  const d=new Date(currentDate);d.setDate(d.getDate()+delta);
  currentDate=d;
  await reloadDay();
}

async function goToday() {
  const t=new Date();t.setHours(0,0,0,0);
  currentDate=t;
  await reloadDay();
}

async function reloadDay() {
  renderDateNav();
  await loadDay(currentDate);
  await loadStats();
  await renderTab(currentTab);
  updateStripFromStats();
}

// ═══════════════════════════════════════
// EXPORT / IMPORT
// ═══════════════════════════════════════
function exportExcel(){window.location.href='/api/export/excel';}
function exportJSON(){window.location.href='/api/export/json';}

async function importJSON(evt) {
  const file=evt.target.files[0];
  if(!file) return;
  const reader=new FileReader();
  reader.onload=async e=>{
    try{
      const data=JSON.parse(e.target.result);
      const res=await api('/import/json','POST',data);
      alert(res?.message||'Imported!');
      await reloadDay();
    }catch(err){alert('Invalid file: '+err.message);}
  };
  reader.readAsText(file);
}

function resetData(){if(!confirm('Reset ALL data? Cannot undo.')) return; fetch('/api/reset',{method:'POST'}).then(()=>location.reload());}

function printPage(){
  const area=document.getElementById('printArea');
  const data=getDay();
  const k=dk(currentDate);
  area.innerHTML=`
    <h1 style="font-family:Cinzel,serif;color:#050e1a;margin-bottom:8px">My Routine • My Purpose</h1>
    <h2 style="font-family:Cinzel,serif;color:#c9960c;margin-bottom:16px">${fmtDate(currentDate)}</h2>
    <table style="width:100%;border-collapse:collapse;margin-bottom:16px">
      <tr><td style="padding:6px;border:1px solid #ccc;font-weight:bold">Day Score</td><td style="padding:6px;border:1px solid #ccc">${data.day_score||0}/100</td></tr>
      <tr><td style="padding:6px;border:1px solid #ccc;font-weight:bold">Prayers</td><td style="padding:6px;border:1px solid #ccc">${PRAYERS_LIST.map(p=>`${p.name}: ${data.prayers?.[p.name]||'none'}`).join(' | ')}</td></tr>
      <tr><td style="padding:6px;border:1px solid #ccc;font-weight:bold">Habits</td><td style="padding:6px;border:1px solid #ccc">${HABITS_LIST.filter(h=>data.habits?.[h.id]).map(h=>h.label).join(', ')||'None'}</td></tr>
      <tr><td style="padding:6px;border:1px solid #ccc;font-weight:bold">Quran Pages</td><td style="padding:6px;border:1px solid #ccc">${data.quran_pages||0}</td></tr>
      <tr><td style="padding:6px;border:1px solid #ccc;font-weight:bold">Workout</td><td style="padding:6px;border:1px solid #ccc">${data.workout_type||'—'}</td></tr>
      <tr><td style="padding:6px;border:1px solid #ccc;font-weight:bold">Deen Rating</td><td style="padding:6px;border:1px solid #ccc">${data.deen_rating||'—'}</td></tr>
      <tr><td style="padding:6px;border:1px solid #ccc;font-weight:bold">Study Rate</td><td style="padding:6px;border:1px solid #ccc">${data.study_rate||'—'}/10</td></tr>
      <tr><td style="padding:6px;border:1px solid #ccc;font-weight:bold">Gratitude</td><td style="padding:6px;border:1px solid #ccc">${[data.grat1,data.grat2,data.grat3].filter(Boolean).join(' | ')||'—'}</td></tr>
      <tr><td style="padding:6px;border:1px solid #ccc;font-weight:bold">Improve Tomorrow</td><td style="padding:6px;border:1px solid #ccc">${data.improve||'—'}</td></tr>
    </table>
    ${data.journal?`<h3 style="font-family:Cinzel,serif">Journal</h3><p style="line-height:1.7">${data.journal}</p>`:''}
    <div style="margin-top:20px;font-size:11px;color:#888;font-style:italic">وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ — My Routine v3</div>
  `;
  window.print();
}

function requestNotifs() {
  if(!('Notification' in window)){alert('Notifications not supported.');return;}
  Notification.requestPermission().then(p=>{
    saveSetting('notifs',p==='granted'?1:0);
    const btn=document.getElementById('notifBtn');
    if(btn){btn.textContent=p==='granted'?'Enabled ✔':'Denied';btn.className='toggle-btn'+(p==='granted'?' on':'');}
    if(p==='granted') scheduleNotifications();
  });
}

function scheduleNotifications() {
  notifTimers.forEach(clearTimeout);
  notifTimers=[];
  if(!settings.notifs||Notification.permission!=='granted') return;
  const now=new Date();
  PRAYERS_LIST.forEach(p=>{
    const t=getPrayerTime(p.name);
    const [h,m]=t.split(':').map(Number);
    const when=new Date();when.setHours(h,m-5,0,0);
    const diff=when-now;
    if(diff>0&&diff<86400000){
      notifTimers.push(setTimeout(()=>{
        new Notification('🕌 '+p.name+' in 5 minutes',{body:'Prayer time: '+t,icon:'/icons/icon-192.png'});
      },diff));
    }
  });
}

// ═══════════════════════════════════════
// ONBOARDING
// ═══════════════════════════════════════
async function finishOnboarding() {
  const name=document.getElementById('obName')?.value?.trim()||'Friend';
  const sw=parseFloat(document.getElementById('obWeight')?.value)||85;
  const gw=parseFloat(document.getElementById('obGoalW')?.value)||70;
  const city=document.getElementById('obCity')?.value?.trim()||'Kerege, Pemba';
  await api('/settings','PUT',{name,start_weight:sw,goal_weight:gw,city,onboarded:1});
  await api('/weight','POST',{date:dk(currentDate),kg:sw});
  settings={...settings,name,start_weight:sw,goal_weight:gw,city,onboarded:1};
  document.getElementById('onboarding').classList.add('hidden');
  showSplash();
}

// ═══════════════════════════════════════
// RENDER FUNCTIONS
// ═══════════════════════════════════════
function renderDateNav() {
  document.getElementById('topbarDate').textContent=fmtDate(currentDate);
  document.getElementById('topbarHijri').textContent=fmtHijri(currentDate);
}

// HOME
async function renderHome() {
  const h=new Date().getHours();
  const name=settings.name||'Friend';
  const greetIcon=h<5?'🌙':h<12?'🌅':h<17?'☀️':'🌙';
  const greetWord=h<5?'Late Night':h<12?'Good Morning':h<17?'Good Afternoon':'Good Evening';
  document.getElementById('homeGreeting').textContent=greetIcon+' '+greetWord+', '+name+'!';
  const ayah=AYAHS[new Date().getDate()%AYAHS.length];
  document.getElementById('homeAyah').innerHTML=
    '<div class="ayah-arabic">'+ayah.ar+'</div>'+
    '<div class="ayah-trans">'+ayah.trans+'</div>'+
    '<div class="ayah-ref">'+ayah.ref+'</div>';
  renderHomeNextPrayer();
  renderHomePrayers();
  renderHomeSummary();
  renderHomeAchievements();
}

function renderHomeNextPrayer() {
  const np=getNextPrayer();
  const el=document.getElementById('homeNextPrayer');
  if(!el) return;
  el.innerHTML=
    '<div style="display:flex;align-items:center;gap:14px">'+
    '<div style="font-size:32px">🕌</div>'+
    '<div style="flex:1">'+
      '<div class="hnp-label">Next Prayer</div>'+
      '<div style="font-family:Cinzel,serif;font-size:18px;font-weight:700;color:var(--txt)">'+np.name+' <span style="font-family:Cairo,sans-serif;color:var(--gold-l)">'+np.ar+'</span></div>'+
      '<div id="hnpCountdown" style="font-size:12px;color:var(--muted);margin-top:2px">in '+fmtCountdown(np.diff)+'</div>'+
    '</div>'+
    '<div style="text-align:right">'+
      '<div style="font-family:Cinzel,serif;font-size:26px;font-weight:700;color:var(--green-l);letter-spacing:2px">'+np.time+'</div>'+
    '</div></div>';
}

function renderHomePrayers() {
  const data=getDay();
  const grid=document.getElementById('homePrayersQuick');
  if(!grid) return;
  grid.innerHTML=PRAYERS_LIST.map(p=>{
    const st=(data.prayers||{})[p.name]||'none';
    return '<div class="hqp-card '+(st==='prayed'?'prayed':st==='missed'?'missed':'')+'" onclick="togglePrayer(\''+p.name+'\')">'+
      '<div class="hqp-ar">'+p.ar+'</div>'+
      '<div class="hqp-nm">'+p.name+'</div>'+
      '<div class="hqp-tm">'+(st==='prayed'?'✔':st==='missed'?'✕':getPrayerTime(p.name))+'</div>'+
      '</div>';
  }).join('');
}

function renderHomeSummary() {
  const data=getDay();
  const prayed=PRAYERS_LIST.filter(p=>(data.prayers||{})[p.name]==='prayed').length;
  const habits=HABITS_LIST.filter(h=>(data.habits||{})[h.id]).length;
  const score=data.day_score||0;
  const streak=stats.salah_streak||0;
  const wl=stats.latest_kg||(settings.start_weight||85);
  const grid=document.getElementById('homeSummaryGrid');
  if(!grid) return;
  grid.innerHTML=[
    {val:prayed+'/5',lbl:"Today's Salah",pct:prayed*20,col:prayed===5?'var(--green-b)':'var(--gold)'},
    {val:habits+'/'+HABITS_LIST.length,lbl:'Habits Done',pct:Math.round(habits/HABITS_LIST.length*100),col:'var(--blue-b)'},
    {val:score,lbl:'Day Score',pct:score,col:score>=80?'var(--green-b)':score>=50?'var(--gold)':'var(--red)'},
    {val:streak+'🔥',lbl:'Prayer Streak',pct:Math.min(100,streak*5),col:'var(--purple)'},
    {val:wl+'kg',lbl:'Current Weight',pct:stats.pct_goal||0,col:'var(--orange)'},
    {val:(stats.quran_pages||0)+' pages',lbl:'Quran Total',pct:Math.min(100,Math.round((stats.quran_pages||0)/604*100)),col:'var(--gold-l)'},
  ].map(c=>'<div class="hts-card"><div class="hts-val">'+c.val+'</div><div class="hts-lbl">'+c.lbl+'</div><div class="hts-bar"><div class="hts-bar-fill" style="width:'+c.pct+'%;background:'+c.col+'"></div></div></div>').join('');
}

function renderHomeAchievements() {
  const lost=stats.lost_kg||0;
  const streak=stats.salah_streak||0;
  const unlocked=ACHIEVEMENTS.filter(a=>{
    if(a.id==='first_day') return stats.total_days>=1;
    if(a.id==='salah_3') return streak>=3;
    if(a.id==='salah_7') return streak>=7;
    if(a.id==='salah_30') return streak>=30;
    if(a.id==='lost_3') return lost>=3;
    if(a.id==='lost_5') return lost>=5;
    if(a.id==='lost_10') return lost>=10;
    if(a.id==='goal') return (stats.latest_kg||(settings.start_weight||85))<=(settings.goal_weight||70);
    if(a.id==='quran_10') return stats.quran_days>=10;
    if(a.id==='journal_7') return stats.journal_days>=7;
    if(a.id==='pomo_10') return stats.pomo_total>=10;
    if(a.id==='habits_7') return false; // computed from streak
    return false;
  });
  const el=document.getElementById('homeAchievements');
  if(!el) return;
  if(!unlocked.length){el.innerHTML='';return;}
  el.innerHTML='<div class="achieve-title" style="font-family:Cinzel,serif;font-size:10px;letter-spacing:2px;color:var(--gold);text-transform:uppercase;margin-bottom:8px">🏆 Achievements Unlocked</div>'+
    '<div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:4px">'+
    unlocked.map(a=>'<div style="background:rgba(201,150,12,.1);border:1px solid var(--gold-l);border-radius:20px;padding:6px 12px;white-space:nowrap;font-size:12px;color:var(--gold-l);flex-shrink:0">'+a.icon+' '+a.name+'</div>').join('')+
    '</div>';
}

// PRAYERS
function renderPrayers() {
  const data=getDay();
  const grid=document.getElementById('prayersGrid');
  if(!grid) return;
  grid.innerHTML=PRAYERS_LIST.map(p=>{
    const st=(data.prayers||{})[p.name]||'none';
    return '<div class="prayer-card '+(st==='prayed'?'prayed':st==='missed'?'missed':'')+'" onclick="togglePrayer(\''+p.name+'\')">'+
      '<div class="p-check">'+(st==='prayed'?'✔':st==='missed'?'✕':'')+'</div>'+
      '<div class="prayer-ar">'+p.ar+'</div>'+
      '<div class="prayer-nm">'+p.name+'</div>'+
      '<div class="prayer-tm">'+getPrayerTime(p.name)+'</div>'+
      '<div class="prayer-st">'+(st==='prayed'?'Prayed':st==='missed'?'Missed':'Tap')+'</div>'+
      '</div>';
  }).join('');
  const qg=document.getElementById('qadaGrid');
  if(qg) qg.innerHTML='<div style="display:flex;gap:10px;flex-wrap:wrap">'+PRAYERS_LIST.map(p=>{
    const v=(data.qada||{})[p.name]||0;
    return '<div style="display:flex;align-items:center;gap:5px;font-size:12px;color:var(--txt2)">'+
      '<span style="font-family:Cairo,sans-serif;color:var(--gold-l)">'+p.ar+'</span>'+
      '<input class="qada-input" type="number" min="0" max="99" value="'+v+'" onchange="setQada(\''+p.name+'\',this.value)" style="width:44px;text-align:center;border:1px solid var(--bdr2);border-radius:6px;padding:4px;background:var(--bg);color:var(--txt);font-family:Cinzel,serif">'+
      '</div>';
  }).join('')+'</div>';
  const pn=document.getElementById('prayerNotes');
  if(pn&&!pn.matches(':focus')) pn.value=data.prayer_notes||'';
}

// SCHEDULE
function renderSchedule() {
  const list=document.getElementById('timelineList');
  if(!list) return;
  list.innerHTML='';
  const now=new Date();
  const nowM=now.getHours()*60+now.getMinutes();
  const isCurDay=isToday(currentDate);
  let curIdx=-1;
  if(isCurDay){
    for(let i=0;i<SCHEDULE.length-1;i++){
      const [sh,sm]=SCHEDULE[i].time.split(':').map(Number);
      const [eh,em]=SCHEDULE[i+1].time.split(':').map(Number);
      if(nowM>=sh*60+sm&&nowM<eh*60+em){curIdx=i;break;}
    }
  }
  const banner=document.getElementById('timerBanner');
  if(banner){
    if(curIdx>=0){
      banner.style.display='block';
      banner.textContent='⏳ Now: '+SCHEDULE[curIdx].title+' — until '+SCHEDULE[curIdx].end;
      document.getElementById('schedNowLabel').textContent=SCHEDULE[curIdx].title;
    } else {
      banner.style.display='none';
      document.getElementById('schedNowLabel').textContent='';
    }
  }
  SCHEDULE.forEach((s,i)=>{
    const [sh,sm]=s.time.split(':').map(Number);
    const sm2=sh*60+sm;
    const isPast=isCurDay&&nowM>sm2+5;
    const isCur=i===curIdx;
    const block=document.createElement('div');
    block.className='tl-block';
    block.style.opacity=isCurDay&&sm2>nowM+5?'0.5':'1';
    const badge=s.type==='prayer'?'<span class="tl-badge badge-prayer">Prayer</span>':
      s.type==='deen'?'<span class="tl-badge badge-deen">Deen</span>':
      s.type==='fitness'?'<span class="tl-badge badge-fitness">Fitness</span>':'';
    block.innerHTML=
      '<div class="tl-time">'+s.time+'<br>'+s.end+'</div>'+
      '<div class="tl-dot-wrap"><div class="tl-dot'+(isCur?' now':'')+'" style="background:'+(DOT_C[s.type]||'#3a4a6a')+'"'+(isCur?' style="box-shadow:0 0 8px '+(DOT_C[s.type]||'')+'"':'')+' ></div>'+(i<SCHEDULE.length-1?'<div class="tl-line"></div>':'')+'</div>'+
      '<div class="tl-card '+s.type+(isCur?' current':'')+'"><div class="tl-title">'+s.title+badge+'</div><div class="tl-sub">'+s.sub+'</div></div>';
    list.appendChild(block);
  });
}

// HABITS
async function renderHabits() {
  const today=new Date();today.setHours(0,0,0,0);
  // Load last 7 days
  const dates=[];
  for(let i=6;i>=0;i--){const d=new Date(today);d.setDate(today.getDate()-i);dates.push(d);}
  await Promise.all(dates.map(d=>!dayCache[dk(d)]?loadDay(d):Promise.resolve()));
  const wrap=document.getElementById('habitsContent');
  if(!wrap) return;
  wrap.innerHTML='';
  const hdr=document.createElement('div');
  hdr.className='day-hdr-row';
  hdr.innerHTML='<div class="day-hdr-spacer"></div><div class="day-hdr-days">'+
    dates.map((d,i)=>'<div class="day-lbl-h" style="'+(i===6?'color:var(--gold-l);font-weight:700':'')+'">'+DAYS7[d.getDay()]+'</div>').join('')+'</div>';
  wrap.appendChild(hdr);
  let lastCat='';
  HABITS_LIST.forEach(h=>{
    if(h.cat!==lastCat){
      const cd=document.createElement('div');
      cd.className='habit-cat-title';
      cd.textContent=h.cat==='deen'?'— Deen —':h.cat==='fitness'?'— Fitness / Body —':'— Mind / Study —';
      wrap.appendChild(cd);lastCat=h.cat;
    }
    const row=document.createElement('div');row.className='habit-row';
    const boxes=document.createElement('div');boxes.className='habit-boxes';
    dates.forEach((d,idx)=>{
      const k=dk(d);
      const checked=(dayCache[k]?.habits||{})[h.id]===true;
      const isFut=d>today;const isTod=idx===6;
      const box=document.createElement('div');
      box.className='hbox'+(isFut?' future':checked?' checked':'')+(isTod?' today-col':'');
      box.textContent=isFut?'':checked?'✓':'';
      if(!isFut) box.onclick=()=>toggleHabit(h.id,6-idx);
      boxes.appendChild(box);
    });
    row.innerHTML='<span class="habit-lbl">'+h.label+'</span>';
    row.appendChild(boxes);wrap.appendChild(row);
  });
}

// QURAN
function renderQuran() {
  const data=getDay();
  const fields={quranJuz:'quran_juz',quranPages:'quran_pages',quranSurah:'quran_surah'};
  Object.entries(fields).forEach(([id,key])=>{const el=document.getElementById(id);if(el&&!el.matches(':focus'))el.value=data[key]||'';});
  const totalP=stats.quran_pages||0;
  const pct=Math.min(100,Math.round(totalP/604*100));
  const kb=document.getElementById('quranKhatmBar');
  if(kb) kb.innerHTML='<div style="display:flex;justify-content:space-between;font-size:10px;color:var(--txt2);margin-bottom:3px"><span>'+totalP+'/604 pages total</span><span style="color:var(--gold)">'+pct+'% to Khatm</span></div><div style="height:7px;border-radius:4px;background:rgba(201,150,12,.1);overflow:hidden"><div style="height:100%;border-radius:4px;background:linear-gradient(90deg,var(--orange),var(--gold-l));width:'+pct+'%"></div></div>';
  const rl=document.getElementById('revisionList');
  if(rl){
    const revs=data.revisionLog||[];
    rl.innerHTML=!revs.length?'<div class="no-entries">No revision entries yet. Tap + Add.</div>':
      revs.map(r=>'<div class="ex-row"><span class="ex-name">'+r.content+'</span><span style="font-size:10px;color:var(--muted)">'+r.logged_at.slice(11,16)+'</span><button class="del-btn" onclick="deleteRevision('+r.id+')">✕</button></div>').join('');
  }
  const dw=document.getElementById('deenWeekGrid');
  if(dw){
    const todayDay=DAYS7[new Date().getDay()];
    dw.innerHTML=WEEKLY_PLAN.map(w=>'<div class="dw-card'+(w.day===todayDay?' today':'')+'"><div class="dw-day">'+w.day+'</div><div class="dw-topic">'+w.topic+'</div><div class="dw-workout">'+w.workout+'</div></div>').join('');
  }
}

// FITNESS
function renderFitness() {
  const data=getDay();
  const sw=settings.start_weight||85,gw=settings.goal_weight||70;
  const latestKg=stats.latest_kg||sw;
  const lost=Math.max(0,sw-latestKg);
  const pct=Math.min(100,Math.round(lost/Math.max(1,sw-gw)*100));
  const wgb=document.getElementById('weightGoalBar');
  if(wgb) wgb.innerHTML='<div style="display:flex;justify-content:space-between;font-size:10px;color:var(--txt2);margin-bottom:3px"><span>'+sw+'kg start</span><span style="color:var(--gold)">Goal: '+gw+'kg</span></div><div style="height:7px;border-radius:4px;background:rgba(201,150,12,.1);overflow:hidden"><div style="height:100%;border-radius:4px;background:linear-gradient(90deg,var(--blue-b),var(--green-b));width:'+pct+'%"></div></div><div style="font-size:10px;color:var(--gold);text-align:right;margin-top:3px">'+pct+'% — '+latestKg+'kg now · '+(latestKg-gw).toFixed(1)+'kg to go</div>';
  const wt=['Full Body','Cardio','Light Activity','Rest / Skip'];
  const wtr=document.getElementById('workoutTypes');
  if(wtr) wtr.innerHTML='<div style="display:flex;gap:6px;flex-wrap:wrap">'+wt.map(t=>'<button class="wt-btn'+(data.workout_type===t?' active':'')+'" onclick="setWorkoutType(\''+t.replace(/'/g,"\\'")+'\')">'+(t==='Full Body'?'💪':t==='Cardio'?'🏃':t==='Light Activity'?'🚶':'😴')+' '+t+'</button>').join('')+'</div>';
  const wn=document.getElementById('workoutNotes');if(wn&&!wn.matches(':focus'))wn.value=data.workout_notes||'';
  const el=document.getElementById('exerciseList');
  if(el){
    const exs=data.exercises||[];
    el.innerHTML=!exs.length?'<div class="no-entries">No exercises logged yet.</div>':
      exs.map(e=>'<div class="ex-row"><span class="ex-name">'+e.name+'</span><span class="ex-sets">'+e.sets+'×'+e.reps+'</span><button class="del-btn" onclick="deleteExercise('+e.id+')">✕</button></div>').join('');
  }
  const ml=document.getElementById('mealLogger');
  if(ml) ml.innerHTML=MEALS.map(m=>{
    const st=(data.meals||{})[m]||'none';
    return '<div class="meal-row"><span class="meal-name">'+m+'</span><div class="meal-status">'+
      '<button class="meal-btn'+(st==='ok'?' ok':'')+'" onclick="setMeal(\''+m+'\',\'ok\')">✔ OK</button>'+
      '<button class="meal-btn'+(st==='bad'?' bad':'')+'" onclick="setMeal(\''+m+'\',\'bad\')">✕ Bad</button>'+
      '</div></div>';
  }).join('');
  // Weight log
  api('/weight').then(rows=>{
    const wlog=document.getElementById('weightLog');
    if(!wlog||!rows) return;
    const rev=[...rows];
    wlog.innerHTML=!rev.length?'<div class="no-entries">No entries yet</div>':
      rev.map((e,i)=>{
        const prev=rev[i+1];
        const diff=prev?(e.kg-prev.kg):null;
        const ds=diff===null?'':(diff>0?'+':'')+diff.toFixed(1)+'kg';
        const dc=diff===null?'':diff<0?'var(--green-l)':'var(--red-l)';
        return '<div class="wlog-row"><span class="wlog-date">'+e.date+'</span><span class="wlog-kg">'+e.kg+'kg</span>'+(e.belly_cm?'<span style="font-size:10px;color:var(--txt2)">'+e.belly_cm+'cm</span>':'')+'<span class="wlog-diff" style="color:'+dc+'">'+ds+'</span><button class="wlog-del" onclick="deleteWeight(\''+e.date+'\')">✕</button></div>';
      }).join('');
  });
}

// STUDY
function renderStudy() {
  const data=getDay();
  const pw=document.getElementById('pomodoroWidget');
  if(pw){
    const m=Math.floor(pomo.timeLeft/60),s=pomo.timeLeft%60;
    pw.innerHTML=
      '<div style="text-align:center;padding:8px 0">'+
      '<div style="font-family:Cinzel,serif;font-size:11px;letter-spacing:3px;color:var(--gold);text-transform:uppercase;margin-bottom:4px">'+(pomo.phase==='focus'?'Focus Session':pomo.phase==='short'?'Short Break':'Long Break')+'</div>'+
      '<div class="pomo-mini-clock" style="font-family:Cinzel,serif;font-size:38px;font-weight:700;color:var(--txt);letter-spacing:3px">'+String(m).padStart(2,'0')+':'+String(s).padStart(2,'0')+'</div>'+
      '<div style="font-size:11px;color:var(--txt2);margin:6px 0 10px">Total sessions: '+(stats.pomo_total||0)+'</div>'+
      '<div style="display:flex;gap:8px;justify-content:center">'+
        '<button class="pomo-ctrl-btn primary" onclick="startPomo(\'focus\')">▶ Focus 25m</button>'+
        '<button class="pomo-ctrl-btn" onclick="startPomo(\'short\')">☕ 5m</button>'+
        '<button class="pomo-ctrl-btn" onclick="startPomo(\'long\')">🌙 15m</button>'+
      '</div></div>';
  }
  const ss=document.getElementById('softSkillNote');if(ss&&!ss.matches(':focus'))ss.value=data.soft_skill||'';
  const sll=document.getElementById('studyLogList');
  if(sll){
    const entries=data.studyLog||[];
    const total=entries.reduce((s,e)=>s+e.minutes,0);
    sll.innerHTML=(!entries.length?'<div class="no-entries">No study entries yet.</div>':
      '<div style="font-size:11px;color:var(--gold);font-family:Cinzel,serif;margin-bottom:6px">Total: '+total+' min</div>'+
      entries.map(e=>'<div class="study-log-entry"><span class="sle-subject">'+e.subject+'</span><span class="sle-mins">'+e.minutes+' min</span><button class="sle-del" onclick="deleteStudy('+e.id+')">✕</button></div>').join(''));
  }
}

// WRAPUP
function renderWrapup() {
  const data=getDay();
  document.getElementById('deenYes').className='choice-btn'+(data.deen_rating==='yes'?' yes':'');
  document.getElementById('deenNo').className='choice-btn'+(data.deen_rating==='no'?' no':'');
  ['studyRateGrid','energyRateGrid'].forEach((gid,idx)=>{
    const g=document.getElementById(gid);if(!g)return;
    const key=idx===0?'study_rate':'energy_rate';
    g.innerHTML='';for(let i=1;i<=10;i++){
      const b=document.createElement('button');
      b.className='rate-btn'+(data[key]===i?' active':'');
      b.textContent=i;
      b.onclick=idx===0?()=>setStudyRate(i):()=>setEnergyRate(i);
      g.appendChild(b);
    }
  });
  const textFields={improveText:'improve',grat1:'grat1',grat2:'grat2',grat3:'grat3',journalText:'journal'};
  Object.entries(textFields).forEach(([id,key])=>{
    const el=document.getElementById(id);
    if(el&&!el.matches(':focus')) el.value=data[key]||'';
  });
}

// PROGRESS
async function renderProgress() {
  const sg=document.getElementById('statsGrid');
  if(sg) sg.innerHTML=[
    {lbl:"Today's Salah",val:(PRAYERS_LIST.filter(p=>(getDay().prayers||{})[p.name]==='prayed').length)+'/5',pct:(PRAYERS_LIST.filter(p=>(getDay().prayers||{})[p.name]==='prayed').length)*20,col:'var(--green-b)'},
    {lbl:'Prayer Streak',val:(stats.salah_streak||0)+'🔥',pct:Math.min(100,(stats.salah_streak||0)*5),col:'var(--purple)'},
    {lbl:'Weight Lost',val:(stats.lost_kg||0)+'kg',pct:stats.pct_goal||0,col:'var(--orange)'},
    {lbl:'Quran Pages',val:(stats.quran_pages||0)+'/604',pct:Math.min(100,Math.round((stats.quran_pages||0)/604*100)),col:'var(--gold-l)'},
    {lbl:'Pomodoros',val:stats.pomo_total||0,pct:Math.min(100,(stats.pomo_total||0)*2),col:'var(--blue-b)'},
    {lbl:'Days Tracked',val:stats.total_days||0,pct:Math.min(100,(stats.total_days||0)*2),col:'var(--green-l)'},
  ].map(s=>'<div class="stat-card"><div class="stat-lbl">'+s.lbl+'</div><div class="stat-val">'+s.val+'</div><div class="stat-bar"><div class="stat-bar-fill" style="width:'+s.pct+'%;background:'+s.col+'"></div></div></div>').join('');

  const dots=document.getElementById('streakDots');
  if(dots&&stats.heatmap){
    dots.innerHTML=stats.heatmap.map(h=>{
      const p=h.prayed;
      const cls=p===5?'full':p>0?'part':'none';
      return '<div class="sdot '+cls+'" title="'+h.date+' — '+p+'/5">'+p+'</div>';
    }).join('');
  }

  const wc=document.getElementById('weeklyChart');
  if(wc&&stats.weekly_scores){
    wc.innerHTML=stats.weekly_scores.map(w=>'<div class="wsc-row"><div class="wsc-lbl">'+w.label+'</div><div class="wsc-track"><div class="wsc-fill" style="width:'+w.score+'%"></div></div><div class="wsc-val">'+w.score+'</div></div>').join('');
  }

  const ag=document.getElementById('achievementsGrid');
  if(ag){
    const lost=stats.lost_kg||0;const streak=stats.salah_streak||0;
    ag.innerHTML=ACHIEVEMENTS.map(a=>{
      const checks={first_day:stats.total_days>=1,salah_3:streak>=3,salah_7:streak>=7,salah_30:streak>=30,lost_3:lost>=3,lost_5:lost>=5,lost_10:lost>=10,goal:(stats.latest_kg||85)<=(settings.goal_weight||70),quran_10:stats.quran_days>=10,journal_7:stats.journal_days>=7,pomo_10:stats.pomo_total>=10,habits_7:false};
      const u=checks[a.id]||false;
      return '<div class="ach-item'+(u?' unlocked':'')+'"><div class="ach-icon">'+(u?a.icon:'🔒')+'</div><div class="ach-info"><div class="ach-name">'+a.name+'</div><div class="ach-desc">'+a.desc+'</div></div>'+(u?'<span style="color:var(--green-l)">✔</span>':'')+'</div>';
    }).join('');
  }

  // Weight chart
  const wch=document.getElementById('weightChart');
  api('/weight').then(rows=>{
    if(!wch||!rows||!rows.length) return;
    const logs=rows.slice(0,10).reverse();
    const max=Math.max(...logs.map(e=>e.kg)),min=Math.min(...logs.map(e=>e.kg));
    const range=max-min||1;
    wch.innerHTML='<div style="display:flex;align-items:flex-end;gap:3px;height:70px;padding:0 2px">'+
      logs.map(e=>{
        const h=Math.max(8,Math.round(((e.kg-min)/range)*55+8));
        return '<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:2px">'+
          '<div style="width:100%;height:'+h+'px;border-radius:3px 3px 0 0;background:linear-gradient(to top,var(--blue-b),var(--green-b))" title="'+e.kg+'kg"></div>'+
          '<div style="font-size:7px;color:var(--muted);font-family:Cinzel,serif">'+e.date.slice(5)+'</div></div>';
      }).join('')+'</div>';
  });

  // History table
  const ht=document.getElementById('historyTable');
  if(ht){
    const rows=await api('/history?limit=30');
    if(rows&&rows.length){
      ht.innerHTML='<table class="hist-table"><thead><tr><th>Date</th><th>Score</th><th>Salah</th><th>Habits</th><th>Quran</th><th>Workout</th><th>Deen</th></tr></thead><tbody>'+
        rows.map(r=>{
          const sc=r.day_score||0;
          const scColor=sc>=80?'var(--green-b)':sc>=50?'var(--gold)':'var(--red)';
          return '<tr><td>'+r.date+'</td>'+
            '<td><span class="score-badge" style="background:'+scColor+'20;color:'+scColor+'">'+sc+'</span></td>'+
            '<td>'+r.prayed+'/5</td>'+
            '<td>'+r.habits_done+'/14</td>'+
            '<td>'+(r.quran_pages||0)+'</td>'+
            '<td>'+(r.workout_type||'—')+'</td>'+
            '<td>'+(r.deen_rating||'—')+'</td>'+
            '</tr>';
        }).join('')+'</tbody></table>';
    }
  }
}

// SETTINGS
function renderSettings() {
  const fields={sName:'name',sCity:'city',sStartW:'start_weight',sGoalW:'goal_weight'};
  Object.entries(fields).forEach(([id,key])=>{const el=document.getElementById(id);if(el&&!el.matches(':focus'))el.value=settings[key]||'';});
  applyTheme(settings.theme||'dark');
  const pte=document.getElementById('prayerTimesEdit');
  if(pte) pte.innerHTML=PRAYERS_LIST.map(p=>'<div class="prayer-time-row"><span class="ptime-name">'+p.name+'</span><input class="ptime-input" type="time" value="'+getPrayerTime(p.name)+'" onchange="savePrayerTime(\''+p.name+'\',this.value)" style="border:1px solid var(--bdr2);border-radius:6px;padding:5px 8px;background:var(--bg);color:var(--txt);font-size:13px;font-family:Cinzel,serif;width:90px;text-align:center"></div>').join('');
  const nb=document.getElementById('notifBtn');
  if(nb){nb.textContent=settings.notifs?'Enabled ✔':'Enable';nb.className='toggle-btn'+(settings.notifs?' on':'');}
}

// ═══════════════════════════════════════
// MASTER RENDER
// ═══════════════════════════════════════
async function renderTab(tab) {
  switch(tab){
    case 'home':     await renderHome(); break;
    case 'prayers':  renderPrayers(); break;
    case 'schedule': renderSchedule(); break;
    case 'habits':   await renderHabits(); break;
    case 'quran':    renderQuran(); break;
    case 'fitness':  renderFitness(); break;
    case 'study':    renderStudy(); break;
    case 'wrapup':   renderWrapup(); break;
    case 'progress': await renderProgress(); break;
    case 'settings': renderSettings(); break;
  }
}

// ═══════════════════════════════════════
// INIT
// ═══════════════════════════════════════
function showSplash() {
  const sn=document.getElementById('splashName');
  if(sn) sn.textContent=settings.name?'Welcome back, '+settings.name+' ✦':'';
  setTimeout(async ()=>{
    const sp=document.getElementById('splash');
    sp.classList.add('hidden');
    setTimeout(()=>sp.style.display='none',700);
    renderDateNav();
    await loadDay(currentDate);
    await loadStats();
    await renderTab('home');
    updateStripFromStats();
    scheduleNotifications();
    applyTheme(settings.theme||'dark');
  },1800);
}

window.addEventListener('DOMContentLoaded', async ()=>{
  await loadSettings();
  startClock();
  if(!settings.onboarded){
    document.getElementById('onboarding').classList.remove('hidden');
    document.getElementById('splash').style.display='none';
  } else {
    document.getElementById('onboarding').classList.add('hidden');
    showSplash();
  }
});

if('serviceWorker' in navigator){
  navigator.serviceWorker.register('/sw.js').catch(()=>{});
}
