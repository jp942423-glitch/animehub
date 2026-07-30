// ===============================
// AnimeVerse Dynamic Loader
// ===============================

// 🔍 Search Autocomplete
const searchInput = document.getElementById("searchInput");
const suggestionsBox = document.createElement("div");
suggestionsBox.className = "suggestions";
searchInput.parentElement.appendChild(suggestionsBox);

searchInput.addEventListener("input", async () => {
  const query = searchInput.value.trim();
  if (!query) return (suggestionsBox.innerHTML = "");
  const res = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&limit=5`);
  const data = await res.json();
  suggestionsBox.innerHTML = data.data
    .map(a => `<div class="suggestion">${a.title}</div>`)
    .join("");
});

suggestionsBox.addEventListener("click", e => {
  if (e.target.classList.contains("suggestion")) {
    searchInput.value = e.target.textContent;
    suggestionsBox.innerHTML = "";
  }
});

// ===============================
// Dark Mode Toggle
// ===============================
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// ===============================
// Watch List System
// ===============================
const addAnimeBtn = document.getElementById("addAnime");
const watchInput = document.getElementById("watchInput");
const watchList = document.getElementById("watchList");

addAnimeBtn.addEventListener("click", () => {
  const name = watchInput.value.trim();
  if (!name) return;

  const item = document.createElement("div");
  item.className = "watch-item";
  item.innerHTML = `<span>${name}</span><button class="remove-btn">Remove</button>`;
  watchList.appendChild(item);
  watchInput.value = "";

  item.querySelector(".remove-btn").addEventListener("click", () => {
    item.remove();
  });
});

// ===============================
// Rating + Comment System
// ===============================
document.addEventListener("click", e => {
  if (e.target.classList.contains("rate-btn")) {
    const rating = prompt("Rate this anime (1–10):");
    if (rating) e.target.parentElement.querySelector(".user-rating").textContent = `⭐ ${rating}/10`;
  }

  if (e.target.classList.contains("comment-btn")) {
    const comment = prompt("Add your comment:");
    if (comment) {
      const commentBox = e.target.parentElement.querySelector(".comments");
      const p = document.createElement("p");
      p.textContent = comment;
      commentBox.appendChild(p);
    }
  }
});

// ===============================
// Leaderboard System
// ===============================
const leaderboardList = document.getElementById("leaderboardList");
const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || {};

document.addEventListener("click", e => {
  if (e.target.classList.contains("anime-card")) {
    const title = e.target.querySelector("h3").textContent;
    leaderboard[title] = (leaderboard[title] || 0) + 1;
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    updateLeaderboard();
  }
});

function updateLeaderboard() {
  const sorted = Object.entries(leaderboard).sort((a, b) => b[1] - a[1]);
  leaderboardList.innerHTML = sorted
    .slice(0, 10)
    .map(([title, count]) => `<li>${title} — ${count} views</li>`)
    .join("");
}
updateLeaderboard();

// ===============================
// AnimeVerse Auto Loader
// ===============================

// Load top anime (popular and old)
fetch("https://api.jikan.moe/v4/top/anime?limit=100")
  .then(res => res.json())
  .then(data => {
    const trendingContainer = document.getElementById("trendingContainer");
    trendingContainer.innerHTML = "";
    data.data.forEach(anime => {
      const card = document.createElement("div");
      card.className = "anime-card";
      card.innerHTML = `
        <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
        <h3>${anime.title}</h3>
        <p>${anime.type} • ${anime.year || "Unknown"}</p>
        <p>⭐ ${anime.score || "N/A"} | Episodes: ${anime.episodes || "?"}</p>
      `;
      trendingContainer.appendChild(card);
    });
  })
  .catch(err => console.error("Error loading top anime:", err));

// Load currently airing anime (new releases)
function loadNewReleases() {
  fetch("https://api.jikan.moe/v4/seasons/now")
    .then(res => res.json())
    .then(data => {
      const newContainer = document.getElementById("newReleasesContainer");
      newContainer.innerHTML = "";
      data.data.forEach(anime => {
        const card = document.createElement("div");
        card.className = "anime-card";
        card.innerHTML = `
          <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
          <h3>${anime.title}</h3>
          <p>${anime.type} • ${anime.year || "Unknown"}</p>
          <p>⭐ ${anime.score || "N/A"} | Episodes: ${anime.episodes || "?"}</p>
        `;
        newContainer.appendChild(card);
      });
    })
    .catch(err => console.error("Error loading new releases:", err));
}
loadNewReleases();

// ===============================
// Optional Upgrade: Auto Refresh
// ===============================
// Refresh new releases every 6 hours automatically
setInterval(loadNewReleases, 21600000); // 6 hours = 6 × 60 × 60 × 1000
