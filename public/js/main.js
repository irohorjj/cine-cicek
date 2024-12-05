// Header scroll efekti
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Film kartları için hover efekti ve trailer modal
document.addEventListener('DOMContentLoaded', () => {
    const movieCards = document.querySelectorAll('.movie-card');
    const modal = document.querySelector('.trailer-modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalIframe = modal.querySelector('iframe');

    movieCards.forEach(card => {
        card.addEventListener('click', () => {
            const trailerUrl = card.dataset.trailer;
            if (trailerUrl) {
                modalIframe.src = trailerUrl;
                modal.classList.add('active');
                modalOverlay.classList.add('active');
            }
        });
    });

    modalOverlay.addEventListener('click', () => {
        modal.classList.remove('active');
        modalOverlay.classList.remove('active');
        modalIframe.src = '';
    });
});

// Fade-in animasyonu için Intersection Observer
const fadeElements = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach(element => {
    element.style.opacity = 0;
    element.style.transition = 'opacity 0.5s ease-in';
    fadeObserver.observe(element);
});
