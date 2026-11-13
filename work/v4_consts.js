const TODAY = pd('2026-10-19');
const ELIG_LBL = {elig:'Eligible', newelig:'Newly eligible', new:'New store', excl:'Excluded'};
const ELIG_CLS = {elig:'dr-badge dr-badge--ok', newelig:'dr-badge dr-badge--brand', new:'dr-badge dr-badge--brand', excl:'dr-badge dr-badge--neutral'};
const STORE_MASTER = [
  [1001,'Heathrow T5','Heathrow','air','London airports',1,'elig'],
  [1002,'Heathrow T3','Heathrow','air','London airports',1,'elig'],
  [1003,'Heathrow T2','Heathrow','air','London airports',1,'elig'],
  [1004,'Heathrow T4','Heathrow','land','London airports',0,'excl','Terminal refurbishment until Jan 2027'],
  [1011,'Gatwick North','Gatwick','air','London airports',1,'elig'],
  [1012,'Gatwick South','Gatwick','land','London airports',1,'elig'],
  [1013,'Gatwick South Pier 3','Gatwick','air','London airports',0,'newelig','Confectionery bay extended to 2.4 m in June'],
  [1021,'Stansted Departures','Stansted','air','London airports',1,'elig'],
  [1022,'Stansted Arrivals','Stansted','land','London airports',1,'excl','Bay cut to 0.9 m in refit · below the 1.5 m minimum'],
  [1031,'Luton Airside','Luton','air','London airports',1,'elig'],
  [1041,'Manchester T1','Manchester Airport','air','Regional airports',1,'elig'],
  [1042,'Manchester T2','Manchester Airport','land','Regional airports',1,'elig'],
  [1043,'Manchester T3','Manchester Airport','air','Regional airports',0,'new','Opened 14 Mar 2026 · forecast from Manchester T1'],
  [1051,'Birmingham Airport','Birmingham Airport','air','Regional airports',1,'elig'],
  [1061,'Bristol Airport','Bristol Airport','air','Regional airports',1,'elig'],
  [1071,'Edinburgh Airport','Edinburgh Airport','air','Scotland',1,'elig'],
  [1072,'Glasgow Airport','Glasgow Airport','air','Scotland',0,'newelig','Sales density now above the £380 / sq ft threshold'],
  [1081,'Newcastle Airport','Newcastle Airport','land','Regional airports',1,'excl','Franchise unit · partner sets promotional pricing'],
  [1091,'Belfast International','Belfast International','air','Northern Ireland',0,'excl','Separate NI price file · not supported for this event'],
  [2001,"London King's Cross",'Network Rail','rail','London rail',1,'elig'],
  [2002,'London St Pancras','HS1','rail','London rail',1,'elig'],
  [2003,'London Paddington','Network Rail','rail','London rail',1,'elig'],
  [2004,'London Victoria','Network Rail','rail','London rail',1,'elig'],
  [2005,'London Waterloo','Network Rail','rail','London rail',1,'elig'],
  [2006,'London Liverpool Street','Network Rail','rail','London rail',1,'elig'],
  [2007,'London Euston','Network Rail','rail','London rail',1,'excl','Unit closes 30 Nov 2026 for station works'],
  [2008,'London Bridge','Network Rail','rail','London rail',0,'new','Opened 2 Jun 2026 · forecast from London Waterloo'],
  [2011,'Birmingham New St','Network Rail','rail','Midlands',1,'elig'],
  [2012,'Birmingham Moor St','Train operator','rail','Midlands',0,'newelig','Meets the footfall rule since the May timetable change'],
  [2021,'Manchester Piccadilly','Network Rail','rail','North',1,'elig'],
  [2022,'Leeds','Network Rail','rail','North',1,'elig'],
  [2023,'York','Train operator','rail','North',1,'elig'],
  [2024,'Liverpool Lime Street','Network Rail','rail','North',1,'elig'],
  [2025,'Sheffield','Train operator','rail','North',0,'excl','Kiosk format · no seasonal bay'],
  [2031,'Edinburgh Waverley','Network Rail','rail','Scotland',1,'elig'],
  [2032,'Glasgow Central','Network Rail','rail','Scotland',1,'elig'],
  [2033,'Glasgow Queen Street','Network Rail','rail','Scotland',0,'new','Opened 8 Sep 2026 · forecast from Glasgow Central'],
  [2041,'Reading','Network Rail','rail','South & Wales',1,'elig'],
  [2042,'Bristol Temple Meads','Network Rail','rail','South & Wales',1,'elig'],
  [2043,'Cardiff Central','Train operator','rail','South & Wales',1,'elig']
].map(([no,name,prop,fmt,region,ly,rec,reason])=>({no:String(no), name, prop, fmt, region, ly:!!ly, rec, reason: reason || 'Took part last year · meets ranging rules'}));
const REGION_LIST = [...new Set(STORE_MASTER.map(x=>x.region))];
const SKU_LBL = {elig:'Eligible', limited:'Limited ranging', new:'New line', add:'Added', excl:'Excluded'};
const SKU_CLS = {elig:'dr-badge dr-badge--ok', limited:'dr-badge dr-badge--warn', new:'dr-badge dr-badge--brand', add:'dr-badge dr-badge--brand', excl:'dr-badge dr-badge--neutral'};
const RULE_LBL = {all:'All formats', air:'Airside only', rail:'Rail only'};
const SKU_MASTER = [
  ['HW26-101','Pumpkin Fudge 150g','Confectionery','Seasonal candy','Specialty Candy','Seasonal',31,'all','elig','Ranged chain-wide last year · 91% sell-through',4.99,1.80,'hw'],
  ['HW26-114','Spooky Gummy Mix 200g','Confectionery','Seasonal candy','Specialty Candy','Seasonal',31,'all','elig','Top seller last year · 94% sell-through',3.99,1.30,'hw'],
  ['HW26-122',"Witch's Brew Lollipops 6pk",'Confectionery','Seasonal candy','Specialty Candy','Seasonal',24,'all','elig','Extended to all formats · rail sold out early last year',2.99,0.95,'hw'],
  ['HW26-138','Ghost Marshmallows 120g','Confectionery','Seasonal candy','Specialty Candy','Seasonal',18,'air','limited','Airside only · 64% sell-through in rail last year',3.49,1.10,'hw'],
  ['HW26-145','Chocolate Eyeballs 90g','Confectionery','Seasonal candy','Specialty Candy','Seasonal',31,'all','elig','Ranged chain-wide last year · 89% sell-through',2.49,0.80,'hw'],
  ['HW26-152','Trick-or-Treat Share Bag 500g','Confectionery','Seasonal candy','Specialty Candy','Seasonal',22,'all','elig','Family sharing format · strongest in rail',7.99,3.20,'hw'],
  ['HW26-160','Glow Skull Lolly 40g','Confectionery','Seasonal candy','Specialty Candy','New',0,'all','new','New line · forecast from analogue HW25-133',1.49,0.45,'hw'],
  ['HW26-171','Caramel Apple Bites 180g','Confectionery','Seasonal candy','Specialty Candy','New',0,'air','new','New line · airside trial first',3.99,1.40,'hw'],
  ['XM26-201','Chocolate Advent Calendar 250g','Confectionery','Seasonal candy','Specialty Candy','Seasonal',29,'all','elig','Ranged chain-wide last year · 97% sell-through',6.99,2.60,'xm'],
  ['XM26-214','Festive Selection Box 300g','Gifting','Boxed chocolate','Gifting','Seasonal',26,'all','elig','Gifting anchor · sold out in rail last year',8.99,3.70,'xm'],
  ['XM26-227','Gingerbread Fudge 150g','Confectionery','Seasonal candy','Specialty Candy','New',0,'all','new','New line · forecast from Pumpkin Fudge',4.99,1.85,'xm'],
  ['XM26-233','Candy Cane Tub 12pk','Confectionery','Seasonal candy','Specialty Candy','Seasonal',17,'rail','limited','Rail only · low airside velocity last year',3.49,1.05,'xm'],
  ['EC-2201','Fruit Gums Share Bag 180g','Confectionery','Bagged candy','Everyday Candy','Core',33,'all','elig','Core line · event multibuy last year',2.49,0.85,null],
  ['EC-2214','Chocolate Buttons 119g','Confectionery','Bagged candy','Everyday Candy','Core',33,'all','elig','Core line · event multibuy last year',1.99,0.70,null],
  ['EC-2230','Sour Worms 160g','Confectionery','Bagged candy','Everyday Candy','Core',29,'rail','limited','Rail only · weak airside velocity',2.29,0.75,null],
  ['EC-2248','Toffee Pennies 150g','Confectionery','Bagged candy','Everyday Candy','Discontinued',27,'all','excl','Delisting 31 Dec · no forward stock',1.79,0.60,null],
  ['GF-3102','Truffle Selection 200g','Gifting','Boxed chocolate','Gifting','Core',20,'air','limited','Airside gifting bays only',9.99,4.20,null],
  ['GF-3118','Halloween Gift Tin 250g','Gifting','Boxed chocolate','Gifting','Seasonal',14,'air','elig','Airside gifting · 87% sell-through',12.99,5.10,'hw'],
  ['GF-3125','Luxury Fudge Box 300g','Gifting','Boxed chocolate','Gifting','Core',0,'all','add','Added to the event range this year',14.99,6.30,null],
  ['GM-4401','Peppermint Tin 40g','Confectionery','Gum & mints','Gum & Mints','Core',33,'all','excl','Fixed-price supplier agreement · not promotable',2.49,0.70,null],
  ['GM-4410','Spearmint Gum 10pk','Confectionery','Gum & mints','Gum & Mints','Core',33,'all','excl','Event uplift under 3% last year · excluded by rule',1.49,0.45,null],
  ['GM-4422','Bat Wing Mints 35g','Confectionery','Gum & mints','Gum & Mints','Seasonal',12,'rail','elig','Rail impulse line · 90% sell-through',1.99,0.60,'hw']
].map(([id,name,cat,sub,merch,life,ly,rule,rec,reason,P,C,season],i)=>({id,name,cat,sub,merch,life,ly,rule,rec,reason,P,C,season,rate:1.6+rnd(i*5+3)*3.4}));
const PAST_X = {
  summer26:{type:'Seasonal', start:'2026-07-06', end:'2026-08-30', plan:[46900,19400,0.95], ly:[44100,18050,0.93,290]},
  easter26:{type:'Seasonal', start:'2026-03-09', end:'2026-04-12', plan:[32800,15100,0.90], ly:[29900,14200,0.86,560]},
  val26:{type:'Seasonal', start:'2026-01-19', end:'2026-02-15', plan:[12400,5320,0.92], ly:[11800,5050,0.90,150]},
  xmas25:{type:'Seasonal', start:'2025-11-03', end:'2026-01-04', plan:[84100,27900,0.97], ly:[79400,26100,0.95,140]},
  hw25:{type:'Seasonal', start:'2025-09-15', end:'2025-11-09', plan:[23900,9400,0.93], ly:[20100,8300,0.88,330]}
};
const DIWALI_STORES = ["London King's Cross",'London St Pancras','London Paddington','London Victoria','London Waterloo','London Liverpool Street','London Bridge','Birmingham New St','Birmingham Moor St'];
const PORTFOLIO = [
  {id:'hw26', name:'Halloween 2026', type:'Seasonal', scopeT:'Travel Essentials · Specialty Candy', start:'2026-10-12', end:'2026-11-23', evDay:'2026-10-31', sellEnd:'2026-11-01', life:'Active', season:'hw', postRun:'hw25', lyId:'hw25', scope:{stores:STORES, skus:ALL_SKU, why:'Outside the Halloween 2026 pilot scope'}, perf:'Units +6% · GP −2%'},
  {id:'dw26', name:'Diwali 2026', type:'Promotional', scopeT:'London & Midlands rail · Gifting', start:'2026-10-26', end:'2026-11-09', evDay:'2026-11-08', life:'Approved', season:null, postRun:'hw25', scope:{stores:DIWALI_STORES, skus:['HW26-101','HW26-152','GF-3102','GF-3125'], why:'Outside the Diwali promotion scope'}, lockedWhen:'Thu 15 Oct · 11:20'},
  {id:'bf26', name:'Black Friday 2026', type:'Promotional', scopeT:'Seasonal carry-over · Specialty Candy', start:'2026-11-16', end:'2026-12-07', evDay:'2026-11-27', life:'In review', season:'hw', postRun:'hw25', scope:{stores:STORES, skus:ALL_SKU, why:'Outside the seasonal carry-over scope'}, submittedWhen:'Fri 16 Oct · 15:05'},
  {id:'xm26', name:'Christmas 2026', type:'Seasonal', scopeT:'Travel Essentials · Gifting', start:'2026-11-16', end:'2027-01-04', evDay:'2026-12-25', sellEnd:'2026-12-27', life:'Draft', season:'xm', postRun:'xmas25', lyId:'xmas25', wzStep:3, wzDone:[1,2], savedAt:'Thu 15 Oct · 17:42', storeOvr:{'1022':{inc:true, reason:'Regional trading request', note:'Arrivals gifting bay reinstated for Christmas', when:'Thu 15 Oct · 17:30'}}},
  {id:'val27', name:"Valentine's Day 2027", type:'Seasonal', start:'2027-02-01', end:'2027-02-15', evDay:'2027-02-14', life:'Not started', season:null, postRun:'val26', lyId:'val26'},
  {id:'md27', name:"Mother's Day 2027", type:'Promotional', start:'2027-02-22', end:'2027-03-08', evDay:'2027-03-07', life:'Not started', season:null, postRun:'easter26'},
  {id:'ea27', name:'Easter 2027', type:'Seasonal', start:'2027-03-08', end:'2027-04-05', evDay:'2027-03-28', life:'Not started', season:null, postRun:'easter26', lyId:'easter26'}
].concat(PAST_RUNS.map(r=>({id:r.id, name:r.name, type:PAST_X[r.id].type, scopeT:r.scope+' · '+r.objective, start:PAST_X[r.id].start, end:PAST_X[r.id].end, life:'Completed', postRun:r.id, run:r})));
const PORT_BY = Object.fromEntries(PORTFOLIO.map(p=>[p.id,p]));
const LIFE_CLS = {'Not started':'dr-badge dr-badge--neutral', Draft:'dr-badge dr-badge--neutral', 'In review':'dr-badge dr-badge--warn', Approved:'dr-badge dr-badge--brand', Active:'dr-badge dr-badge--ok', Completed:'dr-badge dr-badge--neutral'};
const AUTH_LBL = {buyer:'Category buyer', head:'Head of trading', director:'Commercial director'};
const FLOOR_LBL = {cost:'Cost price', cost10:'Cost + 10%', cost25:'Cost + 25%'};
const FLOOR_M = {cost:1, cost10:1.1, cost25:1.25};
const FREQ_LBL = {weekly:'Weekly · Mondays', twice:'Twice weekly · Mon & Thu', phase:'At event start and clearance only'};
const REASONS_INC = ['Local event or demand driver','Stock already allocated','Regional trading request','Other'];
const REASONS_EXC = ['Refit, closure or access works','Space or stock constraint','Conflicting local promotion','Other'];
const CTX_KEYS = ['stage','start','end','runName','com','comSaved','stLock','stSel','stView','stCompare','stCell','published','decided','onConfirmed','weekRules','adopted','intv','exec','screen','planView','recView','wz','postRun','eligSub','wzTried'];
const WZ_STEPS = ['Details & objectives','Eligible stores','Eligible SKUs','Promotion mechanics','Event forecast','Pricing strategy','Review & approval'];
const evSeason = p => p.season !== undefined ? p.season : /christmas/i.test(p.name||'') ? 'xm' : /halloween/i.test(p.name||'') ? 'hw' : null;
const defaultAssign = type => Object.fromEntries(MERCH.map(m=>[m.id, type==='Clearance' ? ['PCT','BOGO50'] : m.id==='Gifting' ? ['FP','PCT'] : m.id==='Gum & Mints' ? ['FP','TWOX'] : ['FP','PCT','TWOX','BOGO50']]));
const makeWz = p => ({id:p.id, type:p.type||'Seasonal', season:evSeason(p), evDay:p.evDay||'', sellEnd:p.sellEnd||'', clr:(p.type||'Seasonal')!=='Promotional', floor:'cost10', maxDisc:50, freq:'weekly', auth:'buyer',
  storeOvr:{...(p.storeOvr||{})}, skuOvr:{...(p.skuOvr||{})}, assign:defaultAssign(p.type), switchWk:null, step:p.wzStep||1, done:(p.wzDone||[]).slice(), savedAt:p.savedAt||null,
  submitted:p.life==='In review' ? (p.submittedWhen||'earlier') : null, scope:p.scope||null,
  sf:{q:'', st:'All', fmt:'All', region:'All', group:'none', sort:'no', dir:1}, sel:{}, kf:{q:'', st:'All', merch:'All', sort:'id', dir:1}, ksel:{}, fcOpen:{'Specialty Candy':true}, fcSku:null});
const newCom = () => ({...DEFAULT_COM, mech:DEFAULT_COM.mech.slice()});
const seedCtx = p => ({
  stage: p.life==='Active' ? 'Mid-run' : (p.life==='In review' || p.life==='Approved') ? 'Plan generated' : 'Setting up',
  start:p.start, end:p.end, runName:p.name, com:newCom(), comSaved:null,
  stLock: p.life==='Approved' ? {opt:'A', com:newCom(), when:p.lockedWhen||''} : p.life==='Active' ? undefined : null,
  stSel:'A', stView:'A', stCompare:false, stCell:null, published:false, decided:{}, onConfirmed:false, weekRules:{}, adopted:null, intv:{}, exec:{},
  screen: p.life==='Active' ? 'monitor' : p.life==='Completed' ? 'post' : p.life==='Draft' ? 'wsSetup' : p.life==='Not started' ? 'wsStart' : 'overview',
  planView:'matrix', recView:'list', wz:makeWz(p), postRun:p.postRun||'hw25', eligSub:'stores', wzTried:null
});
const lifeOf = (p, c) => {
  if (p.life==='Active' || p.life==='Completed') return p.life;
  if (c && c.stLock) return 'Approved';
  if (c && c.wz && c.wz.submitted) return 'In review';
  if (p.life==='Approved') return 'In review';
  if (p.life==='Not started' && !(c && c.wz && c.wz.savedAt)) return 'Not started';
  return 'Draft';
};
const portfolioOf = st => PORTFOLIO.concat(st.extra||[]);
function eligModel(wz){
  const sc = wz.scope;
  const stores = STORE_MASTER.map(st=>{
    const inScope = !sc || sc.stores.includes(st.name);
    const rec = inScope ? st.rec : 'excl', reason = inScope ? st.reason : sc.why;
    const o = wz.storeOvr[st.no] || null, recInc = rec!=='excl';
    return {...st, rec, reason, recInc, inc: o ? o.inc : recInc, ovr:o};
  });
  const incStores = stores.filter(x=>x.inc);
  const skus = SKU_MASTER.map(k=>{
    let rec = k.rec, reason = k.reason;
    if (sc){ if (!sc.skus.includes(k.id)){ rec = 'excl'; reason = sc.why; } else if (rec==='limited'){ rec = 'elig'; reason = 'Ranged to every store in scope'; } }
    else if (k.season && k.season!==wz.season && rec!=='excl'){ rec = 'excl'; reason = (k.season==='hw'?'Halloween':'Christmas')+' seasonal line · out of season'; }
    const o = wz.skuOvr[k.id] || null, recInc = rec!=='excl', inc = o ? o.inc : recInc, rule = sc ? 'all' : k.rule;
    const st = incStores.filter(x=>rule==='all' || (rule==='air' ? x.fmt==='air' : x.fmt==='rail'));
    return {...k, rec, reason, recInc, inc, ovr:o, rule, stores: inc ? st : [], recCount: st.length};
  });
  const incSkus = skus.filter(k=>k.inc);
  return {stores, incStores, skus, incSkus, combos: incSkus.reduce((t,k)=>t+k.stores.length,0)};
}
function fcModel(wz, em, start, end, permitted){
  const a = pd(start), b = pd(end), W = Math.max(2, Math.min(10, Math.round((b-a)/WK) || 2));
  const evD = wz.evDay ? pd(wz.evDay) : addD(a, Math.round(W*3.5));
  const sellEnd = wz.type==='Clearance' ? addD(a,-1) : (wz.clr && wz.sellEnd ? pd(wz.sellEnd) : b);
  const wkStart = k => addD(a, k*7);
  const phase = k => wz.type==='Clearance' ? 'clr' : (wz.clr && wkStart(k) > sellEnd) ? 'clr' : 'sell';
  const maxD = (+wz.maxDisc||0)/100;
  const seqFor = merch => { const ms = (wz.assign[merch]||[]).filter(m=>m!=='FP' && permitted.includes(m)).sort((x,y)=>MECH[x].d-MECH[y].d || MECH[x].lift-MECH[y].lift);
    return Array.from({length:W},(_,k)=>{ if (!ms.length) return 'FP'; if (phase(k)==='clr') return ms[ms.length-1]; const dd = (evD - wkStart(k))/WK; return (wz.type==='Promotional' || (dd>=-0.5 && dd<2.2)) ? ms[0] : 'FP'; }); };
  const curve = Array.from({length:W},(_,j)=>shapeAt(wkStart(j), evD));
  const fp = Array(W).fill('FP');
  const rows = em.incSkus.map((k,i)=>{
    const seq = seqFor(k.merch), seqC = seq.map(m=>MECH[m].d > maxD + 1e-9 ? 'FP' : m);
    const byF = {}; k.stores.forEach(st=>{ (byF[st.fmt] = byF[st.fmt] || []).push(st); });
    const o = {base:0, units:0, rev:0, gp:0, left:0, stock:0, wkB:Array(W).fill(0), wkA:Array(W).fill(0), stores:[]};
    Object.entries(byF).forEach(([fmt, sts])=>{
      const per = k.rate*(fmt==='rail'?1.15:fmt==='land'?0.85:1), n = sts.length;
      const u = {stock:Math.round(per*n*W*1.2), base:per*n, curve, fmt, P:k.P, C:k.C};
      const rb = simUnit(u, fp), ra = simUnit(u, seqC);
      o.base += rb.units; o.units += ra.units; o.rev += ra.rev; o.gp += ra.gp; o.left += ra.left; o.stock += u.stock;
      rb.wk.forEach((w,j)=>{ o.wkB[j] += w.units; }); ra.wk.forEach((w,j)=>{ o.wkA[j] += w.units; });
      const ws = sts.map(st=>0.75+0.5*rnd(+st.no + i*7)), wt = ws.reduce((t,v)=>t+v,0);
      sts.forEach((st,j)=>{ const f = ws[j]/wt; o.stores.push({store:st, base:Math.round(rb.units*f), units:Math.round(ra.units*f), stock:Math.round(u.stock*f)}); });
    });
    const promos = seqC.filter(m=>m!=='FP'), cannR = promos.length ? promos.reduce((t,m)=>t+(MECH[m].kind==='multi'?0.18:0.1),0)/promos.length : 0;
    const uplift = o.units - o.base, cann = Math.round(Math.max(0,uplift)*cannR);
    const ly = k.ly ? Math.round(k.ly*k.rate*W*0.8*(0.9+0.2*rnd(i*3+11))) : null;
    const conf = k.life==='New' ? 'Low' : k.ly<15 ? 'Medium' : 'High';
    return {id:k.id, name:k.name, merch:k.merch, k, ...o, uplift, cann, cannRev:cann*k.P*0.85, ly, conf, st:o.units/Math.max(1,o.stock), seq:seqC, capped: seq.some((m,j)=>m!==seqC[j])};
  });
  const tot = rs => { const t = {base:0, units:0, rev:0, gp:0, left:0, stock:0, uplift:0, cann:0, cannRev:0, ly:0, hasLy:false, wkB:Array(W).fill(0), wkA:Array(W).fill(0), lowN:0, n:rs.length};
    rs.forEach(r=>{ ['base','units','rev','gp','left','stock','uplift','cann','cannRev'].forEach(x=>{ t[x] += r[x]; }); if (r.ly!=null){ t.ly += r.ly; t.hasLy = true; } r.wkB.forEach((v,j)=>{ t.wkB[j]+=v; }); r.wkA.forEach((v,j)=>{ t.wkA[j]+=v; }); if (r.conf==='Low') t.lowN++; });
    t.st = t.units/Math.max(1,t.stock); const cs = rs.map(r=>r.conf); t.conf = !rs.length ? '—' : cs.includes('Low') && t.lowN/rs.length>=0.3 ? 'Low' : cs.some(c=>c!=='High') ? 'Medium' : 'High'; return t; };
  const cats = MERCH.map(m=>m.id).filter(id=>rows.some(r=>r.merch===id)).map(id=>{ const rs = rows.filter(r=>r.merch===id); return {id, rows:rs, ...tot(rs)}; });
  return {W, a, b, evD, sellEnd, phase, wkStart, seqFor, rows, cats, all:tot(rows), curve};
}
function conflictsOf(wz, em, start, end, permitted, others){
  const out = [], maxD = (+wz.maxDisc||0)/100, fm = FLOOR_M[wz.floor] || 1.1;
  MERCH.map(m=>m.id).filter(id=>em.incSkus.some(k=>k.merch===id)).forEach(mid=>{
    (wz.assign[mid]||[]).filter(m=>m!=='FP' && permitted.includes(m)).forEach(m=>{
      const d = MECH[m].d;
      if (d > maxD + 1e-9) out.push({sev:'warn', step:1, t:MECH[m].label+' ('+Math.round(d*100)+'% effective) is deeper than the '+wz.maxDisc+'% maximum discount', d:mid+' · the forecast and strategy hold these weeks at full price until it is removed or the maximum is raised.'});
      const br = em.incSkus.filter(k=>k.merch===mid && k.P*(1-d) < k.C*fm - 1e-9);
      if (br.length) out.push({sev:'danger', step:4, t:MECH[m].label+' takes '+br.length+' '+mid+' SKU'+(br.length>1?'s':'')+' below the price floor ('+FLOOR_LBL[wz.floor]+')', d:br.slice(0,2).map(k=>k.name+': $'+(k.P*(1-d)).toFixed(2)+' vs floor $'+(k.C*fm).toFixed(2)).join(' · ')+(br.length>2?' · +'+(br.length-2)+' more':'')});
    });
  });
  const a = pd(start), b = pd(end), mine = em.incSkus.map(k=>k.id);
  others.forEach(o=>{ if (o.a < b && a < o.b){ const sh = o.skus.filter(x=>mine.includes(x)); if (sh.length) out.push({sev:'warn', step:3, t:sh.length+' SKU'+(sh.length>1?'s':'')+' overlap '+o.name+' ('+fd(o.a)+' – '+fd(o.b)+')', d:'Promotions here would stack on '+o.name+' markdown prices for '+fd(o.a > a ? o.a : a)+' – '+fd(o.b < b ? o.b : b)+'. Exclude the shared SKUs or move the dates.'}); } });
  return out;
}
