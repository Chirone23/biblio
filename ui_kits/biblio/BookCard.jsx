// BookCard — unified tile for catalog + featured
const { useState: useStateBC } = React;

// Palette of cover treatments so the kit looks varied without real images
const COVER_STYLES = [
  { bg: 'linear-gradient(140deg,#3A4A5C 0%,#25313F 100%)', fg: '#F5F1E8' },
  { bg: 'linear-gradient(140deg,#C75550 0%,#8A3A37 100%)', fg: '#F5F1E8' },
  { bg: 'linear-gradient(140deg,#8B6F4E 0%,#5A4A34 100%)', fg: '#F5F1E8' },
  { bg: 'linear-gradient(140deg,#EDE6D3 0%,#D6CFC2 100%)', fg: '#2A2A2A' },
  { bg: 'linear-gradient(140deg,#2A2A2A 0%,#4A4440 100%)', fg: '#C4A062' },
  { bg: 'linear-gradient(140deg,#4A7A5C 0%,#2F5540 100%)', fg: '#F5F1E8' },
];

function BookCover({ book, size='md' }) {
  const style = COVER_STYLES[book.coverIdx ?? 0];
  const dims = size === 'lg'
    ? { width: '100%', maxWidth: 320, aspectRatio: '2/3', fontSize: 28, padding: 24 }
    : size === 'sm'
    ? { width: '100%', aspectRatio: '2/3', fontSize: 13, padding: 10 }
    : { width: '100%', aspectRatio: '2/3', fontSize: 16, padding: 14 };
  return (
    <div style={{
      background: style.bg,
      color: style.fg,
      boxShadow: 'var(--shadow-book)',
      borderRadius: 3,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      ...dims
    }}>
      <div style={{fontFamily:'var(--font-serif)', fontStyle:'italic', fontWeight:500, lineHeight:1.15, textWrap:'balance'}}>
        {book.title}
      </div>
      <div style={{fontSize: '0.55em', letterSpacing:'0.06em', textTransform:'uppercase', opacity:0.8, fontFamily:'var(--font-sans)', fontStyle:'normal'}}>
        {book.author}
      </div>
    </div>
  );
}

function BookCard({ book, onOpen, compact=false }) {
  const [hover, setHover] = useStateBC(false);
  return (
    <div
      onClick={() => onOpen && onOpen(book)}
      onMouseEnter={()=>setHover(true)}
      onMouseLeave={()=>setHover(false)}
      style={{
        background: '#fff',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-md)',
        padding: 14,
        cursor: 'pointer',
        boxShadow: hover ? 'var(--shadow-2)' : 'var(--shadow-1)',
        transition: 'box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)',
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
        display: 'flex', flexDirection:'column', gap: 12
      }}>
      <div style={{padding: compact ? 4 : 8}}>
        <BookCover book={book} size={compact ? 'sm' : 'md'} />
      </div>
      {book.badge && (
        <span style={{
          position:'absolute', background: book.badge === 'Novità' ? 'var(--biblio-coral)' : 'var(--biblio-gold)',
          color: book.badge === 'Novità' ? '#fff' : 'var(--biblio-ink)',
          padding:'4px 10px', borderRadius:'var(--r-pill)', font:'700 10px var(--font-sans)',
          letterSpacing:'0.06em', textTransform:'uppercase'
        }}>{book.badge}</span>
      )}
      <div>
        <div className="book-title" style={{fontSize: 15, color:'var(--fg)', lineHeight:1.25, marginBottom: 2}}>{book.title}</div>
        <div style={{font:'400 12px var(--font-sans)', color:'var(--fg-muted)'}}>{book.author}</div>
      </div>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop: 8, borderTop:'1px solid var(--border)'}}>
        <span style={{font:'600 15px var(--font-sans)', color:'var(--biblio-coral)'}}>{book.price.toFixed(2).replace('.',',')}€</span>
        {book.rentable && (
          <span style={{font:'500 11px var(--font-sans)', color:'var(--biblio-rent)', display:'inline-flex', alignItems:'center', gap:4}}>
            📦 {book.rent.toFixed(2).replace('.',',')}€
          </span>
        )}
      </div>
    </div>
  );
}

window.BookCard = BookCard;
window.BookCover = BookCover;
