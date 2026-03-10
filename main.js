// Dark Mode Toggle
const darkModeToggle = document.getElementById("dark-mode-toggle");
const toggleIcon = document.getElementById("toggle-icon");
const toggleText = document.getElementById("toggle-text");

// Handle toggle click
darkModeToggle.addEventListener("click", function () {
  if (document.body.classList.contains("darkmode")) {
    disableDarkMode();
  } else {
    enableDarkMode();
  }
});

// Listen for system preference changes
if (window.matchMedia) {
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      // Only auto-change if user hasn't manually set a preference
      if (localStorage.getItem("darkmode") === null) {
        if (e.matches) {
          enableDarkMode();
        } else {
          disableDarkMode();
        }
      }
    });
}

function enableDarkMode() {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkmode", "enabled");
  updateToggleDisplay();
}

function disableDarkMode() {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkmode", "disabled");
  updateToggleDisplay();
}

function updateToggleDisplay() {
  if (document.body.classList.contains("darkmode")) {
    toggleIcon.textContent = "☀️";
    toggleText.textContent = "Light Mode";
  } else {
    toggleIcon.textContent = "🌙";
    toggleText.textContent = "Dark Mode";
  }
}

// Check for saved preference or system preference
function initializeDarkMode() {
  const savedMode = localStorage.getItem("darkmode");

  if (savedMode !== null) {
    // Use saved preference
    if (savedMode === "enabled") {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
  } else {
    // Check system preference
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
  }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", initializeDarkMode);
