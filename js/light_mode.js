
const lightModeBtn = document.getElementById("light-mode-btn");
const body = document.body;

lightModeBtn.addEventListener("click", toggleLightMode);

function toggleLightMode() {
    body.classList.toggle("light-mode");
}
