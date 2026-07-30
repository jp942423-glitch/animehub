// script.js
document.querySelectorAll(".anime-card").forEach(card => {
  card.addEventListener("click", () => {
    alert(`You clicked on ${card.querySelector("h3").textContent}`);
  });
});
