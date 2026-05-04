/* MY ROUTINE v2 — app.js */
'use strict';

// ═══════════════════════════════════════════════
// STATIC DATA
// ═══════════════════════════════════════════════
const PRAYERS = [
  { name:'Fajr',    ar:'الفجر',  time:'05:14' },
  { name:'Dhuhr',   ar:'الظهر',  time:'12:21' },
  { name:'Asr',     ar:'العصر',  time:'15:43' },
  { name:'Maghrib', ar:'المغرب', time:'18:19' },
  { name:"Isha'a",  ar:'العشاء', time:'19:25' },
];

const SCHEDULE = [
  { time:'04:00',end:'04:30',title:'Warmup Exercises',sub:'Stretch · Light movement · Focus',type:'fitness' },
  { time:'04:30',end:'05:14',title:'Qiyamu al-Layl',sub:'Night prayer · Duʿāʾ · Reflection',type:'deen' },
  { time:'05:14',end:'05:30',title:'Fajr Ṣalāh',sub:'Ṣalāh · Gratitude · Dhikr',type:'prayer' },
  { time:'05:30',end:'06:15',title:'Qurʾān',sub:'Recitation · Tafsīr · Memorization',type:'deen' },
  { time:'06:15',end:'06:30',title:'Morning Adhkār & Duʿāʾ',sub:'Personal · Family · Forgiveness',type:'deen' },
  { time:'06:30',end:'07:15',title:'Workout',sub:'Push-ups · Squats · Plank / Cardio days',type:'fitness' },
  { time:'07:15',end:'07:30',title:'Shower',sub:'Freshen up · Ready for the day',type:'fitness' },
  { time:'07:30',end:'08:00',title:'Breakfast + Plan Day',sub:'Banana · Tea · Set targets',type:'food' },
  { time:'08:00',end:'08:15',title:'Mind Detox',sub:'No phone · Clear mind',type:'rest' },
  { time:'08:15',end:'10:00',title:'Working / Studying',sub:'Deep Work · Focus Mode',type:'study' },
  { time:'10:00',end:'10:15',title:'Water + Light Fruit',sub:'Hydrate · Refresh · Stretch',type:'food' },
  { time:'10:15',end:'11:30',title:'Soft Skill Learning',sub:'Communication · Leadership',type:'study' },
  { time:'11:30',end:'12:00',title:'Reality Check — Deen Light',sub:'Short Islamic video / reminder',type:'reality' },
  { time:'12:21',end:'12:35',title:'Dhuhr Ṣalāh',sub:'Pray with Khushūʿ · Dhikr',type:'prayer' },
  { time:'12:35',end:'13:25',title:'Reality Check — Deen Deep',sub:'Study: ʿAqīdah / Fiqh / Sīrah',type:'deen' },
  { time:'13:25',end:'14:00',title:'Lunch',sub:'Less rice (60–70%) · Eat all protein',type:'food' },
  { time:'14:00',end:'14:15',title:'Post-Lunch Walk',sub:'10–15 min · Aids digestion',type:'fitness' },
  { time:'14:15',end:'14:55',title:'Qaylūlah / Rest',sub:'Nap · Reading · Silence',type:'rest' },
  { time:'14:55',end:'15:30',title:'Launch + Self Improvement',sub:'Plan · Set Targets · Projects',type:'study' },
  { time:'15:43',end:'16:00',title:'ʿAṣr Ṣalāh',sub:'Pray with Focus · Dhikr',type:'prayer' },
  { time:'16:00',end:'16:20',title:'Reality Check — Apply',sub:'Dhikr · Duʿāʾ · 1 Action Plan',type:'reality' },
  { time:'16:20',end:'17:00',title:'Cheerup + Light Activity',sub:'Walk · Talk · Refresh',type:'fitness' },
  { time:'17:00',end:'17:30',title:'Fruit / Snack',sub:'Fruit · Groundnuts · No junk',type:'food' },
  { time:'17:30',end:'18:15',title:'Learning / Studying',sub:'Active Recall · Practice',type:'study' },
  { time:'18:19',end:'18:35',title:'Maghrib Ṣalāh',sub:'Gratitude · Dhikr · Evening Adhkār',type:'prayer' },
  { time:'18:35',end:'19:10',title:'Self Dev & Money Managing',sub:'Track income · Goals · Review',type:'study' },
  { time:'19:10',end:'19:25',title:'Light Meal Prep',sub:'Fruit or small portion · No heavy rice',type:'food' },
  { time:'19:25',end:'19:45',title:"Ishāʾ Ṣalāh",sub:'Pray + Night Dhikr',type:'prayer' },
  { time:'19:45',end:'21:30',title:'Working / Studying',sub:'Deep Focus · Review & Recall',type:'study' },
  { time:'21:30',end:'21:45',title:'Dinner',sub:'Light meal · Mindfully',type:'food' },
  { time:'21:45',end:'22:30',title:'Games & Movies',sub:'Entertainment (Planned) · Wind down',type:'rest' },
  { time:'22:30',end:'23:00',title:'Daily Wrapup',sub:'3 questions · Reflection',type:'wrapup' },
  { time:'23:00',end:'04:00',title:'Long Rest (5 hrs)',sub:'Sleep · Recovery · Sunnah',type:'sleep' },
];

const HABITS = [
  { id:'fajr',    label:'Fajr on Time',           cat:'deen' },
  { id:'quran',   label:'Qurʾān (5+ min)',          cat:'deen' },
  { id:'qiyam',   label:'Qiyamu Completed',         cat:'deen' },
  { id:'reality3',label:'3 Reality Checks',         cat:'deen' },
  { id:'salah5',  label:'All 5 Ṣalāh on Time',     cat:'deen' },
  { id:'dhikr',   label:'Dhikr (100+)',              cat:'deen' },
  { id:'workout', label:'Workout Done',              cat:'fitness' },
  { id:'norice',  label:'No Extra Rice / Junk',      cat:'fitness' },
  { id:'water',   label:'Water Intake OK',           cat:'fitness' },
  { id:'nosoda',  label:'No Soda / Sugary Drinks',   cat:'fitness' },
  { id:'fruit',   label:'Ate Fruit',                 cat:'fitness' },
  { id:'studyr',  label:'Study Recall (10+ min)',    cat:'mind' },
  { id:'wrapup',  label:'Daily Wrapup Done',         cat:'mind' },
  { id:'sleep23', label:'Sleep before 23:00',        cat:'mind' },
];

const WEEKLY = [
  { day:'Mon', topic:'ʿAqīdah',        sub:'Tawḥīd / Belief',        workout:'Full Body' },
  { day:'Tue', topic:'Fiqh',            sub:'Wuḍūʾ & Ṣalāh',        workout:'Cardio' },
  { day:'Wed', topic:'Sīrah',           sub:'Life of Prophet ﷺ',      workout:'Full Body' },
  { day:'Thu', topic:'Asmāʾ al-Ḥusnā', sub:'Names of Allah',          workout:'Cardio' },
  { day:'Fri', topic:'Jumuʿah',         sub:'Sunnahs & Khuṭbah',      workout:'Full Body' },
  { day:'Sat', topic:'Hadith & Akhlāq', sub:'Manners & Character',    workout:'Light Activity' },
  { day:'Sun', topic:'Review & Duʿāʾ', sub:'Reflection & Planning',  workout:'Rest' },
];

const AYAHS = [
  { ar:'إِنَّ مَعَ الْعُسْرِ يُسْرًا', trans:'"Indeed, with hardship will be ease."', ref:'Qurʾān 94:6' },
  { ar:'وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ', trans:'"Seek help through patience and prayer."', ref:'Qurʾān 2:45' },
  { ar:'وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ', trans:'"Whoever relies upon Allah — He is sufficient for him."', ref:'Qurʾān 65:3' },
  { ar:'إِنَّ اللَّهَ مَعَ الصَّابِرِينَ', trans:'"Indeed, Allah is with the patient."', ref:'Qurʾān 2:153' },
  { ar:'وَذَكِّرْ فَإِنَّ الذِّكْرَىٰ تَنفَعُ الْمُؤْمِنِينَ', trans:'"Remind, for reminding benefits the believers."', ref:'Qurʾān 51:55' },
  { ar:'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ', trans:'"Verily, in the remembrance of Allah do hearts find rest."', ref:'Qurʾān 13:28' },
  { ar:'وَفِي أَنفُسِكُمْ ۚ أَفَلَا تُبْصِرُونَ', trans:'"And in yourselves — will you not see?"', ref:'Qurʾān 51:21' },
];

const ACHIEVEMENTS = [
  { id:'first_day',    icon:'🌅', name:'First Day',          desc:'Complete your first full day',                check: d => getTotalDays(d) >= 1 },
  { id:'week_salah',   icon:'🕌', name:'Salah Week',          desc:'All 5 prayers for 7 consecutive days',         check: d => getSalahStreak(d) >= 7 },
  { id:'month_salah',  icon:'🏆', name:'Salah Month',         desc:'All 5 prayers for 30 consecutive days',        check: d => getSalahStreak(d) >= 30 },
  { id:'habit_week',   icon:'✅', name:'Habit Hero',           desc:'Complete all habits for 7 days',              check: d => getHabitStreak(d) >= 7 },
  { id:'first_weight', icon:'⚖️', name:'First Weigh-in',      desc:'Log your first weight entry',                  check: d => (d.weightLog||[]).length >= 1 },
  { id:'lost_5',       icon:'💪', name:'5kg Lost',             desc:'Lose 5kg from your starting weight',          check: d => weightLost(d) >= 5 },
  { id:'lost_10',      icon:'🔥', name:'10kg Lost',            desc:'Lose 10kg from your starting weight',         check: d => weightLost(d) >= 10 },
  { id:'goal_reached', icon:'🌟', name:'Goal Reached!',        desc:'Reach your goal weight',                       check: d => reachedGoal(d) },
  { id:'quran_10',     icon:'📖', name:'Qurʾān Reader',        desc:'Log Qurʾān reading for 10 days',             check: d => getQuranDays(d) >= 10 },
  { id:'streak_3',     icon:'🔥', name:'3-Day Streak',         desc:'3 consecutive days with all prayers',         check: d => getSalahStreak(d) >= 3 },
  { id:'journal_7',    icon:'📝', name:'Reflective Mind',      desc:'Write journal entries for 7 days',            check: d => getJournalDays(d) >= 7 },
  { id:'pomo_10',      icon:'⏱️', name:'Focus Champion',       desc:'Complete 10 pomodoro sessions',               check: d => (d.settings&&d.settings.pomoTotal||0) >= 10 },
];

const DOT_COLORS = { prayer:'#2a8c60',deen:'#d4730a',fitness:'#3a8adf',study:'#3a5a8a',food:'#a06820',reality:'#f0b429',rest:'#3a4a6a',wrapup:'#9050b0',sleep:'#3040a0' };
const DAYS_SHORT = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MEAL_NAMES = ['Breakfast','Lunch','Dinner'];
const WORKOUT_TYPES = ['Full Body','Cardio','Qaylūlah / Skip'];

// ═══════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════
let currentDate = (() => { const d = new Date(); d.setHours(0,0,0,0); return d; })();
let db = {};
let currentTab = 'home';
let autoSaveTimer = null;
let clockInterval = null;
let countdownInterval = null;

// Pomodoro state
let pomo = { running:false, phase:'focus', session:1, totalSessions:4, timeLeft:25*60, total:25*60, timer:null };

// ═══════════════════════════════════════════════
// STORAGE
// ═══════════════════════════════════════════════
function loadDB() {
  try { const s = localStorage.getItem('myRoutine_v3'); db = s ? JSON.parse(s) : {}; }
  catch(e) { db = {}; }
  if (!db.settings) db.settings = { name:'', city:'Kerege, Pemba', startWeight:85, goalWeight:70, theme:'dark', notifs:false, pomoTotal:0, prayerTimes:{ Fajr:'05:14',Dhuhr:'12:21',Asr:'15:43',Maghrib:'18:19',"Isha'a":'19:25' } };
  if (!db.weightLog) db.weightLog = [];
  if (!db.bellyLog) db.bellyLog = [];
}

function saveDB() {
  try { localStorage.setItem('myRoutine_v3', JSON.stringify(db)); }
  catch(e) { console.warn('Storage full'); }
}

function dateKey(d) { return d.toISOString().slice(0,10); }

function getDayData(d) {
  const k = dateKey(d);
  if (!db[k]) db[k] = { prayers:{},habits:{},journal:'',improve:'',deen:null,studyRate:null,energyRate:null,prayerNotes:'',qada:{},quranJuz:'',quranPages:'',quranSurah:'',revisionLog:[],workoutType:'',workoutNotes:'',exercises:[],meals:{},studyLog:[],softSkill:'',grat1:'',grat2:'',grat3:'',prayerNotes:'' };
  return db[k];
}

// ═══════════════════════════════════════════════
// HELPERS / COMPUTED
// ═══════════════════════════════════════════════
function getPrayerTimes() { return db.settings.prayerTimes || {}; }
function getPrayerTime(name) { const pt = getPrayerTimes(); return pt[name] || PRAYERS.find(p=>p.name===name)?.time || '00:00'; }

function getSalahStreak(dbRef) {
  const d = dbRef || db;
  const today = new Date(); today.setHours(0,0,0,0);
  let streak = 0;
  for (let i = 0; i < 365; i++) {
    const day = new Date(today); day.setDate(today.getDate()-i);
    const dd = d[dateKey(day)];
    if (!dd || !PRAYERS.every(p => dd.prayers[p.name]==='prayed')) break;
    streak++;
  }
  return streak;
}

function getHabitStreak(dbRef) {
  const d = dbRef || db;
  const today = new Date(); today.setHours(0,0,0,0);
  let streak = 0;
  for (let i = 0; i < 365; i++) {
    const day = new Date(today); day.setDate(today.getDate()-i);
    const dd = d[dateKey(day)];
    const done = dd ? HABITS.filter(h=>dd.habits[h.id]).length : 0;
    if (done < HABITS.length) break;
    streak++;
  }
  return streak;
}

function getTotalDays(dbRef) {
  const d = dbRef || db;
  return Object.keys(d).filter(k => k.match(/^\d{4}-\d{2}-\d{2}$/) && d[k].prayers && Object.keys(d[k].prayers).length > 0).length;
}

function weightLost(dbRef) {
  const d = dbRef || db;
  const wl = d.weightLog || [];
  if (!wl.length) return 0;
  const sw = (d.settings||{}).startWeight || 85;
  return Math.max(0, sw - wl[wl.length-1].kg);
}

function reachedGoal(dbRef) {
  const d = dbRef || db;
  const wl = d.weightLog || [];
  if (!wl.length) return false;
  const gw = (d.settings||{}).goalWeight || 70;
  return wl[wl.length-1].kg <= gw;
}

function getQuranDays(dbRef) {
  const d = dbRef || db;
  return Object.keys(d).filter(k => k.match(/^\d{4}-\d{2}-\d{2}$/) && d[k].quranPages && parseInt(d[k].quranPages)>0).length;
}

function getJournalDays(dbRef) {
  const d = dbRef || db;
  return Object.keys(d).filter(k => k.match(/^\d{4}-\d{2}-\d{2}$/) && d[k].journal && d[k].journal.trim().length > 10).length;
}

function calcDayScore(d) {
  const data = d || getDayData(currentDate);
  let score = 0;
  const prayed = PRAYERS.filter(p => data.prayers[p.name]==='prayed').length;
  score += (prayed / 5) * 40; // 40 pts for salah
  const habits = HABITS.filter(h => data.habits[h.id]).length;
  score += (habits / HABITS.length) * 30; // 30 pts habits
  if (data.journal && data.journal.trim().length > 10) score += 10; // 10 journal
  if (data.quranPages && parseInt(data.quranPages) > 0) score += 10; // 10 quran
  if (data.studyLog && data.studyLog.length > 0) score += 5; // 5 study
  if (data.workoutType && data.workoutType !== 'Qaylūlah / Skip') score += 5; // 5 workout
  return Math.round(score);
}

function getWeeklyScore(weekOffset) {
  const today = new Date(); today.setHours(0,0,0,0);
  const dow = today.getDay();
  const monday = new Date(today); monday.setDate(today.getDate() - ((dow+6)%7) - weekOffset*7);
  let total = 0, days = 0;
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday); d.setDate(monday.getDate()+i);
    if (d > today) break;
    const dd = getDayData(d);
    total += calcDayScore(dd);
    days++;
  }
  return days ? Math.round(total/days) : 0;
}

function getNextPrayer() {
  const now = new Date();
  const nowMins = now.getHours()*60+now.getMinutes();
  const prayers = PRAYERS.map(p => {
    const pt = getPrayerTime(p.name);
    const [h,m] = pt.split(':').map(Number);
    return { ...p, mins: h*60+m, time: pt };
  });
  const next = prayers.find(p => p.mins > nowMins) || prayers[0];
  let diff = next.mins - nowMins;
  if (diff < 0) diff += 1440;
  return { ...next, diff };
}

function formatCountdown(mins) {
  const h = Math.floor(mins/60), m = mins%60;
  if (h > 0) return h+'h '+m+'m';
  return m+'m';
}

function formatDate(d) { return d.toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short',year:'numeric'}); }
function formatHijri(d) { try { return new Intl.DateTimeFormat('en-u-ca-islamic',{day:'numeric',month:'long',year:'numeric'}).format(d); } catch(e){ return ''; } }
function isToday(d) { const t=new Date();t.setHours(0,0,0,0);return d.getTime()===t.getTime(); }

// ═══════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════
function switchTab(name) {
  currentTab = name;
  document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
  const panel = document.getElementById('tab-'+name);
  if (panel) panel.classList.add('active');
  const tabOrder = ['home','prayers','habits','fitness','study','more'];
  const navBtns = document.querySelectorAll('.nav-btn');
  const idx = tabOrder.indexOf(name);
  if (idx>=0 && navBtns[idx]) navBtns[idx].classList.add('active');
  document.querySelector('.main-content').scrollTop = 0;
  renderTab(name);
}

function closeMore() { document.getElementById('moreMenu').classList.add('hidden'); }

// Override "more" nav button
document.addEventListener('DOMContentLoaded', () => {
  const navBtns = document.querySelectorAll('.nav-btn');
  if (navBtns[5]) {
    navBtns[5].onclick = () => {
      document.getElementById('moreMenu').classList.toggle('hidden');
    };
  }
});

function changeDay(delta) {
  const d = new Date(currentDate); d.setDate(d.getDate()+delta);
  currentDate = d;
  render();
}

function goToday() {
  const t=new Date();t.setHours(0,0,0,0);
  currentDate=t; render();
}

// ═══════════════════════════════════════════════
// PRAYERS
// ═══════════════════════════════════════════════
function togglePrayer(name, source) {
  const data = getDayData(currentDate);
  const cur = data.prayers[name]||'none';
  const seq = {none:'prayed',prayed:'missed',missed:'none'};
  data.prayers[name] = seq[cur];
  saveDB();
  if (source==='home') { renderHomeQuickPrayers(); renderHomeSummary(); }
  else { renderPrayers(); }
  updateStrip();
  scheduleNotifs();
}

// ═══════════════════════════════════════════════
// HABITS
// ═══════════════════════════════════════════════
function toggleHabit(habitId, dayOffset) {
  const today=new Date();today.setHours(0,0,0,0);
  const target=new Date(today);target.setDate(today.getDate()-dayOffset);
  if (target>today) return;
  const data=getDayData(target);
  data.habits[habitId]=!data.habits[habitId];
  saveDB(); renderHabits(); updateStrip();
}

// ═══════════════════════════════════════════════
// WRAPUP
// ═══════════════════════════════════════════════
function setDeen(val) {
  const data=getDayData(currentDate);
  data.deen=data.deen===val?null:val;
  saveDB(); renderWrapup();
}
function setStudyRate(val) {
  const data=getDayData(currentDate);
  data.studyRate=data.studyRate===val?null:val;
  saveDB(); renderWrapup();
}
function setEnergyRate(val) {
  const data=getDayData(currentDate);
  data.energyRate=data.energyRate===val?null:val;
  saveDB(); renderWrapup();
}

// ═══════════════════════════════════════════════
// WEIGHT / BODY
// ═══════════════════════════════════════════════
function logWeight() {
  const inp=document.getElementById('weightInput');
  const kg=parseFloat(inp.value);
  if(!kg||kg<30||kg>300){ inp.style.borderColor='var(--red)';setTimeout(()=>inp.style.borderColor='',1000);return; }
  const k=dateKey(currentDate);
  const idx=db.weightLog.findIndex(e=>e.date===k);
  if(idx>=0) db.weightLog[idx].kg=kg; else db.weightLog.push({date:k,kg});
  db.weightLog.sort((a,b)=>a.date.localeCompare(b.date));
  saveDB(); inp.value=''; renderFitness(); updateStrip();
}

function logBelly() {
  const inp=document.getElementById('bellyInput');
  const cm=parseFloat(inp.value);
  if(!cm||cm<30||cm>200) return;
  const k=dateKey(currentDate);
  const idx=db.bellyLog.findIndex(e=>e.date===k);
  if(idx>=0) db.bellyLog[idx].cm=cm; else db.bellyLog.push({date:k,cm});
  db.bellyLog.sort((a,b)=>a.date.localeCompare(b.date));
  saveDB(); inp.value=''; renderFitness();
}

function deleteWeight(date) { db.weightLog=db.weightLog.filter(e=>e.date!==date);saveDB();renderFitness();}

// ═══════════════════════════════════════════════
// STUDY LOG
// ═══════════════════════════════════════════════
function addStudyEntry() {
  const sub=document.getElementById('studySubject').value.trim();
  const mins=parseInt(document.getElementById('studyMins').value)||25;
  if(!sub) return;
  const data=getDayData(currentDate);
  if(!data.studyLog) data.studyLog=[];
  data.studyLog.push({subject:sub,mins,time:new Date().toTimeString().slice(0,5)});
  saveDB();
  document.getElementById('studySubject').value='';
  document.getElementById('studyMins').value='';
  renderStudy();
}

function deleteStudyEntry(idx) {
  const data=getDayData(currentDate);
  data.studyLog.splice(idx,1);
  saveDB(); renderStudy();
}

// ═══════════════════════════════════════════════
// QURAN REVISION
// ═══════════════════════════════════════════════
function addRevision() {
  const ayah=document.getElementById('revAyah')?.value?.trim();
  if(!ayah) return;
  const data=getDayData(currentDate);
  if(!data.revisionLog) data.revisionLog=[];
  data.revisionLog.push({ayah,time:new Date().toTimeString().slice(0,5)});
  saveDB(); renderQuran();
}

function deleteRevision(idx) {
  const data=getDayData(currentDate);
  data.revisionLog.splice(idx,1);
  saveDB(); renderQuran();
}

// ═══════════════════════════════════════════════
// WORKOUT
// ═══════════════════════════════════════════════
function setWorkoutType(type) {
  const data=getDayData(currentDate);
  data.workoutType=type;
  saveDB(); renderFitness();
}

function setMeal(meal, status) {
  const data=getDayData(currentDate);
  if(!data.meals) data.meals={};
  data.meals[meal]=data.meals[meal]===status?null:status;
  saveDB(); renderFitness();
}

// ═══════════════════════════════════════════════
// SAVE DAY
// ═══════════════════════════════════════════════
function autoSave() {
  clearTimeout(autoSaveTimer);
  autoSaveTimer=setTimeout(saveDay,600);
}

function saveDay() {
  const data=getDayData(currentDate);
  const fields={journalText:'journal',improveText:'improve',prayerNotes:'prayerNotes',quranJuz:'quranJuz',quranPages:'quranPages',quranSurah:'quranSurah',workoutNotes:'workoutNotes',softSkillNote:'softSkill',grat1:'grat1',grat2:'grat2',grat3:'grat3'};
  Object.entries(fields).forEach(([id,key])=>{const el=document.getElementById(id);if(el)data[key]=el.value;});
  saveDB();
  const t=document.getElementById('savedToast');
  if(t){t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1800);}
  updateStrip();
}

// ═══════════════════════════════════════════════
// SETTINGS
// ═══════════════════════════════════════════════
function saveSetting(key,val) {
  if(!db.settings) db.settings={};
  db.settings[key]=val;
  saveDB();
  if(key==='theme') applyTheme(val);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme',theme==='dark'?'':theme);
  document.querySelectorAll('.theme-btn').forEach(b=>b.classList.remove('active'));
  const btn=document.getElementById('theme'+theme.charAt(0).toUpperCase()+theme.slice(1));
  if(btn) btn.classList.add('active');
}

function setTheme(theme) { saveSetting('theme',theme); applyTheme(theme); }

function requestNotifications() {
  if(!('Notification' in window)){alert('Notifications not supported on this device.');return;}
  Notification.requestPermission().then(perm=>{
    db.settings.notifs=perm==='granted';
    saveDB();
    const btn=document.getElementById('notifToggle');
    if(btn){btn.textContent=perm==='granted'?'Enabled ✔':'Denied';btn.className='toggle-btn'+(perm==='granted'?' on':'');}
    if(perm==='granted') scheduleNotifs();
  });
}

function scheduleNotifs() {
  if(!db.settings.notifs||!('Notification' in window)) return;
  const today=new Date();
  PRAYERS.forEach(p=>{
    const data=getDayData(today);
    if(data.prayers[p.name]==='prayed') return;
    const pt=getPrayerTime(p.name);
    const [h,m]=pt.split(':').map(Number);
    const prayerDate=new Date(today);
    prayerDate.setHours(h,m-5,0,0);
    const diff=prayerDate-new Date();
    if(diff>0&&diff<86400000){
      setTimeout(()=>{
        if(Notification.permission==='granted'){
          new Notification('🕌 '+p.name+' in 5 minutes',{body:'Prayer time: '+pt+'. Prepare for Ṣalāh.',icon:'icons/icon-192.png'});
        }
      },diff);
    }
  });
}

function exportData() {
  const blob=new Blob([JSON.stringify(db,null,2)],{type:'application/json'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download='my-routine-backup-'+dateKey(new Date())+'.json';
  a.click();
}

function importData(evt) {
  const file=evt.target.files[0];
  if(!file) return;
  const reader=new FileReader();
  reader.onload=e=>{
    try{const imported=JSON.parse(e.target.result);Object.assign(db,imported);saveDB();render();alert('Data imported successfully!');}
    catch(err){alert('Invalid file.');}
  };
  reader.readAsText(file);
}

function resetData() {
  if(!confirm('Reset ALL data? This cannot be undone.')) return;
  localStorage.removeItem('myRoutine_v3');
  location.reload();
}

// ═══════════════════════════════════════════════
// ONBOARDING
// ═══════════════════════════════════════════════
function finishOnboarding() {
  const name=document.getElementById('obName').value.trim()||'Friend';
  const sw=parseFloat(document.getElementById('obWeight').value)||85;
  const gw=parseFloat(document.getElementById('obGoalWeight').value)||70;
  const city=document.getElementById('obCity').value.trim()||'Kerege, Pemba';
  db.settings={...db.settings,name,startWeight:sw,goalWeight:gw,city,onboarded:true};
  saveDB();
  document.getElementById('onboarding').classList.add('hidden');
  initSplash();
}

// ═══════════════════════════════════════════════
// POMODORO
// ═══════════════════════════════════════════════
function startPomo(mode) {
  clearInterval(pomo.timer);
  if(mode==='focus'){pomo.phase='focus';pomo.timeLeft=25*60;pomo.total=25*60;}
  else if(mode==='short'){pomo.phase='short';pomo.timeLeft=5*60;pomo.total=5*60;}
  else{pomo.phase='long';pomo.timeLeft=15*60;pomo.total=15*60;}
  pomo.running=true;
  document.getElementById('pomoOverlay').classList.remove('hidden');
  runPomoTick();
}

function runPomoTick() {
  updatePomoDisplay();
  pomo.timer=setInterval(()=>{
    if(!pomo.running){clearInterval(pomo.timer);return;}
    pomo.timeLeft--;
    if(pomo.timeLeft<=0){
      clearInterval(pomo.timer);
      if(pomo.phase==='focus'){
        db.settings.pomoTotal=(db.settings.pomoTotal||0)+1;
        pomo.session++;
        if(pomo.session>pomo.totalSessions)pomo.session=1;
        saveDB();
        if(Notification.permission==='granted') new Notification('✅ Focus session done!',{body:'Time for a break.'});
        pomo.phase=pomo.session%4===0?'long':'short';
        pomo.timeLeft=pomo.phase==='long'?15*60:5*60;
        pomo.total=pomo.timeLeft;
      } else {
        pomo.phase='focus';pomo.timeLeft=25*60;pomo.total=25*60;
        if(Notification.permission==='granted') new Notification('🔥 Break over!',{body:'Back to focus.'});
      }
      pomo.running=true;
      runPomoTick();
    }
    updatePomoDisplay();
  },1000);
}

function updatePomoDisplay() {
  const m=Math.floor(pomo.timeLeft/60),s=pomo.timeLeft%60;
  document.getElementById('pomoClock').textContent=String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');
  document.getElementById('pomoPhase').textContent=pomo.phase==='focus'?'Focus Session':pomo.phase==='short'?'Short Break':'Long Break';
  document.getElementById('pomoSession').textContent='Session '+pomo.session+' of '+pomo.totalSessions;
  document.getElementById('pomoPlayBtn').textContent=pomo.running?'⏸ Pause':'▶ Resume';
  const pct=(1-pomo.timeLeft/pomo.total)*100;
  const widget=document.querySelector('.pomo-progress-fill');
  if(widget) widget.style.width=pct+'%';
}

function pomoPause() {
  pomo.running=!pomo.running;
  if(pomo.running) runPomoTick();
  else clearInterval(pomo.timer);
  updatePomoDisplay();
}

function pomoSkip() { pomo.timeLeft=0; }

function closePomo() {
  clearInterval(pomo.timer);
  pomo.running=false;
  document.getElementById('pomoOverlay').classList.add('hidden');
}

// ═══════════════════════════════════════════════
// STRIP UPDATE
// ═══════════════════════════════════════════════
function updateStrip() {
  const data=getDayData(currentDate);
  const todayPrayed=PRAYERS.filter(p=>data.prayers[p.name]==='prayed').length;
  const todayHabits=HABITS.filter(h=>data.habits[h.id]).length;
  const wl=db.weightLog;
  const latestKg=wl.length?wl[wl.length-1].kg:null;
  const streak=getSalahStreak();
  const score=calcDayScore(data);
  document.getElementById('ssScoreVal').textContent=score;
  document.getElementById('ssScore').style.background=score>=80?'rgba(42,140,96,.2)':score>=50?'rgba(201,150,12,.15)':'rgba(204,68,68,.1)';
  document.getElementById('ssSalah').textContent=todayPrayed+'/5';
  document.getElementById('ssSalah').style.color=todayPrayed===5?'var(--green-l)':todayPrayed>=3?'var(--gold-l)':'var(--red-l)';
  document.getElementById('ssHabits').textContent=todayHabits+'/'+HABITS.length;
  document.getElementById('ssWeight').textContent=latestKg?latestKg.toFixed(1)+'kg':'—';
  document.getElementById('ssStreak').textContent=streak+'🔥';
}

// ═══════════════════════════════════════════════
// RENDER FUNCTIONS
// ═══════════════════════════════════════════════

function renderDateNav() {
  document.getElementById('topbarDate').textContent=formatDate(currentDate);
  document.getElementById('topbarHijri').textContent=formatHijri(currentDate);
}

// ── HOME ──
function renderHome() {
  const s=db.settings;
  const h=new Date().getHours();
  const greet=h<12?'Good Morning':h<17?'Good Afternoon':'Good Evening';
  const name=s.name||'Friend';
  document.getElementById('homeGreeting').textContent=(h<12?'🌅 Good Morning':h<17?'☀️ Good Afternoon':'🌙 Good Evening')+', '+name+'!';
  const ayah=AYAHS[new Date().getDate()%AYAHS.length];
  document.getElementById('homeAyah').innerHTML=
    '<div class="ayah-arabic">'+ayah.ar+'</div>'+
    '<div class="ayah-trans">'+ayah.trans+'</div>'+
    '<div class="ayah-ref">'+ayah.ref+'</div>';
  renderHomeNextPrayer();
  renderHomeQuickPrayers();
  renderHomeSummary();
  renderHomeAchievements();
}

function renderHomeNextPrayer() {
  const np=getNextPrayer();
  const el=document.getElementById('homeNextPrayer');
  el.innerHTML=
    '<div style="flex:1"><div class="hnp-label">Next Prayer</div>'+
    '<div class="hnp-name">'+np.name+'</div>'+
    '<div class="hnp-countdown">in '+formatCountdown(np.diff)+'</div></div>'+
    '<div><div class="hnp-time">'+np.time+'</div></div>';
  // live countdown
  clearInterval(countdownInterval);
  countdownInterval=setInterval(()=>{
    const n=getNextPrayer();
    const cc=el.querySelector('.hnp-countdown');
    const tt=el.querySelector('.hnp-time');
    const nn=el.querySelector('.hnp-name');
    if(cc) cc.textContent='in '+formatCountdown(n.diff);
    if(tt) tt.textContent=n.time;
    if(nn) nn.textContent=n.name;
  },60000);
}

function renderHomeQuickPrayers() {
  const data=getDayData(currentDate);
  const grid=document.getElementById('homeQuickPrayers');
  grid.innerHTML=PRAYERS.map(p=>{
    const st=data.prayers[p.name]||'none';
    return '<div class="hqp-card '+(st==='prayed'?'prayed':st==='missed'?'missed':'')+'" onclick="togglePrayer(\''+p.name+'\',\'home\')">'+
      '<div class="hqp-ar">'+p.ar+'</div>'+
      '<div class="hqp-nm">'+p.name+'</div>'+
      '<div class="hqp-tm">'+(st==='prayed'?'✔':st==='missed'?'✕':getPrayerTime(p.name))+'</div>'+
      '</div>';
  }).join('');
}

function renderHomeSummary() {
  const data=getDayData(currentDate);
  const prayed=PRAYERS.filter(p=>data.prayers[p.name]==='prayed').length;
  const habits=HABITS.filter(h=>data.habits[h.id]).length;
  const wl=db.weightLog;
  const latestKg=wl.length?wl[wl.length-1].kg:null;
  const sw=db.settings.startWeight||85;
  const gw=db.settings.goalWeight||70;
  const score=calcDayScore(data);
  const streak=getSalahStreak();

  document.getElementById('homeTodaySummary').innerHTML=[
    {val:prayed+'/5',lbl:"Today's Salah",pct:prayed*20,col:prayed===5?'var(--green-b)':'var(--gold)'},
    {val:habits+'/'+HABITS.length,lbl:'Habits Done',pct:Math.round(habits/HABITS.length*100),col:'var(--blue-b)'},
    {val:score,lbl:'Day Score',pct:score,col:score>=80?'var(--green-b)':score>=50?'var(--gold)':'var(--red)'},
    {val:streak+'🔥',lbl:'Streak',pct:Math.min(100,streak*5),col:'var(--purple)'},
    {val:latestKg?latestKg.toFixed(1)+'kg':'—',lbl:'Weight',pct:latestKg?Math.min(100,Math.round((sw-latestKg)/(sw-gw)*100)):0,col:'var(--orange)'},
    {val:getQuranDays()+' days',lbl:'Qurʾān Streak',pct:Math.min(100,getQuranDays()*3),col:'var(--gold-l)'},
  ].map(c=>'<div class="hts-card"><div class="hts-val">'+c.val+'</div><div class="hts-lbl">'+c.lbl+'</div><div class="hts-bar"><div class="hts-bar-fill" style="width:'+c.pct+'%;background:'+c.col+'"></div></div></div>').join('');
}

function renderHomeAchievements() {
  const unlocked=ACHIEVEMENTS.filter(a=>a.check(db));
  const el=document.getElementById('homeAchievements');
  if(!unlocked.length){el.innerHTML='';return;}
  el.innerHTML='<div class="achieve-title">🏆 Achievements</div>'+
    '<div class="achieve-row">'+
    unlocked.map(a=>'<div class="achieve-chip unlocked">'+a.icon+' '+a.name+'</div>').join('')+
    '</div>';
}

// ── PRAYERS ──
function renderPrayers() {
  const data=getDayData(currentDate);
  const grid=document.getElementById('prayersGrid');
  grid.innerHTML=PRAYERS.map(p=>{
    const st=data.prayers[p.name]||'none';
    return '<div class="prayer-card '+(st==='prayed'?'prayed':st==='missed'?'missed':'')+'" onclick="togglePrayer(\''+p.name+'\')">'+
      '<div class="p-check">'+(st==='prayed'?'✔':st==='missed'?'✕':'')+'</div>'+
      '<div class="prayer-ar">'+p.ar+'</div>'+
      '<div class="prayer-nm">'+p.name+'</div>'+
      '<div class="prayer-tm">'+getPrayerTime(p.name)+'</div>'+
      '<div class="prayer-st">'+(st==='prayed'?'Prayed':st==='missed'?'Missed':'Tap')+'</div>'+
      '</div>';
  }).join('');
  // Qada
  const qada=document.getElementById('qadaGrid');
  qada.innerHTML=PRAYERS.map(p=>{
    const v=(data.qada&&data.qada[p.name])||0;
    return '<div class="qada-item">'+
      '<span style="font-family:\'Cairo\',sans-serif;font-size:13px;color:var(--gold-l)">'+p.ar+'</span>'+
      '<input class="qada-input" type="number" min="0" max="99" value="'+v+'" onchange="setQada(\''+p.name+'\',this.value)" title="Qada for '+p.name+'">'+
      '</div>';
  }).join('');
  document.getElementById('prayerNotes').value=data.prayerNotes||'';
}

function setQada(name,val) {
  const data=getDayData(currentDate);
  if(!data.qada) data.qada={};
  data.qada[name]=parseInt(val)||0;
  saveDB();
}

// ── SCHEDULE ──
function renderSchedule() {
  const list=document.getElementById('timelineList');
  list.innerHTML='';
  const now=new Date();
  const nowMins=now.getHours()*60+now.getMinutes();
  const isCurDay=isToday(currentDate);
  let currentBlockIdx=-1;
  if(isCurDay){
    for(let i=0;i<SCHEDULE.length-1;i++){
      const [sh,sm]=SCHEDULE[i].time.split(':').map(Number);
      const [eh,em]=SCHEDULE[i+1].time.split(':').map(Number);
      const start=sh*60+sm, end=eh*60+em;
      if(nowMins>=start&&nowMins<end){currentBlockIdx=i;break;}
    }
  }
  if(isCurDay&&currentBlockIdx>=0){
    const s=SCHEDULE[currentBlockIdx];
    document.getElementById('timerBanner').style.display='block';
    document.getElementById('timerBanner').textContent='⏳ Now: '+s.title+' until '+SCHEDULE[currentBlockIdx+1]?.time;
    document.getElementById('schedNowLabel').textContent='Current: '+s.title;
  } else {
    document.getElementById('timerBanner').style.display='none';
    document.getElementById('schedNowLabel').textContent='';
  }
  SCHEDULE.forEach((s,i)=>{
    const isCurrent=i===currentBlockIdx;
    const [sh,sm]=s.time.split(':').map(Number);
    const startMins=sh*60+sm;
    const isPast=isCurDay&&nowMins>startMins+5;
    const block=document.createElement('div');
    block.className='tl-block';
    block.style.opacity=isCurDay&&startMins>nowMins+5?'0.5':'1';
    const badge=s.type==='prayer'?'<span class="tl-badge badge-prayer">Prayer</span>':
      s.type==='deen'?'<span class="tl-badge badge-deen">Deen</span>':
      s.type==='fitness'?'<span class="tl-badge badge-fitness">Fitness</span>':'';
    block.innerHTML=
      '<div class="tl-time">'+s.time+'<br>'+s.end+'</div>'+
      '<div class="tl-dot-wrap">'+
        '<div class="tl-dot'+(isCurrent?' now':'')+'" style="background:'+(DOT_COLORS[s.type]||'#3a4a6a')+';'+(isCurrent?'box-shadow:0 0 7px '+(DOT_COLORS[s.type]||''):'')+'"></div>'+
        (i<SCHEDULE.length-1?'<div class="tl-line"></div>':'')+
      '</div>'+
      '<div class="tl-card '+s.type+(isCurrent?' current':'')+'">'+
        '<div class="tl-title">'+s.title+badge+'</div>'+
        '<div class="tl-sub">'+s.sub+'</div>'+
      '</div>';
    list.appendChild(block);
  });
}

// ── HABITS ──
function renderHabits() {
  const today=new Date();today.setHours(0,0,0,0);
  const wrap=document.getElementById('habitsContent');
  wrap.innerHTML='';
  const hdrRow=document.createElement('div');
  hdrRow.className='day-hdr-row';
  hdrRow.innerHTML='<div class="day-hdr-spacer"></div><div class="day-hdr-days">'+
    Array.from({length:7},(_,i)=>{
      const d=new Date(today);d.setDate(today.getDate()-(6-i));
      const isTod=d.getTime()===today.getTime();
      return '<div class="day-lbl-h" style="'+(isTod?'color:var(--gold-l);font-weight:700':'')+'">'+DAYS_SHORT[d.getDay()]+'</div>';
    }).join('')+'</div>';
  wrap.appendChild(hdrRow);
  let lastCat='';
  HABITS.forEach(h=>{
    if(h.cat!==lastCat){
      const cd=document.createElement('div');
      cd.className='habit-cat-title';
      cd.textContent=h.cat==='deen'?'— Deen —':h.cat==='fitness'?'— Fitness / Body —':'— Mind / Study —';
      wrap.appendChild(cd);
      lastCat=h.cat;
    }
    const row=document.createElement('div');
    row.className='habit-row';
    const boxes=document.createElement('div');
    boxes.className='habit-boxes';
    for(let i=6;i>=0;i--){
      const d=new Date(today);d.setDate(today.getDate()-i);
      const data=getDayData(d);
      const checked=data.habits[h.id]===true;
      const isFuture=d>today;
      const isTod=d.getTime()===today.getTime();
      const box=document.createElement('div');
      box.className='hbox'+(isFuture?' future':checked?' checked':'')+(isTod&&!isFuture?' today-col':'');
      box.textContent=isFuture?'':checked?'✓':'';
      if(!isFuture) box.onclick=()=>toggleHabit(h.id,i);
      boxes.appendChild(box);
    }
    row.innerHTML='<span class="habit-lbl">'+h.label+'</span>';
    row.appendChild(boxes);
    wrap.appendChild(row);
  });
}

// ── QURAN ──
function renderQuran() {
  const data=getDayData(currentDate);
  const juzEl=document.getElementById('quranJuz');
  const pagesEl=document.getElementById('quranPages');
  const surahEl=document.getElementById('quranSurah');
  if(juzEl) juzEl.value=data.quranJuz||'';
  if(pagesEl) pagesEl.value=data.quranPages||'';
  if(surahEl) surahEl.value=data.quranSurah||'';
  // Khatm bar
  const totalPages=Object.keys(db).filter(k=>k.match(/^\d{4}-\d{2}-\d{2}$/)).reduce((sum,k)=>sum+(parseInt(db[k].quranPages)||0),0);
  const pct=Math.min(100,Math.round(totalPages/604*100));
  const khatmEl=document.getElementById('quranKhatmBar');
  if(khatmEl) khatmEl.innerHTML=
    '<div class="qkb-row"><span>Total pages: '+totalPages+'/604</span><span style="color:var(--gold)">'+pct+'% to Khatm</span></div>'+
    '<div class="qkb-track"><div class="qkb-fill" style="width:'+pct+'%"></div></div>';
  // Revision log
  const revGrid=document.getElementById('revisionGrid');
  if(revGrid){
    if(!data.revisionLog||!data.revisionLog.length){
      revGrid.innerHTML='<div class="no-entries">No revision entries yet. Add what you memorized today.</div>';
    } else {
      revGrid.innerHTML=data.revisionLog.map((r,i)=>
        '<div class="rev-item"><span class="rev-subject">'+r.ayah+'</span><span class="rev-ayah">'+r.time+'</span><button class="rev-del" onclick="deleteRevision('+i+')">✕</button></div>'
      ).join('');
    }
    // Add revision row
    revGrid.insertAdjacentHTML('afterend',
      '<div class="study-add-row" style="margin-top:8px">'+
      '<input class="ob-input" id="revAyah" placeholder="What did you memorize / revise?" style="margin:0;flex:1">'+
      '<button class="log-btn" onclick="addRevision()">Add</button></div>'
    );
  }
  // Deen week mini
  const dwm=document.getElementById('deenWeekMini');
  if(dwm){
    const todayDay=DAYS_SHORT[new Date().getDay()];
    dwm.innerHTML=WEEKLY.map(w=>
      '<div class="dwm-day'+(w.day===todayDay?' today':'')+'">'+
      '<div class="dwm-d">'+w.day+'</div>'+
      '<div class="dwm-t">'+w.topic+'</div>'+
      '<div class="dwm-w">'+w.workout+'</div>'+
      '</div>'
    ).join('');
  }
}

// ── FITNESS ──
function renderFitness() {
  const data=getDayData(currentDate);
  // Workout type
  const wtRow=document.getElementById('workoutTypeRow');
  if(wtRow) wtRow.innerHTML=WORKOUT_TYPES.map(t=>
    '<button class="wt-btn'+(data.workoutType===t?' active':'')+'" onclick="setWorkoutType(\''+t.replace(/'/g,"\\'")+'\')">'+(t==='Full Body'?'💪':t==='Cardio'?'🏃':'😴')+' '+t+'</button>'
  ).join('');
  const wn=document.getElementById('workoutNotes');
  if(wn) wn.value=data.workoutNotes||'';
  // Meals
  const ml=document.getElementById('mealLogger');
  if(ml) ml.innerHTML=MEAL_NAMES.map(m=>{
    const st=(data.meals&&data.meals[m])||null;
    return '<div class="meal-row"><span class="meal-name">'+m+'</span><div class="meal-status">'+
      '<button class="meal-btn'+(st==='ok'?' ok':'')+'" onclick="setMeal(\''+m+'\',\'ok\')">✔ OK</button>'+
      '<button class="meal-btn'+(st==='bad'?' bad':'')+'" onclick="setMeal(\''+m+'\',\'bad\')">✕ Bad</button>'+
      '</div></div>';
  }).join('');
  // Weight bar
  const wl=db.weightLog;
  const latestKg=wl.length?wl[wl.length-1].kg:null;
  const sw=db.settings.startWeight||85;
  const gw=db.settings.goalWeight||70;
  const lostKg=latestKg?Math.max(0,sw-latestKg):0;
  const pctToGoal=latestKg?Math.min(100,Math.round(lostKg/(sw-gw)*100)):0;
  const wgb=document.getElementById('weightGoalBar');
  if(wgb) wgb.innerHTML=
    '<div class="wgb-labels"><span>'+sw+' kg (start)</span><span style="color:var(--gold)">Goal: '+gw+' kg</span></div>'+
    '<div class="wgb-track"><div class="wgb-fill" style="width:'+pctToGoal+'%"></div></div>'+
    '<div class="wgb-pct">'+pctToGoal+'% — '+(latestKg?latestKg.toFixed(1)+' kg now · '+(latestKg-gw).toFixed(1)+' kg to go':'No entries yet')+'</div>';
  // Weight log
  const wlogEl=document.getElementById('weightLog');
  if(wlogEl){
    const logs=[...wl].reverse();
    wlogEl.innerHTML=!logs.length?'<div class="no-entries">No entries yet</div>':
      logs.map((e,i)=>{
        const prev=logs[i+1];
        const diff=prev?(e.kg-prev.kg):null;
        const ds=diff===null?'':(diff>0?'+':'')+diff.toFixed(1)+' kg';
        const dc=diff===null?'':diff<0?'var(--green-l)':'var(--red-l)';
        return '<div class="wlog-row"><span class="wlog-date">'+e.date+'</span><span class="wlog-kg">'+e.kg.toFixed(1)+' kg</span><span class="wlog-diff" style="color:'+dc+'">'+ds+'</span><button class="wlog-del" onclick="deleteWeight(\''+e.date+'\')">✕</button></div>';
      }).join('');
  }
}

// ── STUDY ──
function renderStudy() {
  const data=getDayData(currentDate);
  // Pomodoro widget
  const pw=document.getElementById('pomodoroWidget');
  if(pw){
    const m=Math.floor(pomo.timeLeft/60),s=pomo.timeLeft%60;
    const phaseName=pomo.phase==='focus'?'Focus Session':pomo.phase==='short'?'Short Break':'Long Break';
    const pct=(1-pomo.timeLeft/pomo.total)*100;
    pw.innerHTML=
      '<div class="pomo-phase-label">'+phaseName+'</div>'+
      '<div class="pomo-display">'+String(m).padStart(2,'0')+':'+String(s).padStart(2,'0')+'</div>'+
      '<div class="pomo-progress"><div class="pomo-progress-fill" style="width:'+pct+'%"></div></div>'+
      '<div class="pomo-controls">'+
        '<button class="pomo-ctrl-btn primary" onclick="startPomo(\'focus\')">▶ Focus</button>'+
        '<button class="pomo-ctrl-btn" onclick="startPomo(\'short\')">☕ Short</button>'+
        '<button class="pomo-ctrl-btn" onclick="startPomo(\'long\')">🌙 Long</button>'+
      '</div>'+
      '<div class="pomo-session-info">Total sessions: '+(db.settings.pomoTotal||0)+'</div>';
  }
  // Study log
  const sle=document.getElementById('studyLogEntries');
  if(sle){
    if(!data.studyLog||!data.studyLog.length){
      sle.innerHTML='<div class="no-entries">No study entries yet today.</div>';
    } else {
      const total=data.studyLog.reduce((s,e)=>s+e.mins,0);
      sle.innerHTML='<div style="font-size:11px;color:var(--gold);font-family:Cinzel,serif;margin-bottom:6px">Total: '+total+' min</div>'+
        data.studyLog.map((e,i)=>
          '<div class="study-log-entry"><span class="sle-subject">'+e.subject+'</span><span class="sle-mins">'+e.mins+' min</span><button class="sle-del" onclick="deleteStudyEntry('+i+')">✕</button></div>'
        ).join('');
    }
  }
  const ss=document.getElementById('softSkillNote');
  if(ss) ss.value=data.softSkill||'';
}

// ── WRAPUP ──
function renderWrapup() {
  const data=getDayData(currentDate);
  const dy=document.getElementById('deenYes');
  const dn=document.getElementById('deenNo');
  if(dy) dy.className='choice-btn'+(data.deen==='yes'?' yes':'');
  if(dn) dn.className='choice-btn'+(data.deen==='no'?' no':'');
  const srg=document.getElementById('studyRateGrid');
  if(srg){srg.innerHTML='';for(let i=1;i<=10;i++){const b=document.createElement('button');b.className='rate-btn'+(data.studyRate===i?' active':'');b.textContent=i;b.onclick=()=>setStudyRate(i);srg.appendChild(b);}}
  const erg=document.getElementById('energyRateGrid');
  if(erg){erg.innerHTML='';for(let i=1;i<=10;i++){const b=document.createElement('button');b.className='rate-btn'+(data.energyRate===i?' active':'');b.textContent=i;b.onclick=()=>setEnergyRate(i);erg.appendChild(b);}}
  ['journalText','improveText','grat1','grat2','grat3'].forEach(id=>{
    const el=document.getElementById(id);
    if(el) el.value=data[id==='journalText'?'journal':id==='improveText'?'improve':id]||'';
  });
}

// ── PROGRESS ──
function renderProgress() {
  const today=new Date();today.setHours(0,0,0,0);
  const data=getDayData(today);
  const todayPrayed=PRAYERS.filter(p=>data.prayers[p.name]==='prayed').length;
  const todayHabits=HABITS.filter(h=>data.habits[h.id]).length;
  const wl=db.weightLog;
  const latestKg=wl.length?wl[wl.length-1].kg:null;
  const sw=db.settings.startWeight||85;
  const gw=db.settings.goalWeight||70;
  const lostKg=latestKg?Math.max(0,sw-latestKg):0;
  const pctGoal=latestKg?Math.min(100,Math.round(lostKg/(sw-gw)*100)):0;
  const streak=getSalahStreak();
  const score=calcDayScore(data);
  // Stats
  const grid=document.getElementById('statsGrid');
  if(grid) grid.innerHTML=[
    {lbl:"Today's Salah",val:todayPrayed+'/5',sub:todayPrayed===5?'All done!':''+todayPrayed+' prayed',pct:todayPrayed*20,col:todayPrayed===5?'var(--green-b)':'var(--gold)'},
    {lbl:"Today's Habits",val:todayHabits+'/'+HABITS.length,sub:Math.round(todayHabits/HABITS.length*100)+'% complete',pct:Math.round(todayHabits/HABITS.length*100),col:'var(--blue-b)'},
    {lbl:'Day Score',val:score,sub:score>=80?'Excellent!':score>=50?'Good':'Needs work',pct:score,col:score>=80?'var(--green-b)':score>=50?'var(--gold)':'var(--red)'},
    {lbl:'Salah Streak',val:streak+'🔥',sub:'consecutive days',pct:Math.min(100,streak*5),col:'var(--purple)'},
    {lbl:'Weight Lost',val:lostKg.toFixed(1)+' kg',sub:pctGoal+'% to '+gw+'kg goal',pct:pctGoal,col:'var(--orange)'},
    {lbl:'Quran Days',val:getQuranDays(),sub:'days with reading',pct:Math.min(100,getQuranDays()*2),col:'var(--gold-l)'},
  ].map(s=>'<div class="stat-card"><div class="stat-lbl">'+s.lbl+'</div><div class="stat-val">'+s.val+'</div><div class="stat-sub">'+s.sub+'</div><div class="stat-bar"><div class="stat-bar-fill" style="width:'+s.pct+'%;background:'+s.col+'"></div></div></div>').join('');
  // Heatmap
  const dotsEl=document.getElementById('streakDots');
  if(dotsEl){
    dotsEl.innerHTML='';
    for(let i=29;i>=0;i--){
      const d=new Date(today);d.setDate(today.getDate()-i);
      const dd=getDayData(d);
      const p=PRAYERS.filter(pr=>dd.prayers[pr.name]==='prayed').length;
      const cls=d>today?'future':p===5?'full':p>0?'part':'none';
      const dot=document.createElement('div');
      dot.className='sdot '+cls;
      dot.textContent=d>today?'':p;
      dot.title=d.toDateString()+' — '+p+'/5';
      dotsEl.appendChild(dot);
    }
  }
  // Weekly scores
  const wsc=document.getElementById('weeklyScoresChart');
  if(wsc){
    wsc.innerHTML='';
    for(let w=4;w>=0;w--){
      const score=getWeeklyScore(w);
      const d=new Date(today);d.setDate(today.getDate()-w*7);
      const lbl=w===0?'This week':w===1?'Last week':d.toLocaleDateString('en-GB',{month:'short',day:'numeric'});
      wsc.innerHTML+='<div class="wsc-row"><div class="wsc-lbl">'+lbl+'</div><div class="wsc-track"><div class="wsc-fill" style="width:'+score+'%"></div></div><div class="wsc-val">'+score+'</div></div>';
    }
  }
  // Achievements
  const ag=document.getElementById('achievementsGrid');
  if(ag) ag.innerHTML=ACHIEVEMENTS.map(a=>{
    const unlocked=a.check(db);
    return '<div class="ach-item'+(unlocked?' unlocked':'')+'">'+
      '<div class="ach-icon">'+(unlocked?a.icon:'🔒')+'</div>'+
      '<div class="ach-info"><div class="ach-name">'+a.name+'</div><div class="ach-desc">'+a.desc+'</div></div>'+
      (unlocked?'<div style="font-size:12px;color:var(--green-l)">✔</div>':'<div class="ach-locked">—</div>')+
      '</div>';
  }).join('');
  // Weight chart
  const wchrt=document.getElementById('weightChart');
  if(wchrt){
    const logs=db.weightLog.slice(-10);
    if(!logs.length){wchrt.innerHTML='<div class="no-entries">No weight data yet.</div>';}
    else{
      const max=Math.max(...logs.map(e=>e.kg));
      const min=Math.min(...logs.map(e=>e.kg));
      const range=max-min||1;
      wchrt.innerHTML='<div class="wc-bars">'+
        logs.map(e=>{
          const h=Math.max(8,Math.round(((e.kg-min)/range)*60+8));
          const lbl=e.date.slice(5);
          return '<div class="wc-bar-wrap"><div class="wc-bar" style="height:'+h+'px" title="'+e.kg+'kg"></div><div class="wc-lbl">'+lbl+'</div></div>';
        }).join('')+'</div>';
      const wlogProg=document.getElementById('weightLogProgress');
      if(wlogProg){
        const allLogs=[...db.weightLog].reverse();
        wlogProg.innerHTML=allLogs.slice(0,8).map((e,i)=>{
          const prev=allLogs[i+1];
          const diff=prev?(e.kg-prev.kg):null;
          const ds=diff===null?'':(diff>0?'+':'')+diff.toFixed(1)+' kg';
          const dc=diff===null?'':diff<0?'var(--green-l)':'var(--red-l)';
          return '<div class="wlog-row"><span class="wlog-date">'+e.date+'</span><span class="wlog-kg">'+e.kg.toFixed(1)+' kg</span><span class="wlog-diff" style="color:'+dc+'">'+ds+'</span></div>';
        }).join('');
      }
    }
  }
}

// ── SETTINGS ──
function renderSettings() {
  const s=db.settings;
  ['settingName','settingCity'].forEach(id=>{
    const el=document.getElementById(id);
    if(el) el.value=s[id.replace('setting','').toLowerCase().replace('n','name').replace('c','city')]||s.name||'';
  });
  document.getElementById('settingName').value=s.name||'';
  document.getElementById('settingCity').value=s.city||'';
  document.getElementById('settingStartW').value=s.startWeight||85;
  document.getElementById('settingGoalW').value=s.goalWeight||70;
  const nb=document.getElementById('notifToggle');
  if(nb){nb.textContent=s.notifs?'Enabled ✔':'Enable';nb.className='toggle-btn'+(s.notifs?' on':'');}
  applyTheme(s.theme||'dark');
  // Prayer times
  const ptEl=document.getElementById('prayerTimeSettings');
  if(ptEl){
    ptEl.innerHTML=PRAYERS.map(p=>
      '<div class="prayer-time-row">'+
      '<span class="ptime-name">'+p.name+'</span>'+
      '<input class="ptime-input" type="time" value="'+getPrayerTime(p.name)+'" onchange="savePrayerTime(\''+p.name+'\',this.value)">'+
      '</div>'
    ).join('');
  }
}

function savePrayerTime(name,val){
  if(!db.settings.prayerTimes) db.settings.prayerTimes={};
  db.settings.prayerTimes[name]=val;
  saveDB();
}

// ═══════════════════════════════════════════════
// MASTER RENDER
// ═══════════════════════════════════════════════
function renderTab(tab) {
  switch(tab){
    case 'home':     renderHome(); break;
    case 'prayers':  renderPrayers(); break;
    case 'schedule': renderSchedule(); break;
    case 'habits':   renderHabits(); break;
    case 'quran':    renderQuran(); break;
    case 'fitness':  renderFitness(); break;
    case 'study':    renderStudy(); break;
    case 'wrapup':   renderWrapup(); break;
    case 'progress': renderProgress(); break;
    case 'settings': renderSettings(); break;
  }
}

function render() {
  renderDateNav();
  updateStrip();
  renderTab(currentTab);
}

// ═══════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════
function initSplash() {
  const name=db.settings.name||'';
  const splashName=document.getElementById('splashName');
  if(splashName) splashName.textContent=name?'Welcome back, '+name:' ';
  setTimeout(()=>{
    const splash=document.getElementById('splash');
    splash.classList.add('hidden');
    setTimeout(()=>splash.style.display='none',700);
    render();
    scheduleNotifs();
    applyTheme(db.settings.theme||'dark');
  },1800);
}

window.addEventListener('DOMContentLoaded',()=>{
  loadDB();
  if(!db.settings.onboarded){
    document.getElementById('onboarding').classList.remove('hidden');
    document.getElementById('splash').style.display='none';
  } else {
    document.getElementById('onboarding').classList.add('hidden');
    initSplash();
  }
});

if('serviceWorker' in navigator){
  window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
}
