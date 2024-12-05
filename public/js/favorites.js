document.addEventListener('DOMContentLoaded', () => {
    // Add index to each card for staggered animation
    const cards = document.querySelectorAll('.movie-card');
    cards.forEach((card, index) => {
        card.style.setProperty('--card-index', index);
    });

    // Hide intro overlay after animation
    setTimeout(() => {
        const overlay = document.querySelector('.intro-overlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
    }, 3000);

    // Add fade-in animation to cards
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
});
