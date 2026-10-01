import React, { useState, useEffect } from 'react';

// ===== DIZAYN (CSS) =====
const CSS = `
:root{--bg:#edf2ef;--card:#fff;--ink:#12241d;--mut:#5f736a;--line:#d9e2dd;--soft:#e3efe9;--acc:#0a9f78;--accd:#067a5c;--gold:#e2a11f;--red:#d64550;box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
@media(prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#0d1714;--card:#14231e;--ink:#e8f2ed;--mut:#8ea89c;--line:#243830;--soft:#1b302a}}
:root[data-theme="dark"]{--bg:#0d1714;--card:#14231e;--ink:#e8f2ed;--mut:#8ea89c;--line:#243830;--soft:#1b302a}
*{box-sizing:border-box}html,body{margin:0}
body{background:radial-gradient(900px 420px at 85% -8%,#0a9f7830,transparent),radial-gradient(700px 400px at -10% 30%,#e2a11f18,transparent),var(--bg);background-attachment:fixed;color:var(--ink);font:15px/1.5 Onest,system-ui,sans-serif;min-height:100%}
h1,h2,h3{font-family:'Bricolage Grotesque',Onest,sans-serif;margin:0;letter-spacing:-.02em}
button,input,select{font:inherit;color:inherit}
button{cursor:pointer;border:0;background:none}
:focus-visible{outline:2px solid var(--acc);outline-offset:2px}
.card{transition:transform .18s,box-shadow .18s;box-shadow:0 1px 2px #0a1f180a;background:var(--card);border:1px solid var(--line);border-radius:16px;padding:18px}
.btn{background:var(--acc);color:#fff;font-weight:600;padding:10px 16px;border-radius:12px;transition:background .15s}
.btn:hover{background:var(--accd)}.btn.alt{background:var(--soft);color:var(--ink)}.btn.gold{background:var(--gold);color:#241a02}.btn.sm{padding:6px 12px;font-size:13px}
label{display:block;font-size:13px;color:var(--mut);margin-bottom:12px}
input,select{width:100%;margin-top:4px;padding:10px 12px;background:var(--bg);border:1px solid var(--line);border-radius:10px;color:var(--ink)}
.two{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.auth{min-height:100vh;display:grid;grid-template-columns:1.1fr 1fr;gap:32px;align-items:center;padding:32px max(24px,6vw)}
.brand h1{font-size:clamp(34px,5vw,56px);line-height:1.05;font-weight:800;margin:22px 0 14px}
.brand p{color:var(--mut);max-width:44ch;font-size:17px}.brand ul{padding:0;list-style:none;margin:22px 0 0;display:grid;gap:8px}
.brand li::before{content:"✓";color:var(--acc);font-weight:700;margin-right:10px}
.logo{width:44px;height:44px;border-radius:13px;background:linear-gradient(135deg,#0a9f78,#3cd3a8);display:grid;place-items:center;color:#062a1e;font:800 22px 'Bricolage Grotesque',sans-serif}
.af{max-width:400px;width:100%;justify-self:center;padding:24px}
.seg{display:grid;grid-template-columns:1fr 1fr;background:var(--bg);border-radius:12px;padding:4px;margin-bottom:18px}
.seg button{padding:8px;border-radius:9px;font-weight:600;color:var(--mut)}.seg .on{background:var(--card);color:var(--acc);box-shadow:0 1px 4px #0002}
.app{display:grid;grid-template-columns:220px 1fr;min-height:100vh}
aside{position:sticky;top:0;height:100vh;padding:18px 12px;border-right:1px solid var(--line);background:var(--card);display:flex;flex-direction:column;gap:6px}
aside .logo{margin:0 6px 14px}
nav{display:flex;flex-direction:column;gap:4px;flex:1}
nav button,aside>button{display:flex;gap:12px;align-items:center;padding:10px 12px;border-radius:12px;text-align:left;color:var(--mut);font-weight:500;width:100%}
nav button:hover{background:var(--soft)}nav .on{background:var(--soft);color:var(--acc);font-weight:600}
aside>button.th{color:var(--mut)}aside>button.gd{background:var(--gold);color:#241a02;font-weight:600}
main{padding:28px max(18px,3vw);max-width:1100px;width:100%}
.hd{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:18px}
.hd h2{font-size:26px;font-weight:800}.hd p{margin:2px 0 0;color:var(--mut);font-size:14px}
.hero{background:radial-gradient(500px 220px at 90% 0,#3cd3a844,transparent),linear-gradient(120deg,#0f2f25,#0a6b52);box-shadow:0 20px 44px #0a6b5240;color:#eafff6;border-radius:20px;padding:26px;margin-bottom:16px;display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap;align-items:flex-end}
.hero small{color:#8fd9bd}.hero .big{font:800 clamp(34px,6vw,56px)/1.05 'Bricolage Grotesque',sans-serif;margin:6px 0}
.g3{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;margin-bottom:16px}
.g2{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:14px}
.stat b{display:block;font:800 22px 'Bricolage Grotesque',sans-serif;margin-top:4px}.stat span{color:var(--mut);font-size:13px}
.chip{display:inline-block;padding:2px 9px;border-radius:99px;font-size:12px;font-weight:600;background:var(--soft);color:var(--accd);margin-right:6px}
.chip.g{background:#e2a11f30;color:#a56f00}.chip.p{background:#7c5cff26;color:#6a4bea}.chip.r{background:#d6455022;color:var(--red)}
.row{margin:10px 0}.rt{display:flex;justify-content:space-between;font-size:14px;gap:8px}.rt span{color:var(--mut)}
.bar{height:7px;background:var(--soft);border-radius:9px;overflow:hidden;margin-top:6px}.bar i{display:block;height:100%;background:var(--acc);border-radius:9px}
.item{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid var(--line)}.item:last-child{border:0}
.item p{margin:0;color:var(--mut);font-size:13px}.item b{font-weight:600}
.amt{font-weight:600;white-space:nowrap}.pos{color:var(--acc)}
.tools{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:14px}.tools input{max-width:280px;margin:0}.tools select{width:auto;margin:0}
.job{padding:16px 0;border-bottom:1px solid var(--line);display:flex;justify-content:space-between;gap:14px;flex-wrap:wrap}.job:last-child{border:0}
.tag{font-size:12px;border:1px solid var(--line);padding:1px 8px;border-radius:99px;color:var(--mut);margin-right:5px}
.x{position:absolute;right:14px;top:12px;color:var(--mut);font-size:18px}
.ov{position:fixed;inset:0;background:#0a1410a8;display:grid;place-items:center;padding:16px;z-index:20}
.md{position:relative;max-width:420px;width:100%;max-height:90%;overflow:auto}.md h3{margin-bottom:14px;font-size:20px}
#toast{position:fixed;top:calc(14px + env(safe-area-inset-top,0px));right:14px;background:var(--ink);color:var(--bg);padding:11px 16px;border-radius:12px;max-width:340px;font-size:14px;opacity:0;transform:translateY(-10px);transition:.2s;pointer-events:none;z-index:30}
#toast.show{opacity:1;transform:none}#toast.bad{background:var(--red);color:#fff}
nav .on{box-shadow:inset 3px 0 0 var(--acc)}
.voice{display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-bottom:14px}.voice input{max-width:240px;margin:0}.voice p{margin:0;color:var(--mut);font-size:13px}
.mic{width:46px;height:46px;border-radius:14px;background:var(--acc);font-size:20px;box-shadow:0 8px 18px #0a9f7840}.mic:active{transform:scale(.94)}
.cv{max-width:380px;aspect-ratio:1.6;border-radius:20px;padding:22px;color:#eafff6;background:radial-gradient(300px 160px at 100% 0,#3cd3a855,transparent),linear-gradient(135deg,#0a9f78,#0f2f25 75%);display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 18px 40px #0a9f7840;margin-bottom:14px}
.cv.off{background:linear-gradient(135deg,#55635d,#26302c);box-shadow:none}.cv .num{font:600 clamp(17px,3.4vw,22px) 'Bricolage Grotesque',sans-serif;letter-spacing:.12em}.cv .rt span{color:#c9efe1}
@media(min-width:781px){.card:hover{transform:translateY(-2px);box-shadow:0 10px 26px #0a1f1816}}
@media(max-width:780px){nav{overflow-x:auto}aside>button.th span{display:none}
.auth{grid-template-columns:1fr}.app{grid-template-columns:1fr}
aside{position:fixed;bottom:0;left:0;right:0;top:auto;height:auto;flex-direction:row;padding:6px 6px calc(6px + env(safe-area-inset-bottom,0px));border:0;border-top:1px solid var(--line);z-index:10}
aside .logo,aside>button.gd span{display:none}aside>button.gd{width:auto;padding:10px}
nav{flex-direction:row;justify-content:space-around}nav button{flex-direction:column;gap:0;padding:6px 4px;font-size:11px;width:auto}
main{padding-bottom:96px}}
`;

const FONTS = 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;800&family=Onest:wght@400;500;600&display=swap';
function useStyles() {
  useEffect(() => {
    const s = document.createElement('style'); s.textContent = CSS; document.head.appendChild(s);
    const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = FONTS; document.head.appendChild(l);
    return () => { s.remove(); l.remove(); };
  }, []);
}

// ===== BOSHLANG'ICH MA'LUMOTLAR =====
const DEF = () => ({linked:true,theme:'',ci:{type:'Humo',num:'9860 1234 5678 4321',exp:'12/28',holder:'SARDOR ALIMOV'},tab:'home',card:4850000,cash:650000,premium:false,q:'',hp:false,rf:'all',txf:'all',modal:null,
tx:[{id:1,date:'2026-09-26 14:20',desc:'Korzinka Supermarket',cat:'Oziq-ovqat',src:'Humo Card',amount:-120000},{id:2,date:'2026-09-26 10:15',desc:'Yandex Go Taksi',cat:'Transport',src:'Humo Card',amount:-25000},{id:3,date:'2026-09-25 18:30',desc:'Oylik maosh',cat:'Daromad',src:'Humo Card',amount:3500000},{id:4,date:'2026-09-24 12:00',desc:'Tushlik (Osh markazi)',cat:'Oziq-ovqat',src:'Naqd Pul',amount:-35000},{id:5,date:'2026-09-23 16:45',desc:'Paynet mobil aloqa',cat:'Aloqa',src:'Uzcard',amount:-50000}],
goals:[{id:1,name:'Yangi MacBook Pro',target:20000000,saved:13000000},{id:2,name:'Sayohat (Dubay)',target:10000000,saved:3200000},{id:3,name:'Favqulodda fond',target:5000000,saved:4500000}],
jobs:[{id:1,title:'Senior React & Node dasturchi',co:'TechStart LLC',sal:18000000,vip:1,type:'To\'liq stavka',tags:['React','Node.js','TypeScript'],addr:'IT Park, Yunusobod 4, Toshkent'},{id:2,title:'SMM & kontent menejer',co:'Digital Agency UZ',sal:5500000,type:'Yarim stavka',tags:['Instagram','CapCut'],addr:'Registon ko\'chasi 14, Samarqand'},{id:3,title:'Lead UI/UX dizayner',co:'FinTech Studio',sal:15000000,type:'To\'liq stavka',tags:['Figma','Design System'],addr:'Oybek metrosi, Toshkent'},{id:4,title:'Bosh moliyaviy konsultant',co:'Capital Advisory',sal:22000000,vip:1,type:'To\'liq stavka',tags:['Excel','Audit'],addr:'Tashkent City, Toshkent'},{id:5,title:'Junior Python backend',co:'DataSoft',sal:6000000,type:'Masofaviy',tags:['Python','Django','SQL'],addr:'Remote'}],
rests:[{id:1,name:'Osh Markazi Chilonzor',cat:'Milliy taomlar',price:30000,tag:'Sifatli',dist:'0.8 km',desc:'Osh, shashlik va somsa setlari. Talabalarga 10% chegirma.',addr:'Chilonzor Qatortol 12'},{id:2,name:'Evos Fast Food',cat:'Fast food',price:28000,tag:'Arzon',dist:'1.2 km',desc:'Lavash, burger va kombi menyular.',addr:'Amir Temur ko\'chasi 45'},{id:3,name:'Sulton Milliy Taomlar',cat:'Milliy taomlar',price:22000,tag:'Arzon',dist:'0.5 km',desc:'Lag\'mon va sho\'rva. 12:00–14:00 aksiya.',addr:'Yakkasaroy 18'},{id:4,name:'Safia Bakery & Cafe',cat:'Kafe',price:65000,tag:'Qimmat',dist:'2.1 km',desc:'Kofe, shirinliklar va premium nonushta.',addr:'Mirabad ko\'chasi 8'}]});

// ===== ILOVA =====

const fmt = n => Math.round(n).toLocaleString('en-US').replace(/,/g, ' ');
const now = () => new Date().toISOString().slice(0, 16).replace('T', ' ');
const ls = {
  get: k => { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  del: k => { try { localStorage.removeItem(k); } catch {} }
};
const addTx = (n, desc, cat, src, amount) => {
  n.tx.unshift({ id: Date.now() + Math.random(), date: now(), desc, cat, src, amount });
  n[src === 'Naqd Pul' ? 'cash' : 'card'] += amount;
};
const NAV = [['home','🏠','Bosh sahifa'],['jobs','💼','Ishlar'],['food','🍽','Restoran'],['tx','🧾','Xarajat'],['goals','🎯',"Jamg'arma"],['card','💳','Karta'],['admin','⚙️','Admin'],['me','👤','Profil']];

/* ---------- LOGIN / RO'YXAT (istalgan ma'lumot bilan kiradi) ---------- */
function Auth({ onAuth }) {
  const [reg, setReg] = useState(false);
  const submit = e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.target));
    const email = (d.e || '').trim();
    onAuth({ name: (d.n || '').trim() || email.split('@')[0] || 'Foydalanuvchi', email, phone: (d.ph || '').trim() });
  };
  return (
    <div className="auth">
      <section className="brand">
        <div className="logo">S</div>
        <h1>Pulingizni boshqaring. Ishingizni toping.</h1>
        <p>Xarajatlar, jamg'arma, vakansiyalar va arzon tushlik — hammasi bitta joyda.</p>
        <ul><li>Karta va naqd pulni bir joyda ko'ring</li><li>Ovoz bilan xarajat kiriting</li><li>Har bir hisobning o'z ma'lumotlari saqlanadi</li></ul>
      </section>
      <form className="card af" onSubmit={submit} noValidate>
        <div className="seg">
          <button type="button" className={reg ? '' : 'on'} onClick={() => setReg(false)}>Kirish</button>
          <button type="button" className={reg ? 'on' : ''} onClick={() => setReg(true)}>Ro'yxatdan o'tish</button>
        </div>
        {reg && <><label>Ism<input name="n" placeholder="Sardor Alimov" /></label><label>Telefon<input name="ph" placeholder="+998 90 123 45 67" /></label></>}
        <label>Email<input name="e" placeholder="siz@mail.uz" /></label>
        <label>Parol<input name="p" type="password" placeholder="••••••" /></label>
        <button className="btn" style={{ width: '100%' }}>{reg ? "Ro'yxatdan o'tish va kirish" : 'Kirish'}</button>
      </form>
    </div>
  );
}

/* ---------- KICHIK KOMPONENTLAR ---------- */
const Hd = ({ t, p, children }) => <div className="hd"><div><h2>{t}</h2>{p && <p>{p}</p>}</div>{children}</div>;
const TxRow = ({ t, onDel }) => (
  <div className="item"><div><b>{t.desc}</b><p>{t.date} · {t.cat} · {t.src}</p></div>
    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
      <span className={'amt ' + (t.amount > 0 ? 'pos' : '')}>{t.amount > 0 ? '+' : ''}{fmt(t.amount)}</span>
      {onDel && <button title="O'chirish" onClick={onDel}>🗑</button>}
    </div></div>
);
const GoalRow = ({ g, onDep }) => {
  const p = Math.min(100, Math.round(g.saved / g.target * 100));
  return (
    <div className="row"><div className="rt"><b>{g.name}</b><span>{p}%</span></div>
      <div className="bar"><i style={{ width: p + '%' }} /></div>
      <div className="rt"><span>{fmt(g.saved)} / {fmt(g.target)} UZS</span>{onDep && <button className="btn alt sm" onClick={onDep}>+500 000 kartadan</button>}</div></div>
  );
};

/* ---------- SAHIFALAR ---------- */
function Home({ S, up, toast, setModal, user }) {
  const [vt, setVt] = useState('');
  const spent = S.tx.filter(t => t.amount < 0).reduce((s, t) => s - t.amount, 0);
  const st = spent <= 1500000 ? ['Tejamkor', ''] : spent < 5000000 ? ["Me'yorida", 'g'] : ["Ko'p xarajat", 'r'];
  const cats = {}; S.tx.filter(t => t.amount < 0).forEach(t => cats[t.cat] = (cats[t.cat] || 0) - t.amount);
  const voice = t => {
    t = t.trim(); if (!t) return;
    const n = +(t.match(/\d+/g) || ['15000']).join('');
    up(x => addTx(x, t.length > 35 ? t.slice(0, 35) + '…' : t, 'Ovozli kiritish', 'Humo Card', -n));
    toast('Ovozli xarajat: ' + fmt(n) + ' UZS'); setVt('');
  };
  const mic = () => {
    const R = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!R) return toast("Brauzer ovozni qo'llamaydi — matn yozing", 1);
    const r = new R(); r.lang = 'uz-UZ'; r.onresult = e => voice(e.results[0][0].transcript);
    r.onerror = () => toast("Ovozni tanib bo'lmadi", 1); r.start(); toast('Tinglanmoqda…');
  };
  return (<>
    <Hd t={'Salom, ' + user.name} p="Bugungi moliyaviy holatingiz"><button className="btn" onClick={() => setModal('tx')}>+ Operatsiya</button></Hd>
    <form className="card voice" onSubmit={e => { e.preventDefault(); voice(vt); }}>
      <button type="button" className="mic" onClick={mic} aria-label="Ovoz">🎤</button>
      <div style={{ flex: 1, minWidth: 180 }}><b>Ovozli xarajat</b><p>Ayting yoki yozing: «Do'kondan 15000 ga fanta oldim»</p></div>
      <input value={vt} onChange={e => setVt(e.target.value)} placeholder="Matn…" /><button className="btn sm">Kiritish</button>
    </form>
    <div className="hero"><div><small>Umumiy balans</small><div className="big">{fmt(S.card + S.cash)} UZS</div><small>Karta {fmt(S.card)} · Naqd {fmt(S.cash)}</small></div>
      <button className="btn alt" onClick={() => setModal('cash')}>+ Naqd pul</button></div>
    <div className="g3">
      <div className="card stat"><span>Jami chiqim</span><b>{fmt(spent)} UZS</b><span className={'chip ' + st[1]} style={{ marginTop: 8 }}>{st[0]}</span></div>
      <div className="card stat"><span>Jamg'arma maqsadlari</span><b>{S.goals.length} ta</b><span>{fmt(S.goals.reduce((a, g) => a + g.saved, 0))} UZS yig'ilgan</span></div>
      <div className="card stat"><span>Obuna</span><b>{S.premium ? 'VIP faol' : 'Oddiy'}</b><span>{S.premium ? '-10% restoranlarda' : 'VIP: 49 000 UZS/oy'}</span></div>
    </div>
    <div className="g2">
      <div className="card"><h3>Xarajat kategoriyalari</h3>
        {Object.entries(cats).sort((a, b) => b[1] - a[1]).map(([k, v]) => (
          <div className="row" key={k}><div className="rt"><b>{k}</b><span>{fmt(v)} UZS · {Math.round(v / (spent || 1) * 100)}%</span></div><div className="bar"><i style={{ width: v / (spent || 1) * 100 + '%' }} /></div></div>))}
      </div>
      <div className="card"><h3>Jamg'armalar</h3>{S.goals.map(g => <GoalRow key={g.id} g={g} />)}</div>
    </div>
    <div className="card" style={{ marginTop: 14 }}><h3>Oxirgi operatsiyalar</h3>{S.tx.slice(0, 5).map(t => <TxRow key={t.id} t={t} />)}</div>
  </>);
}

function Jobs({ S, toast, setModal }) {
  const [q, setQ] = useState(''), [hp, setHp] = useState(false);
  const list = S.jobs.filter(j => (j.title + j.co + j.addr).toLowerCase().includes(q.toLowerCase()) && (!hp || j.sal >= 10000000)).sort((a, b) => b.sal - a.sal);
  const apply = j => { if (j.vip && !S.premium) { toast('Bu VIP vakansiya — Premium kerak', 1); return setModal('prem'); } toast('Rezyume yuborildi: ' + j.title); };
  return (<>
    <Hd t="Ishlar" p="Eng yuqori maoshli vakansiyalar" />
    <div className="tools"><input value={q} onChange={e => setQ(e.target.value)} placeholder="Lavozim, kompaniya yoki shahar" />
      <button className={'btn ' + (hp ? '' : 'alt')} onClick={() => setHp(!hp)}>Maosh 10 mln+</button></div>
    <div className="card">{list.length ? list.map(j => (
      <div className="job" key={j.id}>
        <div><b>{j.title}</b> {j.sal >= 10000000 && <span className="chip g">Yuqori maosh</span>}{j.vip ? <span className="chip p">👑 VIP</span> : null}
          <p style={{ margin: '2px 0', color: 'var(--mut)', fontSize: 14 }}>{j.co} · {j.type} · {j.addr}</p>
          {j.tags.map(t => <span className="tag" key={t}>{t}</span>)}</div>
        <div style={{ textAlign: 'right' }}><div className="amt pos">{fmt(j.sal)} UZS</div>
          <button className={'btn sm ' + (j.vip && !S.premium ? 'gold' : '')} style={{ marginTop: 8 }} onClick={() => apply(j)}>{j.vip && !S.premium ? 'VIP bilan' : 'Topshirish'}</button></div>
      </div>)) : <p>Vakansiya topilmadi.</p>}</div>
  </>);
}

function Food({ S, up, toast }) {
  const [q, setQ] = useState(''), [f, setF] = useState('all');
  const order = r => {
    const p = S.premium ? Math.round(r.price * .9) : r.price;
    if (S.card < p) return toast("Kartada mablag' yetarli emas", 1);
    up(x => addTx(x, 'Buyurtma: ' + r.name, 'Oziq-ovqat', 'Humo Card', -p));
    toast(`${r.name}: ${fmt(p)} UZS${S.premium ? ' (VIP -10%)' : ''}`);
  };
  return (<>
    <Hd t="Restoranlar" p={'Hamyonbop tushlik' + (S.premium ? ' · VIP -10%' : '')} />
    <div className="tools"><input value={q} onChange={e => setQ(e.target.value)} placeholder="Restoran yoki manzil" />
      <select value={f} onChange={e => setF(e.target.value)}>{['all', 'Arzon', 'Sifatli', 'Qimmat'].map(o => <option key={o} value={o}>{o === 'all' ? 'Barcha narxlar' : o}</option>)}</select></div>
    <div className="g2">{S.rests.filter(r => (r.name + r.cat + r.addr).toLowerCase().includes(q.toLowerCase()) && (f === 'all' || r.tag === f)).map(r => (
      <div className="card" key={r.id}>
        <div className="rt"><b style={{ fontSize: 16 }}>{r.name}</b><span className={'chip ' + (r.tag === 'Qimmat' ? 'p' : '')}>{r.tag}</span></div>
        <p style={{ color: 'var(--mut)', margin: '4px 0', fontSize: 14 }}>{r.dist} · {r.cat} · {r.addr}</p>
        <p style={{ margin: '6px 0 12px' }}>{r.desc}</p>
        <div className="rt"><b className="pos">~{fmt(r.price)} UZS</b><button className="btn sm" onClick={() => order(r)}>Buyurtma</button></div>
      </div>))}</div>
  </>);
}

function Tx({ S, up, toast, setModal }) {
  const [q, setQ] = useState(''), [f, setF] = useState('all');
  const del = t => { up(x => { x[t.src === 'Naqd Pul' ? 'cash' : 'card'] -= t.amount; x.tx = x.tx.filter(y => y.id !== t.id); }); toast("Operatsiya o'chirildi"); };
  const list = S.tx.filter(t => (t.desc + t.cat).toLowerCase().includes(q.toLowerCase()) && (f === 'all' || (f === 'cash') === (t.src === 'Naqd Pul')));
  return (<>
    <Hd t="Xarajatlar" p="Barcha operatsiyalar tarixi"><button className="btn" onClick={() => setModal('tx')}>+ Yangi</button></Hd>
    <div className="tools"><input value={q} onChange={e => setQ(e.target.value)} placeholder="Qidirish" />
      <select value={f} onChange={e => setF(e.target.value)}><option value="all">Barcha manbalar</option><option value="card">Karta</option><option value="cash">Naqd</option></select></div>
    <div className="card">{list.length ? list.map(t => <TxRow key={t.id} t={t} onDel={() => del(t)} />) : <p>Hech narsa topilmadi.</p>}</div>
  </>);
}

function Goals({ S, up, toast, setModal }) {
  const dep = g => {
    if (S.card < 500000) return toast("Kartada mablag' yetarli emas", 1);
    up(x => { const y = x.goals.find(z => z.id === g.id); y.saved = Math.min(y.target, y.saved + 500000); addTx(x, "Jamg'arma to'lovi", "Jamg'arma", 'Humo Card', -500000); });
    toast("500 000 UZS jamg'armaga o'tkazildi");
  };
  return (<>
    <Hd t="Jamg'arma" p="Maqsadlaringizga qadam-baqadam"><button className="btn" onClick={() => setModal('goal')}>+ Yangi maqsad</button></Hd>
    <div className="g2">{S.goals.map(g => <div className="card" key={g.id}><GoalRow g={g} onDep={() => dep(g)} /></div>)}</div>
  </>);
}

function CardPage({ S, up, toast }) {
  const c = S.ci;
  const save = e => { e.preventDefault(); const d = Object.fromEntries(new FormData(e.target)); up(x => { x.ci = { type: d.ty, num: d.n, exp: d.x, holder: d.h }; x.linked = true; }); toast('Karta saqlandi'); };
  return (<>
    <Hd t="Karta" p="Bank kartangizni ulang yoki yangilang" />
    <div className="g2">
      <div>
        <div className={'cv ' + (S.linked ? '' : 'off')}><div className="rt"><b>{c.type}</b><span>💳</span></div>
          <div className="num">{S.linked ? c.num : '•••• •••• •••• ••••'}</div><div className="rt"><span>{c.holder}</span><span>{c.exp}</span></div></div>
        <p style={{ color: 'var(--mut)' }}>Balans: <b style={{ color: 'var(--ink)' }}>{S.linked ? fmt(S.card) : '0'} UZS</b></p>
        <button className={'btn ' + (S.linked ? 'alt' : '')} onClick={() => { up(x => { x.linked = !x.linked; }); toast(S.linked ? 'Karta uzildi' : 'Karta ulandi'); }}>{S.linked ? 'Kartani uzish' : 'Kartani ulash'}</button>
      </div>
      <form className="card" onSubmit={save} key={c.num + c.exp + c.holder + c.type}>
        <h3 style={{ marginBottom: 12 }}>Karta ma'lumotlari</h3>
        <label>Turi<select name="ty" defaultValue={c.type}>{['Humo', 'Uzcard', 'Visa'].map(o => <option key={o}>{o}</option>)}</select></label>
        <label>Raqam<input name="n" defaultValue={c.num} /></label>
        <div className="two"><label>Muddati<input name="x" defaultValue={c.exp} /></label><label>Egasi<input name="h" defaultValue={c.holder} /></label></div>
        <button className="btn">Saqlash</button>
      </form>
    </div>
  </>);
}

function Admin({ S, up, toast }) {
  const addJob = e => { e.preventDefault(); const d = Object.fromEntries(new FormData(e.target));
    up(x => { x.jobs.unshift({ id: Date.now(), title: d.t, co: d.c, sal: +d.s, vip: d.v ? 1 : 0, type: "To'liq stavka", tags: ['Yangi'], addr: d.a || 'Toshkent' }); }); e.target.reset(); toast("Vakansiya qo'shildi"); };
  const addRest = e => { e.preventDefault(); const d = Object.fromEntries(new FormData(e.target));
    up(x => { x.rests.unshift({ id: Date.now(), name: d.n, cat: 'Restoran', price: +d.p, tag: d.g, dist: '1.0 km', desc: 'Yangi restoran', addr: d.a || 'Toshkent' }); }); e.target.reset(); toast("Restoran qo'shildi"); };
  return (<>
    <Hd t="Admin panel" p="Vakansiya va restoranlarni boshqaring" />
    <div className="g2">
      <div className="card"><h3 style={{ marginBottom: 12 }}>Vakansiyalar ({S.jobs.length})</h3>
        <form className="two" onSubmit={addJob}><label>Lavozim<input name="t" required /></label><label>Kompaniya<input name="c" required /></label>
          <label>Maosh (UZS)<input name="s" type="number" required /></label><label>Manzil<input name="a" /></label>
          <label style={{ display: 'flex', gap: 6, alignItems: 'center' }}><input name="v" type="checkbox" style={{ width: 'auto', margin: 0 }} /> VIP</label><button className="btn sm">+ Qo'shish</button></form>
        {S.jobs.map(j => <div className="item" key={j.id}><div><b>{j.title}</b><p>{j.co} · {fmt(j.sal)} UZS{j.vip ? ' · VIP' : ''}</p></div>
          <button title="O'chirish" onClick={() => { up(x => { x.jobs = x.jobs.filter(y => y.id !== j.id); }); toast("Vakansiya o'chirildi"); }}>🗑</button></div>)}
      </div>
      <div className="card"><h3 style={{ marginBottom: 12 }}>Restoranlar ({S.rests.length})</h3>
        <form className="two" onSubmit={addRest}><label>Nomi<input name="n" required /></label><label>O'rtacha narx<input name="p" type="number" required /></label>
          <label>Narx turi<select name="g"><option>Arzon</option><option>Sifatli</option><option>Qimmat</option></select></label><label>Manzil<input name="a" /></label>
          <button className="btn sm">+ Qo'shish</button></form>
        {S.rests.map(r => <div className="item" key={r.id}><div><b>{r.name}</b><p>{fmt(r.price)} UZS · {r.tag}</p></div>
          <button title="O'chirish" onClick={() => { up(x => { x.rests = x.rests.filter(y => y.id !== r.id); }); toast("Restoran o'chirildi"); }}>🗑</button></div>)}
      </div>
    </div>
  </>);
}

function Me({ user, setUser, onLogout, up, toast }) {
  const save = e => { e.preventDefault(); const d = Object.fromEntries(new FormData(e.target));
    const u = { name: d.n.trim() || user.name, phone: d.ph, email: d.e }; ls.set('startapp:session', u); setUser(u); toast('Profil yangilandi'); };
  return (<>
    <Hd t="Profil" />
    <div className="card" style={{ maxWidth: 480 }}>
      <form onSubmit={save}>
        <label>Ism<input name="n" defaultValue={user.name} /></label>
        <label>Telefon<input name="ph" defaultValue={user.phone} placeholder="+998 90 123 45 67" /></label>
        <label>Email<input name="e" defaultValue={user.email} /></label>
        <button className="btn">Saqlash</button>
      </form>
      <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
        <button className="btn alt" onClick={() => { up(() => {}); up(x => Object.assign(x, DEF())); toast("Ma'lumotlar tiklandi"); }}>Ma'lumotlarni tiklash</button>
        <button className="btn alt" style={{ color: 'var(--red)' }} onClick={onLogout}>Chiqish</button>
      </div>
    </div>
  </>);
}

/* ---------- MODALLAR ---------- */
function Modal({ modal, setModal, S, up, toast }) {
  if (!modal) return null;
  const close = () => setModal(null);
  const fd = e => { e.preventDefault(); return Object.fromEntries(new FormData(e.target)); };
  let body = null;
  if (modal === 'tx') body = (<><h3>Yangi operatsiya</h3>
    <form onSubmit={e => { const d = fd(e); up(x => addTx(x, d.d, d.c, d.s, Math.abs(+d.a) * (d.k === '+' ? 1 : -1))); toast("Operatsiya qo'shildi"); close(); }}>
      <label>Tavsif<input name="d" required /></label><label>Summa (UZS)<input name="a" type="number" min="1" required /></label>
      <div className="two"><label>Turi<select name="k"><option value="-">Xarajat</option><option value="+">Daromad</option></select></label>
        <label>Kategoriya<select name="c"><option>Oziq-ovqat</option><option>Transport</option><option>Ko'ngilochar</option><option>Aloqa</option><option>Daromad</option></select></label></div>
      <label>Manba<select name="s"><option>Humo Card</option><option>Uzcard</option><option>Naqd Pul</option></select></label>
      <button className="btn" style={{ width: '100%' }}>Saqlash</button></form></>);
  if (modal === 'cash') body = (<><h3>Naqd pul qo'shish</h3>
    <form onSubmit={e => { const d = fd(e); up(x => { x.cash += +d.a; }); toast(fmt(+d.a) + " UZS naqd pul qo'shildi"); close(); }}>
      <label>Summa (UZS)<input name="a" type="number" min="1" required /></label><button className="btn" style={{ width: '100%' }}>Qo'shish</button></form></>);
  if (modal === 'goal') body = (<><h3>Yangi maqsad</h3>
    <form onSubmit={e => { const d = fd(e); up(x => { x.goals.push({ id: Date.now(), name: d.n, target: +d.t, saved: 0 }); }); toast('Yangi maqsad yaratildi'); close(); }}>
      <label>Nomi<input name="n" required /></label><label>Summa (UZS)<input name="t" type="number" min="1" required /></label><button className="btn" style={{ width: '100%' }}>Yaratish</button></form></>);
  if (modal === 'prem') body = (<><h3>👑 Premium VIP</h3>
    <p style={{ color: 'var(--mut)' }}>VIP vakansiyalar, restoranlarda -10% chegirma va ustuvor yordam.</p>
    <p><b style={{ fontSize: 24 }}>49 000 UZS</b> <span style={{ color: 'var(--mut)' }}>/ oy</span></p>
    <button className="btn gold" style={{ width: '100%' }} onClick={() => {
      if (S.card < 49000) return toast("Kartada mablag' yetarli emas", 1);
      up(x => { addTx(x, 'StartApp Premium VIP', 'Xizmatlar', 'Humo Card', -49000); x.premium = true; }); toast('Premium VIP faollashtirildi!'); close();
    }}>{S.premium ? 'Obunani yangilash' : "Kartadan to'lash"}</button></>);
  return <div className="ov" onClick={e => e.target === e.currentTarget && close()}><div className="card md" role="dialog"><button className="x" onClick={close} aria-label="Yopish">✕</button>{body}</div></div>;
}

/* ---------- ASOSIY ---------- */
function Main({ user, setUser, onLogout }) {
  const key = 'startapp:data:' + (user.email || user.name).toLowerCase();
  const [S, setS] = useState(() => ({ ...DEF(), ...ls.get(key) }));
  const [tab, setTab] = useState('home'), [modal, setModal] = useState(null), [tm, setTm] = useState(null);
  const up = fn => setS(s => { const n = structuredClone(s); fn(n); return n; });
  const toast = (m, bad) => { setTm({ m, bad }); clearTimeout(toast.t); toast.t = setTimeout(() => setTm(null), 3200); };
  useEffect(() => { ls.set(key, S); document.documentElement.dataset.theme = S.theme || ''; }, [S]);
  const p = { S, up, toast, setModal, user, setUser, onLogout };
  const V = { home: Home, jobs: Jobs, food: Food, tx: Tx, goals: Goals, card: CardPage, admin: Admin, me: Me }[tab];
  const toggleTheme = () => up(x => { x.theme = (document.documentElement.dataset.theme === 'dark' || (!x.theme && matchMedia('(prefers-color-scheme:dark)').matches)) ? 'light' : 'dark'; });
  return (<>
    <div className="app">
      <aside>
        <div className="logo">S</div>
        <nav>{NAV.map(([id, ic, lb]) => <button key={id} className={tab === id ? 'on' : ''} onClick={() => setTab(id)}><span>{ic}</span><span>{lb}</span></button>)}</nav>
        <button className="th" onClick={toggleTheme}>🌓 <span>Mavzu</span></button>
        <button className="gd" onClick={() => setModal('prem')}>👑 <span>{S.premium ? 'VIP faol' : 'Premium VIP'}</span></button>
      </aside>
      <main><V {...p} /></main>
    </div>
    <Modal modal={modal} setModal={setModal} S={S} up={up} toast={toast} />
    <div id="toast" className={tm ? 'show' + (tm.bad ? ' bad' : '') : ''}>{tm?.m}</div>
  </>);
}

export default function App() {
  useStyles();
  const [user, setUser] = useState(() => ls.get('startapp:session'));
  if (!user) return <Auth onAuth={u => { ls.set('startapp:session', u); setUser(u); }} />;
  return <Main key={user.email || user.name} user={user} setUser={setUser} onLogout={() => { ls.del('startapp:session'); setUser(null); }} />;
}