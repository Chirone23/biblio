// Shared UI primitives + top nav

function Nav({ route, setRoute, cartCount = 2, wishCount = 5 }) {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="nav-logo" onClick={() => setRoute('home')}>
          Bibli<span className="accent">ò</span>
        </div>
        <div className="nav-links">
          <span className={`nav-link ${route==='catalog'?'active':''}`} onClick={()=>setRoute('catalog')}>Catalogo</span>
          <span className={`nav-link ${route==='rentbuy'?'active':''}`} onClick={()=>setRoute('rentbuy')}>Noleggio vs Acquisto</span>
          <span className={`nav-link ${route==='plus'?'active':''}`} onClick={()=>setRoute('plus')}>Plus</span>
          <span className={`nav-link ${route==='mobile'?'active':''}`} onClick={()=>setRoute('mobile')}>Mobile</span>
          <span className="nav-link" onClick={()=>window.__openChat && window.__openChat()}>MyBibliò</span>
        </div>
        <div className="nav-spacer" />
        <div className="nav-actions">
          <button className="nav-icon" aria-label="Cerca">🔍</button>
          <button className="nav-icon" aria-label="Lista desideri" onClick={()=>setRoute('account')}>
            ❤️{wishCount>0 && <span className="pip">{wishCount}</span>}
          </button>
          <button className="nav-icon" aria-label="Carrello" onClick={()=>setRoute('checkout')}>
            🛒{cartCount>0 && <span className="pip">{cartCount}</span>}
          </button>
          <button className="nav-icon" aria-label="Account" onClick={()=>setRoute('account')}>👤</button>
        </div>
      </div>
    </nav>
  );
}

function ChatFab({ onClick, open }) {
  if (open) return null;
  return (
    <button className="chat-fab" onClick={onClick}>
      <span className="av">✨</span>
      <span>Chiedi a MyBibliò</span>
    </button>
  );
}

function Section({ eyebrow, title, action, children }) {
  return (
    <section style={{marginBottom: 64}}>
      <div style={{display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom: 24, gap: 20}}>
        <div>
          {eyebrow && <div className="eyebrow" style={{marginBottom: 8}}>{eyebrow}</div>}
          <h2 style={{fontSize: 32}}>{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

window.Nav = Nav;
window.ChatFab = ChatFab;
window.Section = Section;
