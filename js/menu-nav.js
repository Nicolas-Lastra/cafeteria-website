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

// Eventos
window.addEventListener('scroll', () => {
    updateActiveLink();
    handleStickyMenu();
});

window.addEventListener('resize', updateActiveLink);
window.addEventListener('load', updateActiveLink);
