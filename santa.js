document.addEventListener('DOMContentLoaded', function() {
    // Animar las razones al hacer scroll
    const reasons = document.querySelectorAll('.reason-item');
    
    function checkScroll() {
        reasons.forEach((reason, index) => {
            const rect = reason.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                reason.style.animation = `slideIn 0.5s ease forwards ${index * 0.2}s`;
            }
        });
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Verificar al cargar

    // Configuración del Modal y Calendario
    const modal = document.getElementById('adventModal');
    const closeModal = document.querySelector('.close-modal');
    const calendarGrid = document.querySelector('.calendar-grid');
    
    // Mensajes para el calendario de adviento
    const adventMessages = [
        {
            day: 1,
            message: "¡Te quiero! ❤️ Eres el regalo más hermoso en mi vida",
            image: "imagenes/img1.jpg"
        },
        {
            day: 2,
            message: "Eres especial ✨ Cada momento contigo es mágico",
            image: "imagenes/img6.jpg"
        },
        {
            day: 3,
            message: "Me haces feliz 😊 Tu sonrisa ilumina mi mundo",
            image: "imagenes/img11.jpg"
        },
        {
            day: 4,
            message: "Gracias por existir 🌟 Eres mi persona favorita",
            image: "imagenes/img12.jpg"
        },
        {
            day: 5,
            message: "Eres mi luz ✨ Contigo todo es mejor",
            image: "imagenes/img16.jpg"
        },
        {
            day: 6,
            message: "Mi mejor regalo 🎁 Eres lo más bonito que me ha pasado",
            image: "imagenes/img19.jpg"
        },
        {
            day: 7,
            message: "Tu amor es mi mayor bendición 🙏 Gracias por estar en mi vida",
            image: "imagenes/img3.jpg"
        },
        {
            day: 8,
            message: "Contigo cada día es especial ⭐ Te quiero muchísimo",
            image: "imagenes/img24.jpg"
        },
        {
            day: 9,
            message: "Eres mi persona favorita 💝 No cambiaría nada de ti",
            image: "imagenes/img17.jpg"
        },
        {
            day: 10,
            message: "Tu amor me hace mejor persona 💫 Gracias por tanto",
            image: "imagenes/img26.jpg"
        },
        {
            day: 11,
            message: "Cada día te quiero más 💖 Eres increíble",
            image: "imagenes/img28.jpg"
        },
        {
            day: 12,
            message: "Eres mi felicidad diaria 🌈 No imagino mi vida sin ti",
            image: "imagenes/img27.jpg"
        },
        {
            day: 13,
            message: "Tu amor es mi mayor tesoro 💎 Gracias por elegirme",
            image: "imagenes/img21.jpg"
        },
        {
            day: 14,
            message: "Contigo todo es perfecto 🌟 Eres mi complemento ideal",
            image: "imagenes/img23.jpg"
        },
        {
            day: 15,
            message: "Eres mi sueño hecho realidad ✨ Te quiero infinito",
            image: "imagenes/img13.jpg"
        },
        {
            day: 16,
            message: "Cada momento contigo es un regalo 🎁 Eres especial",
            image: "imagenes/img15.jpg"
        },
        {
            day: 17,
            message: "Tu amor me hace el más feliz 💫 Gracias por tanto amor",
            image: "imagenes/img14.jpg"
        },
        {
            day: 18,
            message: "Eres mi mejor aventura 🌈 Contigo todo es posible",
            image: "imagenes/img9.jpg"
        },
        {
            day: 19,
            message: "Tu amor es mi mayor motivación 💝 Te quiero cada día más",
            image: "imagenes/img8.jpg"
        },
        {
            day: 20,
            message: "Eres mi felicidad constante ⭐ No cambiaría nada de nuestra historia",
            image: "imagenes/img5.jpg"
        },
        {
            day: 21,
            message: "Contigo la vida es más bonita 🌸 Gracias por estar siempre",
            image: "imagenes/img10.jpg"
        },
        {
            day: 22,
            message: "Eres mi mayor bendición 🙏 Te quiero con todo mi corazón",
            image: "imagenes/img4.jpg"
        },
        {
            day: 23,
            message: "Cada día agradezco tenerte 💖 Eres mi mejor regalo",
            image: "imagenes/vd2.mp4"
        },
        {
            day: 24,
            message: "¡Feliz Navidad mi amor! 🎄❤️ Te amo con todo mi corazón",
            image: "imagenes/vd1.mp4"
        },
        // Mensajes de respaldo para uso aleatorio
        "¡Te quiero!", "Eres especial", "Me haces feliz",
        "Gracias por existir", "Eres mi luz", "Mi mejor regalo",
        "Eres increíble", "No cambiaría nada de ti", "Contigo todo es mejor",
        "Eres mi persona favorita", "Te quiero muchísimo", "Gracias por tanto amor"
    ];

    // Crear los días del calendario
    for (let i = 1; i <= 24; i++) {
        const day = document.createElement('div');
        day.className = 'calendar-day';
        day.textContent = i;
        
        day.addEventListener('click', function() {
            if (!this.classList.contains('opened')) {
                this.classList.add('opened');
                showModal(i);
            }
        });

        calendarGrid.appendChild(day);
    }
    // Función para mostrar el modal
    function showModal(day) {
        let messageObj = adventMessages.find(m => m.day === day);
        
        if (!messageObj) {
            const simpleMessages = adventMessages.filter(m => typeof m === 'string');
            const randomMessage = simpleMessages[Math.floor(Math.random() * simpleMessages.length)];
            messageObj = {
                message: randomMessage,
                image: 'path/to/default-christmas-image.jpg'
            };
        }

        const modalBody = modal.querySelector('.modal-body');

        if (messageObj.image.toLowerCase().endsWith('.mp4')) {
            modalBody.innerHTML = `
                <div class="video-message-container">
                    <video class="message-video" controls playsinline preload="metadata">
                        <source src="${messageObj.image}" type="video/mp4">
                        Tu navegador no soporta el elemento video.
                    </video>
                    <p class="message-text">${messageObj.message}</p>
                </div>
            `;

            const video = modalBody.querySelector('video');
            video.addEventListener('error', function(e) {
                console.error('Error loading video:', e);
                this.innerHTML = 'Error al cargar el video';
            });
        } else {
            modalBody.innerHTML = `
                <div class="video-message-container">
                    <img src="${messageObj.image}" alt="Día ${day} de Adviento">
                    <p class="message-text">${messageObj.message}</p>
                </div>
            `;
        }

        // Estilos para videos e imágenes
        if (!document.getElementById('video-styles')) {
            const videoStyles = document.createElement('style');
            videoStyles.id = 'video-styles';
            videoStyles.textContent = `
    .video-message-container {
        margin: 10px auto;
        max-width: 100%;
        width: min(400px, 75vw); /* Reducido a 400px */
        text-align: center;
    }

    .message-video {
        width: 100%;
        max-height: 300px; /* Reducido a 300px */
        border-radius: 12px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        background: transparent; /* Eliminado el fondo negro */
        margin-bottom: 10px;
        object-fit: contain;
    }

    /* Para las imágenes dentro del modal */
    .modal-body img {
        max-width: min(400px, 75vw);
        max-height: 300px;
        width: auto;
        height: auto;
        object-fit: contain;
        border-radius: 12px;
        background: transparent;
    }

    .message-text {
        color: #fff;
        font-size: 1.1rem;
        margin: 8px auto;
        padding: 8px;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 8px;
        max-width: 400px;
    }

    @media (max-width: 768px) {
        .video-message-container {
            width: min(350px, 80vw);
        }
        .message-video, .modal-body img {
            max-height: 250px;
        }
        .message-text {
            font-size: 1rem;
        }
    }

    @media (max-width: 480px) {
        .video-message-container {
            width: min(300px, 85vw);
        }
        .message-video, .modal-body img {
            max-height: 200px;
        }
    }
`;
            document.head.appendChild(videoStyles);
        }

        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);

        createSnowflakes();
    }

    // Función para crear los copos de nieve
    function createSnowflakes() {
        const snowContainer = modal.querySelector('.snow');
        snowContainer.innerHTML = '';
        
        const numberOfSnowflakes = 50;
        for (let i = 0; i < numberOfSnowflakes; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            snowflake.style.left = `${Math.random() * 100}%`;
            snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
            snowflake.style.animationDelay = `${Math.random() * 2}s`;
            snowContainer.appendChild(snowflake);
        }
    }

    // Eventos de cierre del modal
    closeModal.addEventListener('click', function() {
        const video = modal.querySelector('video');
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            modal.querySelector('.snow').innerHTML = '';
        }, 300);
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal.click();
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal.click();
        }
    });

    // Hacer la función showModal disponible globalmente
    window.showAdventModal = function(day) {
        showModal(day);
    };
});
