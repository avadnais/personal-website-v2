document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('background');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null };

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticle(x, y) {
        return {
            x,
            y,
            size: Math.random() * 2 + 0.5, // Smaller size
            speedX: Math.random() * 0.5 - 0.25, // Slower speed
            speedY: Math.random() * 0.5 - 0.25, // Slower speed
        };
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            ctx.fillStyle = 'rgba(162, 131, 110, 0.2)'; // Lighter color
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
    
            // Move particles away from cursor
            if (mouse.x && mouse.y) {
                const dx = particle.x - mouse.x;
                const dy = particle.y - mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
                    const angle = Math.atan2(dy, dx);
                    const force = (100 - distance) / 100;
                    particle.x += Math.cos(angle) * force * 2;
                    particle.y += Math.sin(angle) * force * 2;
                }
            }
    
            // Regular particle movement
            particle.x += particle.speedX;
            particle.y += particle.speedY;
    
            // Bounce off edges
            if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        });
        requestAnimationFrame(drawParticles);
    }

    function init() {
        resizeCanvas();
        for (let i = 0; i < 100; i++) { // Fewer particles
            particles.push(createParticle(Math.random() * canvas.width, Math.random() * canvas.height));
        }
        drawParticles();
    }

    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    init();

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
