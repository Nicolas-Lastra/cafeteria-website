const mainNav = document.querySelector('.navbar');
const menuNav = document.querySelector('.menu-navbar');

window.addEventListener('scroll', () => {
    const mainNavBottom = mainNav.getBoundingClientRect().bottom;

    if (mainNavBottom <= 0) {
        menuNav.classList.add('is-fixed');
    } else {
        menuNav.classList.remove('is-fixed');
    }
});

// CORRECCIÓN DEL BUG DE MULTIPLES .active EN CHROME
const spyTarget = document.body;
const scrollSpy = bootstrap.ScrollSpy.getInstance(spyTarget);
const navLinks = document.querySelectorAll('#menu-section-nav .nav-link');
let lastScrollTop = 0;

// Forzamos el refresh del ScrollSpy al hacer scroll
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (Math.abs(scrollTop - lastScrollTop) > 5) {
        scrollSpy?.refresh();
        lastScrollTop = scrollTop;

        // Aseguramos que solo 1 elemento tenga .active
        cleanAndActivate();
    }
});

// Si se hace clic, también limpiamos los .active anteriores
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Esperamos que termine el scroll suave
        setTimeout(() => cleanAndActivate(), 500);
    });
});

// Limpia todas las clases .active y activa solo el que esté visible
function cleanAndActivate() {
    let activeFound = false;

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const section = document.querySelector(href);

        if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100 && !activeFound) {
                link.classList.add('active');
                activeFound = true;
            } else {
                link.classList.remove('active');
            }
        }
    });
}