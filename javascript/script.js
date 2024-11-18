document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    themeToggle.addEventListener('click', () => {
        const html = document.documentElement;
        const isDark = html.getAttribute('data-theme') === 'dark';
        
        html.setAttribute('data-theme', isDark ? 'light' : 'dark');
        themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    });

    // Cursor Trail Effect
    const trail = document.querySelector('.cursor-trail');
    let timeout;

    document.addEventListener('mousemove', (e) => {
        trail.style.left = e.pageX + 'px';
        trail.style.top = e.pageY + 'px';
        trail.style.opacity = '0.5';
        
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            trail.style.opacity = '0';
        }, 100);
    });

    // Particles Effect
    const particlesContainer = document.querySelector('.particles-container');
    const particleCount = 50;

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 2px and 5px
        const size = Math.random() * 3 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 3}s`;
        
        particlesContainer.appendChild(particle);
        
        // Remove and recreate particle after animation
        setTimeout(() => {
            particle.remove();
            createParticle();
        }, 3000);
    }

    // Create initial particles
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }

    // Card Hover Effects
    const cards = document.querySelectorAll('.level-card');
    
    cards.forEach(card => {
        // Glow effect on hover
        card.addEventListener('mouseenter', () => {
            const glow = card.querySelector('.card-glow');
            glow.style.left = '-100%';
            setTimeout(() => {
                glow.style.left = '100%';
            }, 50);
        });

        card.addEventListener('mouseleave', () => {
            const glow = card.querySelector('.card-glow');
            glow.style.left = '-100%';
        });

        // Play button hover effect
        const playButton = card.querySelector('.play-button');
        if (playButton) {
            playButton.addEventListener('mouseenter', () => {
                playButton.style.transform = 'scale(1.05)';
            });
            
            playButton.addEventListener('mouseleave', () => {
                playButton.style.transform = 'scale(1)';
            });
        }
    });

    // Logo Glow Animation
    function createGlow() {
        const glowElements = document.querySelectorAll('.glow');
        glowElements.forEach(glow => {
            glow.style.opacity = '0';
            glow.style.height = '0';
            
            setTimeout(() => {
                glow.style.opacity = '0.5';
                glow.style.height = '10px';
                
                setTimeout(() => {
                    glow.style.opacity = '0';
                    glow.style.height = '0';
                    glow.style.transform = 'translateY(-10px)';
                }, 1000);
            }, Math.random() * 1000);
        });
    }

    // Start glow animation loop
    setInterval(createGlow, 2000);

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Optional: Add sound effects
    const hoverSound = new Audio('hover.mp3'); // Você precisará adicionar este arquivo
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0;
            hoverSound.volume = 0.2;
            hoverSound.play().catch(() => {}); // Ignora erro se o áudio não existir
        });
    });

    // Optional: Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});