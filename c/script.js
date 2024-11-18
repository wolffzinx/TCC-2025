// Configuração das partículas
document.addEventListener('DOMContentLoaded', () => {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#004482'
            },
            shape: {
                type: ['circle', 'triangle'],
                stroke: {
                    width: 0,
                    color: '#000000'
                },
                polygon: {
                    nb_sides: 5
                }
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#004482',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
});

// Alternância de tema
document.getElementById('themeToggle').addEventListener('click', () => {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    
    // Animação suave de transição
    html.style.transition = 'all 0.5s ease';
    html.setAttribute('data-theme', newTheme);
    
    // Atualiza o ícone
    const themeIcon = document.querySelector('.theme-toggle i');
    themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    
    // Atualiza a cor das partículas
    if (window.pJSDom && window.pJSDom[0]) {
        const particlesColor = newTheme === 'dark' ? '#004482' : '#00599c';
        window.pJSDom[0].pJS.particles.color.value = particlesColor;
        window.pJSDom[0].pJS.particles.line_linked.color = particlesColor;
        window.pJSDom[0].pJS.fn.particlesRefresh();
    }
});

// Animação dos cards ao aparecer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.phase-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease-out';
    observer.observe(card);
});

// Efeito de hover nos cards
document.querySelectorAll('.phase-card').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        const icon = card.querySelector('.phase-icon i');
        icon.style.transform = 'scale(1.2)';
        
        // Efeito de brilho
        const number = card.querySelector('.phase-number');
        number.style.transform = 'scale(1.1)';
        number.style.background = 'var(--accent-primary)';
        number.style.color = 'white';
    });
    
    card.addEventListener('mouseleave', (e) => {
        const icon = card.querySelector('.phase-icon i');
        icon.style.transform = 'scale(1)';
        
        const number = card.querySelector('.phase-number');
        number.style.transform = 'scale(1)';
        number.style.background = 'var(--number-bg)';
        number.style.color = 'var(--accent-primary)';
    });
});

// Animação do texto de introdução
const introText = document.querySelector('.intro h1');
const letters = introText.textContent.split('');
introText.textContent = '';

letters.forEach((letter, i) => {
    const span = document.createElement('span');
    span.textContent = letter;
    span.style.opacity = '0';
    span.style.transform = 'translateY(20px)';
    span.style.transition = `all 0.5s ease ${i * 0.1}s`;
    introText.appendChild(span);
});

setTimeout(() => {
    introText.querySelectorAll('span').forEach(span => {
        span.style.opacity = '1';
        span.style.transform = 'translateY(0)';
    });
}, 100);

// Efeito de hover no logo
document.querySelector('.logo a').addEventListener('mouseenter', () => {
    const icon = document.querySelector('.logo i');
    icon.style.transform = 'rotate(360deg)';
    icon.style.transition = 'transform 0.5s ease';
});

document.querySelector('.logo a').addEventListener('mouseleave', () => {
    const icon = document.querySelector('.logo i');
    icon.style.transform = 'rotate(0deg)';
});