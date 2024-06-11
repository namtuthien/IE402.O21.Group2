document.addEventListener("DOMContentLoaded", function () {
    const currentPath = window.location.pathname;
    if (currentPath.includes("dashboard")) {
        const button = document.getElementById("open-map-button");
        if (button) {
            button.classList.add("hidden");
        }
    }
    else {
        const logo = document.getElementById("header-logo");
        logo.classList.add("hidden");
    }
});