// Mostrar botón al hacer scroll hacia abajo
const btnScrollTop = document.getElementById('btn-scroll-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        btnScrollTop.classList.add('visible');
    } else {
        btnScrollTop.classList.remove('visible');
    }
});

// Volver al top al hacer clic
btnScrollTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});