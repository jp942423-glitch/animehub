// ===============================
// AnimeVerse Modal System
// ===============================
const modal = document.createElement("div");
modal.id = "animeModal";
modal.innerHTML = `
  <div class="modal-content">
    <span id="closeModal">&times;</span>
    <img id="modalImage" src="" alt="">
    <h2 id="modalTitle"></h2>
    <p id="modalSynopsis"></p>
    <iframe id="modalTrailer" width="400" height="225" frameborder="0" allowfullscreen></iframe>
  </div>
`;
document.body.appendChild(modal);

document.addEventListener("click", e => {
  const card = e.target.closest(".anime-card");
  if (!card) return;
  const img = card.querySelector("img").src;
  const title = card.querySelector("h3").textContent;
  const synopsis = card.querySelector("p:nth-of-type(3)")?.textContent || "No synopsis available.";
  const trailer = card.querySelector("iframe")?.src || "";

  document.getElementById("modalImage").src = img;
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalSynopsis").textContent = synopsis;
  document.getElementById("modalTrailer").src = trailer;
  modal.style.display = "flex";
});

document.getElementById("closeModal").addEventListener("click", () => {
  modal.style.display = "none";
  document.getElementById("modalTrailer").src = "";
});
