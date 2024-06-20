document.addEventListener("DOMContentLoaded", function () {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        if (currentPath.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

const btnLogout = document.getElementById("btn-logout");
btnLogout.onclick = function (e) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  };

  fetch("/logout", requestOptions)
    .then((response) => {
      console.log(response)
      window.location.href = "/";
    })
    .catch((error) => {
      console.error("Đăng xuất không thành công:", error);
    });
};