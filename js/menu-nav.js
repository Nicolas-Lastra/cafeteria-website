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
