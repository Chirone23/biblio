// Shared book dataset for the UI kit
window.BIBLIO_BOOKS = [
  { id:'otto', title:'Le otto montagne', author:'Paolo Cognetti', price:16.50, rent:3.50, rentable:true, coverIdx:5, genre:'Narrativa', year:2016, isbn:'978-88-06-23227-3', rating:4.6, pages:208, blurb:'Un romanzo di amicizia e montagne, vincitore del Premio Strega 2017. Due bambini, due famiglie, una vita sui monti.' },
  { id:'rosa', title:'Il nome della rosa', author:'Umberto Eco', price:18.90, rent:3.90, rentable:true, coverIdx:0, genre:'Narrativa', year:1980, isbn:'978-88-04-68567-5', rating:4.8, pages:624, blurb:'Un giallo medievale ambientato in un'+'\u2019'+'abbazia benedettina. Il capolavoro di Umberto Eco, tradotto in 47 lingue.', badge:'Consigliato' },
  { id:'zeno', title:'La coscienza di Zeno', author:'Italo Svevo', price:14.00, rent:2.90, rentable:true, coverIdx:1, genre:'Narrativa', year:1923, isbn:'978-88-17-08512-0', rating:4.4, pages:472 },
  { id:'levi', title:'Se questo è un uomo', author:'Primo Levi', price:12.50, rent:2.50, rentable:true, coverIdx:2, genre:'Memorialistica', year:1947, isbn:'978-88-06-21935-9', rating:4.9, pages:213 },
  { id:'calvino', title:'Le città invisibili', author:'Italo Calvino', price:13.00, rent:2.80, rentable:true, coverIdx:3, genre:'Narrativa', year:1972, isbn:'978-88-04-66789-3', rating:4.7, pages:164 },
  { id:'ferrante', title:'L\u2019amica geniale', author:'Elena Ferrante', price:18.00, rent:3.60, rentable:true, coverIdx:4, genre:'Narrativa', year:2011, isbn:'978-88-6632-122-8', rating:4.6, pages:331, badge:'Novità' },
  { id:'pirandello', title:'Uno, nessuno e centomila', author:'Luigi Pirandello', price:11.50, rent:2.40, rentable:true, coverIdx:0, genre:'Classici', year:1926, isbn:'978-88-17-16772-4', rating:4.3, pages:224 },
  { id:'tabucchi', title:'Sostiene Pereira', author:'Antonio Tabucchi', price:13.50, rent:2.80, rentable:true, coverIdx:2, genre:'Narrativa', year:1994, isbn:'978-88-07-88050-6', rating:4.5, pages:212 },
  { id:'morante', title:'La Storia', author:'Elsa Morante', price:22.00, rent:4.20, rentable:true, coverIdx:1, genre:'Narrativa', year:1974, isbn:'978-88-06-23045-3', rating:4.6, pages:656 },
  { id:'basile', title:'Le cosmicomiche', author:'Italo Calvino', price:13.00, rent:2.80, rentable:false, coverIdx:5, genre:'Fantascienza', year:1965, isbn:'978-88-04-55421-6', rating:4.5, pages:312 },
  { id:'saviano', title:'Gomorra', author:'Roberto Saviano', price:15.00, rent:3.10, rentable:true, coverIdx:4, genre:'Saggistica', year:2006, isbn:'978-88-04-56610-3', rating:4.4, pages:332 },
  { id:'baricco', title:'Seta', author:'Alessandro Baricco', price:11.00, rent:2.20, rentable:true, coverIdx:3, genre:'Narrativa', year:1996, isbn:'978-88-17-12340-9', rating:4.3, pages:117 },
];

window.BIBLIO_CATEGORIES = [
  { id:'narrativa', name:'Narrativa', icon:'📖', count:18420 },
  { id:'saggistica', name:'Saggistica', icon:'🧠', count:9340 },
  { id:'fantascienza', name:'Fantascienza', icon:'🚀', count:4210 },
  { id:'classici', name:'Classici', icon:'🏛️', count:6780 },
  { id:'poesia', name:'Poesia', icon:'✒️', count:2145 },
  { id:'gialli', name:'Gialli & Thriller', icon:'🔍', count:7120 },
  { id:'ragazzi', name:'Ragazzi', icon:'🎈', count:3890 },
  { id:'biografia', name:'Biografie', icon:'👤', count:4560 },
];
