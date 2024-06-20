document.addEventListener("DOMContentLoaded", function () {
  const currentPath = window.location.pathname;
  const button = document.getElementById("open-map-button");
  if (
    currentPath.includes("dashboard") ||
    currentPath.includes("bookings") ||
    currentPath.includes("staff") ||
    currentPath.includes("customers") ||
    currentPath.includes("ratings")
  ) {
    if (button) {
      button.classList.add("hidden");
    }
  } else {
    const logo = document.getElementById("header-logo");
    logo.classList.add("hidden");
  }
  button.addEventListener("click", () => {
    if (currentPath.includes("tour")) {
      window.location.href = "/admin/map/tours"
    }
    else {
      window.location.href = "/admin/map/locations"
    }
  })
});
