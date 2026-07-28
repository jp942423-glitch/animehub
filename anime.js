fetch("https://api.jikan.moe/v4/top/anime")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("trendingContainer");
    data.data.slice(0, 20).forEach(anime => {
      const card = document.createElement("div");
      card.className = "anime-card";
      card.innerHTML = `
        <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
        <h3>${anime.title}</h3>
        <p>${anime.type} • ${anime.year || "Unknown"}</p>
      `;
      container.appendChild(card);
    });
  });
