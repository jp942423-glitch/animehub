// ===============================
// AnimeVerse Notifications
// ===============================
if ("Notification" in window) {
  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      console.log("Notifications enabled!");
    }
  });
}

function notifyNewRelease(title) {
  if (Notification.permission === "granted") {
    new Notification("🔥 New Anime Release!", {
      body: `${title} is now available to watch!`,
      icon: "assets/icons/icon-192.png"
    });
  }
}

// Example: trigger notification when new anime loads
setTimeout(() => notifyNewRelease("Solo Leveling Season 2"), 5000);
