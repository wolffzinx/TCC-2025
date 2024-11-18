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

    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }

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

    // Card Hover Effects
    const cards = document.querySelectorAll('.level-card');
    
    cards.forEach(card => {
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
    });

    // Java Logo Steam Animation
    function createSteam() {
        const steamElements = document.querySelectorAll('.steam');
        steamElements.forEach(steam => {
            steam.style.opacity = '0';
            steam.style.height = '0';
            
            setTimeout(() => {
                steam.style.opacity = '0.5';
                steam.style.height = '10px';
                
                setTimeout(() => {
                    steam.style.opacity = '0';
                    steam.style.height = '0';
                    steam.style.transform = 'translateY(-10px)';
                }, 1000);
            }, Math.random() * 1000);
        });
    }

    // Start steam animation loop
    setInterval(createSteam, 2000);

    // Card Click Handler
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Prevent double-triggering with play button
            if (e.target.classList.contains('play-button')) {
                return;
            }
            
            const link = card.getAttribute('onclick').match(/'([^']+)'/)[1];
            window.location.href = link;
        });
    });

    // Play Button Hover Sound Effect (opcional)
    const playButtons = document.querySelectorAll('.play-button');
    const hoverSound = new Audio('hover.mp3'); // Você precisará adicionar este arquivo
    
    playButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0;
            hoverSound.volume = 0.2;
            hoverSound.play().catch(() => {}); // Ignora erro se o áudio não existir
        });
    });
});