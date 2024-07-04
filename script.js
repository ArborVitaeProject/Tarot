document.addEventListener("DOMContentLoaded", function() {
    const cardImages = document.querySelectorAll(".card-item img");
    const modal = document.querySelector(".modal");
    const modalContent = document.querySelector(".modal-content");
    const closeModal = document.querySelector(".close");
    const backToTopButton = document.getElementById("back-to-top");
    const menuToggles = document.querySelectorAll(".menu-toggle");
    const submenus = document.querySelectorAll(".submenu");
    const suitMenus = document.querySelectorAll(".suit-menu");

    // Modal functionality
    cardImages.forEach(image => {
        image.addEventListener("click", function() {
            modal.style.display = "flex";
            const modalImage = document.createElement("img");
            modalImage.src = this.src;
            modalContent.innerHTML = '';
            modalContent.appendChild(modalImage);
        });
    });

    closeModal.addEventListener("click", function() {
        modal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Back to Top functionality
    window.addEventListener("scroll", function() {
        if (window.scrollY > 300) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    });

    backToTopButton.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Menu toggle functionality
    menuToggles.forEach(toggle => {
        toggle.addEventListener("click", function(e) {
            e.preventDefault();
            const submenu = this.nextElementSibling;
            submenus.forEach(sm => {
                if (sm !== submenu) {
                    sm.style.display = "none";
                }
            });
            submenu.style.display = submenu.style.display === "block" ? "none" : "block";
        });
    });

    // Smooth scroll and display suit menu functionality
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            window.scrollTo({
                top: targetElement.offsetTop - 60,  // Adding a buffer to the scroll position
                behavior: "smooth"
            });
            // Show the relevant suit menu if navigating to a main suit section
            suitMenus.forEach(sm => {
                if (sm.id === `${targetId}-menu`) {
                    sm.style.display = "block"; // Changed to block for vertical layout
                } else {
                    sm.style.display = "none";
                }
            });
        });
    });

    // Add scroll buffer for specific suit items
    const suitLinks = document.querySelectorAll('.suit-menu a');
    suitLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            window.scrollTo({
                top: targetElement.offsetTop - 60,  // Adding a buffer to the scroll position
                behavior: "smooth"
            });
        });
    });

    // Hide suit menus initially
    suitMenus.forEach(menu => {
        menu.style.display = "none";
    });
});
