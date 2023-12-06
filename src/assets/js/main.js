// SPDX-License-Identifier: GPL-3.0-or-later

function backToTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}

window.addEventListener("scroll", () => {
  const button = document.getElementById("top-button");

  if (window.scrollY > 500) {
    button.style.visibility = "visible";
    button.style.opacity = 100;
  }

  if (window.scrollY < 350) {
    button.style.visibility = "invisible";
    button.style.opacity = 0;
  }
});
