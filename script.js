document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('click', () => {
        cursor.style.transform = 'scale(0.9)';
        setTimeout(() => {
            cursor.style.transform = 'scale(1)';
        }, 100);
    });

    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
        });
        link.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });

    // Subtle fade-in animation for the heading
    const heading = document.querySelector('#hero h1');
    heading.classList.add('fade-in');
    setTimeout(() => {
        heading.style.opacity = '1';
        heading.style.transform = 'translateY(0)';
    }, 200);

    gsap.from('#hero h2', { opacity: 0, y: 20, duration: 1, delay: 0.4 });
    gsap.from('.scroll-indicator', { opacity: 0, y: 20, duration: 1, delay: 0.6, repeat: -1, yoyo: true });

    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });
});
