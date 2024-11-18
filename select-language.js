// Configuração do Particles.js
particlesJS('particles-js',
    {
      "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#39ff14"
        },
        "shape": {
          "type": ["circle", "triangle", "edge"],
          "stroke": {
            "width": 0,
            "color": "#000000"
          }
        },
        "opacity": {
          "value": 0.5,
          "random": true
        },
        "size": {
          "value": 3,
          "random": true
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#39ff14",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 6,
          "direction": "none",
          "random": true,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": true,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "repulse"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "repulse": {
            "distance": 100,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          }
        }
      },
      "retina_detect": true
    }
  );
  
  // Inicialização do Particles.js
  document.addEventListener('DOMContentLoaded', function() {
      particlesJS.load('particles-js', 'particles.json', function() {
          console.log('particles.js loaded');
      });
  });
  
  // Alternador de tema
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const icon = themeToggle.querySelector('i');
  
  themeToggle.addEventListener('click', () => {
      if (body.classList.contains('light-theme')) {
          body.classList.remove('light-theme');
          body.classList.add('dark-theme');
          icon.classList.remove('fa-moon');
          icon.classList.add('fa-sun');
      } else {
          body.classList.remove('dark-theme');
          body.classList.add('light-theme');
          icon.classList.remove('fa-sun');
          icon.classList.add('fa-moon');
      }
  });
  
  // Adicionar efeitos de hover nos cards
  document.querySelectorAll('.language-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
          card.style.transform = 'scale(1.02)';
      });
      
      card.addEventListener('mouseleave', () => {
          card.style.transform = 'scale(1)';
      });
  });
  
  // Verificar tema preferido do sistema
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      body.classList.remove('light-theme');
      body.classList.add('dark-theme');
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
  }