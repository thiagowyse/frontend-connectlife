document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const dropdowns = document.querySelectorAll('.dropdown');

    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });

    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', () => {
            if (window.innerWidth > 992) {
                dropdown.querySelector('.dropdown-content').style.display = 'block';
            }
        });

        dropdown.addEventListener('mouseleave', () => {
            if (window.innerWidth > 992) {
                dropdown.querySelector('.dropdown-content').style.display = 'none';
            }
        });
    });

    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        link.addEventListener('click', (event) => {
            if (window.innerWidth <= 992) {
                event.preventDefault();
                const content = dropdown.querySelector('.dropdown-content');
                // Alterna a visibilidade do dropdown
                if (content.style.display === 'block') {
                    content.style.display = 'none';
                } else {
                    content.style.display = 'block';
                }
            }
        });
    });
});