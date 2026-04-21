// First-access onboarding overlay — "Ciao, sono MyBibliò"
const { useState: useStateOb } = React;

function Onboarding({ onClose }) {
  const [step, setStep] = useStateOb(0);
  const [mood, setMood] = useStateOb(null);
  const [budget, setBudget] = useStateOb(null);

  const moods = [
    ['📖','Classici','Letteratura che resta'],
    ['🌊','Evasione','Leggero, piacevole'],
    ['🧠','Approfondire','Saggi, idee'],
    ['🔍','Mistero','Gialli, thriller'],
    ['❤️','Emozione','Romanzi intensi'],
    ['🚀','Immaginare','Sci-fi, fantasy'],
  ];

  return (
    <div style={{
      position:'fixed', inset:0, background:'rgba(42,42,42,0.55)', backdropFilter:'blur(4px)',
      display:'flex', alignItems:'center', justifyContent:'center', zIndex: 100, padding:20
    }}>
      <div style={{
        background:'#fff', borderRadius:'var(--r-lg)', width:'100%', maxWidth: 560,
        boxShadow:'var(--shadow-3)', overflow:'hidden',
        animation:'obPop 280ms var(--ease-out)'
      }}>
        <style>{`@keyframes obPop { from {transform:translateY(20px) scale(0.96); opacity:0;} to {transform:translateY(0) scale(1); opacity:1;} }`}</style>

        {/* Progress pips */}
        <div style={{display:'flex', gap:6, padding:'20px 24px 0'}}>
          {[0,1,2].map(i => (
            <div key={i} style={{flex:1, height:3, borderRadius:2,
              background: i <= step ? 'var(--biblio-coral)' : 'var(--border)'}}/>
          ))}
        </div>

        <div style={{padding:'28px 32px 32px'}}>
          {step === 0 && (
            <div style={{textAlign:'center'}}>
              <div style={{width:64, height:64, borderRadius:'50%', background:'var(--biblio-coral)',
                display:'flex', alignItems:'center', justifyContent:'center', fontSize:28, margin:'4px auto 18px',
                color:'#fff'}}>✨</div>
              <h2 style={{marginBottom:10}}>Ciao, sono MyBibliò</h2>
              <p className="lead" style={{marginBottom: 8}}>Il tuo consulente letterario personale.</p>
              <p style={{color:'var(--fg-soft)', lineHeight:1.6, maxWidth: 420, margin:'0 auto 28px'}}>
                Rispondimi a due domande e avrai subito consigli perfetti per te.
                Oppure esplora il catalogo e chiedimi ciò che vuoi, quando vuoi.
              </p>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 style={{marginBottom: 6}}>Che tipo di lettura cerchi?</h2>
              <p className="meta" style={{marginBottom: 20}}>Scegline una — cambierà i consigli.</p>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap: 10}}>
                {moods.map(([ic, lbl, desc]) => (
                  <button key={lbl} onClick={()=>setMood(lbl)} style={{
                    padding:'18px 12px', border: mood===lbl ? '1.5px solid var(--biblio-coral)' : '1px solid var(--border)',
                    borderRadius:'var(--r-md)', background: mood===lbl ? 'rgba(199,85,80,0.06)' : '#fff',
                    cursor:'pointer', textAlign:'center'
                  }}>
                    <div style={{fontSize:26, marginBottom:6}}>{ic}</div>
                    <div style={{font:'600 14px var(--font-sans)', color:'var(--fg)'}}>{lbl}</div>
                    <div className="meta" style={{fontSize:11, marginTop:2}}>{desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 style={{marginBottom: 6}}>E il tuo budget?</h2>
              <p className="meta" style={{marginBottom: 20}}>Ti mostrerò prima le opzioni giuste.</p>
              {[
                ['Sotto i 10€', 'Soprattutto noleggi ed economici'],
                ['10–18€', 'Mix di acquisti e noleggi'],
                ['Oltre i 18€', 'Edizioni curate, novità'],
                ['Senza limite', 'Mostrami il meglio']
              ].map(([lbl, desc]) => (
                <button key={lbl} onClick={()=>setBudget(lbl)} style={{
                  display:'flex', alignItems:'center', width:'100%', padding:'14px 16px', marginBottom:8,
                  border: budget===lbl ? '1.5px solid var(--biblio-coral)' : '1px solid var(--border)',
                  borderRadius:'var(--r-sm)', background: budget===lbl ? 'rgba(199,85,80,0.06)' : '#fff',
                  cursor:'pointer', textAlign:'left'
                }}>
                  <div style={{flex:1}}>
                    <div style={{font:'600 15px var(--font-sans)', color:'var(--fg)'}}>{lbl}</div>
                    <div className="meta" style={{fontSize:12, marginTop:2}}>{desc}</div>
                  </div>
                  {budget===lbl && <span style={{color:'var(--biblio-coral)', fontSize:18}}>✓</span>}
                </button>
              ))}
            </div>
          )}

          <div style={{display:'flex', gap:10, marginTop: 24, justifyContent: step===0 ? 'center' : 'space-between'}}>
            {step > 0 && <button className="btn btn-ghost" onClick={()=>setStep(step-1)}>← Indietro</button>}
            {step === 0 ? (
              <>
                <button className="btn btn-secondary" onClick={onClose}>Esplora prima</button>
                <button className="btn btn-primary" onClick={()=>setStep(1)}>Iniziamo →</button>
              </>
            ) : step < 2 ? (
              <button className="btn btn-primary" onClick={()=>setStep(step+1)} disabled={!mood} style={{opacity: mood?1:0.5}}>Avanti →</button>
            ) : (
              <button className="btn btn-primary" onClick={onClose} disabled={!budget} style={{opacity: budget?1:0.5}}>
                Mostrami i consigli ✨
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

window.Onboarding = Onboarding;
