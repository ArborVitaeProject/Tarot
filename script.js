document.addEventListener('DOMContentLoaded', () => {
    const backToTopButton = document.getElementById('back-to-top');
    const scrollOffsetDesktop = 830; // Adjust scroll offset for better view on desktop
    const scrollOffsetMobile = -70; // Adjust scroll offset for better view on mobile

    // Show or hide the back-to-top button
    window.onscroll = () => {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    };

    // Scroll to top when the button is clicked
    backToTopButton.onclick = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };

    // Toggle the main menu
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('nav ul');
    const closeMenuButton = document.querySelector('.close-menu');

    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('open');
        menuToggle.style.display = 'none';
    });

    closeMenuButton.addEventListener('click', () => {
        menu.classList.remove('open');
        menuToggle.style.display = 'block';
    });

    // Toggle submenus
    document.querySelectorAll('.submenu-toggle').forEach(submenuToggle => {
        submenuToggle.addEventListener('click', function (e) {
            e.preventDefault();
            this.classList.toggle('active');
            const nestedSubmenu = this.nextElementSibling;
            if (nestedSubmenu.style.display === 'block') {
                nestedSubmenu.style.display = 'none';
            } else {
                nestedSubmenu.style.display = 'block';
            }
        });
    });

    // Smooth scroll for menu links
    document.querySelectorAll('nav ul a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const scrollOffset = window.innerWidth <= 768 ? scrollOffsetMobile : scrollOffsetDesktop;
                window.scrollTo({
                    top: targetElement.offsetTop - scrollOffset,
                    behavior: 'smooth'
                });

                // Close all submenus
                document.querySelectorAll('.submenu, .nested-submenu').forEach(menu => {
                    menu.style.display = 'none';
                });
                document.querySelectorAll('.submenu-toggle').forEach(toggle => {
                    toggle.classList.remove('active');
                });

                // Close main menu for mobile
                if (window.innerWidth <= 768) {
                    menu.classList.remove('open');
                    menuToggle.style.display = 'block';
                }
            }
        });
    });

    // Modal functionality
    const modal = document.querySelector('.modal');
    const modalContent = document.querySelector('.modal-content');
    const closeModal = document.querySelector('.close');

    document.querySelectorAll('.card img').forEach(image => {
        image.addEventListener('click', () => {
            modal.style.display = 'block';
            modalContent.innerHTML = image.outerHTML + `<span class="close">&times;</span>`;
            document.querySelector('.close').onclick = () => {
                modal.style.display = 'none';
            };
        });
    });

    closeModal.onclick = () => {
        modal.style.display = 'none';
    };

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
});
