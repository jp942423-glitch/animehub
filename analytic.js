// ===============================
// AnimeVerse Analytics Tracker
// ===============================

// Track page views
console.log("User visited AnimeVerse at", new Date().toLocaleString());

// Save visit count in localStorage
let visits = localStorage.getItem("visits") || 0;
visits++;
localStorage.setItem("visits", visits);
console.log(`Total visits: ${visits}`);

// Track time spent on page
let startTime = Date.now();
window.addEventListener("beforeunload", () => {
  const timeSpent = Math.round((Date.now() - startTime) / 1000);
  const totalTime = parseInt(localStorage.getItem("totalTime") || 0) + timeSpent;
  localStorage.setItem("totalTime", totalTime);
  console.log(`User spent ${timeSpent}s this session. Total time: ${totalTime}s`);
});

// Track clicks on anime cards
document.addEventListener("click", e => {
  if (e.target.closest(".anime-card")) {
    const title = e.target.closest(".anime-card").querySelector("h3").textContent;
    const clicks = JSON.parse(localStorage.getItem("animeClicks") || "{}");
    clicks[title] = (clicks[title] || 0) + 1;
    localStorage.setItem("animeClicks", JSON.stringify(clicks));
    console.log(`Clicked on: ${title}`);
  }
});

// Display analytics summary in console
function showAnalyticsSummary() {
  const clicks = JSON.parse(localStorage.getItem("animeClicks") || "{}");
  console.log("=== AnimeVerse Analytics Summary ===");
  console.log(`Total Visits: ${visits}`);
  console.log(`Total Time Spent: ${localStorage.getItem("totalTime")}s`);
  console.log("Most Clicked Anime:");
  Object.entries(clicks)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .forEach(([title, count]) => console.log(`${title}: ${count} clicks`));
}
showAnalyticsSummary();
