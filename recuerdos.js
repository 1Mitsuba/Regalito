document.addEventListener('DOMContentLoaded', function() {
    // Añadir animación de entrada con delay para cada card
    const cards = document.querySelectorAll('.memory-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });

    // Función para verificar si un elemento está en el viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Animar cards cuando aparecen en el viewport
    function checkCards() {
        cards.forEach(card => {
            if (isInViewport(card) && !card.style.opacity) {
                card.style.opacity = '1';
            }
        });
    }

    // Verificar al hacer scroll
    window.addEventListener('scroll', checkCards);
    checkCards(); // Verificar al cargar

    // Ejemplo de cómo agregar una nueva card dinámicamente
    function addMemoryCard(imageUrl, title, date, description, tags) {
        const memoriesGrid = document.querySelector('.memories-grid');
        
        const cardHTML = `
            <div class="memory-card">
                <div class="card-inner">
                    <div class="card-front">
                        <img src="${imageUrl}" alt="${title}">
                        <div class="card-front-title">
                            <h3>${title}</h3>
                            <span class="card-date">${date}</span>
                        </div>
                    </div>
                    <div class="card-back">
                        <div class="card-content">
                            <h3>${title}</h3>
                            <p>${description}</p>
                            <span class="card-date">${date}</span>
                            <div class="card-tags">
                                ${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        memoriesGrid.insertAdjacentHTML('beforeend', cardHTML);
        const newCard = memoriesGrid.lastElementChild;
        newCard.style.animation = 'fadeIn 0.5s ease forwards';
    }

    // Ejemplo de uso:
    // addMemoryCard(
    //     'path/to/image.jpg',
    //     'Nuevo Recuerdo',
    //     '15/12/2023',
    //     'Descripción del momento especial...',
    //     ['❤️ Amor', '✨ Mágico']
    // );
});