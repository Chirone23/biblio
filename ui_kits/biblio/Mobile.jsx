// Mobile frame showcase — iPhone-style bezels with key screens
function MobileFrames({ setRoute }) {
  return (
    <div>
      <div style={{textAlign:'center', marginBottom: 40}}>
        <div className="eyebrow" style={{marginBottom: 10}}>Mobile-first</div>
        <h1 className="display" style={{fontSize: 48, marginBottom: 12}}>Bibliò sul telefono</h1>
        <p className="lead" style={{maxWidth: 540, margin:'0 auto'}}>
          Il 90% del traffico arriva da mobile. L'interfaccia è pensata prima lì.
        </p>
      </div>

      <div style={{display:'flex', justifyContent:'center', gap: 36, flexWrap:'wrap'}}>
        <Phone label="Home">
          <PhoneHome/>
        </Phone>
        <Phone label="Scheda libro">
          <PhoneBook/>
        </Phone>
        <Phone label="MyBibliò">
          <PhoneChat/>
        </Phone>
      </div>
    </div>
  );
}

function Phone({ label, children }) {
  return (
    <div style={{textAlign:'center'}}>
      <div style={{
        width: 280, height: 580, borderRadius: 42, background:'#1a1a1a', padding: 10,
        boxShadow:'0 30px 60px rgba(42,42,42,0.25), 0 10px 20px rgba(42,42,42,0.12)',
        position:'relative'
      }}>
        <div style={{width:'100%', height:'100%', borderRadius:32, background:'var(--biblio-cream)', overflow:'hidden', position:'relative'}}>
          {/* Notch */}
          <div style={{position:'absolute', top:0, left:'50%', transform:'translateX(-50%)',
            width: 110, height: 24, background:'#1a1a1a', borderRadius:'0 0 14px 14px', zIndex:10}}/>
          {/* Status bar */}
          <div style={{display:'flex', justifyContent:'space-between', padding:'8px 22px 0', fontSize:11, fontWeight:600, color:'var(--fg)'}}>
            <span>9:41</span>
            <span>●●● 100%</span>
          </div>
          <div style={{height: 'calc(100% - 24px)', overflow:'hidden', position:'relative'}}>
            {children}
          </div>
        </div>
      </div>
      <div style={{marginTop: 14, font:'500 13px var(--font-sans)', color:'var(--fg-muted)'}}>{label}</div>
    </div>
  );
}

function PhoneHome() {
  const books = window.BIBLIO_BOOKS.slice(0,4);
  return (
    <div style={{padding:'14px 16px', fontSize:11, height:'100%', overflow:'hidden'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14}}>
        <span style={{font:'700 20px var(--font-display)', color:'var(--fg)'}}>Bibli<span style={{color:'var(--biblio-coral)'}}>ò</span></span>
        <div style={{display:'flex', gap:10}}><span>🔍</span><span>🛒</span></div>
      </div>
      <div style={{fontFamily:'var(--font-display)', fontWeight:700, fontSize:22, lineHeight:1.15, color:'var(--fg)', marginBottom:4}}>
        La tua biblioteca<br/>in un click.
      </div>
      <div style={{fontSize:10, color:'var(--fg-soft)', marginBottom:12, lineHeight:1.4}}>
        Acquista, noleggia o chiedi a MyBibliò.
      </div>
      <button style={{background:'var(--biblio-coral)', color:'#fff', border:'none', borderRadius:6, padding:'7px 12px', fontSize:10, fontWeight:500, marginBottom:14, width:'100%'}}>Esplora il catalogo</button>
      <div style={{font:'700 9px var(--font-sans)', color:'var(--biblio-coral)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:8}}>In evidenza</div>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
        {books.map(b => (
          <div key={b.id} style={{background:'#fff', border:'1px solid var(--border)', borderRadius:6, padding:6}}>
            <div style={{marginBottom:5}}><BookCover book={b} size="sm"/></div>
            <div style={{fontFamily:'var(--font-serif)', fontStyle:'italic', fontSize:9.5, lineHeight:1.15, color:'var(--fg)'}}>{b.title}</div>
            <div style={{fontSize:8, color:'var(--fg-muted)', marginTop:1}}>{b.author}</div>
            <div style={{font:'600 10px var(--font-sans)', color:'var(--biblio-coral)', marginTop:3}}>{b.price.toFixed(2).replace('.',',')}€</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PhoneBook() {
  const b = window.BIBLIO_BOOKS[1];
  return (
    <div style={{padding:'10px 14px', height:'100%', overflow:'hidden', fontSize:11}}>
      <div style={{fontSize:9, color:'var(--biblio-coral)', marginBottom:8}}>← Catalogo</div>
      <div style={{display:'flex', justifyContent:'center', marginBottom:12}}>
        <div style={{width:120}}><BookCover book={b} size="md"/></div>
      </div>
      <div style={{font:'600 8px var(--font-sans)', color:'var(--biblio-coral)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:4}}>{b.genre} · {b.year}</div>
      <div className="book-title" style={{fontSize:16, lineHeight:1.15, marginBottom:2}}>{b.title}</div>
      <div style={{fontSize:10, color:'var(--fg-soft)', marginBottom:8}}>di <b>{b.author}</b></div>
      <div style={{fontSize:9, color:'var(--fg-muted)', marginBottom:12}}>⭐ {b.rating} · {b.pages} pagine · ISBN •••567-5</div>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:6, marginBottom:8}}>
        <div style={{border:'1px solid var(--border)', borderRadius:6, padding:8, background:'#fff'}}>
          <div style={{fontSize:7, color:'var(--biblio-coral)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.06em'}}>🛒 Acquista</div>
          <div style={{font:'700 14px var(--font-display)', color:'var(--biblio-coral)', marginTop:2}}>{b.price.toFixed(2).replace('.',',')}€</div>
          <button style={{background:'var(--biblio-coral)', color:'#fff', border:'none', borderRadius:4, padding:'6px', fontSize:9, fontWeight:500, marginTop:6, width:'100%'}}>Aggiungi</button>
        </div>
        <div style={{border:'1px solid var(--biblio-rent)', borderRadius:6, padding:8, background:'#fff'}}>
          <div style={{fontSize:7, color:'var(--biblio-rent)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.06em'}}>📦 Noleggia</div>
          <div style={{font:'700 14px var(--font-display)', color:'var(--biblio-rent)', marginTop:2}}>{b.rent.toFixed(2).replace('.',',')}€</div>
          <button style={{background:'var(--biblio-rent)', color:'var(--biblio-cream)', border:'none', borderRadius:4, padding:'6px', fontSize:9, fontWeight:500, marginTop:6, width:'100%'}}>30 giorni</button>
        </div>
      </div>
    </div>
  );
}

function PhoneChat() {
  return (
    <div style={{display:'flex', flexDirection:'column', height:'100%'}}>
      <div style={{background:'var(--biblio-ink)', color:'var(--biblio-cream)', padding:'10px 14px', display:'flex', gap:8, alignItems:'center'}}>
        <div style={{width:24, height:24, borderRadius:'50%', background:'var(--biblio-coral)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11}}>✨</div>
        <div style={{flex:1}}>
          <div style={{font:'600 11px var(--font-sans)'}}>MyBibliò</div>
          <div style={{fontSize:9, color:'rgba(245,241,232,0.6)'}}>● Online</div>
        </div>
        <span style={{color:'rgba(245,241,232,0.6)', fontSize:16}}>×</span>
      </div>
      <div style={{flex:1, padding:12, background:'var(--biblio-cream)', display:'flex', flexDirection:'column', gap:6, overflow:'hidden'}}>
        <div style={{alignSelf:'flex-start', background:'#fff', border:'1px solid var(--border)', borderRadius:'10px 10px 10px 2px', padding:'7px 10px', fontSize:10, lineHeight:1.4, maxWidth:'80%'}}>
          Ciao ✨ Raccontami cosa cerchi: un genere, un'emozione, un budget.
        </div>
        <div style={{alignSelf:'flex-end', background:'var(--biblio-coral)', color:'#fff', borderRadius:'10px 10px 2px 10px', padding:'7px 10px', fontSize:10, maxWidth:'80%'}}>
          Un romanzo italiano per l'estate
        </div>
        <div style={{alignSelf:'flex-start', background:'#fff', border:'1px solid var(--border)', borderRadius:'10px 10px 10px 2px', padding:'7px 10px', fontSize:10, lineHeight:1.4, maxWidth:'85%'}}>
          Ti consiglio <i>Le otto montagne</i> di Paolo Cognetti.
        </div>
        <div style={{alignSelf:'flex-start', background:'#fff', border:'1px solid var(--border)', borderRadius:6, padding:6, display:'flex', gap:6, maxWidth:'85%'}}>
          <div style={{width:28}}><BookCover book={window.BIBLIO_BOOKS[0]} size="sm"/></div>
          <div style={{flex:1, minWidth:0}}>
            <div className="book-title" style={{fontSize:9, lineHeight:1.1}}>Le otto montagne</div>
            <div style={{fontSize:8, color:'var(--fg-muted)'}}>Paolo Cognetti</div>
            <div style={{display:'flex', gap:6, marginTop:2}}>
              <span style={{fontSize:9, color:'var(--biblio-coral)', fontWeight:600}}>16,50€</span>
              <span style={{fontSize:8, color:'var(--biblio-rent)'}}>📦 3,50€</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{padding:8, background:'#fff', borderTop:'1px solid var(--border)', display:'flex', gap:5}}>
        <div style={{flex:1, background:'var(--biblio-cream-deep)', borderRadius:999, padding:'6px 10px', fontSize:9, color:'var(--fg-muted)'}}>Scrivi…</div>
        <div style={{width:22, height:22, borderRadius:'50%', background:'var(--biblio-coral)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:10}}>→</div>
      </div>
    </div>
  );
}

window.MobileFrames = MobileFrames;
