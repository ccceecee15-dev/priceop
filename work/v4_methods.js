  ctxSnap(st){ const o = {}; CTX_KEYS.forEach(k=>{ o[k] = st[k]; }); return o; }
  setWz(patch){ this.setState(st=>({wz:{...st.wz, ...(typeof patch==='function' ? patch(st.wz) : patch)}})); }
  loadCtx(st, id, p){
    if (st.evId===id) return {};
    const ctx = {...st.ctx, [st.evId]: this.ctxSnap(st)};
    const nx = ctx[id] || seedCtx(p);
    return {ctx, evId:id, ...nx, dsOpen:false, modal:null};
  }
  openEvent(id, extra){
    this.setState(st=>{ const p = portfolioOf(st).find(x=>x.id===id) || (st.pendingNew && st.pendingNew.id===id ? st.pendingNew : null); if (!p) return null;
      return {...this.loadCtx(st, id, p), view:'ws', ...(extra||{})}; });
    if (typeof window!=='undefined') window.scrollTo(0,0);
  }
  openWizard(id, step){
    this.setState(st=>{ const p = portfolioOf(st).find(x=>x.id===id) || (st.pendingNew && st.pendingNew.id===id ? st.pendingNew : null); if (!p) return null;
      const patch = this.loadCtx(st, id, p), w = patch.wz || st.wz;
      return {...patch, view:'wizard', wz:{...w, step: step || w.step || 1}, wzTried:null}; });
    if (typeof window!=='undefined') window.scrollTo(0,0);
  }
  startNew(){
    this.setState(st=>{ const id = 'ne'+(st.newN+1);
      const p = {id, name:'', type:'Seasonal', start:'2026-11-30', end:'2026-12-28', evDay:'', life:'Draft', season:null, postRun:'hw25', isNew:true};
      const ctx = {...st.ctx, [st.evId]: this.ctxSnap(st)};
      return {ctx, evId:id, ...seedCtx(p), runName:'', view:'wizard', newN:st.newN+1, pendingNew:p, dsOpen:false, modal:null}; });
    if (typeof window!=='undefined') window.scrollTo(0,0);
  }
  ensureListed(st){ return st.pendingNew && st.pendingNew.id===st.evId ? {extra:[...(st.extra||[]), st.pendingNew], pendingNew:null} : {}; }
