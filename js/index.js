
// Função para atualizar a navegação ao rolar a página
window.addEventListener('scroll', () => {
    let sections = document.querySelectorAll('section');
    let links = document.querySelectorAll('.nav-link');

    sections.forEach((section, index) => {
        const top = section.offsetTop - 100;
        const bottom = top + section.offsetHeight;

        // Verifica se a seção está na viewport
        if (window.scrollY >= top && window.scrollY < bottom) {
            links.forEach(link => link.classList.remove('active')); // Remove 'active' de todos
            links[index].classList.add('active'); // Adiciona 'active' no link da seção visível
        }
    });
});



$(document).ready(function() {
    $('#mobile_btn').on('click', function () {
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn').find('i').toggleClass('fa-x');
    });

    const sections = $('section');
    const navItems = $('.nav-item');

    $(window).on('scroll', function () {
        const header = $('header');
        const scrollPosition = $(window).scrollTop() - header.outerHeight();

        let activeSectionIndex = 0;

        if (scrollPosition <= 0) {
            header.css('box-shadow', 'none');
        } else {
            header.css('box-shadow', '5px 1px 5px rgba(0, 0, 0, 0.1');
        }

        sections.each(function(i) {
            const section = $(this);
            const sectionTop = section.offset().top - 96;
            const sectionBottom = sectionTop+ section.outerHeight();

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSectionIndex = i;
                return false;
            }
        })

        navItems.removeClass('active');
        $(navItems[activeSectionIndex]).addClass('active');
    });

    ScrollReveal().reveal('#cta', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('.dish', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('#testimonial_chef', {
        origin: 'left',
        duration: 1000,
        distance: '20%'
    })

    ScrollReveal().reveal('.feedback', {
        origin: 'right',
        duration: 1000,
        distance: '20%'
    })
});

$(document).ready(function() {
    function alignBannerWithCta() {
        const ctaHeight = $('#cta').outerHeight();
        $('#banner').css('height', ctaHeight);
    }

    // Ajusta o alinhamento no carregamento e redimensionamento da janela
    alignBannerWithCta();
    $(window).resize(alignBannerWithCta);
});


document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");

    themeToggle.addEventListener("click", () => {
        document.documentElement.classList.toggle("dark-mode");

        // Alterna o ícone entre sol e lua
        if (document.documentElement.classList.contains("dark-mode")) {
            themeIcon.classList.replace("fa-sun", "fa-moon");
        } else {
            themeIcon.classList.replace("fa-moon", "fa-sun");
        }
    });

    // Adiciona animação ao conteúdo
    const rows = document.querySelectorAll('.container .row');
    rows.forEach((row, index) => {
        setTimeout(() => {
            row.classList.add('show');
        }, index * 200); // Adiciona um pequeno delay entre as linhas
    });
});




