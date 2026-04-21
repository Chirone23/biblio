// Book detail screen
function BookDetail({ book, setRoute, openBook }) {
  if (!book) return null;
  const relatedPool = window.BIBLIO_BOOKS.filter(b => b.id !== book.id).slice(0, 4);

  return (
    <div>
      <div className="meta" style={{marginBottom: 20}}>
        <span style={{color:'var(--biblio-coral)', cursor:'pointer'}} onClick={()=>setRoute('home')}>Home</span>
        {' › '}
        <span style={{color:'var(--biblio-coral)', cursor:'pointer'}} onClick={()=>setRoute('catalog')}>Catalogo</span>
        {' › '}<b style={{color:'var(--fg)'}}>{book.title}</b>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'360px 1fr', gap: 56, marginBottom: 72}}>
        <div>
          <BookCover book={book} size="lg" />
          <div style={{display:'flex', justifyContent:'center', gap:18, marginTop: 20}}>
            <button className="nav-icon" aria-label="Wishlist" style={{background:'#fff', border:'1px solid var(--border)'}}>❤️</button>
            <button className="nav-icon" aria-label="Condividi" style={{background:'#fff', border:'1px solid var(--border)'}}>↗</button>
          </div>
        </div>

        <div>
          <div className="eyebrow" style={{marginBottom: 10}}>{book.genre} · {book.year}</div>
          <h1 className="book-title" style={{fontSize: 44, marginBottom: 8, fontStyle:'italic'}}>{book.title}</h1>
          <p style={{font:'400 18px var(--font-sans)', color:'var(--fg-soft)', marginBottom: 18}}>di <b style={{color:'var(--fg)'}}>{book.author}</b></p>

          <div style={{display:'flex', alignItems:'center', gap: 16, marginBottom: 24, flexWrap:'wrap'}}>
            <span style={{display:'inline-flex', alignItems:'center', gap: 6, font:'500 14px var(--font-sans)'}}>
              ⭐ <b style={{color:'var(--fg)', fontFamily:'var(--font-serif)', fontSize:17}}>{book.rating}</b>
              <span className="meta">· 1.240 recensioni</span>
            </span>
            <span className="meta">{book.pages} pagine</span>
            <span className="meta">ISBN {book.isbn}</span>
          </div>

          <p style={{font:'400 16px var(--font-sans)', color:'var(--fg-soft)', lineHeight:1.7, marginBottom: 32, maxWidth: 620}}>
            {book.blurb || 'Una delle opere più amate della letteratura italiana. Un viaggio attraverso le parole di un autore che ha segnato la sua epoca, ora disponibile su Bibliò in edizione originale.'}
          </p>

          {/* Buy / Rent card */}
          <div style={{
            background:'#fff', border:'1px solid var(--border)', borderRadius:'var(--r-lg)',
            padding: 24, display:'grid', gridTemplateColumns:'1fr 1fr', gap: 24, maxWidth: 620, marginBottom: 24
          }}>
            <div>
              <div className="eyebrow" style={{marginBottom:6}}>🛒 Acquista</div>
              <div style={{font:'600 28px var(--font-serif)', color:'var(--biblio-coral)', marginBottom: 4}}>
                {book.price.toFixed(2).replace('.',',')}€
              </div>
              <div className="meta" style={{marginBottom: 14}}>Cartaceo · spedizione in 48h</div>
              <button className="btn btn-primary btn-block">Aggiungi al carrello</button>
            </div>

            {book.rentable && (
              <div style={{paddingLeft:24, borderLeft:'1px solid var(--border)'}}>
                <div className="eyebrow" style={{marginBottom:6, color:'var(--biblio-rent)'}}>📦 Noleggia</div>
                <div style={{font:'600 28px var(--font-serif)', color:'var(--biblio-rent)', marginBottom: 4}}>
                  {book.rent.toFixed(2).replace('.',',')}€
                </div>
                <div className="meta" style={{marginBottom: 14}}>30 giorni · ritiro gratuito</div>
                <button className="btn btn-rent btn-block">Noleggia 30gg</button>
              </div>
            )}
          </div>

          <p className="meta" style={{maxWidth: 620}}>
            ✨ <span style={{color:'var(--biblio-gold)', fontWeight:500}}>Con Plus</span> questo noleggio è incluso nei tuoi 2 mensili.{' '}
            <span style={{color:'var(--biblio-coral)', cursor:'pointer', textDecoration:'underline'}} onClick={()=>setRoute('plus')}>Scopri Plus →</span>
          </p>
        </div>
      </div>

      <Section eyebrow="MyBibliò suggerisce" title={`Se ti è piaciuto ${book.title.split(' ').slice(0,3).join(' ')}…`}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 20}}>
          {relatedPool.map(b => <BookCard key={b.id} book={b} onOpen={openBook} />)}
        </div>
      </Section>
    </div>
  );
}

window.BookDetail = BookDetail;
