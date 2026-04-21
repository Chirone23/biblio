// Account area
const { useState: useStateAcc } = React;

function Account({ openBook }) {
  const [tab, setTab] = useStateAcc('ordini');
  const wishlist = window.BIBLIO_BOOKS.slice(2, 6);

  return (
    <div>
      <div style={{marginBottom: 32}}>
        <div className="eyebrow" style={{marginBottom: 10}}>Area personale</div>
        <h1>Ciao, Giulia 👋</h1>
        <p className="lead" style={{maxWidth: 540, marginTop: 6}}>
          Gestisci i tuoi ordini, noleggi attivi, lista desideri e abbonamento Plus.
        </p>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'240px 1fr', gap: 40}}>
        <aside>
          <nav style={{display:'flex', flexDirection:'column', gap:2}}>
            {[
              ['ordini','🛒 Ordini'],
              ['noleggi','📦 Noleggi attivi'],
              ['wishlist','❤️ Lista desideri'],
              ['plus','✨ Abbonamento Plus'],
              ['impostazioni','⚙️ Impostazioni'],
            ].map(([k,l]) => (
              <button key={k} onClick={()=>setTab(k)} style={{
                textAlign:'left', padding:'11px 14px', border:'none',
                background: tab===k ? 'var(--biblio-cream-deep)' : 'transparent',
                color: tab===k ? 'var(--biblio-coral)' : 'var(--fg)',
                font: tab===k ? '500 14px var(--font-sans)' : '400 14px var(--font-sans)',
                borderRadius:'var(--r-sm)', cursor:'pointer'
              }}>{l}</button>
            ))}
          </nav>
        </aside>

        <div>
          {tab==='ordini' && <OrderList />}
          {tab==='noleggi' && <RentalList />}
          {tab==='wishlist' && (
            <div>
              <h2 style={{marginBottom: 20}}>Lista desideri</h2>
              <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 18}}>
                {wishlist.map(b => <BookCard key={b.id} book={b} onOpen={openBook}/>)}
              </div>
            </div>
          )}
          {tab==='plus' && <PlusTab />}
          {tab==='impostazioni' && <SettingsTab />}
        </div>
      </div>
    </div>
  );
}

function OrderList() {
  const orders = [
    { id:'#BBL-23491', date:'18 apr 2026', status:'Consegnato', total:'32,40€', items:2 },
    { id:'#BBL-23120', date:'04 apr 2026', status:'Spedito', total:'18,90€', items:1 },
    { id:'#BBL-22845', date:'22 mar 2026', status:'Consegnato', total:'46,70€', items:3 },
  ];
  return (
    <div>
      <h2 style={{marginBottom: 20}}>Storico ordini</h2>
      <div style={{background:'#fff', border:'1px solid var(--border)', borderRadius:'var(--r-md)', overflow:'hidden'}}>
        {orders.map((o, i) => (
          <div key={o.id} style={{
            padding:'18px 22px', display:'grid', gridTemplateColumns:'1.4fr 1fr 1fr 0.8fr auto',
            gap: 20, alignItems:'center', borderBottom: i<orders.length-1 ? '1px solid var(--border)' : 'none'
          }}>
            <div>
              <div style={{font:'500 14px var(--font-sans)', color:'var(--fg)'}}>{o.id}</div>
              <div className="meta">{o.items} articol{o.items>1?'i':'o'}</div>
            </div>
            <div className="meta">{o.date}</div>
            <div>
              <span style={{
                background: o.status==='Consegnato' ? 'rgba(74,122,92,0.12)' : 'rgba(196,160,98,0.18)',
                color: o.status==='Consegnato' ? 'var(--biblio-success)' : 'var(--biblio-gold)',
                padding:'4px 10px', borderRadius:'var(--r-pill)', font:'500 12px var(--font-sans)'
              }}>{o.status}</span>
            </div>
            <div style={{font:'600 15px var(--font-sans)', color:'var(--fg)'}}>{o.total}</div>
            <button className="btn btn-sm btn-ghost">Dettagli →</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function RentalList() {
  const rentals = [
    { title:'Le città invisibili', author:'Italo Calvino', due:'24 mag 2026', daysLeft: 18, coverIdx:3 },
    { title:'Sostiene Pereira', author:'Antonio Tabucchi', due:'02 mag 2026', daysLeft: 6, coverIdx:2 },
  ];
  return (
    <div>
      <h2 style={{marginBottom: 6}}>Noleggi attivi</h2>
      <p className="meta" style={{marginBottom: 24}}>I libri tornano a casa entro 30 giorni dal ritiro. Ritiro gratuito con Plus.</p>
      <div style={{display:'flex', flexDirection:'column', gap: 14}}>
        {rentals.map((r,i) => (
          <div key={i} style={{
            background:'#fff', border:'1px solid var(--border)', borderRadius:'var(--r-md)',
            padding: 20, display:'flex', gap: 22, alignItems:'center'
          }}>
            <div style={{width: 70, flexShrink:0}}>
              <BookCover book={r} size="sm" />
            </div>
            <div style={{flex:1}}>
              <div className="book-title" style={{fontSize:18, marginBottom:2}}>{r.title}</div>
              <div className="meta">{r.author}</div>
              <div style={{marginTop:10, display:'flex', alignItems:'center', gap:12}}>
                <span className="meta">Restituzione entro <b style={{color:'var(--fg)'}}>{r.due}</b></span>
                <span style={{
                  font:'500 12px var(--font-sans)',
                  color: r.daysLeft < 7 ? 'var(--biblio-coral)' : 'var(--biblio-rent)',
                  background: r.daysLeft < 7 ? 'rgba(199,85,80,0.1)' : 'var(--biblio-rent-soft)',
                  padding:'3px 10px', borderRadius:'var(--r-pill)'
                }}>📦 {r.daysLeft} giorni</span>
              </div>
            </div>
            <button className="btn btn-secondary btn-sm">Rinnova</button>
            <button className="btn btn-primary btn-sm">Restituisci →</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlusTab() {
  return (
    <div style={{background:'var(--biblio-ink)', borderRadius:'var(--r-lg)', padding: 40, color:'var(--biblio-cream)'}}>
      <span style={{background:'var(--biblio-gold)', color:'var(--biblio-ink)',
        font:'700 11px var(--font-sans)', padding:'5px 10px', borderRadius:'var(--r-pill)',
        letterSpacing:'0.08em', textTransform:'uppercase'}}>✨ Bibliò Plus attivo</span>
      <h2 style={{color:'var(--biblio-cream)', marginTop:14, fontSize: 32}}>Hai Plus dal 12 gennaio 2026</h2>
      <p style={{color:'rgba(245,241,232,0.75)', marginTop:10, marginBottom: 28, maxWidth: 540}}>
        Stai risparmiando in media 14€ al mese. Il prossimo rinnovo è il <b style={{color:'var(--biblio-gold)'}}>12 maggio 2026</b>.
      </p>
      <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 14}}>
        {[
          ['2', 'noleggi inclusi questo mese (1 usato)'],
          ['Gratis', 'spedizione su tutti gli ordini'],
          ['0', 'pubblicità mostrate'],
        ].map(([n, l]) => (
          <div key={l} style={{background:'rgba(245,241,232,0.06)', borderRadius:'var(--r-md)', padding: 20}}>
            <div style={{font:'500 26px var(--font-serif)', color:'var(--biblio-gold)'}}>{n}</div>
            <div style={{font:'400 13px var(--font-sans)', color:'rgba(245,241,232,0.75)', marginTop:6}}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{marginTop: 28, display:'flex', gap: 12}}>
        <button className="btn" style={{background:'var(--biblio-gold)', color:'var(--biblio-ink)'}}>Gestisci pagamento</button>
        <button className="btn" style={{background:'transparent', color:'rgba(245,241,232,0.7)', border:'1px solid rgba(245,241,232,0.2)'}}>Disdici Plus</button>
      </div>
    </div>
  );
}

function SettingsTab() {
  return (
    <div>
      <h2 style={{marginBottom: 20}}>Accessibilità e lettura</h2>
      <div style={{background:'#fff', border:'1px solid var(--border)', borderRadius:'var(--r-md)', padding: 24, display:'flex', flexDirection:'column', gap:20}}>
        <Row label="Grandezza testo" control={
          <div style={{display:'flex', gap:4, border:'1px solid var(--border)', borderRadius:'var(--r-sm)', padding:3}}>
            <button className="btn btn-sm" style={{padding:'6px 12px', background:'transparent', color:'var(--fg)'}}>A−</button>
            <button className="btn btn-sm btn-primary" style={{padding:'6px 12px'}}>A</button>
            <button className="btn btn-sm" style={{padding:'6px 12px', background:'transparent', color:'var(--fg)'}}>A+</button>
          </div>
        }/>
        <Row label="Alto contrasto" control={<Toggle on={false}/>}/>
        <Row label="Modalità scura" control={<Toggle on={true}/>}/>
        <Row label="Email di consigli MyBibliò" control={<Toggle on={true}/>}/>
      </div>
    </div>
  );
}

function Row({label, control}) {
  return (
    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
      <span style={{font:'400 15px var(--font-sans)'}}>{label}</span>
      {control}
    </div>
  );
}
function Toggle({on}) {
  const [v, setV] = useStateAcc(on);
  return (
    <button onClick={()=>setV(!v)} style={{
      width: 44, height: 26, borderRadius:999, border:'none', cursor:'pointer',
      background: v ? 'var(--biblio-coral)' : 'var(--biblio-gray-2)',
      position:'relative', transition:'background var(--dur-base)'
    }}>
      <span style={{
        position:'absolute', top:3, left: v ? 21 : 3, width:20, height:20, borderRadius:'50%',
        background:'#fff', transition:'left var(--dur-base) var(--ease-out)', boxShadow:'var(--shadow-1)'
      }}/>
    </button>
  );
}

window.Account = Account;
