// Plus subscription landing
function PlusPage({ setRoute }) {
  return (
    <div>
      <div style={{background:'var(--biblio-ink)', color:'var(--biblio-cream)', borderRadius:'var(--r-lg)',
        padding:'56px 48px', marginBottom: 56, display:'grid', gridTemplateColumns:'1.2fr 1fr', gap: 40, alignItems:'center'}}>
        <div>
          <span style={{background:'var(--biblio-gold)', color:'var(--biblio-ink)',
            font:'700 11px var(--font-sans)', padding:'5px 10px', borderRadius:'var(--r-pill)',
            letterSpacing:'0.08em', textTransform:'uppercase'}}>✨ Bibliò Plus</span>
          <h1 className="display" style={{color:'var(--biblio-cream)', marginTop: 18, marginBottom: 16, fontSize: 52}}>
            Leggi di più,<br/>spendi meno.
          </h1>
          <p style={{color:'rgba(245,241,232,0.8)', fontSize:18, lineHeight:1.65, maxWidth: 460, marginBottom: 30}}>
            Un abbonamento pensato per chi legge davvero: 2 noleggi inclusi ogni mese,
            spedizione sempre gratuita, zero pubblicità.
          </p>
          <div style={{display:'flex', alignItems:'baseline', gap: 12, marginBottom: 28}}>
            <span style={{font:'500 56px var(--font-serif)', color:'var(--biblio-gold)'}}>9,99€</span>
            <span style={{color:'rgba(245,241,232,0.6)'}}>/ mese · disdici quando vuoi</span>
          </div>
          <button className="btn btn-lg" style={{background:'var(--biblio-gold)', color:'var(--biblio-ink)'}}>
            Attiva Plus →
          </button>
        </div>
        <div style={{display:'flex', gap: 12, justifyContent:'center'}}>
          <div style={{transform:'rotate(-5deg)'}}><BookCover book={window.BIBLIO_BOOKS[1]} size="md"/></div>
          <div style={{transform:'translateY(-20px)'}}><BookCover book={window.BIBLIO_BOOKS[5]} size="md"/></div>
          <div style={{transform:'rotate(5deg)'}}><BookCover book={window.BIBLIO_BOOKS[4]} size="md"/></div>
        </div>
      </div>

      <Section eyebrow="Cosa include" title="Tutto ciò che serve a chi legge.">
        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 20}}>
          {[
            ['📦','2 noleggi al mese','30 giorni ciascuno. Se non bastano, paghi solo il noleggio extra.'],
            ['🚚','Spedizione gratuita','Su tutti gli ordini cartacei, senza importo minimo.'],
            ['🔕','Zero pubblicità','Interfaccia pulita, nessun banner, nessun popup.'],
            ['✨','MyBibliò prioritario','Risposte più veloci e consigli più dettagliati.'],
            ['⚡','Anteprime novità','48 ore di anticipo sulle nuove uscite.'],
            ['💝','Regali illimitati','Regala libri a chi vuoi, MyBibliò sceglie con te.'],
          ].map(([ic, t, d]) => (
            <div key={t} style={{background:'#fff', border:'1px solid var(--border)', borderRadius:'var(--r-md)', padding: 24}}>
              <div style={{fontSize: 28, marginBottom: 12}}>{ic}</div>
              <h3 style={{fontSize: 19, marginBottom: 6}}>{t}</h3>
              <p className="meta" style={{lineHeight:1.55}}>{d}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

window.PlusPage = PlusPage;
