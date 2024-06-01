document.addEventListener('DOMContentLoaded', function () {
    var navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(function (navLink) {
        navLink.addEventListener('click', function (event) {
            event.preventDefault(); 
            navLinks.forEach(function (link) {
                link.classList.remove('active');
            });

            this.classList.add('active');
        });
    });
});