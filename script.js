// Basic sample dataset (replace with API integration later)
const animeData = [
  { id: 'a1', title: 'Skybound Dreams', genres: ['Adventure','Fantasy'], rating: 8.9, views: 124500, year: 2023, poster: 'https://picsum.photos/seed/a1/600/900' },
  { id: 'a2', title: 'Silent Blade', genres: ['Action','Drama'], rating: 9.2, views: 220300, year: 2021, poster: 'https://picsum.photos/seed/a2/600/900' },
  { id: 'a3', title: 'Star Harbor', genres: ['Sci-Fi','Romance'], rating: 8.1, views: 98700, year: 2022, poster: 'https://picsum.photos/seed/a3/600/900' },
  { id: 'a4', title: 'Moonlight Sonata', genres: ['Drama','Slice of Life'], rating: 8.7, views: 156000, year: 2020, poster: 'https://picsum.photos/seed/a4/600/900' },
  { id: 'a5', title: 'Neon Runners', genres: ['Action','Sci-Fi'], rating: 9.0, views: 310200, year: 2024, poster: 'https://picsum.photos/seed/a5/600/900' },
  { id: 'a6', title: 'Whispering Pines', genres: ['Mystery','Horror'], rating: 7.9, views: 46000, year: 2019, poster: 'https://picsum.photos/seed/a6/600/900' },
  { id: 'a7', title: 'Crimson Bloom', genres: ['Romance','Drama'], rating: 8.5, views: 84000, year: 2022, poster: 'https://picsum.photos/seed/a7/600/900' },
  { id: 'a8', title: 'Giga Mech Squad', genres: ['Action','Mecha'], rating: 8.8, views: 198700, year: 2023, poster: 'https://picsum.photos/seed/a8/600/900' },
  { id: 'a9', title: 'Arcane Atlas', genres: ['Fantasy','Adventure'], rating: 9.3, views: 420100, year: 2021, poster: 'https://picsum.photos/seed/a9/600/900' },
  { id: 'a10', title: 'Cafe at Midnight', genres: ['Slice of Life','Comedy'], rating: 7.6, views: 38000, year: 2020, poster: 'https://picsum.photos/seed/a10/600/900' },
  // add or replace with more items to reach 50+ later
];

// Keys & DOM
const LS_KEY = 'animehub_watchlist';
const THEME_KEY = 'animehub_theme';
const cardsEl = document.getElementById('cards');
const searchInput = document.getElementById('searchInput');
const genreSelect = document.getElementById('genreSelect');
const viewSelect = document.getElementById('viewSelect');
const watchlistBtn = document.getElementById('watchlistBtn');
const watchlistModal = document.getElementById('watchlistModal');
const watchlistItems = document.getElementById('watchlistItems');
const watchlistCountEl = document.getElementById('watchlistCount');
const closeWatchlist = document.getElementById('closeWatchlist');
const dashboardBtn = document.getElementById('dashboardBtn');
const dashboardModal = document.getElementById('dashboardModal');
const dashboardContent = document.getElementById('dashboardContent');
const closeDashboard = document.getElementById('closeDashboard');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

// State
let watchlist = loadWatchlist();
let currentTheme = loadTheme();

// Initialization
populateGenres();
renderCards();
updateWatchlistCount();
applyTheme();

// Event listeners
searchInput.addEventListener('input', () => renderCards());
genreSelect.addEventListener('change', () => renderCards());
viewSelect.addEventListener('change', () => renderCards());
watchlistBtn.addEventListener('click', () => { renderWatchlist(); toggleModal(watchlistModal); });
closeWatchlist.addEventListener('click', () => toggleModal(watchlistModal));
dashboardBtn.addEventListener('click', () => { renderDashboard(); toggleModal(dashboardModal); });
closeDashboard.addEventListener('click', () => toggleModal(dashboardModal));
themeToggle.addEventListener('click', toggleTheme);
window.addEventListener('click', (e) => {
  if (e.target === watchlistModal) toggleModal(watchlistModal);
  if (e.target === dashboardModal) toggleModal(dashboardModal);
});

// Functions
function loadWatchlist(){
  try{
    return JSON.parse(localStorage.getItem(LS_KEY) || '[]');
  }catch(e){ return [] }
}
function saveWatchlist(){
  localStorage.setItem(LS_KEY, JSON.stringify(watchlist));
  updateWatchlistCount();
}

function loadTheme(){
  const t = localStorage.getItem(THEME_KEY) || 'light';
  return t;
}
function saveTheme(t){
  localStorage.setItem(THEME_KEY, t);
}

function applyTheme(){
  if (currentTheme === 'dark') document.body.classList.add('dark'), themeIcon.className = 'fas fa-sun';
  else document.body.classList.remove('dark'), themeIcon.className = 'fas fa-moon';
  saveTheme(currentTheme);
}

function toggleTheme(){
  currentTheme = (currentTheme === 'dark') ? 'light' : 'dark';
  applyTheme();
}

function toggleModal(modal){
  modal.classList.toggle('hidden');
}

function populateGenres(){
  const allGenres = new Set();
  animeData.forEach(a => a.genres.forEach(g => allGenres.add(g)));
  const genres = [...allGenres].sort();
  genres.forEach(g => {
    const o = document.createElement('option');
    o.value = g; o.textContent = g;
    genreSelect.appendChild(o);
  });
}

function renderCards(){
  const q = searchInput.value.trim().toLowerCase();
  const genreFilter = genreSelect.value;
  const view = viewSelect.value;

  let items = animeData.slice();

  if (view === 'trending') items.sort((a,b) => b.views - a.views);
  else if (view === 'toprated') items.sort((a,b) => b.rating - a.rating);

  if (genreFilter) items = items.filter(a => a.genres.includes(genreFilter));
  if (q) items = items.filter(a => a.title.toLowerCase().includes(q));

  // clear
  cardsEl.innerHTML = '';
  items.forEach(a => {
    const card = document.createElement('article');
    card.className = 'card';
    const inList = watchlist.includes(a.id);
    card.innerHTML = `
      <div class="poster" style="background-image:url('${a.poster}')">
        <span class="badge">${a.year}</span>
      </div>
      <div class="card-body">
        <h4 class="title">${a.title}</h4>
        <div class="meta">
          <span>⭐ ${a.rating.toFixed(1)}</span>
          <span>${(a.views/1000).toFixed(0)}k views</span>
        </div>
        <div class="genres">${a.genres.map(g => `<span class="genre">${g}</span>`).join('')}</div>
        <div class="card-actions">
          <button class="action" data-id="${a.id}" data-action="toggle">${inList ? 'Remove from Watchlist' : 'Add to Watchlist'}</button>
          <button class="action" data-id="${a.id}" data-action="mark">Mark watched</button>
        </div>
      </div>
    `;
    // action listeners
    card.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const act = btn.dataset.action;
        const id = btn.dataset.id;
        if (act === 'toggle') toggleWatchlist(id);
        if (act === 'mark') markWatched(id, btn);
      });
    });
    cardsEl.appendChild(card);
  });
}

function toggleWatchlist(id){
  if (watchlist.includes(id)){
    watchlist = watchlist.filter(i => i !== id);
  } else {
    watchlist.push(id);
  }
  saveWatchlist();
  renderCards();
  renderWatchlist();
}

function markWatched(id, btn){
  // Very simple local increment (persisted in localStorage per-anime)
  const key = `animehub_watched_${id}`;
  let n = parseInt(localStorage.getItem(key) || '0', 10);
  n++;
  localStorage.setItem(key, String(n));
  btn.textContent = `Watched (${n})`;
}

function updateWatchlistCount(){
  watchlistCountEl.textContent = watchlist.length;
}

function renderWatchlist(){
  watchlistItems.innerHTML = '';
  if (!watchlist.length){
    watchlistItems.innerHTML = `<p style="padding:16px;color:var(--muted)">Your watchlist is empty. Add shows using the "Add to Watchlist" button.</p>`;
    return;
  }
  const items = watchlist.map(id => animeData.find(a => a.id === id)).filter(Boolean);
  items.forEach(a => {
    const el = document.createElement('article');
    el.className = 'card';
    el.innerHTML = `
      <div class="poster" style="background-image:url('${a.poster}')"></div>
      <div class="card-body">
        <h4 class="title">${a.title}</h4>
        <div class="meta"><span>⭐ ${a.rating}</span><span>${a.genres.join(', ')}</span></div>
        <div class="card-actions">
          <button class="action" data-id="${a.id}" data-action="goto">View</button>
          <button class="action" data-id="${a.id}" data-action="remove">Remove</button>
        </div>
      </div>
    `;
    el.querySelector('[data-action="remove"]').addEventListener('click', () => { toggleWatchlist(a.id); });
    el.querySelector('[data-action="goto"]').addEventListener('click', () => {
      // scroll the main list to the card (simple UX)
      toggleModal(watchlistModal);
      searchInput.value = a.title;
      renderCards();
      window.scrollTo({top: 0, behavior: 'smooth'});
    });
    watchlistItems.appendChild(el);
  });
}

function renderDashboard(){
  const total = animeData.length;
  const watchCount = watchlist.length;
  const topRated = [...animeData].sort((a,b) => b.rating - a.rating).slice(0,5);
  // genre distribution
  const genreMap = {};
  animeData.forEach(a => a.genres.forEach(g => genreMap[g] = (genreMap[g]||0) + 1));
  dashboardContent.innerHTML = `
    <div style="display:flex;gap:16px;flex-wrap:wrap">
      <div style="flex:1;min-width:220px">
        <h4>Summary</h4>
        <p>Total shows: <strong>${total}</strong></p>
        <p>In watchlist: <strong>${watchCount}</strong></p>
      </div>
      <div style="flex:2;min-width:220px">
        <h4>Top Rated</h4>
        <ol>${topRated.map(t => `<li>${t.title} — ⭐ ${t.rating}</li>`).join('')}</ol>
      </div>
      <div style="flex:2;min-width:220px">
        <h4>Genres</h4>
        <ul>${Object.entries(genreMap).map(([g,c]) => `<li>${g}: ${c}</li>`).join('')}</ul>
      </div>
    </div>
  `;
}

// Expose a simple global to help debugging in console
window.ANIMEHUB = { animeData, getWatchlist: () => watchlist, toggleWatchlist };

// initial theme set from storage
if (loadTheme() === 'dark') {
  currentTheme = 'dark';
  applyTheme();
}
