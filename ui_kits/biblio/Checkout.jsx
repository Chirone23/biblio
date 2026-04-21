// Checkout — 4-step flow
const { useState: useStateCk } = React;

function Checkout({ setRoute }) {
  const [step, setStep] = useStateCk(1);
  const steps = ['Carrello', 'Spedizione', 'Pagamento', 'Conferma'];
  const cart = [
    { id:'rosa', title:'Il nome della rosa', author:'Umberto Eco', price:18.90, type:'buy', coverIdx:0 },
    { id:'zeno', title:'La coscienza di Zeno', author:'Italo Svevo', price:2.90, type:'rent', days:30, coverIdx:1 },
  ];
  const subtotal = cart.reduce((s,i)=>s+i.price, 0);
  const shipping = 2.90;
  const total = subtotal + (step >= 2 ? shipping : 0);

  return (
    <div style={{maxWidth: 920, margin:'0 auto'}}>
      <div style={{marginBottom: 32}}>
        <div className="meta" style={{marginBottom:8}}>
          <span style={{color:'var(--biblio-coral)', cursor:'pointer'}} onClick={()=>setRoute('home')}>Home</span> › <b style={{color:'var(--fg)'}}>Checkout</b>
        </div>
        <h1>Checkout</h1>
      </div>

      {/* Stepper */}
      <div style={{display:'flex', alignItems:'center', marginBottom: 40, gap: 6}}>
        {steps.map((s, i) => (
          <React.Fragment key={s}>
            <div style={{display:'flex', alignItems:'center', gap: 10}}>
              <div style={{
                width: 28, height: 28, borderRadius:'50%',
                background: i+1 <= step ? 'var(--biblio-coral)' : 'var(--biblio-cream-deep)',
                color: i+1 <= step ? '#fff' : 'var(--fg-muted)',
                display:'flex', alignItems:'center', justifyContent:'center',
                font:'600 13px var(--font-sans)'
              }}>{i+1 < step ? '✓' : i+1}</div>
              <span style={{
                font: i+1===step ? '600 14px var(--font-sans)' : '400 14px var(--font-sans)',
                color: i+1 <= step ? 'var(--fg)' : 'var(--fg-muted)'
              }}>{s}</span>
            </div>
            {i < steps.length-1 && <div style={{flex:1, height:1, background: i+1 < step ? 'var(--biblio-coral)' : 'var(--border)'}}/>}
          </React.Fragment>
        ))}
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 320px', gap: 32, alignItems:'flex-start'}}>
        <div style={{background:'#fff', border:'1px solid var(--border)', borderRadius:'var(--r-lg)', padding: 28}}>
          {step === 1 && <StepCart cart={cart} />}
          {step === 2 && <StepShipping />}
          {step === 3 && <StepPayment />}
          {step === 4 && <StepConfirm setRoute={setRoute}/>}
        </div>

        {step < 4 && (
          <aside style={{background:'var(--biblio-cream-deep)', borderRadius:'var(--r-lg)', padding: 24, position:'sticky', top: 88}}>
            <h3 style={{marginBottom: 14}}>Riepilogo</h3>
            {cart.map(i => (
              <div key={i.id} style={{display:'flex', gap:10, marginBottom: 12, fontSize:13}}>
                <div style={{width:36, flexShrink:0}}><BookCover book={i} size="sm"/></div>
                <div style={{flex:1, minWidth:0}}>
                  <div className="book-title" style={{fontSize:13, lineHeight:1.2}}>{i.title}</div>
                  <div className="meta" style={{fontSize:11}}>
                    {i.type==='buy' ? '🛒 Acquisto' : `📦 Noleggio ${i.days}gg`}
                  </div>
                </div>
                <div style={{font:'600 13px var(--font-sans)', color: i.type==='rent' ? 'var(--biblio-rent)' : 'var(--biblio-coral)'}}>
                  {i.price.toFixed(2).replace('.',',')}€
                </div>
              </div>
            ))}
            <hr style={{margin:'14px 0'}}/>
            <Row2 l="Subtotale" v={`${subtotal.toFixed(2).replace('.',',')}€`}/>
            {step >= 2 && <Row2 l="Spedizione" v={`${shipping.toFixed(2).replace('.',',')}€`}/>}
            <div style={{display:'flex', justifyContent:'space-between', marginTop:12, padding:'12px 0', borderTop:'1px solid var(--border)'}}>
              <b>Totale</b>
              <b style={{font:'600 20px var(--font-display)', color:'var(--biblio-coral)'}}>{total.toFixed(2).replace('.',',')}€</b>
            </div>
            <div style={{background:'var(--biblio-ink)', color:'var(--biblio-cream)', padding:'10px 12px', borderRadius:'var(--r-sm)', marginTop: 14, font:'400 12px var(--font-sans)'}}>
              ✨ <span style={{color:'var(--biblio-gold)'}}>Con Plus</span> risparmi <b>{shipping.toFixed(2).replace('.',',')}€</b> di spedizione.
            </div>
          </aside>
        )}
      </div>

      {step < 4 && (
        <div style={{display:'flex', justifyContent:'space-between', marginTop: 28, gridColumn:'1 / -1'}}>
          <button className="btn btn-secondary" onClick={()=>step>1 ? setStep(step-1) : setRoute('catalog')}>
            ← Indietro
          </button>
          <button className="btn btn-primary btn-lg" onClick={()=>setStep(step+1)}>
            {step === 3 ? 'Conferma e paga' : 'Prosegui'} →
          </button>
        </div>
      )}
    </div>
  );
}

function Row2({l, v}) {
  return <div style={{display:'flex', justifyContent:'space-between', padding:'4px 0', font:'400 13px var(--font-sans)'}}>
    <span style={{color:'var(--fg-soft)'}}>{l}</span><span>{v}</span>
  </div>;
}

function StepCart({cart}) {
  return (
    <div>
      <h2 style={{marginBottom: 20}}>Il tuo carrello</h2>
      {cart.map((i, ix) => (
        <div key={i.id} style={{
          display:'flex', gap: 16, padding:'16px 0',
          borderBottom: ix < cart.length-1 ? '1px solid var(--border)' : 'none'
        }}>
          <div style={{width: 70, flexShrink:0}}><BookCover book={i} size="sm"/></div>
          <div style={{flex:1}}>
            <div className="book-title" style={{fontSize:17, marginBottom:2}}>{i.title}</div>
            <div className="meta" style={{marginBottom:8}}>{i.author}</div>
            <span style={{
              font:'500 11px var(--font-sans)',
              color: i.type==='rent' ? 'var(--biblio-rent)' : 'var(--biblio-coral)',
              background: i.type==='rent' ? 'var(--biblio-rent-soft)' : 'rgba(199,85,80,0.1)',
              padding:'3px 9px', borderRadius:'var(--r-pill)',
              textTransform:'uppercase', letterSpacing:'0.06em'
            }}>{i.type==='rent' ? `📦 Noleggio ${i.days}gg` : '🛒 Acquisto'}</span>
          </div>
          <div style={{textAlign:'right'}}>
            <div style={{font:'600 18px var(--font-display)', color:'var(--fg)'}}>{i.price.toFixed(2).replace('.',',')}€</div>
            <button className="btn btn-ghost btn-sm" style={{padding:0, marginTop:6, fontSize:12}}>Rimuovi</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function StepShipping() {
  return (
    <div>
      <h2 style={{marginBottom: 20}}>Indirizzo di spedizione</h2>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
        <Field label="Nome" val="Giulia"/>
        <Field label="Cognome" val="Rossi"/>
        <Field label="Via e numero" full val="Via dei Librai, 14"/>
        <Field label="Città" val="Roma"/>
        <Field label="CAP" val="00186"/>
        <Field label="Telefono" full val="+39 334 5678901"/>
      </div>
      <h3 style={{margin:'28px 0 14px', fontSize:18}}>Modalità di consegna</h3>
      <ShipOpt checked label="Standard — 48h" price="2,90€"/>
      <ShipOpt label="Express — 24h" price="6,90€"/>
      <ShipOpt label="Ritiro in libreria partner" price="Gratuito"/>
    </div>
  );
}

function StepPayment() {
  return (
    <div>
      <h2 style={{marginBottom: 20}}>Metodo di pagamento</h2>
      <PayOpt checked label="Carta di credito/debito" meta="Visa, Mastercard, Amex"/>
      <PayOpt label="PayPal" meta="Accedi al tuo conto"/>
      <PayOpt label="Apple Pay" meta="Tocca per pagare"/>
      <PayOpt label="Bonifico SEPA" meta="Conferma in 1–2 giorni"/>
      <div style={{marginTop:20, padding:20, border:'1px solid var(--border)', borderRadius:'var(--r-md)'}}>
        <Field label="Numero carta" full val="•••• •••• •••• 4242"/>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginTop:12}}>
          <Field label="Scadenza" val="04/29"/>
          <Field label="CVC" val="•••"/>
        </div>
      </div>
    </div>
  );
}

function StepConfirm({setRoute}) {
  return (
    <div style={{textAlign:'center', padding:'32px 20px'}}>
      <div style={{width:72, height:72, margin:'0 auto 20px', borderRadius:'50%', background:'rgba(74,122,92,0.15)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:34}}>✓</div>
      <h2 style={{marginBottom:10}}>Ordine confermato!</h2>
      <p className="lead" style={{maxWidth: 420, margin:'0 auto 24px'}}>
        Abbiamo ricevuto il tuo ordine <b style={{color:'var(--fg)'}}>#BBL-23491</b>.
        Riceverai un'email con i dettagli a <b style={{color:'var(--fg)'}}>giulia@esempio.it</b>.
      </p>
      <p className="meta" style={{marginBottom: 28}}>Consegna prevista: <b style={{color:'var(--fg)'}}>23 aprile 2026</b></p>
      <div style={{display:'flex', gap:10, justifyContent:'center'}}>
        <button className="btn btn-secondary" onClick={()=>setRoute('account')}>Traccia ordine</button>
        <button className="btn btn-primary" onClick={()=>setRoute('home')}>Torna alla home</button>
      </div>
    </div>
  );
}

function Field({label, val, full}) {
  return (
    <div style={{gridColumn: full ? '1/-1' : 'auto'}}>
      <label style={{display:'block', font:'600 11px var(--font-sans)', color:'var(--fg-soft)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:5}}>{label}</label>
      <input defaultValue={val} style={{
        width:'100%', padding:'10px 12px', border:'1px solid var(--border-strong)',
        borderRadius:'var(--r-sm)', font:'400 14px var(--font-sans)', background:'#fff', boxSizing:'border-box'
      }}/>
    </div>
  );
}
function ShipOpt({label, price, checked}) {
  return (
    <label style={{display:'flex', alignItems:'center', gap:12, padding:'13px 16px', marginBottom:8,
      border: checked ? '1.5px solid var(--biblio-coral)' : '1px solid var(--border)',
      borderRadius:'var(--r-sm)', cursor:'pointer', background: checked ? 'rgba(199,85,80,0.04)' : '#fff'}}>
      <input type="radio" defaultChecked={checked} style={{accentColor:'var(--biblio-coral)'}}/>
      <span style={{flex:1, font:'500 14px var(--font-sans)'}}>{label}</span>
      <span style={{font:'600 14px var(--font-sans)', color:'var(--fg)'}}>{price}</span>
    </label>
  );
}
function PayOpt({label, meta, checked}) {
  return (
    <label style={{display:'flex', alignItems:'center', gap:12, padding:'13px 16px', marginBottom:8,
      border: checked ? '1.5px solid var(--biblio-coral)' : '1px solid var(--border)',
      borderRadius:'var(--r-sm)', cursor:'pointer', background: checked ? 'rgba(199,85,80,0.04)' : '#fff'}}>
      <input type="radio" defaultChecked={checked} style={{accentColor:'var(--biblio-coral)'}}/>
      <div style={{flex:1}}>
        <div style={{font:'500 14px var(--font-sans)'}}>{label}</div>
        <div className="meta" style={{fontSize:12}}>{meta}</div>
      </div>
    </label>
  );
}

window.Checkout = Checkout;
