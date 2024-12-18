document.addEventListener('DOMContentLoaded', function() {
    // Añadir animación de entrada con delay para cada regalo
    const gifts = document.querySelectorAll('.gift-box');
    gifts.forEach((gift, index) => {
        gift.style.animationDelay = `${index * 0.2}s`;
    });

    // Efecto de sonido al abrir regalo (opcional)
    gifts.forEach(gift => {
        gift.addEventListener('click', function() {
            // Aquí puedes añadir un efecto de sonido si lo deseas
            // const audio = new Audio('path/to/sound.mp3');
            // audio.play();
        });
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

    // Animar regalos cuando aparecen en el viewport
    function checkGifts() {
        gifts.forEach(gift => {
            if (isInViewport(gift) && !gift.style.opacity) {
                gift.style.opacity = '1';
            }
        });
    }

    // Verificar al hacer scroll
    window.addEventListener('scroll', checkGifts);
    checkGifts(); // Verificar al cargar
});