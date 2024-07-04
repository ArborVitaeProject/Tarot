document.addEventListener("DOMContentLoaded", function() {
    const cardImages = document.querySelectorAll(".card-item img");
    const modal = document.querySelector(".modal");
    const modalContent = document.querySelector(".modal-content");
    const closeModal = document.querySelector(".close");
    const searchButton = document.getElementById("searchButton");

    // Event listener for card images to open modal
    cardImages.forEach(image => {
        image.addEventListener("click", function() {
            modal.style.display = "flex";
            const modalImage = document.createElement("img");
            modalImage.src = this.src;
            modalContent.innerHTML = '';
            modalContent.appendChild(modalImage);
        });
    });

    // Event listener to close modal
    closeModal.addEventListener("click", function() {
        modal.style.display = "none";
    });

    // Event listener to close modal when clicking outside of it
    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Add event listener for the search button
    searchButton.addEventListener("click", filterCards);
});

// Search function
function filterCards() {
    const searchBar = document.getElementById("searchBar");
    const filter = searchBar.value.toUpperCase();
    const cardList = document.getElementById("cardList");
    const cards = cardList.getElementsByClassName("card-item");

    let firstMatch = null;

    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const cardText = card.textContent || card.innerText;
        if (cardText.toUpperCase().indexOf(filter) > -1) {
            card.style.display = "";
            if (!firstMatch) {
                firstMatch = card;
            }
        } else {
            card.style.display = "none";
        }
    }

    // Scroll to the first matching card
    if (firstMatch) {
        firstMatch.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
