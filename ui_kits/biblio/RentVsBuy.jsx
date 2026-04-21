// Noleggio vs Acquisto comparison
function RentVsBuy({ setRoute }) {
  const rows = [
    ['Prezzo medio','16,50€','3,20€ / 30gg'],
    ['Possesso','Tuo per sempre','Restituisci dopo 30gg'],
    ['Spedizione','48h · gratis con Plus','48h andata + ritiro ritorno gratuito'],
    ['Evidenziare / annotare','Sì','No (restituzione in buono stato)'],
    ['Incluso in Plus','Sconto 5%','2 noleggi/mese inclusi'],
    ['Ideale per','Libri che rileggerai','Prova, curiosità, una lettura sola'],
  ];
  return (
    <div>
      <div style={{textAlign:'center', marginBottom: 48}}>
        <div className="eyebrow" style={{marginBottom: 10}}>Decidi in 30 secondi</div>
        <h1 className="display" style={{fontSize: 54, marginBottom: 14}}>Noleggio o acquisto?</h1>
        <p className="lead" style={{maxWidth: 560, margin:'0 auto'}}>
          Due modi di leggere, una sola piattaforma. Scegli quello giusto per il libro giusto.
        </p>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap: 24, marginBottom: 48}}>
        <div style={{background:'#fff', border:'1px solid var(--border)', borderRadius:'var(--r-lg)', padding: 32}}>
          <div style={{fontSize:32, marginBottom:10}}>🛒</div>
          <h2 style={{color:'var(--biblio-coral)', marginBottom: 8}}>Acquista</h2>
          <p style={{color:'var(--fg-soft)', lineHeight:1.6, marginBottom: 20}}>
            Il libro diventa tuo. Annotalo, prestalo, rileggilo fra dieci anni.
          </p>
          <div style={{font:'700 36px var(--font-display)', color:'var(--fg)'}}>da 9,90€</div>
          <button className="btn btn-primary btn-block" style={{marginTop: 18}} onClick={()=>setRoute('catalog')}>
            Esplora catalogo acquisto →
          </button>
        </div>
        <div style={{background:'#fff', border:'1px solid var(--biblio-rent)', borderRadius:'var(--r-lg)', padding: 32}}>
          <div style={{fontSize:32, marginBottom:10}}>📦</div>
          <h2 style={{color:'var(--biblio-rent)', marginBottom: 8}}>Noleggia</h2>
          <p style={{color:'var(--fg-soft)', lineHeight:1.6, marginBottom: 20}}>
            30 giorni di lettura, poi lo restituisci. Perfetto per provare.
          </p>
          <div style={{font:'700 36px var(--font-display)', color:'var(--fg)'}}>da 2,20€ <span style={{fontSize:16, color:'var(--fg-muted)'}}>/ 30gg</span></div>
          <button className="btn btn-rent btn-block" style={{marginTop: 18}} onClick={()=>setRoute('catalog')}>
            Esplora libri noleggiabili →
          </button>
        </div>
      </div>

      <div style={{background:'#fff', border:'1px solid var(--border)', borderRadius:'var(--r-lg)', overflow:'hidden'}}>
        <div style={{display:'grid', gridTemplateColumns:'1.2fr 1fr 1fr', background:'var(--biblio-cream-deep)', padding:'14px 24px'}}>
          <div></div>
          <div style={{font:'700 13px var(--font-sans)', color:'var(--biblio-coral)', textTransform:'uppercase', letterSpacing:'0.08em'}}>🛒 Acquisto</div>
          <div style={{font:'700 13px var(--font-sans)', color:'var(--biblio-rent)', textTransform:'uppercase', letterSpacing:'0.08em'}}>📦 Noleggio</div>
        </div>
        {rows.map(([l, a, b], i) => (
          <div key={l} style={{display:'grid', gridTemplateColumns:'1.2fr 1fr 1fr',
            padding:'16px 24px', borderTop: i>0 ? '1px solid var(--border)' : 'none', alignItems:'center'}}>
            <div style={{font:'500 14px var(--font-sans)', color:'var(--fg)'}}>{l}</div>
            <div style={{font:'400 14px var(--font-sans)', color:'var(--fg-soft)'}}>{a}</div>
            <div style={{font:'400 14px var(--font-sans)', color:'var(--fg-soft)'}}>{b}</div>
          </div>
        ))}
      </div>

      <p style={{textAlign:'center', marginTop: 32, color:'var(--fg-soft)'}}>
        Ancora indiziosa? <span style={{color:'var(--biblio-coral)', cursor:'pointer', textDecoration:'underline'}} onClick={()=>window.__openChat && window.__openChat()}>Chiedi a MyBibliò</span>, ti aiuta a scegliere.
      </p>
    </div>
  );
}

window.RentVsBuy = RentVsBuy;
