    // ===== events control tower · workspace · setup wizard =====
    const PORTF = portfolioOf(s);
    const curP = PORTF.find(p=>p.id===s.evId) || (s.pendingNew && s.pendingNew.id===s.evId ? s.pendingNew : PORT_BY.hw26);
    const ctxGet = p => p.id===s.evId ? s : (s.ctx[p.id] || seedCtx(p));
    const curLife = lifeOf(curP, s);
    const wz = s.wz, isHome = s.view==='home', isWs = s.view==='ws', isWiz = s.view==='wizard', wStep = wz.step;
    const EM = eligModel(wz);
    const openEv = (id, extra) => () => this.openEvent(id, extra);
    const openWiz = (id, n) => () => this.openWizard(id, n);
    const dTo = d => Math.round((d - TODAY)/864e5);
    const fdY = d => fd(d)+' '+d.getFullYear();
    const offAll = BASE.filter(b=>Math.abs(b.actualLW/b.plannedLW-1) > tol/100).length;
    const evName = s.runName || curP.name || 'Untitled event';

    // --- home
    const hRows = PORTF.map(p=>{
      const c = ctxGet(p), life = lifeOf(p, c), done = life==='Completed', x = PAST_X[p.id];
      const a = pd(done ? x.start : c.start), b = pd(done ? x.end : c.end);
      const m = !done && life!=='Not started' ? eligModel(c.wz) : null;
      const stores = done ? 8 : m ? m.incStores.length : null, skus = done ? Math.round(p.run.combos/8) : m ? m.incSkus.length : null;
      let perf = '—', perfStyle = {color:'var(--dr-ink-3)'}, pending = [], next = '', nextD = null, attn = false;
      if (done){ const r = p.run, ds = r.rev/x.plan[0]-1, dg = r.margin/x.plan[1]-1; perf = 'Sales '+sp(ds)+' · GP '+sp(dg); perfStyle = {color: ds>=0 && dg>=0 ? 'var(--dr-ok)' : 'var(--dr-warn)', fontWeight:600}; const nx = PORTF.find(q=>q.id===(PAST_CAL[p.id]||{}).next); next = nx ? 'Feeds '+nx.name : 'Review complete'; }
      else if (life==='Active'){ const n = Math.max(0, offAll - Object.keys(c.decided||{}).length); perf = p.perf; perfStyle = {color:'var(--dr-warn)', fontWeight:600}; if (n) pending.push(n+' off plan to review'); next = 'Week 3 price file'; nextD = pd('2026-10-26'); attn = n>0; }
      else if (life==='Approved'){ next = 'Event starts'; nextD = a; }
      else if (life==='In review'){ pending.push('Approval · '+AUTH_LBL[c.wz.auth]); next = 'Approval due'; nextD = addD(a,-10); attn = true; }
      else if (life==='Draft'){ pending.push('Setup · '+c.wz.done.length+' of 7 steps'); next = 'Plan lock due'; nextD = addD(a,-14); attn = dTo(nextD) <= 21; }
      else { next = 'Start planning by'; nextD = addD(a,-28); attn = dTo(nextD) <= 14; }
      return {p, c, life, a, b, m, name: done ? p.name : (c.runName || 'Untitled event'), type: done ? x.type : c.wz.type, stores, skus, perf, perfStyle, pending, next, nextD, attn, scope: p.scopeT || (m ? m.incStores.length+' stores · '+m.incSkus.length+' SKUs' : 'Not set up')};
    });
    const HF = {All:()=>true, Upcoming:r=>r.a > TODAY && r.life!=='Completed', Planning:r=>['Not started','Draft','In review'].includes(r.life), Active:r=>r.life==='Active', Completed:r=>r.life==='Completed', Attention:r=>r.attn};
    const hf = s.hf, hq = hf.q.trim().toLowerCase();
    const LIFE_RANK = {Active:0, 'In review':1, Approved:2, Draft:3, 'Not started':4, Completed:5};
    const hSortKey = {name:r=>r.name.toLowerCase(), type:r=>r.type, start:r=>+r.a, end:r=>+r.b, life:r=>LIFE_RANK[r.life], stores:r=>r.stores==null?-1:r.stores, skus:r=>r.skus==null?-1:r.skus, pending:r=>r.pending.length, next:r=>r.nextD ? +r.nextD : 9e15};
    const hList = hRows.filter(HF[hf.f] || HF.All).filter(r=>!hq || (r.name+' '+r.type+' '+r.life+' '+r.scope).toLowerCase().includes(hq))
      .sort((x,y)=>{ const k = hSortKey[hf.sort] || hSortKey.life, u = k(x), v = k(y); return ((u<v?-1:u>v?1:0)*hf.dir) || (x.a - y.a)*(x.life==='Completed'?-1:1); });
    const sortHead = (cur, setKey) => ([k,label,al])=>({label, sortable:!!k, notSortable:!k, icon: cur.sort===k ? (cur.dir>0?'i-sort-up':'i-sort-down') : 'i-sort', ariaSort: k && cur.sort===k ? (cur.dir>0?'ascending':'descending') : undefined,
      pick: k ? ()=>setKey(k) : ()=>{}, thStyle:{textAlign:al?'right':'left', padding:'9px 12px', whiteSpace:'nowrap'},
      btnStyle:{display:'inline-flex',alignItems:'center',gap:'4px',border:0,background:'transparent',padding:0,font:'inherit',letterSpacing:'inherit',textTransform:'inherit',color:cur.sort===k?'var(--dr-ink)':'inherit',cursor:'pointer',flexDirection:al?'row-reverse':'row'}});
    const hHeads = [['name','Event'],['type','Type'],['start','Start'],['end','End'],['life','Status'],['stores','Stores','r'],['skus','SKUs','r'],[null,'Vs plan'],['pending','Pending actions'],['next','Next milestone']]
      .map(sortHead(hf, k=>this.setState(st=>({hf:{...st.hf, sort:k, dir: st.hf.sort===k ? -st.hf.dir : 1}}))));
    const hTable = hList.map(r=>({name:r.name, scope:r.scope, type:r.type, start:fdY(r.a), end:fdY(r.b), life:r.life, lifeCls:LIFE_CLS[r.life], stores:r.stores==null?'—':String(r.stores), skus:r.skus==null?'—':String(r.skus), perf:r.perf, perfStyle:r.perfStyle,
      pending: r.pending.length ? r.pending.join(' · ') : '—', pendingStyle:{color:r.pending.length?'var(--dr-ink)':'var(--dr-ink-3)', fontWeight:r.pending.length?600:400}, next:r.next, nextD: r.nextD ? fd(r.nextD)+(dTo(r.nextD)>=0 && dTo(r.nextD)<=60 ? ' · in '+dTo(r.nextD)+' days' : '') : '', attn:r.attn, open:openEv(r.p.id)}));
    const hSumDef = [['Upcoming','Upcoming', (()=>{ const u = hRows.filter(HF.Upcoming).sort((x,y)=>x.a-y.a)[0]; return u ? 'Next: '+u.name+' · '+fd(u.a) : 'None scheduled'; })()],
      ['Active','Active', hRows.filter(HF.Active).map(r=>r.name+' · week '+(r.p.id===s.evId ? curWeek : 2)).join(', ') || 'None running'],
      ['Completed','Completed', 'Post-event reviews available'],
      ['Requiring attention','Attention', 'Approvals, deadlines and exceptions']];
    const hSum = hSumDef.map(([label,f,sub])=>{ const n = hRows.filter(HF[f]).length, on = hf.f===f;
      return {label, n:String(n), sub, pressed:on?'true':'false', pick:()=>this.setState(st=>({hf:{...st.hf, f: st.hf.f===f ? 'All' : f}})),
        nStyle:{fontFamily:'var(--dr-font-display)',fontSize:'22px',fontWeight:600,lineHeight:1.1,color: f==='Attention' && n ? 'var(--dr-warn)' : 'var(--dr-ink)'},
        style:{minWidth:0,display:'flex',flexDirection:'column',gap:'2px',padding:'10px 16px',border:0,boxShadow:'0 0 0 0.5px var(--dr-line)'+(on?', inset 0 -2px 0 var(--dr-copper-500)':''),background:on?'var(--dr-copper-050)':'transparent',font:'inherit',textAlign:'left',cursor:'pointer'}}; });
    const hFilters = ['All','Upcoming','Planning','Active','Completed'].map(f=>({label:f, n:String(hRows.filter(HF[f]).length), active:hf.f===f?'true':'false', cls:'dr-seg__item'+(hf.f===f?' dr-seg__item--active':''), pick:()=>this.setState(st=>({hf:{...st.hf, f}}))}));
    const sevIcon = {warn:'var(--dr-warn)', brand:'var(--dr-copper-600)', danger:'var(--dr-danger)'};
    const attn = [];
    hRows.forEach(r=>{
      if (r.life==='Active' && r.pending.length) attn.push({kind:'In-season exception', icon:'i-alert', tone:'warn', ev:r.name, t:r.pending[0].split(' ')[0]+' SKU × store combinations are off plan', sub:'The agent has re-priced them; they need a decision before Monday’s price file.', due:'Due Mon 26 Oct', cta:'Review exceptions', go:openEv(r.p.id,{screen:'review'})});
      if (r.life==='Active') attn.push({kind:'Intervention', icon:'i-zap', tone:'brand', ev:r.name, t:'AI interventions proposed for week 3', sub:'Promotion changes for slow combinations, inside the locked guardrails.', due:'Before Mon 26 Oct', cta:'Open performance', go:openEv(r.p.id,{screen:'monitor'})});
      if (r.life==='In review') attn.push({kind:'Pending approval', icon:'i-usercheck', tone:'brand', ev:r.name, t:'Event plan waiting for '+AUTH_LBL[r.c.wz.auth].toLowerCase()+' approval', sub:(r.c.wz.submitted ? 'Submitted '+r.c.wz.submitted+'. ' : '')+'Price files can only be scheduled from a locked plan.', due:'Due '+fd(r.nextD), cta:'Review & approve', go:openEv(r.p.id,{screen:'approval'})});
      if (r.life==='Draft' && r.attn) attn.push({kind:'Planning deadline', icon:'i-clock', tone:'warn', ev:r.name, t:'Setup incomplete · '+r.c.wz.done.length+' of 7 steps done', sub:'Plans lock two weeks before the event starts.', due:'Lock by '+fd(r.nextD)+' · '+dTo(r.nextD)+' days', cta:'Continue setup', go:openWiz(r.p.id)});
      if (r.life==='Not started' && r.attn) attn.push({kind:'Planning deadline', icon:'i-clock', tone:'warn', ev:r.name, t:'Planning has not started', sub:'Start four weeks before the event.', due:'Start by '+fd(r.nextD), cta:'Start planning', go:openWiz(r.p.id,1)});
    });
    const liveRows = hRows.filter(r=>['Active','Approved','In review'].includes(r.life) && r.m);
    liveRows.forEach((r,i)=>liveRows.slice(i+1).forEach(q=>{ if (q.a < r.b && r.a < q.b){ const sh = r.m.incSkus.filter(k=>q.m.incSkus.some(j=>j.id===k.id)); if (sh.length){ const later = q.a > r.a ? q : r, earlier = later===q ? r : q;
      attn.push({kind:'Overlapping events', icon:'i-cal', tone:'warn', ev:later.name, t:sh.length+' shared SKU'+(sh.length>1?'s':'')+' overlap '+earlier.name, sub:'Promotions stack on '+earlier.name+' prices for '+fd(later.a)+' – '+fd(earlier.b < later.b ? earlier.b : later.b)+'.', due:'From '+fd(later.a), cta:'Open '+later.name, go:openEv(later.p.id,{screen: later.life==='Active' ? 'monitor' : 'elig', eligSub:'skus'})}); } } }));
    attn.forEach(a=>{ a.iconStyle = {width:'16px',height:'16px',flex:'none',color:sevIcon[a.tone]}; });
    const LOOKMAP = {Active:'Active', Approved:'Scheduled', 'In review':'Scheduled', Draft:'Draft', 'Not started':'Draft', Completed:'Completed'};
    const hTl = hRows.filter(r=>r.life!=='Completed' || r.b > addD(TODAY,-120)).sort((x,y)=>x.a-y.a).map(r=>({...tlRow({a:r.a, b:r.b, day: r.life!=='Completed' && r.c.wz.evDay ? pd(r.c.wz.evDay) : null, look:LOOKMAP[r.life], sel:false, label:r.name, dim:r.life==='Not started'}), name:r.name, life:r.life, badgeCls:LIFE_CLS[r.life], open:openEv(r.p.id)}));
    const hT = tpos(TODAY);
    const hTodayStyle = {position:'absolute',top:0,bottom:0,left:hT+'%',borderLeft:'1.5px dashed var(--dr-copper-500)',pointerEvents:'none'};
    const hTodayLabelStyle = {position:'absolute',left:hT+'%',top:0,transform:'translateX(-50%)',padding:'0 5px',borderRadius:'3px',background:'var(--dr-copper-600)',color:'#fff',fontSize:'10px',fontWeight:700,lineHeight:'15px'};

    // --- workspace header & lifecycle tabs
    const PLAN_TABS = [['overview','Overview'],['config','Configuration'],['elig','Stores & SKUs'],['forecast','Forecast'],['strategy','Promotion strategy'],['plan','Pricing scenarios'],['approval','Approval'],['events','Demand events'],['logs','Activity log']];
    const TABSET = {'Not started':[['wsStart','Overview']], Draft:[['wsSetup','Setup progress'],['logs','Activity log']], 'In review':PLAN_TABS, Approved:PLAN_TABS,
      Active:[['monitor','Performance'],['overview','Overview'],['strategy','Promotion strategy'],['recs','Recommendations'],['review','Exceptions'],['plan','Pricing scenarios'],['elig','Stores & SKUs'],['config','Configuration'],['events','Demand events'],['logs','Activity log']],
      Completed:[['post','Post-event review']]};
    const wsTabs = (TABSET[curLife]||[]).map(([id,label])=>{ const on = s.screen===id, cnt = id==='review' && curLife==='Active' ? pendingOff : id==='approval' && curLife==='In review' ? 1 : 0;
      return {label, active:on?'true':'false', cls:'dr-tab'+(on?' dr-tab--active':''), pick:()=>this.setState({screen:id, planView:'matrix', recView:'list', dsOpen:false}), hasCount:cnt>0, count:String(cnt)}; });
    const isDoneEv = curLife==='Completed', pxx = PAST_X[curP.id];
    const hA = isDoneEv ? pd(pxx.start) : d0, hB = isDoneEv ? pd(pxx.end) : d1;
    const whFacts = [{label:'Dates', value:fd(hA)+' – '+fdY(hB)}, {label:'Type', value:isDoneEv ? pxx.type : wz.type},
      {label:'Stores', value:isDoneEv ? '8' : String(EM.incStores.length)}, {label:'SKUs', value:isDoneEv ? String(Math.round(curP.run.combos/8)) : String(EM.incSkus.length)},
      {label:'SKU × store', value:isDoneEv ? String(curP.run.combos) : EM.combos.toLocaleString()}].concat(curLife==='Active' ? [{label:'Week', value:curWeek+' of '+totalWeeks}] : []);
    const nxtEv = isDoneEv ? PORTF.find(q=>q.id===(PAST_CAL[curP.id]||{}).next) : null;
    const WHP = {'Not started':['Start planning', openWiz(curP.id,1)], Draft:['Continue setup', openWiz(curP.id)], 'In review':['Review & approve', ()=>this.setState({screen:'approval'})],
      Approved:['View locked strategy', ()=>this.setState({screen:'strategy'})], Active:['Re-optimise now', go('plan',{planView:'matrix'})], Completed: nxtEv ? ['Open '+nxtEv.name, openEv(nxtEv.id)] : null}[curLife];
    const wh = {name:evName, life:curLife, lifeCls:LIFE_CLS[curLife], facts:whFacts, hasPrimary:!!WHP, primaryLabel:WHP?WHP[0]:'', primaryGo:WHP?WHP[1]:()=>{},
      hasSecondary:curLife==='In review', secondaryLabel:'Edit setup', secondaryGo:openWiz(curP.id,1), showDs:['Active','In review','Approved'].includes(curLife)};

    // --- wizard shared models
    const fc = fcModel(wz, EM, s.start, s.end, effMech);
    const others = hRows.filter(r=>r.p.id!==s.evId && ['Active','Approved','In review'].includes(r.life) && r.m).map(r=>({name:r.name, a:r.a, b:r.b, skus:r.m.incSkus.map(k=>k.id)}));
    const cfl = conflictsOf(wz, EM, s.start, s.end, effMech, others);
    const sellEndD = wz.type==='Clearance' ? null : (wz.clr && wz.sellEnd ? pd(wz.sellEnd) : d1);
    const wksBetween = (x,y) => Math.max(1, Math.round((y-x)/WK));
    const sellT = wz.type==='Clearance' ? 'None · clearance only' : sellEndD ? fd(d0)+' – '+fd(sellEndD)+' · '+wksBetween(d0, sellEndD)+' wks' : '—';
    const clrT = wz.type==='Clearance' ? fd(d0)+' – '+fd(d1)+' · '+totalWeeks+' wks' : wz.clr && sellEndD ? fd(addD(sellEndD,1))+' – '+fd(d1)+' · '+wksBetween(sellEndD, d1)+' wks' : 'None';
    const wzErrs = {1: !(s.runName||'').trim() ? 'Name the event to continue.' : d1 <= d0 ? 'The end date must be after the start date.' : (wz.type!=='Clearance' && wz.clr && wz.sellEnd && (pd(wz.sellEnd) < d0 || pd(wz.sellEnd) >= d1)) ? 'The selling period must end inside the event window.' : '',
      2: EM.incStores.length ? '' : 'Include at least one store.', 3: EM.incSkus.length ? '' : 'Include at least one SKU.', 4:'', 5:'', 6:'', 7:''};
    const dangerN = cfl.filter(c=>c.sev==='danger').length;
    const blockers = [1,2,3].filter(n=>wzErrs[n]).map(n=>'Step '+n+': '+wzErrs[n]).concat(dangerN ? ['Step 4: resolve '+dangerN+' price-floor conflict'+(dangerN>1?'s':'')] : []);
    const canApprove = !blockers.length && !locked;
    const saveDraft = (msg) => this.setState(st=>({...this.ensureListed(st), wz:{...st.wz, savedAt:stamp()}, activity:pushLog(st, act('Event', msg || ('Saved draft of '+(st.runName||'new event')+' at step '+st.wz.step+' of 7.'), st.runName||'New event', 'Draft'))}));
    const goStep = n => { this.setState(st=>({...this.ensureListed(st), wz:{...st.wz, step:n, savedAt:stamp()}, wzTried:null})); if (typeof window!=='undefined') window.scrollTo(0,0); };
    const wzNext = () => { if (wzErrs[wStep]){ this.setState({wzTried:wStep}); return; }
      this.setState(st=>({...this.ensureListed(st), wz:{...st.wz, step:Math.min(7, st.wz.step+1), done: st.wz.done.includes(st.wz.step) ? st.wz.done : st.wz.done.concat(st.wz.step).sort((a,b)=>a-b), savedAt:stamp()}, wzTried:null}));
      if (typeof window!=='undefined') window.scrollTo(0,0); };
    const submitAppr = () => { if (blockers.length){ this.setState({wzTried:7}); return; }
      this.setState(st=>({...this.ensureListed(st), wz:{...st.wz, submitted:stamp(), savedAt:stamp(), done:[1,2,3,4,5,6]}, activity:pushLog(st, act('Event', 'Submitted '+(st.runName||'event')+' for approval by '+AUTH_LBL[st.wz.auth].toLowerCase()+'.', st.runName, 'Pending'))})); };
    const approveLock = () => { if (!canApprove){ this.setState({wzTried:7}); return; }
      this.setState(st=>({...this.ensureListed(st), wz:{...st.wz, submitted: st.wz.submitted || stamp(), savedAt:stamp(), done:[1,2,3,4,5,6,7]}}));
      if (stSel==='B' && optB) this.setState({modal:'stB'}); else doStLock(); };
    const wzSteps = WZ_STEPS.map((label,i)=>{ const n = i+1, cur = n===wStep, done = wz.done.includes(n) && !cur, err = !!wzErrs[n] && (wz.done.includes(n) || s.wzTried===n);
      const sub = n===1 ? wz.type+' · '+totalWeeks+' wks' : n===2 ? EM.incStores.length+' stores' : n===3 ? EM.incSkus.length+' SKUs · '+EM.combos+' comb.' : n===4 ? (cfl.length ? cfl.length+' conflict'+(cfl.length>1?'s':'') : effMech.length+' mechanics') : n===5 ? $0(fc.all.rev)+' sales' : n===6 ? (locked ? 'Option '+stLock.opt+' locked' : 'Option '+stSel) : (locked ? 'Approved' : wz.submitted ? 'Submitted' : 'Not submitted');
      return {n:String(n), label, sub, cur:cur?'step':undefined, go:()=>goStep(n), showCheck:done && !err, showNum:!(done && !err),
        style:{width:'100%',minWidth:0,display:'flex',flexDirection:'column',gap:'4px',padding:'0 0 10px',border:0,background:'transparent',font:'inherit',textAlign:'left',cursor:'pointer'},
        barStyle:{display:'block',height:'3px',borderRadius:'2px',background: cur ? 'var(--dr-copper-500)' : done ? 'var(--dr-ok)' : 'var(--dr-surface-3)'},
        numStyle:{width:'20px',height:'20px',flex:'none',borderRadius:'50%',display:'grid',placeItems:'center',fontSize:'11px',fontWeight:700,background: err ? 'var(--dr-danger)' : cur ? 'var(--dr-copper-600)' : done ? 'var(--dr-ok)' : 'var(--dr-surface-2)',color: cur||done||err ? '#fff' : 'var(--dr-ink-3)',border: cur||done||err ? '0' : '1px solid var(--dr-line-2)'},
        labelStyle:{fontSize:'12.5px',fontWeight:600,lineHeight:1.2,color:cur?'var(--dr-copper-800)':'var(--dr-ink)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'},
        subStyle:{fontSize:'11px',color: err ? 'var(--dr-danger)' : 'var(--dr-ink-3)',paddingLeft:'26px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}; });
    const wzFootT = 'Step '+wStep+' of 7 · '+WZ_STEPS[wStep-1]+' · '+EM.incStores.length+' stores × '+EM.incSkus.length+' SKUs = '+EM.combos.toLocaleString()+' combinations';

    // --- step 1
    const seg = (cur, opts, pick) => opts.map(([id,label])=>({label, active:cur===id?'true':'false', cls:'dr-seg__item'+(cur===id?' dr-seg__item--active':''), pick:()=>pick(id)}));
    const wzTypes = seg(wz.type, [['Seasonal','Seasonal'],['Promotional','Promotional'],['Clearance','Clearance']], id=>this.setWz({type:id, clr:id!=='Promotional'}));
    const wzFreq = seg(wz.freq, [['weekly','Weekly'],['twice','Twice weekly'],['phase','Start & clearance']], id=>this.setWz({freq:id}));
    const clrOn = wz.clr && wz.type!=='Clearance', clrW = swS(clrOn);
    const setMaxDisc = e => { const v = Math.max(0, Math.min(90, Math.round(+e.target.value||0)));
      this.setState(st=>({wz:{...st.wz, maxDisc:v}, weekRules:Object.fromEntries([1,2,3,4,5,6].map(n=>{ const r = {...defaultRule(n), ...(st.weekRules[n]||{})}; return [n, r.mdMethod==='flat' ? {...r, mdPct:String(Math.min(+r.mdPct||0, v))} : r]; }))})); };

    // --- step 2 · stores
    const sf = wz.sf, sq = sf.q.trim().toLowerCase();
    const setSf = patch => this.setWz(w=>({sf:{...w.sf, ...patch}}));
    const ST_FILTERS = ['All','Included','Excluded','Eligible','Newly eligible','New store','Overridden'];
    const stMatch = x => (sf.st==='All' || (sf.st==='Included' ? x.inc : sf.st==='Excluded' ? !x.inc : sf.st==='Overridden' ? !!x.ovr : ELIG_LBL[x.rec]===sf.st)) && (sf.fmt==='All' || x.fmt===sf.fmt) && (sf.region==='All' || x.region===sf.region) && (!sq || (x.no+' '+x.name+' '+x.prop+' '+x.region).toLowerCase().includes(sq));
    const stKey = {no:x=>x.no, name:x=>x.name, prop:x=>x.prop, fmt:x=>fmtLabel(x.fmt), region:x=>x.region, ly:x=>x.ly?0:1, status:x=>(x.inc?0:2)+(x.ovr?1:0)};
    const stShown = EM.stores.filter(stMatch).sort((a,b)=>{ const k = stKey[sf.sort]||stKey.no, u = k(a), v = k(b); return (u<v?-1:u>v?1:0)*sf.dir; });
    const ovrOpen = (kind, ids, inc) => {
      const src = kind==='store' ? EM.stores : EM.skus, list = src.filter(x=>ids.includes(kind==='store'?x.no:x.id));
      if (!list.length) return;
      if (!list.some(x=>x.recInc!==inc)) { applyOvr(kind, ids, inc, '', ''); return; }
      this.setState({modal:'ovr', ovrForm:{kind, ids, inc, reason:'', note:''}});
    };
    const applyOvr = (kind, ids, inc, reason, note) => this.setState(st=>{
      const key = kind==='store' ? 'storeOvr' : 'skuOvr', cur = {...st.wz[key]}, m = eligModel(st.wz), src = kind==='store' ? m.stores : m.skus; let n = 0;
      ids.forEach(id=>{ const x = src.find(y=>(kind==='store'?y.no:y.id)===id); if (!x) return; n++; if (x.recInc===inc) delete cur[id]; else cur[id] = {inc, reason, note, when:stamp()}; });
      const what = n+' '+(kind==='store'?'store':'SKU')+(n>1?'s':'');
      return {wz:{...st.wz, [key]:cur, ...(kind==='store'?{sel:{}}:{ksel:{}})}, modal:null, ovrForm:null,
        activity:pushLog(st, act('Override', (reason ? (inc?'Included ':'Excluded ')+what+' against the recommendation · '+reason+(note?' · '+note:'') : 'Reverted '+what+' to the recommendation')+'.', st.runName||'New event', 'Applied'))};
    });
    const stRow = x => ({no:x.no, name:x.name, prop:x.prop, fmt:fmtLabel(x.fmt), region:x.region, ly: x.ly ? 'Yes' : x.rec==='new' ? 'Not open' : 'No',
      recT:ELIG_LBL[x.rec], recCls:ELIG_CLS[x.rec], isOvr:!!x.ovr, ovrT: x.ovr ? (x.inc?'Included':'Excluded')+' by override' : '',
      reason: x.ovr ? x.ovr.reason+(x.ovr.note?' · '+x.ovr.note:'') : x.reason,
      checked:!!wz.sel[x.no], selAria:'Select '+x.name, toggleSel:()=>this.setWz(w=>{ const sel = {...w.sel}; if (sel[x.no]) delete sel[x.no]; else sel[x.no] = true; return {sel}; }),
      actT: x.inc ? 'Exclude' : 'Include', actCls:'dr-btn dr-btn--secondary dr-btn--sm', act:()=>ovrOpen('store',[x.no], !x.inc), revert:()=>applyOvr('store',[x.no], x.recInc, '', ''),
      trStyle:{background: x.inc ? 'transparent' : 'var(--dr-surface-2)', color: x.inc ? 'var(--dr-ink)' : 'var(--dr-ink-3)'}});
    const grpKey = {property:x=>x.prop, format:x=>fmtLabel(x.fmt), region:x=>x.region}[sf.group];
    const stGroups = grpKey ? [...new Set(stShown.map(grpKey))].sort().map(g=>{ const rs = stShown.filter(x=>grpKey(x)===g); return {label:g, sub:rs.filter(x=>x.inc).length+' of '+rs.length+' included', showHead:true, rows:rs.map(stRow)}; }) : [{label:'', sub:'', showHead:false, rows:stShown.map(stRow)}];
    const stSelIds = Object.keys(wz.sel), allShownSel = stShown.length>0 && stShown.every(x=>wz.sel[x.no]);
    const lyN = EM.stores.filter(x=>x.ly).length, lyInc = EM.incStores.filter(x=>x.ly).length;
    const stSum = [
      ['Total stores', STORE_MASTER.length, 'Travel Essentials estate'],
      ['Proposed eligible', EM.incStores.length, sp(EM.incStores.length/Math.max(1,lyN)-1).replace('%','% vs last year')],
      ['Last year', lyN, lyInc+' included this time'],
      ['Newly eligible', EM.stores.filter(x=>x.rec==='newelig').length, EM.stores.filter(x=>x.rec==='newelig' && x.inc).length+' included'],
      ['New stores', EM.stores.filter(x=>x.rec==='new').length, EM.stores.filter(x=>x.rec==='new' && x.inc).length+' included'],
      ['Excluded', EM.stores.length-EM.incStores.length, EM.stores.filter(x=>!x.inc && !x.ovr).length+' by rule · '+EM.stores.filter(x=>!x.inc && x.ovr).length+' by override']
    ].map(([label,v,sub],i)=>({label, value:String(v), sub, vStyle:{fontFamily:'var(--dr-font-display)',fontSize:'20px',fontWeight:600,marginTop:'2px',color: i===1 ? 'var(--dr-copper-800)' : 'var(--dr-ink)'}}));
    const lyName = (PAST_RUNS.find(r=>r.id===(curP.lyId||s.postRun))||{name:'last year'}).name;
    const stRuleT = wz.scope ? 'Scope set for this event: '+wz.scope.stores.length+' stores. Stores outside it are excluded; you can still override.' : 'Proposed from '+lyName+' participation and ranging rules: confectionery bay of 1.5 m or more, own price file, open four weeks before the start.';
    const stByFmt = FORMATS.map(f=>({label:f.label, n:EM.incStores.filter(x=>x.fmt===f.id).length+' / '+EM.stores.filter(x=>x.fmt===f.id).length}));
    const stHeads = [['no','Store no.'],['name','Store name'],['prop','Property'],['fmt','Format'],['region','Region'],['ly','Last year'],['status','Eligibility'],[null,'Reason / notes']]
      .map(sortHead(sf, k=>this.setWz(w=>({sf:{...w.sf, sort:k, dir: w.sf.sort===k ? -w.sf.dir : 1}}))));

    // --- step 3 · SKUs
    const kf = wz.kf, kq = kf.q.trim().toLowerCase();
    const KF_FILTERS = ['All','Included','Excluded','Eligible','Limited ranging','New line','Added','Overridden'];
    const kMatch = k => (kf.st==='All' || (kf.st==='Included' ? k.inc : kf.st==='Excluded' ? !k.inc : kf.st==='Overridden' ? !!k.ovr : SKU_LBL[k.rec]===kf.st)) && (kf.merch==='All' || k.merch===kf.merch) && (!kq || (k.id+' '+k.name+' '+k.sub+' '+k.merch).toLowerCase().includes(kq));
    const kKey = {id:k=>k.id, name:k=>k.name, cat:k=>k.cat+k.sub, merch:k=>k.merch, life:k=>k.life, ly:k=>k.ly, rec:k=>k.recCount, status:k=>(k.inc?0:2)+(k.ovr?1:0)};
    const kShown = EM.skus.filter(kMatch).sort((a,b)=>{ const k = kKey[kf.sort]||kKey.id, u = k(a), v = k(b); return (u<v?-1:u>v?1:0)*kf.dir; });
    const nInc = Math.max(1, EM.incStores.length);
    const kRows = kShown.map(k=>({id:k.id, name:k.name, cat:k.cat, sub:k.sub, merch:k.merch, life:k.life, ly: k.ly ? String(k.ly) : '—', rec: k.inc ? String(k.stores.length) : '—', recSub: k.inc ? RULE_LBL[k.rule] : 'Not ranged',
      fill:{position:'absolute',left:0,top:0,bottom:0,width:(k.inc ? k.stores.length/nInc*100 : 0)+'%',borderRadius:'999px',background:'var(--dr-copper-500)'},
      tick: k.ly ? {position:'absolute',top:'-3px',bottom:'-3px',left:'calc('+Math.min(100, k.ly/nInc*100)+'% - 1px)',width:'2px',background:'var(--dr-ink-2)'} : {display:'none'},
      barTitle:(k.inc ? k.stores.length : 0)+' of '+EM.incStores.length+' eligible stores'+(k.ly ? ' · last year '+k.ly : ''),
      recT:SKU_LBL[k.rec], recCls:SKU_CLS[k.rec], isOvr:!!k.ovr, ovrT: k.ovr ? (k.inc?'Included':'Excluded')+' by override' : '', reason: k.ovr ? k.ovr.reason+(k.ovr.note?' · '+k.ovr.note:'') : k.reason,
      checked:!!wz.ksel[k.id], selAria:'Select '+k.name, toggleSel:()=>this.setWz(w=>{ const ksel = {...w.ksel}; if (ksel[k.id]) delete ksel[k.id]; else ksel[k.id] = true; return {ksel}; }),
      actT: k.inc ? 'Exclude' : 'Include', act:()=>ovrOpen('sku',[k.id], !k.inc), revert:()=>applyOvr('sku',[k.id], k.recInc, '', ''),
      trStyle:{background: k.inc ? 'transparent' : 'var(--dr-surface-2)', color: k.inc ? 'var(--dr-ink)' : 'var(--dr-ink-3)'}}));
    const kSelIds = Object.keys(wz.ksel), allKSel = kShown.length>0 && kShown.every(k=>wz.ksel[k.id]);
    const kHeads = [['id','SKU'],['cat','Category · subcategory'],['merch','Merch area'],['life','Lifecycle'],['ly','LY stores','r'],['rec','Rec. stores','r'],[null,'Ranging'],['status','Eligibility'],[null,'Recommendation reason']]
      .map(sortHead(kf, k=>this.setWz(w=>({kf:{...w.kf, sort:k, dir: w.kf.sort===k ? -w.kf.dir : 1}}))));
    const fmtCnt = FORMATS.map(f=>({...f, n:EM.incStores.filter(x=>x.fmt===f.id).length}));
    const kDist = MERCH.map(m=>m.id).filter(id=>EM.incSkus.some(k=>k.merch===id)).map(id=>{ const ks = EM.incSkus.filter(k=>k.merch===id);
      return {merch:id, n:String(ks.length), combos:ks.reduce((t,k)=>t+k.stores.length,0).toLocaleString(), cells:fmtCnt.map(f=>{ const v = ks.reduce((t,k)=>t+k.stores.filter(x=>x.fmt===f.id).length,0), cap = ks.length*f.n;
        return {v:String(v), fill:{display:'block',height:'100%',width:(cap ? v/cap*100 : 0)+'%',background:'var(--dr-copper-400)',borderRadius:'999px'}}; })}; });
    const possible = EM.incSkus.length*EM.incStores.length;
    const kDistT = EM.incSkus.length+' SKUs × '+EM.incStores.length+' stores → '+EM.combos.toLocaleString()+' SKU × store combinations'+(possible ? ' · '+Math.round(EM.combos/possible*100)+'% of the '+possible.toLocaleString()+' possible' : '');

    // --- step 4 · mechanics
    const merchIn = MERCH.map(m=>m.id).filter(id=>EM.incSkus.some(k=>k.merch===id));
    const mxHeads = MECH_ORDER.map(m=>({label:MECH[m].label, swatch:{width:'10px',height:'10px',borderRadius:'2px',flex:'none',background:MECH_LOOK[m].bg,border:'1px solid '+MECH_LOOK[m].bd}}));
    const mxRows = merchIn.map(mid=>{ const as = wz.assign[mid]||[], ks = EM.incSkus.filter(k=>k.merch===mid), seq = fc.seqFor(mid);
      return {label:mid, sub:ks.length+' SKUs · '+ks.reduce((t,k)=>t+k.stores.length,0)+' combinations',
        cells:MECH_ORDER.map(m=>{ const ok = effMech.includes(m), on = ok && as.includes(m);
          return {label: on ? 'Assigned' : ok ? 'Off' : 'Not permitted', pressed:on?'true':'false', disabled:!ok, aria:MECH[m].label+' for '+mid,
            pick: ok ? ()=>this.setWz(w=>({assign:{...w.assign, [mid]: on ? (w.assign[mid]||[]).filter(x=>x!==m) : MECH_ORDER.filter(x=>x===m || (w.assign[mid]||[]).includes(x))}})) : ()=>{},
            style:{width:'100%',minWidth:'84px',padding:'6px 8px',borderRadius:'var(--dr-r-sm)',border: on ? '1px solid var(--dr-copper-400)' : ok ? '1px solid var(--dr-line)' : '1px dashed var(--dr-line)',background: on ? 'var(--dr-copper-050)' : 'var(--dr-surface)',color: on ? 'var(--dr-copper-800)' : 'var(--dr-ink-3)',font:'inherit',fontSize:'11.5px',fontWeight:on?600:500,cursor:ok?'pointer':'not-allowed',opacity:ok?1:0.6}}; }),
        strip: seq.map((m,k)=>({title:'Week '+(k+1)+' · '+MECH[m].label, style:{display:'block',height:'16px',borderRadius:'3px',background:MECH_LOOK[m].bg,border:'1px solid '+MECH_LOOK[m].bd}}))}; });
    const mxGrid = {display:'grid',gridTemplateColumns:'repeat('+fc.W+',minmax(10px,1fr))',gap:'2px',minWidth:(fc.W*16)+'px'};
    const mxWeeks = Array.from({length:fc.W},(_,k)=>{ const ws = fc.wkStart(k), isEv = fc.evD >= ws && fc.evD < addD(ws,7); return {label:'W'+(k+1), title:'w/c '+fd(ws)+(isEv?' · event day':''), style:{fontSize:'10px',fontWeight:isEv?700:500,color: isEv ? 'var(--dr-copper-800)' : fc.phase(k)==='clr' ? 'var(--dr-ink-2)' : 'var(--dr-ink-3)',textAlign:'center'}}; });
    const mxDates = (wz.type==='Clearance' ? 'Clearance '+fd(d0)+' – '+fd(d1) : 'Promotion '+fd(d0)+' – '+fd(sellEndD||d1)+(clrOn ? ' · Clearance '+fd(addD(sellEndD,1))+' – '+fd(d1) : ''))+(wz.evDay && wz.type!=='Clearance' ? ' · Event day '+fdl(pd(wz.evDay)) : '');
    const cflRows = cfl.map(c=>({t:c.t, d:c.d, icon: c.sev==='danger' ? 'i-slash' : 'i-alert', iconStyle:{width:'16px',height:'16px',flex:'none',marginTop:'1px',color: c.sev==='danger' ? 'var(--dr-danger)' : 'var(--dr-warn)'}, tag: c.sev==='danger' ? 'Blocks approval' : 'Warning', tagCls: c.sev==='danger' ? 'dr-badge dr-badge--danger' : 'dr-badge dr-badge--warn', fixT:'Go to step '+c.step, fix:()=>isWiz ? goStep(c.step) : this.openWizard(curP.id, c.step)}));

    // --- step 5 · forecast
    const n0 = v => Math.round(v).toLocaleString('en-US');
    const confCls = c => c==='High' ? 'dr-badge dr-badge--ok' : c==='Medium' ? 'dr-badge dr-badge--warn' : c==='Low' ? 'dr-badge dr-badge--danger' : 'dr-badge dr-badge--neutral';
    const FA = fc.all;
    const fcKpis = [['Baseline units', n0(FA.base), 'Forecast · full price', 'f'],['Promotional uplift', sgnN(FA.uplift), sp(FA.uplift/Math.max(1,FA.base))+' vs baseline', 'ai'],['Cannibalisation', '−'+n0(FA.cann)+' units', '−'+$0(FA.cannRev)+' from other lines', 'ai'],
      ['Projected sales', $0(FA.rev), n0(FA.units)+' units', 'ai'],['Gross profit', $0(FA.gp), pc(FA.gp/Math.max(1,FA.rev))+' margin', 'ai'],['Sell-through', pc(FA.st), 'of '+n0(FA.stock)+' units bought', 'ai'],['Remaining inventory', n0(FA.left)+' units', $0(fc.rows.reduce((t,r)=>t+r.left*r.k.C,0))+' at cost', 'ai'],['Forecast confidence', FA.conf, FA.lowN ? FA.lowN+' new lines without history' : 'History for every line', 'ai']]
      .map(([label,value,sub,src])=>({label, value, sub, src: src==='ai' ? 'AI projection' : 'Forecast', srcStyle:{fontSize:'9.5px',fontWeight:700,letterSpacing:'.06em',textTransform:'uppercase',color: src==='ai' ? 'var(--dr-copper-700)' : 'var(--dr-ink-3)'}}));
    const lyWk = FA.hasLy ? fc.curve.map(c=>FA.ly*c/fc.curve.reduce((t,v)=>t+v,0)) : null;
    const fcMax = Math.max(1, ...FA.wkA, ...FA.wkB, ...(lyWk||[0]));
    const fcChart = FA.wkA.map((v,k)=>{ const ws = fc.wkStart(k), isEv = fc.evD >= ws && fc.evD < addD(ws,7);
      return {label:'W'+(k+1), sub:fd(ws), title:'w/c '+fd(ws)+' · baseline '+n0(FA.wkB[k])+' · AI '+n0(v)+(lyWk?' · LY '+n0(lyWk[k]):''), mech: '',
        bStyle:{position:'absolute',bottom:0,left:'14%',width:'32%',height:(FA.wkB[k]/fcMax*100)+'%',border:'1.5px dashed var(--dr-ink-4)',borderBottom:0,borderRadius:'3px 3px 0 0',boxSizing:'border-box'},
        aStyle:{position:'absolute',bottom:0,left:'50%',width:'32%',height:(v/fcMax*100)+'%',background:'var(--dr-copper-500)',borderRadius:'3px 3px 0 0'},
        lStyle: lyWk ? {position:'absolute',left:'calc(50% - 5px)',bottom:'calc('+(lyWk[k]/fcMax*100)+'% - 5px)',width:'10px',height:'10px',borderRadius:'50%',background:'var(--dr-surface)',border:'2px solid var(--dr-ink)',boxSizing:'border-box'} : {display:'none'},
        labStyle:{fontSize:'11px',fontWeight:isEv?700:500,color:isEv?'var(--dr-copper-800)':'var(--dr-ink-3)',textAlign:'center',whiteSpace:'nowrap'}}; });
    const fcCells = r => ({ly: r.ly==null || r.ly===0 && !r.hasLy ? '—' : n0(r.ly), base:n0(r.base), up:sgnN(r.uplift), cann: r.cann ? '−'+n0(r.cann) : '0', units:n0(r.units), rev:$0(r.rev), gp:$0(r.gp), st:pc(r.st), left:n0(r.left), conf:r.conf, confCls:confCls(r.conf)});
    const fcRowsV = [];
    fc.cats.forEach(c=>{ const open = !!wz.fcOpen[c.id];
      fcRowsV.push({isCat:true, isSku:false, name:c.id, sub:c.rows.length+' SKUs', ...fcCells({...c, ly: c.hasLy ? c.ly : null}), expanded:open?'true':'false', toggle:()=>this.setWz(w=>({fcOpen:{...w.fcOpen, [c.id]:!w.fcOpen[c.id]}})), pick:()=>{},
        chevStyle:{width:'14px',height:'14px',flex:'none',color:'var(--dr-ink-3)',transform:open?'none':'rotate(-90deg)',transition:'transform 140ms'}, trStyle:{background:'var(--dr-surface-2)',fontWeight:600}});
      if (open) c.rows.forEach(r=>fcRowsV.push({isCat:false, isSku:true, name:r.name, sub:r.id+' · '+r.k.stores.length+' stores'+(r.capped?' · discount capped':''), ...fcCells(r), expanded:'false', toggle:()=>{}, pick:()=>this.setWz(w=>({fcSku: w.fcSku===r.id ? null : r.id})), chevStyle:{display:'none'},
        trStyle:{background: wz.fcSku===r.id ? 'var(--dr-copper-050)' : 'transparent'}}));
    });
    const fcSel = fc.rows.find(r=>r.id===wz.fcSku) || null;
    const fcStores = fcSel ? fcSel.stores.slice().sort((a,b)=>b.units-a.units).map(x=>({no:x.store.no, name:x.store.name, fmt:fmtLabel(x.store.fmt), base:n0(x.base), units:n0(x.units), st:pc(x.units/Math.max(1,x.stock)), left:n0(Math.max(0,x.stock-x.units))})) : [];

    // --- step 6 · strategy settings
    const swDefault = Math.max(2, Math.min(totalWeeks, (()=>{ if (!sellEndD || wz.type==='Clearance') return wz.type==='Clearance' ? 1 : totalWeeks; return Math.round((addD(sellEndD,1)-d0)/WK)+1; })()));
    const swVal = Math.min(totalWeeks, wz.switchWk || swDefault);
    const swOpts = Array.from({length:totalWeeks},(_,k)=>({value:String(k+1), label:'Week '+(k+1)+' · w/c '+fd(addD(d0,k*7))}));
    const setSwitch = e => { const k = +e.target.value, mx = +wz.maxDisc||50;
      this.setState(st=>{ const nr = {...st.weekRules}; for (let wk=1; wk<=totalWeeks; wk++){ const n = Math.min(6, totalWeeks-wk+1); nr[n] = wk < k ? {strategy:'margin', mdMethod:'flat', mdPct:String(Math.min(15,mx)), muMethod:'flat', muPct:'5'} : {strategy:'clear', mdMethod:'flat', mdPct:String(Math.min(50,mx)), muMethod:'', muPct:''}; }
        return {wz:{...st.wz, switchWk:k}, weekRules:nr, activity:pushLog(st, act('Config', 'Set the clearance switch to week '+k+'; markdown progression updated for every week.', st.runName||'New event', 'Applied'))}; }); };
    const swHelp = 'Weeks before it protect margin with markdowns capped at '+Math.min(15,+wz.maxDisc||15)+'%; from week '+swVal+' the agent may clear stock up to '+Math.min(50,+wz.maxDisc||50)+'% off. The guardrail table below updates.';
    const lyDiff = (Array.isArray(diffBullets) ? diffBullets : [diffBullets]).slice(0,3);

    // --- step 7 · review
    const objLbl = com.obj==='sales' ? 'Maximize sales' : 'Maximize gross profit';
    const ovS = EM.stores.filter(x=>x.ovr), ovK = EM.skus.filter(x=>x.ovr);
    const rvBlocks = [
      {n:1, title:'Event details', rows:[['Name', evName],['Type', wz.type],['Dates', fd(d0)+' – '+fdY(d1)+' · '+totalWeeks+' wks'],['Selling period', sellT],['Clearance period', clrT]]},
      {n:1, title:'Commercial objectives', rows:[['Objective', objLbl],['Price floor', FLOOR_LBL[wz.floor]],['Maximum discount', wz.maxDisc+'%'],['Write-off tolerance', com.wo+'%'],['Price changes', FREQ_LBL[wz.freq]],['Approval authority', AUTH_LBL[wz.auth]]]},
      {n:2, title:'Eligible stores', rows:[['Included', EM.incStores.length+' of '+STORE_MASTER.length],['Took part last year', lyInc+' of '+lyN],['New & newly eligible', String(EM.incStores.filter(x=>x.rec==='new'||x.rec==='newelig').length)],['Overrides', String(ovS.length)]]},
      {n:3, title:'Eligible SKUs', rows:[['Included', EM.incSkus.length+' of '+SKU_MASTER.length],['SKU × store combinations', EM.combos.toLocaleString()],['Limited ranging', String(EM.incSkus.filter(k=>k.rule!=='all').length)],['Overrides', String(ovK.length)]]},
      {n:4, title:'Promotion mechanics', rows: merchIn.length ? merchIn.map(mid=>[mid, (wz.assign[mid]||[]).filter(m=>effMech.includes(m)).map(m=>MECH[m].short).join(', ') || 'Full price only']).concat([['Conflicts', String(cfl.length)]]) : [['SKU groups','None']]},
      {n:5, title:'Forecast · AI projection', rows:[['Projected sales', $0(FA.rev)],['Gross profit', $0(FA.gp)],['Sell-through', pc(FA.st)],['Remaining inventory', n0(FA.left)+' units'],['Confidence', FA.conf]]},
      {n:6, title:'Pricing strategy', rows:[['Strategy', locked ? 'Option '+stLock.opt+' · locked' : 'Option '+stSel+(stSel==='B'?' · AI alternative':' · within guardrails')],['Clearance switch', 'Week '+swVal],['Price consistency', consLabel(com.cons)],['Permitted mechanics', String(effMech.length)]]}
    ].map(b=>({title:b.title, canEdit:!(isWs && curLife==='Active'), edit: isWiz ? ()=>goStep(b.n) : openWiz(curP.id, b.n), rows:b.rows.map(([k,v])=>({k, v:String(v)}))}));
    const rvExc = ovS.map(x=>({tag:x.inc?'Store included':'Store excluded', tagCls:'dr-badge dr-badge--warn', t:x.no+' · '+x.name, d:'Recommendation was to '+(x.recInc?'include':'exclude')+'. '+x.ovr.reason+(x.ovr.note?' · '+x.ovr.note:'')+(x.ovr.when?' · '+x.ovr.when:'')}))
      .concat(ovK.map(k=>({tag:k.inc?'SKU included':'SKU excluded', tagCls:'dr-badge dr-badge--warn', t:k.id+' · '+k.name, d:'Recommendation was to '+(k.recInc?'include':'exclude')+'. '+k.ovr.reason+(k.ovr.note?' · '+k.ovr.note:'')})))
      .concat(cfl.map(c=>({tag:c.sev==='danger'?'Conflict':'Warning', tagCls:c.sev==='danger'?'dr-badge dr-badge--danger':'dr-badge dr-badge--warn', t:c.t, d:c.d})))
      .concat(stSel==='B' && optB && !locked ? [{tag:'Guardrail change', tagCls:'dr-badge dr-badge--warn', t:'Option B relaxes '+optB.rs.length+' guardrail'+(optB.rs.length>1?'s':''), d:optB.rs.map(r=>r.label).join(' · ')}] : []);
    const apprSteps = [['Draft saved', wz.savedAt || 'Not saved yet', !!wz.savedAt],['Submitted to '+AUTH_LBL[wz.auth].toLowerCase(), wz.submitted || 'Not submitted', !!wz.submitted],['Approved & locked', locked ? stLock.when : 'Pending', locked]]
      .map(([label,when,done],i)=>({label, when, dotStyle:{width:'18px',height:'18px',flex:'none',borderRadius:'50%',display:'grid',placeItems:'center',background:done?'var(--dr-ok)':'var(--dr-surface-2)',border:done?'0':'1px solid var(--dr-line-2)',color:'#fff'}, showCheck:done, lineStyle:{flex:'1 1 24px',minWidth:'16px',height:'1px',background:'var(--dr-line-2)',display:i<2?'block':'none'}}));
    const firstMon = monOf(d0) < d0 ? addD(monOf(d0),7) : monOf(d0);
    const rvLockT = evName+' is approved and locked. Planning is complete: weekly price and promotion files will be generated from this plan for w/c '+fd(monOf(d0))+'. Nothing has been sent to price or store systems yet.';

    // --- workspace special screens
    const wsSteps = WZ_STEPS.map((label,i)=>{ const n = i+1, done = wz.done.includes(n); return {n:String(n), label, status: done ? 'Complete' : n===wz.step ? 'In progress' : 'Not started', showCheck:done, showNum:!done, go:openWiz(curP.id, n),
      numStyle:{width:'22px',height:'22px',flex:'none',borderRadius:'50%',display:'grid',placeItems:'center',fontSize:'11px',fontWeight:700,background:done?'var(--dr-ok)':n===wz.step?'var(--dr-copper-600)':'var(--dr-surface-2)',color:done||n===wz.step?'#fff':'var(--dr-ink-3)',border:done||n===wz.step?'0':'1px solid var(--dr-line-2)'},
      stStyle:{fontSize:'11.5px',color:done?'var(--dr-ok)':n===wz.step?'var(--dr-copper-700)':'var(--dr-ink-3)'}}; });
    const recP = REC[curP.id] || null, recFrom = recP && recP.from ? PAST_RUNS.find(r=>r.id===recP.from) : (curP.lyId ? PAST_RUNS.find(r=>r.id===curP.lyId) : null);
    const wsStartFacts = [['Event dates', fd(d0)+' – '+fdY(d1)],['Window', totalWeeks+' weeks'],['Start planning by', fd(addD(d0,-28))],['Suggested strategy', recP ? recP.strategy : 'Balance']].concat(recFrom ? [['Last time', pc(recFrom.st)+' sold · '+recFrom.left+' units left']] : []).map(([label,value])=>({label, value}));
    const wsStartWhy = recP ? recP.why : recFrom ? recFrom.name+' is the closest comparable event; its participation and results seed the store and SKU proposal.' : 'No previous run. The setup starts from the store estate and ranging rules, then learns from 12 weeks of sales history.';
    const eligSegs = seg(s.eligSub, [['stores','Stores · '+EM.incStores.length],['skus','SKUs · '+EM.incSkus.length],['mech','Promotion mechanics']], id=>this.setState({eligSub:id}));

    // --- post-event: vs plan and last year
    const pvx = PAST_X[pr.id];
    const vsRow = (k, a, p, l, fmt, inv) => { const dp = a/p-1, dl = a/l-1, tone = v => ({color: (inv ? v<=0 : v>=0) ? 'var(--dr-ok)' : 'var(--dr-warn)', fontWeight:600});
      return {k, a:fmt(a), p:fmt(p), l:fmt(l), dp: fmt===pc ? (Math.round((a-p)*100)>=0?'+':'−')+Math.abs(Math.round((a-p)*100))+' pts' : sp(dp), dl: fmt===pc ? (Math.round((a-l)*100)>=0?'+':'−')+Math.abs(Math.round((a-l)*100))+' pts' : sp(dl), dpStyle:tone(a-p), dlStyle:tone(a-l)}; };
    const postVs = pvx ? [vsRow('Sales', pr.rev, pvx.plan[0], pvx.ly[0], $0), vsRow('Gross profit', pr.margin, pvx.plan[1], pvx.ly[1], $0), vsRow('Sell-through', pr.st, pvx.plan[2], pvx.ly[2], pc),
      vsRow('Units left at exit', pr.left, Math.round(pr.left*(1-pvx.plan[2])/Math.max(0.01,1-pr.st)), pvx.ly[3], v=>Math.round(v).toLocaleString('en-US'), true)] : [];

    const ovrF = s.ovrForm;
    const ovrList = ovrF ? (ovrF.kind==='store' ? EM.stores.filter(x=>ovrF.ids.includes(x.no)) : EM.skus.filter(x=>ovrF.ids.includes(x.id))) : [];
    const ovrNeed = ovrList.filter(x=>ovrF && x.recInc!==ovrF.inc).length;
    const ovrM = ovrF ? {title:(ovrF.inc?'Include ':'Exclude ')+ovrList.length+' '+(ovrF.kind==='store'?'store':'SKU')+(ovrList.length>1?'s':'')+'?',
      body: ovrNeed+' of '+ovrList.length+' go'+(ovrNeed===1?'es':'')+' against the recommendation. Record why; it is kept with the plan and shown at approval.',
      names: ovrList.slice(0,6).map(x=>ovrF.kind==='store' ? x.name : x.name).join(', ')+(ovrList.length>6 ? ' and '+(ovrList.length-6)+' more' : ''),
      reasons:(ovrF.inc ? REASONS_INC : REASONS_EXC).map(r=>({label:r, pressed:ovrF.reason===r?'true':'false', pick:()=>this.setState(st=>({ovrForm:{...st.ovrForm, reason:r}})), style:radioCard(ovrF.reason===r), dotStyle:radioDot(ovrF.reason===r)})),
      note:ovrF.note, setNote:e=>{ const v = e.target.value; this.setState(st=>({ovrForm:{...st.ovrForm, note:v}})); },
      okT:(ovrF.inc?'Include':'Exclude')+' with reason', okCls:'dr-btn dr-btn--primary dr-btn--sm'+(ovrF.reason?'':' dr-btn--disabled'), ok:()=>{ if (ovrF.reason) applyOvr(ovrF.kind, ovrF.ids, ovrF.inc, ovrF.reason, ovrF.note.trim()); }}
      : {title:'', body:'', names:'', reasons:[], note:'', setNote:()=>{}, okT:'', okCls:'', ok:()=>{}};

    const NEWV = {
      isHome, isWs, isWiz, goHome:()=>this.setState({view:'home', dsOpen:false, modal:null}), startNew:()=>this.startNew(),
      crumbHomeStyle: isHome ? {border:0,background:'transparent',padding:0,font:'inherit',fontFamily:'var(--dr-font-display)',fontSize:'19px',fontWeight:600,color:'var(--dr-ink)',cursor:'default'} : {border:0,background:'transparent',padding:0,font:'inherit',fontSize:'14px',fontWeight:500,color:'var(--dr-ink-3)',cursor:'pointer'},
      hasCrumb:!isHome, crumbT: isWiz ? (curLife==='Draft' && !s.runName ? 'New event' : evName)+' · setup' : evName,
      hSum, hFilters, hHeads, hTable, hEmpty:hTable.length===0, hQ:hf.q, setHQ:e=>{ const v = e.target.value; this.setState(st=>({hf:{...st.hf, q:v}})); }, hAttnOn:hf.f==='Attention', hClearAttn:()=>this.setState(st=>({hf:{...st.hf, f:'All'}})),
      hCountT: hTable.length+' of '+hRows.length+' events',
      attn, noAttn:attn.length===0, attnCount: attn.length+' item'+(attn.length===1?'':'s'), hTl, hTodayStyle, hTodayLabelStyle,
      wh, wsTabs, showWsStart: isWs && s.screen==='wsStart', showWsSetup: isWs && s.screen==='wsSetup', wsSteps, wsSetupT: wz.done.length+' of 7 steps complete'+(wz.savedAt?' · saved '+wz.savedAt:''), wsStartFacts, wsStartWhy, wsContinue:openWiz(curP.id),
      wsStartGo:openWiz(curP.id,1), showEligSeg: isWs && s.screen==='elig', eligSegs, eligLiveNote: isWs && curLife==='Active' && s.screen==='elig',
      wzSteps, wzTitle: s.runName || 'New event', wzLife:curLife, wzLifeCls:LIFE_CLS[curLife], wzSavedT: wz.savedAt ? 'Draft saved · '+wz.savedAt : 'Not saved yet', wzFootT,
      wzHasBack: wStep>1, wzBack:()=>goStep(wStep-1), wzSave:()=>saveDraft(), wzExit:()=>{ if (s.pendingNew && s.pendingNew.id===s.evId && !(s.runName||'').trim()){ this.setState({view:'home'}); return; } saveDraft(); this.setState({view:'home'}); },
      wzNotLast: wStep<7, wzIsLast: wStep===7, wzNext, wzNextT:'Next: '+(WZ_STEPS[wStep]||''), wzNextCls:'dr-btn dr-btn--primary dr-btn--sm', wzErrShow: s.wzTried===wStep && !!wzErrs[wStep], wzErr: wzErrs[wStep]||'',
      wzSubmit:submitAppr, wzApprove:approveLock, wzSubmitCls:'dr-btn dr-btn--secondary dr-btn--sm'+(wz.submitted||locked?' dr-btn--disabled':''), wzSubmitT: wz.submitted ? 'Submitted' : 'Submit for approval',
      wzApproveCls:'dr-btn dr-btn--primary dr-btn--sm'+(canApprove?'':' dr-btn--disabled'), wzApproveT: locked ? 'Plan locked' : 'Approve & lock plan',
      showS1: isWiz && wStep===1, wzTypes, wzFreq, wzEvDay:wz.evDay, setWzEvDay:e=>this.setWz({evDay:e.target.value}), wzShowEvDay: wz.type!=='Clearance',
      wzSellEnd: wz.sellEnd || iso(addD(d1,-14)), setWzSellEnd:e=>this.setWz({sellEnd:e.target.value}), wzShowClr: wz.type!=='Clearance', wzClrOn:clrOn?'true':'false', wzClrToggle:()=>this.setWz(w=>({clr:!w.clr, sellEnd: w.sellEnd || iso(addD(d1,-14))})), wzClrTrack:clrW.track, wzClrKnob:clrW.knob, wzShowSellEnd:clrOn,
      wzPeriodT:'Selling: '+sellT+' · Clearance: '+clrT, wzFloor:wz.floor, setWzFloor:e=>this.setWz({floor:e.target.value}), wzMaxDisc:String(wz.maxDisc), setMaxDisc, wzAuth:wz.auth, setWzAuth:e=>this.setWz({auth:e.target.value}),
      showStoresBlk: (isWiz && wStep===2) || (isWs && s.screen==='elig' && s.eligSub==='stores'), stSum, stRuleT, stByFmt, stHeads, stGroups, stShownT: stShown.length+' of '+STORE_MASTER.length+' shown', stEmpty:stShown.length===0,
      sfQ:sf.q, setSfQ:e=>{ const v = e.target.value; setSf({q:v}); }, sfSt:sf.st, setSfSt:e=>setSf({st:e.target.value}), stFilterOpts:ST_FILTERS, sfFmt:sf.fmt, setSfFmt:e=>setSf({fmt:e.target.value}), fmtOpts:FORMATS.map(f=>({value:f.id, label:f.label})),
      sfRegion:sf.region, setSfRegion:e=>setSf({region:e.target.value}), regionOpts:REGION_LIST, stGroupSeg:seg(sf.group, [['none','None'],['property','Property'],['format','Format'],['region','Region']], id=>setSf({group:id})),
      stHasSel: stSelIds.length>0, stSelT: stSelIds.length+' selected', stBulkInc:()=>ovrOpen('store', stSelIds, true), stBulkExc:()=>ovrOpen('store', stSelIds, false), stClearSel:()=>this.setWz({sel:{}}),
      stAllSel:allShownSel, stToggleAll:()=>this.setWz(w=>{ const sel = {...w.sel}; if (allShownSel) stShown.forEach(x=>{ delete sel[x.no]; }); else stShown.forEach(x=>{ sel[x.no] = true; }); return {sel}; }),
      showSkusBlk: (isWiz && wStep===3) || (isWs && s.screen==='elig' && s.eligSub==='skus'), kHeads, kRows, kEmpty:kRows.length===0, kShownT: kRows.length+' of '+SKU_MASTER.length+' shown', kDist, kDistT, kFmtHeads:fmtCnt.map(f=>({label:f.label, n:f.n+' stores'})),
      kfQ:kf.q, setKfQ:e=>{ const v = e.target.value; this.setWz(w=>({kf:{...w.kf, q:v}})); }, kfSt:kf.st, setKfSt:e=>{ const v = e.target.value; this.setWz(w=>({kf:{...w.kf, st:v}})); }, kFilterOpts:KF_FILTERS,
      kfMerch:kf.merch, setKfMerch:e=>{ const v = e.target.value; this.setWz(w=>({kf:{...w.kf, merch:v}})); }, merchOpts:MERCH.map(m=>m.id),
      kHasSel: kSelIds.length>0, kSelT: kSelIds.length+' selected', kBulkInc:()=>ovrOpen('sku', kSelIds, true), kBulkExc:()=>ovrOpen('sku', kSelIds, false), kClearSel:()=>this.setWz({ksel:{}}),
      kAllSel:allKSel, kToggleAll:()=>this.setWz(w=>{ const ksel = {...w.ksel}; if (allKSel) kShown.forEach(k=>{ delete ksel[k.id]; }); else kShown.forEach(k=>{ ksel[k.id] = true; }); return {ksel}; }),
      showMechBlk: (isWiz && wStep===4) || (isWs && s.screen==='elig' && s.eligSub==='mech'), mxHeads, mxRows, mxGrid, mxWeeks, mxDates, mxEmpty: mxRows.length===0, cflRows, noCfl: cflRows.length===0, cflCount: cfl.length ? cfl.length+' found' : 'None found',
      showFcBlk: (isWiz && wStep===5) || (isWs && s.screen==='forecast'), fcKpis, fcChart, fcRowsV, fcHasSel:!!fcSel, fcSelT: fcSel ? fcSel.name+' · '+fcSel.id : '', fcStores, fcCloseSel:()=>this.setWz({fcSku:null}), fcHasLy:FA.hasLy, fcSub: totalWeeks+' weeks · '+EM.incSkus.length+' SKUs × '+EM.incStores.length+' stores · '+EM.combos.toLocaleString()+' combinations',
      showS6: isWiz && wStep===6, swVal:String(swVal), swOpts, setSwitch, swHelp, lyDiff, lyName: pr.name, hasLyDiff: lyDiff.length>0,
      showRvBlk: (isWiz && wStep===7) || (isWs && (s.screen==='approval' || s.screen==='wsSetup')), rvBlocks, rvExc, noRvExc: rvExc.length===0, rvExcCount: rvExc.length ? rvExc.length+' to note' : 'None',
      apprSteps, rvAuth: AUTH_LBL[wz.auth], rvBlockers: blockers, rvHasBlockers: blockers.length>0 && !locked, rvShowActions: isWs && s.screen==='approval' && !locked, rvLocked: locked && (isWiz || s.screen==='approval'), rvLockWhen: locked ? stLock.when : '', rvLockT,
      rvShowOpen: isWiz, rvOpenWs: openEv(curP.id, {screen:'overview'}), rvCanUnlock: isWs && curLife==='Approved', rvUnlock:()=>this.setState(st=>({stLock:null, activity:pushLog(st, act('Strategy', 'Unlocked the approved plan for changes.', st.runName, 'Applied'))})),
      postHasVs: postVs.length>0, postVs,
      showOvrModal: s.modal==='ovr' && !!ovrF, ovrM, closeOvr:()=>this.setState({modal:null, ovrForm:null})
    };
