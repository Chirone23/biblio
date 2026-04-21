// MyBibliò floating chat panel
const { useState: useStateChat, useEffect: useEffectChat, useRef: useRefChat } = React;

function MyBiblioChat({ open, onClose, openBook }) {
  const [messages, setMessages] = useStateChat([
    { from:'ai', text:"Ciao, sono MyBibliò ✨. Raccontami cosa stai cercando — un genere, un'emozione, anche solo un budget — e trovo il libro giusto per te." }
  ]);
  const [input, setInput] = useStateChat('');
  const [typing, setTyping] = useStateChat(false);
  const bodyRef = useRefChat(null);

  useEffectChat(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, typing]);

  const canned = {
    default: {
      text: "Ti consiglio *Le otto montagne* di Paolo Cognetti — prosa limpida, paesaggio alpino, amicizia che attraversa decenni. Perfetto per una lettura estiva non banale.",
      book: 'otto'
    },
    giallo: {
      text: "Per un giallo intelligente: *Il nome della rosa* di Umberto Eco. Un'abbazia benedettina, omicidi in serie, e una delle voci più sofisticate della narrativa italiana.",
      book: 'rosa'
    },
    budget: {
      text: "Sotto i 12€ ti suggerisco *Seta* di Alessandro Baricco — breve, poetico, si legge in un pomeriggio. 11,00€ o noleggio a 2,20€.",
      book: 'baricco'
    }
  };

  const send = (t) => {
    const text = (t || input).trim();
    if (!text) return;
    setMessages(m => [...m, { from:'me', text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const lc = text.toLowerCase();
      let reply = canned.default;
      if (lc.includes('gial') || lc.includes('mister')) reply = canned.giallo;
      else if (lc.includes('budget') || lc.includes('econom') || lc.includes('poco')) reply = canned.budget;
      setTyping(false);
      setMessages(m => [...m, { from:'ai', text: reply.text, book: reply.book }]);
    }, 1200);
  };

  if (!open) return null;

  return (
    <div style={{
      position:'fixed', bottom: 24, right: 24, width: 400, maxWidth:'calc(100vw - 32px)',
      height: 560, maxHeight:'calc(100vh - 48px)', zIndex: 50,
      background:'#fff', border:'1px solid var(--border)', borderRadius:'var(--r-lg)',
      boxShadow:'var(--shadow-3)', display:'flex', flexDirection:'column', overflow:'hidden',
      animation:'slideUp 240ms var(--ease-out)'
    }}>
      <style>{`@keyframes slideUp { from {transform:translateY(20px); opacity:0;} to {transform:translateY(0); opacity:1;} }
      @keyframes blink { 0%,60%,100%{opacity:.3;} 30%{opacity:1;} }`}</style>

      <div style={{background:'var(--biblio-ink)', color:'var(--biblio-cream)', padding:'14px 16px',
        display:'flex', alignItems:'center', gap: 12}}>
        <div style={{width:36, height:36, borderRadius:'50%', background:'var(--biblio-coral)',
          display:'flex', alignItems:'center', justifyContent:'center', fontSize:16}}>✨</div>
        <div style={{flex:1}}>
          <div style={{font:'600 14px var(--font-sans)'}}>MyBibliò</div>
          <div style={{font:'400 11px var(--font-sans)', color:'rgba(245,241,232,0.65)'}}>
            <span style={{display:'inline-block', width:6, height:6, borderRadius:50, background:'#6cca8a', marginRight:5}}/>
            Online · risposta in ~1s
          </div>
        </div>
        <button onClick={onClose} aria-label="Chiudi" style={{background:'transparent', border:'none',
          color:'rgba(245,241,232,0.7)', fontSize:22, cursor:'pointer', padding:4}}>×</button>
      </div>

      <div ref={bodyRef} style={{flex:1, overflowY:'auto', padding:16, background:'var(--biblio-cream)',
        display:'flex', flexDirection:'column', gap:10}}>
        {messages.map((m, i) => (
          <Bubble key={i} m={m} onBook={openBook}/>
        ))}
        {typing && (
          <div style={{alignSelf:'flex-start', background:'#fff', border:'1px solid var(--border)',
            padding:'12px 14px', borderRadius:'16px 16px 16px 4px'}}>
            <span style={{display:'inline-flex', gap:4}}>
              {[0,1,2].map(i => (
                <span key={i} style={{width:7, height:7, background:'var(--biblio-gray-3)',
                  borderRadius:'50%', animation:`blink 1.2s ${i*0.2}s infinite`}}/>
              ))}
            </span>
          </div>
        )}
      </div>

      <div style={{padding:'10px 12px', borderTop:'1px solid var(--border)', display:'flex', gap: 6,
        flexWrap:'wrap', background:'#fff'}}>
        {['Un giallo italiano','Budget sotto i 12€','Consiglio sorpresa'].map(sug => (
          <button key={sug} onClick={()=>send(sug)} style={{
            font:'400 12px var(--font-sans)', padding:'5px 11px', border:'1px solid var(--border)',
            background:'var(--biblio-cream-deep)', borderRadius:'var(--r-pill)', cursor:'pointer', color:'var(--fg)'
          }}>{sug}</button>
        ))}
      </div>
      <div style={{padding:12, borderTop:'1px solid var(--border)', background:'#fff', display:'flex', gap:8}}>
        <input value={input} onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>e.key==='Enter' && send()}
          placeholder="Scrivi a MyBibliò…"
          style={{flex:1, border:'1px solid var(--border-strong)', borderRadius:'var(--r-pill)',
            padding:'10px 16px', font:'400 14px var(--font-sans)', outline:'none'}}/>
        <button onClick={()=>send()} style={{
          background:'var(--biblio-coral)', color:'#fff', border:'none', borderRadius:'50%',
          width:40, height:40, cursor:'pointer', fontSize:16
        }}>→</button>
      </div>
    </div>
  );
}

function Bubble({ m, onBook }) {
  const isMe = m.from === 'me';
  const book = m.book && window.BIBLIO_BOOKS.find(b => b.id === m.book);
  const formatItalic = (s) => s.split(/(\*[^*]+\*)/).map((p, i) =>
    p.startsWith('*') ? <i key={i} className="book-title">{p.slice(1,-1)}</i> : p
  );
  return (
    <div style={{alignSelf: isMe ? 'flex-end' : 'flex-start', maxWidth:'82%'}}>
      <div style={{
        background: isMe ? 'var(--biblio-coral)' : '#fff',
        color: isMe ? '#fff' : 'var(--fg)',
        border: isMe ? 'none' : '1px solid var(--border)',
        padding:'10px 14px', borderRadius:'16px',
        borderBottomRightRadius: isMe ? 4 : 16,
        borderBottomLeftRadius: isMe ? 16 : 4,
        font:'400 14px var(--font-sans)', lineHeight:1.5
      }}>{formatItalic(m.text)}</div>
      {book && (
        <div onClick={()=>onBook && onBook(book)} style={{
          marginTop:8, background:'#fff', border:'1px solid var(--border)', borderRadius:'var(--r-md)',
          padding:10, display:'flex', gap:12, cursor:'pointer', boxShadow:'var(--shadow-1)'
        }}>
          <div style={{width:44, flexShrink:0}}><BookCover book={book} size="sm"/></div>
          <div style={{flex:1, minWidth:0}}>
            <div className="book-title" style={{fontSize:13, lineHeight:1.2, marginBottom:2}}>{book.title}</div>
            <div className="meta" style={{fontSize:11}}>{book.author}</div>
            <div style={{marginTop:4, display:'flex', gap:8, alignItems:'center'}}>
              <span style={{font:'600 13px var(--font-sans)', color:'var(--biblio-coral)'}}>{book.price.toFixed(2).replace('.',',')}€</span>
              {book.rentable && <span style={{font:'500 11px var(--font-sans)', color:'var(--biblio-rent)'}}>📦 {book.rent.toFixed(2).replace('.',',')}€</span>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

window.MyBiblioChat = MyBiblioChat;
