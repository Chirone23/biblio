// Homepage
function Home({ setRoute, openBook }) {
  const featured = window.BIBLIO_BOOKS.slice(0, 6);
  const news = window.BIBLIO_BOOKS.slice(4, 10);

  return (
    <div>
      {/* Hero */}
      <section style={{
        display:'grid', gridTemplateColumns:'1.1fr 0.9fr', gap: 48, alignItems:'center',
        padding:'56px 0 72px', borderBottom:'1px solid var(--border)'
      }}>
        <div>
          <div className="eyebrow" style={{marginBottom:16}}>Bibliò · dal 2024</div>
          <h1 className="display" style={{marginBottom: 20, maxWidth: 520}}>
            La tua biblioteca<br/>in un click.
          </h1>
          <p className="lead" style={{maxWidth: 480, marginBottom: 32}}>
            Acquista, noleggia o fatti guidare da <b style={{color:'var(--fg)'}}>MyBibliò</b>.
            Oltre 50.000 titoli, consigli personalizzati, spedizione in 48 ore.
          </p>
          <div style={{display:'flex', gap:12, flexWrap:'wrap'}}>
            <button className="btn btn-primary btn-lg" onClick={()=>setRoute('catalog')}>
              Esplora il catalogo
            </button>
            <button className="btn btn-secondary btn-lg" onClick={()=>window.__openChat && window.__openChat()}>
              ✨ Chiedi a MyBibliò
            </button>
          </div>
        </div>

        <div style={{position:'relative', height: 420}}>
          {/* 3 floating book covers */}
          <div style={{position:'absolute', left: '18%', top: 20, transform:'rotate(-6deg)', width: 180}}>
            <BookCover book={featured[1]} size="md" />
          </div>
          <div style={{position:'absolute', left: '42%', top: 70, width: 200, zIndex:2}}>
            <BookCover book={featured[0]} size="md" />
          </div>
          <div style={{position:'absolute', right: '4%', top: 40, transform:'rotate(7deg)', width: 175}}>
            <BookCover book={featured[3]} size="md" />
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <div style={{display:'flex', justifyContent:'space-around', padding:'28px 0 48px', borderBottom:'1px solid var(--border)', marginBottom: 48, flexWrap:'wrap', gap: 24}}>
        {[
          ['50.000+', 'titoli disponibili'],
          ['48 ore', 'consegna in Italia'],
          ['30 giorni', 'noleggio flessibile'],
          ['⭐ 4,8/5', 'giudizio dei lettori']
        ].map(([n, l]) => (
          <div key={l} style={{textAlign:'center'}}>
            <div style={{font:'500 28px var(--font-serif)', color:'var(--fg)'}}>{n}</div>
            <div className="meta" style={{marginTop:4}}>{l}</div>
          </div>
        ))}
      </div>

      <Section eyebrow="In evidenza" title="Selezione della settimana"
        action={<button className="btn btn-ghost" onClick={()=>setRoute('catalog')}>Vedi tutti →</button>}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(6, 1fr)', gap: 18}}>
          {featured.map(b => <BookCard key={b.id} book={b} onOpen={openBook} compact />)}
        </div>
      </Section>

      <Section eyebrow="Esplora" title="Categorie">
        <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 14}}>
          {window.BIBLIO_CATEGORIES.map(c => (
            <div key={c.id} onClick={()=>setRoute('catalog')} style={{
              background:'#fff', border:'1px solid var(--border)', borderRadius:'var(--r-md)',
              padding:'20px 22px', cursor:'pointer', display:'flex', alignItems:'center', gap:14,
              transition:'all var(--dur-base) var(--ease-out)'
            }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--biblio-navy)'; e.currentTarget.style.background='var(--biblio-cream-deep)';}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.background='#fff';}}>
              <span style={{fontSize:26}}>{c.icon}</span>
              <div>
                <div style={{font:'500 16px var(--font-serif)', color:'var(--fg)'}}>{c.name}</div>
                <div className="meta">{c.count.toLocaleString('it-IT')} titoli</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Plus banner */}
      <section style={{
        background:'var(--biblio-ink)', borderRadius:'var(--r-lg)', padding:'40px 48px',
        display:'flex', alignItems:'center', gap: 40, color:'var(--biblio-cream)', marginBottom: 64, flexWrap:'wrap'
      }}>
        <div style={{flex: 1, minWidth: 280}}>
          <span style={{background:'var(--biblio-gold)', color:'var(--biblio-ink)',
            font:'700 11px var(--font-sans)', padding:'5px 10px', borderRadius:'var(--r-pill)',
            letterSpacing:'0.08em', textTransform:'uppercase'}}>✨ Plus</span>
          <h2 style={{color:'var(--biblio-cream)', marginTop:14, marginBottom: 8, fontSize: 36}}>
            Leggi di più, spendi meno.
          </h2>
          <p style={{color:'rgba(245,241,232,0.75)', fontSize:16, maxWidth:440}}>
            <b style={{color:'var(--biblio-gold)'}}>9,99€/mese.</b> 2 noleggi inclusi,
            spedizione gratuita, zero pubblicità, accesso anticipato alle novità.
          </p>
        </div>
        <button className="btn btn-lg" style={{background:'var(--biblio-gold)', color:'var(--biblio-ink)'}}
          onClick={()=>setRoute('plus')}>
          Attiva Plus →
        </button>
      </section>

      <Section eyebrow="Appena arrivati" title="Novità editoriali"
        action={<button className="btn btn-ghost" onClick={()=>setRoute('catalog')}>Tutte le novità →</button>}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(6, 1fr)', gap: 18}}>
          {news.map(b => <BookCard key={b.id} book={b} onOpen={openBook} compact />)}
        </div>
      </Section>
    </div>
  );
}

window.Home = Home;
