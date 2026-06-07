// SPDX-License-Identifier: GPL-3.0-or-later

function backToTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  document.activeElement.blur();
}
