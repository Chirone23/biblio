// Catalog — filters + book grid
const { useState: useStateCat, useMemo } = React;

function Catalog({ openBook }) {
  const [cat, setCat] = useStateCat('all');
  const [format, setFormat] = useStateCat('all');
  const [sort, setSort] = useStateCat('rilevanza');
  const [query, setQuery] = useStateCat('');

  const filtered = useMemo(() => {
    let r = window.BIBLIO_BOOKS.slice();
    if (cat !== 'all') r = r.filter(b => b.genre.toLowerCase() === cat);
    if (format === 'rentable') r = r.filter(b => b.rentable);
    if (query.trim()) {
      const q = query.toLowerCase();
      r = r.filter(b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q));
    }
    if (sort === 'prezzo') r.sort((a,b) => a.price - b.price);
    else if (sort === 'rating') r.sort((a,b) => b.rating - a.rating);
    return r;
  }, [cat, format, sort, query]);

  return (
    <div>
      <div style={{marginBottom: 28}}>
        <div className="meta" style={{marginBottom: 8}}>
          <span style={{color:'var(--biblio-coral)', cursor:'pointer'}}>Home</span> › <b style={{color:'var(--fg)'}}>Catalogo</b>
        </div>
        <h1 style={{marginBottom: 8}}>Catalogo</h1>
        <p className="lead" style={{maxWidth: 620}}>Oltre 50.000 titoli: acquista, noleggia per 30 giorni, o lasciati guidare da MyBibliò.</p>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'260px 1fr', gap: 36}}>
        {/* Sidebar filters */}
        <aside style={{position:'sticky', top: 88, alignSelf:'start'}}>
          <div style={{marginBottom: 28}}>
            <div className="eyebrow" style={{marginBottom:10}}>Ricerca</div>
            <div style={{position:'relative'}}>
              <span style={{position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', fontSize:14}}>🔍</span>
              <input
                value={query} onChange={e=>setQuery(e.target.value)}
                placeholder="Autore, titolo, ISBN…"
                style={{width:'100%', padding:'11px 14px 11px 36px', border:'1px solid var(--border-strong)',
                  borderRadius:'var(--r-sm)', font:'400 14px var(--font-sans)', background:'#fff', boxSizing:'border-box'}}/>
            </div>
          </div>

          <FilterGroup label="Categoria" items={[
            {v:'all', l:'Tutte'},
            ...window.BIBLIO_CATEGORIES.slice(0,6).map(c=>({v:c.name.toLowerCase(), l:c.name, n:c.count}))
          ]} value={cat} onChange={setCat}/>

          <FilterGroup label="Formato" items={[
            {v:'all', l:'Tutti'},
            {v:'rentable', l:'Noleggiabili'},
            {v:'digital', l:'eBook'},
            {v:'paper', l:'Cartacei'}
          ]} value={format} onChange={setFormat}/>

          <div style={{marginTop: 20, padding: 16, background:'var(--biblio-cream-deep)', borderRadius:'var(--r-md)'}}>
            <div style={{font:'500 14px var(--font-serif)', marginBottom:4}}>Non trovi nulla?</div>
            <p className="meta" style={{marginBottom: 10}}>MyBibliò conosce tutto il catalogo. Raccontagli cosa cerchi.</p>
            <button className="btn btn-sm btn-primary" onClick={()=>window.__openChat && window.__openChat()}>
              ✨ Apri la chat
            </button>
          </div>
        </aside>

        {/* Results */}
        <div>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 20, paddingBottom: 14, borderBottom:'1px solid var(--border)'}}>
            <div className="meta"><b style={{color:'var(--fg)'}}>{filtered.length}</b> titoli</div>
            <div style={{display:'flex', alignItems:'center', gap:10}}>
              <span className="meta">Ordina per</span>
              <select value={sort} onChange={e=>setSort(e.target.value)} style={{
                border:'1px solid var(--border-strong)', background:'#fff', borderRadius:'var(--r-sm)',
                padding:'7px 10px', font:'400 13px var(--font-sans)', cursor:'pointer'
              }}>
                <option value="rilevanza">Rilevanza</option>
                <option value="prezzo">Prezzo crescente</option>
                <option value="rating">Valutazione</option>
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div style={{textAlign:'center', padding:60, color:'var(--fg-muted)'}}>
              <div style={{fontSize:40, marginBottom:12}}>📚</div>
              <p>Nessun risultato. Prova con un autore, un genere, o chiedi a MyBibliò.</p>
            </div>
          ) : (
            <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 20}}>
              {filtered.map(b => <BookCard key={b.id} book={b} onOpen={openBook} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ label, items, value, onChange }) {
  return (
    <div style={{marginBottom: 24}}>
      <div className="eyebrow" style={{marginBottom:10}}>{label}</div>
      <div style={{display:'flex', flexDirection:'column', gap:2}}>
        {items.map(it => (
          <label key={it.v} style={{
            display:'flex', alignItems:'center', gap:10, padding:'7px 8px',
            borderRadius:'var(--r-sm)', cursor:'pointer',
            background: value===it.v ? 'var(--biblio-cream-deep)' : 'transparent',
            color: value===it.v ? 'var(--biblio-coral)' : 'var(--fg)',
            font: value===it.v ? '500 14px var(--font-sans)' : '400 14px var(--font-sans)'
          }}>
            <input type="radio" checked={value===it.v} onChange={()=>onChange(it.v)} style={{accentColor:'var(--biblio-coral)'}}/>
            <span style={{flex:1}}>{it.l}</span>
            {it.n && <span className="meta">{it.n.toLocaleString('it-IT')}</span>}
          </label>
        ))}
      </div>
    </div>
  );
}

window.Catalog = Catalog;
