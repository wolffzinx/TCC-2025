// Theme Toggle
document.getElementById('themeToggle').addEventListener('click', () => {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    const themeIcon = document.querySelector('.theme-toggle i');
    themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
});

// Cursor Trail Effect
const cursor = document.querySelector('.cursor-trail');
let cursorTimeout;

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursor.style.opacity = '0.5';
    
    clearTimeout(cursorTimeout);
    cursorTimeout = setTimeout(() => {
        cursor.style.opacity = '0';
    }, 100);
});

// Floating Python Icons
function createFloatingPythons() {
    const container = document.querySelector('.floating-pythons');
    const numberOfPythons = 10;

    for (let i = 0; i < numberOfPythons; i++) {
        const python = document.createElement('div');
        python.className = 'python-icon';
        python.innerHTML = '<i class="fab fa-python"></i>';
        
        // Random position and animation duration
        const left = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = 15 + Math.random() * 10;
        
        python.style.left = `${left}%`;
        python.style.animationDelay = `${delay}s`;
        python.style.animationDuration = `${duration}s`;
        
        container.appendChild(python);
    }
}

// Card Hover Effects
function initializeCardEffects() {
    const cards = document.querySelectorAll('.level-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            
            card.style.transform = `
                perspective(1000px)
                rotateX(${(e.clientY - cardCenterY) * 0.01}deg)
                rotateY(${(e.clientX - cardCenterX) * 0.01}deg)
                translateY(-5px)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });

        // Adiciona efeito de ondulação ao clicar
        card.addEventListener('click', (e) => {
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            card.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 1000);
        });
    });
}

// Snake Animation in Cards
function initializeSnakeAnimation() {
    const snakes = document.querySelectorAll('.snake-decoration');
    
    snakes.forEach(snake => {
        let position = 0;
        
        setInterval(() => {
            position += 1;
            snake.style.backgroundPosition = `${position}px ${position}px`;
        }, 50);
    });
}

// Particles Effect
function createParticles() {
    const container = document.querySelector('.particles-container');
    const numberOfParticles = 50;

    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 5 + 2;
        const left = Math.random() * 100;
        const delay = Math.random() * 5;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.animationDelay = `${delay}s`;
        
        container.appendChild(particle);
    }
}

// Level Card Progress Animation
function animateLevelProgress() {
    const numbers = document.querySelectorAll('.level-number');
    
    numbers.forEach((number, index) => {
        let count = 0;
        const target = index + 1;
        const duration = 1000; // 1 segundo
        const interval = duration / target;
        
        const counter = setInterval(() => {
            count++;
            number.textContent = count;
            
            if (count === target) {
                clearInterval(counter);
            }
        }, interval);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createFloatingPythons();
    initializeCardEffects();
    initializeSnakeAnimation();
    createParticles();
    animateLevelProgress();

    // Adiciona classe de animação aos cards sequencialmente
    const cards = document.querySelectorAll('.level-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate-in');
        }, index * 200);
    });
});

// Adiciona efeito de parallax suave
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.level-card');
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;

    cards.forEach(card => {
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2;
        
        const offsetX = (cardCenterX - e.clientX) * 0.01;
        const offsetY = (cardCenterY - e.clientY) * 0.01;
        
        card.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
});