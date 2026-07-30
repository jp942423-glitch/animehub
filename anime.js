// ===============================
// AnimeVerse Dynamic Loader
// ===============================

// Fetch top anime from Jikan API
fetch("https://api.jikan.moe/v4/top/anime")
  .then(res => res.json())
  .then(data => {
    const trendingContainer = document.getElementById("trendingContainer");
    const topRatedContainer = document.getElementById("topRatedContainer");

    // Load first 25 anime into Trending
    data.data.slice(0, 25).forEach(anime => {
      const card = document.createElement("div");
      card.className = "anime-card";
      card.innerHTML = `
        <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
        <h3>${anime.title}</h3>
        <p>${anime.type} • ${anime.year || "Unknown"}</p>
      `;
      trendingContainer.appendChild(card);
    });

    // Load next 25 anime into Top Rated
    data.data.slice(25, 50).forEach(anime => {
      const card = document.createElement("div");
      card.className = "anime-card";
      card.innerHTML = `
        <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
        <h3>${anime.title}</h3>
        <p>${anime.type} • ${anime.year || "Unknown"}</p>
      `;
      topRatedContainer.appendChild(card);
    });
  })
  .catch(err => {
    console.error("Error loading anime:", err);
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
// Load 100 anime instead of 50
fetch("https://api.jikan.moe/v4/top/anime")
  .then(res => res.json())
  .then(data => {
    const trendingContainer = document.getElementById("trendingContainer");
    const topRatedContainer = document.getElementById("topRatedContainer");

    // First 50 → Trending
    data.data.slice(0, 50).forEach(anime => {
      const card = document.createElement("div");
      card.className = "anime-card";
      card.innerHTML = `
        <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
        <h3>${anime.title}</h3>
        <p>${anime.type} • ${anime.year || "Unknown"}</p>
      `;
      trendingContainer.appendChild(card);
    });

    // Next 50 → Top Rated
    data.data.slice(50, 100).forEach(anime => {
      const card = document.createElement("div");
      card.className = "anime-card";
      card.innerHTML = `
        <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
        <h3>${anime.title}</h3>
        <p>${anime.type} • ${anime.year || "Unknown"}</p>
      `;
      topRatedContainer.appendChild(card);
    });
  })
  .catch(err => console.error("Error loading anime:", err));
fetch("https://api.jikan.moe/v4/top/anime?limit=50")
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
        <p>${anime.synopsis ? anime.synopsis.substring(0, 120) + "..." : "No description available."}</p>
      `;
      trendingContainer.appendChild(card);
    });
  })
  .catch(err => console.error("Error loading anime:", err));

  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("topRatedContainer");
    container.innerHTML = "";
    data.data.Page.media.forEach(anime => {
      const card = document.createElement("div");
      card.className = "anime-card";
      card.innerHTML = `
        <img src="${anime.coverImage.large}" alt="${anime.title.romaji}">
        <h3>${anime.title.romaji}</h3>
        <p>${anime.genres.join(", ")}</p>
        <p>⭐ ${anime.averageScore} | Episodes: ${anime.episodes}</p>
        <p>${anime.description.substring(0, 120)}...</p>
      `;
      container.appendChild(card);
    });
  });
fetch("https://api.jikan.moe/v4/seasons/now")
