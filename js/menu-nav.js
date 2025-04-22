const mainNav = document.querySelector('.navbar');
const menuNav = document.querySelector('.menu-navbar');
const sectionLinks = document.querySelectorAll('#menu-section-nav .nav-link');
const sections = Array.from(sectionLinks).map(link => {
    const id = link.getAttribute('href').slice(1);
    return document.getElementById(id);
});

// Calcula el desplazamiento total de la barra fija arriba
function getNavOffset() {
    return mainNav.offsetHeight + (menuNav?.offsetHeight || 0);
}

// Manejo manual del "scrollspy"
function updateActiveLink() {
    const scrollPos = window.scrollY + getNavOffset() + 20; // Ajuste fino (20px extra)

    let currentSection = sections[0];

    for (let section of sections) {
        if (section.offsetTop <= scrollPos) {
            currentSection = section;
        }
    }

    const currentId = currentSection.getAttribute('id');

    sectionLinks.forEach(link => {
        const linkHref = link.getAttribute('href').slice(1);
        if (linkHref === currentId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Sticky menu en scroll
function handleStickyMenu() {
    const mainNavBottom = mainNav.getBoundingClientRect().bottom;
    if (mainNavBottom <= 0) {
        menuNav.classList.add('is-fixed');
    } else {
        menuNav.classList.remove('is-fixed');
    }
}

// Forzar limpieza de 'active' en click manual
sectionLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        // Elimina todas las clases 'active' inmediatamente
        sectionLinks.forEach(l => l.classList.remove('active'));
    });
});

// Scroll horizontal para centrar la pestaña activa
function scrollToActiveTab() {
    const activeLink = document.querySelector('#menu-section-nav .nav-link.active');
    const navContainer = document.querySelector('#menu-section-nav .d-flex.overflow-auto');

    if (!activeLink || !navContainer) return;

    const linkRect = activeLink.getBoundingClientRect();
    const containerRect = navContainer.getBoundingClientRect();

    const offsetLeft = linkRect.left - containerRect.left;
    const offsetCenter = offsetLeft - containerRect.width / 2 + linkRect.width / 2;

    navContainer.scrollBy({
        left: offsetCenter,
        behavior: 'smooth'
    });
}

// Eventos
window.addEventListener('scroll', () => {
    updateActiveLink();
    handleStickyMenu();
    scrollToActiveTab();
});

window.addEventListener('resize', updateActiveLink);
window.addEventListener('load', () => {
    updateActiveLink();
    scrollToActiveTab();
});
