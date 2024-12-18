document.addEventListener('DOMContentLoaded', () => {
    // Configuración del botón de música navideña
    const christmasButton = document.querySelector('button');
    const audio = document.getElementById('christmasAudio');
    let isPlaying = false;

    // Función para manejar el audio
    function toggleAudio() {
        if (isPlaying) {
            audio.pause();
            audio.currentTime = 0;
            christmasButton.removeAttribute('data-playing');
            christmasButton.style.transform = 'scale(1)';
        } else {
            audio.play()
            .then(() => {
                christmasButton.setAttribute('data-playing', 'true');
                christmasButton.style.transform = 'scale(0.95)';
            })
            .catch(error => {
                console.error("Error playing audio:", error);
            });
        }
        isPlaying = !isPlaying;
    }

    // Eventos para el botón y el audio
    christmasButton.addEventListener('click', toggleAudio);
    audio.addEventListener('ended', () => {
        isPlaying = false;
        christmasButton.removeAttribute('data-playing');
        christmasButton.style.transform = 'scale(1)';
    });

    // Configuración del árbol de navidad
    const lights = document.querySelector('.lights');
    const decorations = document.querySelector('.decorations');
    const snow = document.querySelector('.snow');
    const treeContainer = document.querySelector('.tree-container');
    
    // Obtener dimensiones reales del contenedor del árbol
    const treeRect = treeContainer.getBoundingClientRect();
    const treeHeight = treeRect.height;
    const treeWidth = treeRect.width;

    // Colores para las luces
    const lightColors = [
        '#ff0000', '#00ff00', '#0000ff', 
        '#ffff00', '#ff00ff', '#ffffff',
        '#ffa500', '#00ffff'
    ];
    
    // Colores para las decoraciones
    const decorationColors = [
        '#ff0000', '#ffd700', '#ff69b4', 
        '#4169e1', '#9400d3', '#c0c0c0',
        '#ff8c00'
    ];

    // Función para verificar si un punto está dentro del árbol
    function isInsideTree(x, y) {
        const slope = treeWidth / (2 * treeHeight);
        const leftBoundary = (treeWidth/2) - (slope * y);
        const rightBoundary = (treeWidth/2) + (slope * y);
        return x >= leftBoundary && x <= rightBoundary;
    }

    // Función para actualizar posiciones según el tamaño de la ventana
    function updatePositions() {
        const newTreeRect = treeContainer.getBoundingClientRect();
        const scaleX = newTreeRect.width / treeWidth;
        const scaleY = newTreeRect.height / treeHeight;

        document.querySelectorAll('.light').forEach(light => {
            const left = parseFloat(light.getAttribute('data-left'));
            const top = parseFloat(light.getAttribute('data-top'));
            light.style.left = `${left * scaleX}px`;
            light.style.top = `${top * scaleY}px`;
        });

        document.querySelectorAll('.decoration').forEach(decoration => {
            const left = parseFloat(decoration.getAttribute('data-left'));
            const top = parseFloat(decoration.getAttribute('data-top'));
            decoration.style.left = `${left * scaleX}px`;
            decoration.style.top = `${top * scaleY}px`;
        });
    }

    // Agregar luces en forma de guirnalda
    function addLights() {
        lights.innerHTML = '';
        for (let row = 0; row < 12; row++) {
            const y = (row * treeHeight / 12);
            const maxWidth = (treeWidth * (treeHeight - y)) / treeHeight;
            const numLights = Math.floor(maxWidth / 40);
            
            for (let i = 0; i < numLights; i++) {
                const light = document.createElement('div');
                light.className = 'light';
                const wave = Math.sin(i * 0.8) * 15;
                const x = (i * maxWidth / numLights) - (maxWidth / 2) + wave;
                
                if (isInsideTree(x + treeWidth/2, y)) {
                    const left = x + treeWidth/2;
                    const top = y;
                    light.setAttribute('data-left', left);
                    light.setAttribute('data-top', top);
                    light.style.left = `${left}px`;
                    light.style.top = `${top}px`;
                    
                    const color = lightColors[Math.floor(Math.random() * lightColors.length)];
                    light.style.backgroundColor = color;
                    light.style.boxShadow = `0 0 15px ${color}`;
                    light.style.animation = `lightTwinkle ${1.5 + Math.random()}s infinite alternate`;
                    light.style.animationDelay = `${Math.random() * 2}s`;
                    lights.appendChild(light);
                }
            }
        }
    }

    // Agregar decoraciones (bolas navideñas)
    function addDecorations() {
        decorations.innerHTML = '';
        for (let i = 0; i < 25; i++) {
            const decoration = document.createElement('div');
            decoration.className = 'decoration';
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * (treeWidth/2 - 30);
            const centerX = treeWidth/2;
            const y = Math.random() * (treeHeight - 60);
            const x = centerX + radius * Math.cos(angle);
            
            if (isInsideTree(x, y)) {
                decoration.setAttribute('data-left', x);
                decoration.setAttribute('data-top', y);
                decoration.style.left = `${x}px`;
                decoration.style.top = `${y}px`;
                decoration.style.color = decorationColors[Math.floor(Math.random() * decorationColors.length)];
                decoration.style.transform = `scale(${0.9 + Math.random() * 0.3})`;
                decorations.appendChild(decoration);
            }
        }
    }

    // Crear copos de nieve
    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = '❄';
        snowflake.style.left = `${Math.random() * 100}%`;
        snowflake.style.opacity = Math.random() * 0.7 + 0.3;
        snowflake.style.fontSize = `${Math.random() * 10 + 10}px`;
        snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
        snowflake.style.animationDelay = `${Math.random() * 2}s`;
        snow.appendChild(snowflake);

        setTimeout(() => {
            snowflake.remove();
        }, 5000);
    }

    // Hacer las decoraciones interactivas
    function addDecorationsInteractivity() {
        document.querySelectorAll('.decoration').forEach(decoration => {
            decoration.addEventListener('mouseover', () => {
                decoration.style.transform = 'scale(1.3)';
            });
            
            decoration.addEventListener('mouseout', () => {
                decoration.style.transform = 'scale(1)';
            });
            
            decoration.addEventListener('click', () => {
                decoration.style.transform = 'scale(1.5)';
                setTimeout(() => {
                    decoration.style.transform = 'scale(1)';
                }, 200);
            });
        });
    }

    // Hacer las luces interactivas
    function addLightsInteractivity() {
        document.querySelectorAll('.light').forEach(light => {
            light.addEventListener('mouseover', () => {
                light.style.transform = 'scale(1.8)';
                light.style.filter = 'brightness(1.5)';
                light.style.zIndex = '3';
            });
            
            light.addEventListener('mouseout', () => {
                light.style.transform = 'scale(1)';
                light.style.filter = 'brightness(1)';
                light.style.zIndex = '2';
            });
        });
    }

    // Efecto de brillo aleatorio para las luces
    function randomLightEffect() {
        const lights = document.querySelectorAll('.light');
        const randomLight = lights[Math.floor(Math.random() * lights.length)];
        
        if (randomLight) {
            randomLight.style.filter = 'brightness(1.5)';
            setTimeout(() => {
                randomLight.style.filter = 'brightness(1)';
            }, 200);
        }
    }

    // Inicializar
    addLights();
    addDecorations();
    addDecorationsInteractivity();
    addLightsInteractivity();
    
    // Event listeners y temporizadores
    window.addEventListener('resize', updatePositions);
    setInterval(createSnowflake, 150);
    setInterval(randomLightEffect, 500);

    function initializeGiftAnimations() {
        const gifts = document.querySelectorAll('.gift');
        
        const surpriseCollections = {
            amor: ['❤️', '💝', '💖', '💕', '💓', '💗', '💘', '💞'],
            navidad: ['🎄', '🎅', '⛄', '🦌', '🔔', '🎁', '🤶', '☃️'],
            dulces: ['🍪', '🍫', '🍬', '🧁', '🍭', '🎂', '🍩', '🍡'],
            flores: ['🌹', '🌸', '🌺', '🌷', '🌼', '💐', '🌻', '🌿'],
            animales: ['🐰', '🐱', '🐶', '🦊', '🐼', '🐨', '🦄', '🐯'],
            estrellas: ['⭐', '✨', '🌟', '💫', '⚡', '🎆', '🌠', '🌈'],
            musical: ['🎵', '🎶', '🎸', '🎹', '🎺', '🎻', '🥁', '🎼']
        };
    
        gifts.forEach((gift, index) => {
            const front = gift.querySelector('.front');
            let isOpen = false;
    
            gift.addEventListener('click', async () => {
                if (!isOpen) {
                    // Efecto inicial de brillo
                    createShockwave(gift);
                    
                    // Animación de apertura
                    front.style.transform = 'translateZ(20px) rotateX(-180deg)';
                    
                    // Crear efecto de explosión de partículas
                    createFireworks(gift);
    
                    setTimeout(() => {
                        if (!gift.querySelector('.surprise')) {
                            const surprise = document.createElement('div');
                            surprise.className = 'surprise';
                            
                            const collections = Object.values(surpriseCollections);
                            const randomCollection = collections[Math.floor(Math.random() * collections.length)];
                            const randomSurprise = randomCollection[Math.floor(Math.random() * randomCollection.length)];
                            
                            // Contenedor principal de la sorpresa con efectos
                            const surpriseContainer = document.createElement('div');
                            surpriseContainer.className = 'surprise-container';
                            
                            // Emoji principal con aura
                            const mainEmoji = document.createElement('div');
                            mainEmoji.className = 'main-emoji';
                            mainEmoji.textContent = randomSurprise;
                            
                            // Agregar aureola de luz
                            const aura = document.createElement('div');
                            aura.className = 'aura';
                            
                            // Agregar estrellas orbitantes
                            for (let i = 0; i < 8; i++) {
                                const star = document.createElement('div');
                                star.className = 'orbiting-star';
                                star.textContent = '✨';
                                star.style.setProperty('--orbit-delay', `${i * 0.5}s`);
                                surpriseContainer.appendChild(star);
                            }
                            
                            surpriseContainer.appendChild(aura);
                            surpriseContainer.appendChild(mainEmoji);
                            surprise.appendChild(surpriseContainer);
                            gift.appendChild(surprise);
                            
                            // Añadir corazones/estrellas flotantes
                            createFloatingElements(gift);
                        }
                    }, 600);
    
                } else {
                    // Animación de cierre
                    front.style.transform = 'translateZ(20px)';
                    
                    const surprise = gift.querySelector('.surprise');
                    if (surprise) {
                        surprise.style.animation = 'surpriseHide 0.5s forwards';
                        setTimeout(() => surprise.remove(), 500);
                    }
                }
                isOpen = !isOpen;
            });
        });
    }
    
    // Función para crear la onda expansiva inicial
    function createShockwave(gift) {
        const shockwave = document.createElement('div');
        shockwave.className = 'shockwave';
        gift.appendChild(shockwave);
        setTimeout(() => shockwave.remove(), 1000);
    }
    
    // Función para crear los fuegos artificiales
    function createFireworks(gift) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'firework-particle';
            particle.style.setProperty('--angle', `${Math.random() * 360}deg`);
            particle.style.setProperty('--speed', `${0.5 + Math.random() * 1}s`);
            particle.style.setProperty('--hue', `${Math.random() * 360}`);
            gift.appendChild(particle);
            setTimeout(() => particle.remove(), 2000);
        }
    }
    
    // Función para crear elementos flotantes
    function createFloatingElements(gift) {
        const elements = ['💫', '✨', '💖', '⭐'];
        for (let i = 0; i < 12; i++) {
            const element = document.createElement('div');
            element.className = 'floating-element';
            element.textContent = elements[Math.floor(Math.random() * elements.length)];
            element.style.setProperty('--float-delay', `${Math.random() * 2}s`);
            element.style.setProperty('--float-distance', `${20 + Math.random() * 30}px`);
            gift.appendChild(element);
            setTimeout(() => element.remove(), 3000);
        }
    }
    
    const style = document.createElement('style');
    style.textContent = `
        .gift {
            transform-style: preserve-3d;
            position: relative;
            cursor: pointer;
        }
    
        .gift-face {
            position: absolute;
            width: 40px;
            height: 40px;
            backface-visibility: visible;
        }
    
        /* Corregir posicionamiento de las caras */
        .front { transform: translateZ(20px); }
        .back { transform: translateZ(-20px) rotateY(180deg); }
        .left { transform: rotateY(-90deg) translateZ(20px); }
        .right { transform: rotateY(90deg) translateZ(20px); }
        .top { transform: rotateX(90deg) translateZ(20px); }
        .bottom { transform: rotateX(-90deg) translateZ(20px); }
    
        .front {
            transition: transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);
            transform-origin: top;
        }
    
        .shockwave {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%);
            animation: shockwaveExpand 1s ease-out forwards;
            z-index: 5;
            pointer-events: none;
        }
    
        .firework-particle {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            transform-origin: center;
            animation: firework var(--speed) ease-out forwards;
            background: hsl(var(--hue), 100%, 70%);
            box-shadow: 0 0 4px hsl(var(--hue), 100%, 70%);
        }
    
        .surprise-container {
            position: relative;
            animation: magicAppear 0.8s forwards;
        }
    
        .main-emoji {
            font-size: 28px;
            animation: pulseAndFloat 2s ease-in-out infinite;
            position: relative;
            z-index: 2;
        }
    
        .aura {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 40px;
            height: 40px;
            transform: translate(-50%, -50%);
            background: radial-gradient(circle, 
                rgba(255,255,255,0.8) 0%, 
                rgba(255,255,255,0.4) 30%, 
                transparent 70%);
            animation: auraGlow 2s ease-in-out infinite;
            z-index: 1;
        }
    
        .orbiting-star {
            position: absolute;
            font-size: 16px;
            animation: orbit 3s linear infinite;
            animation-delay: var(--orbit-delay);
        }
    
        .floating-element {
            position: absolute;
            animation: float 3s ease-in-out infinite;
            animation-delay: var(--float-delay);
        }
    
        @keyframes shockwaveExpand {
            0% {
                width: 0;
                height: 0;
                opacity: 1;
            }
            100% {
                width: 200px;
                height: 200px;
                opacity: 0;
                transform: translate(-50%, -50%);
            }
        }
    
        @keyframes firework {
            0% {
                transform: translate(-50%, -50%) rotate(var(--angle)) scale(0);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) rotate(var(--angle)) translateX(100px) scale(0.5);
                opacity: 0;
            }
        }
    
        @keyframes magicAppear {
            0% { transform: scale(0) rotate(-180deg); opacity: 0; }
            60% { transform: scale(1.2) rotate(10deg); opacity: 0.8; }
            100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
    
        @keyframes pulseAndFloat {
            0%, 100% { transform: scale(1) translateY(0); }
            50% { transform: scale(1.1) translateY(-10px); }
        }
    
        @keyframes auraGlow {
            0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
            50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.2); }
        }
    
        @keyframes orbit {
            0% { transform: rotate(0deg) translateX(30px) rotate(0deg); }
            100% { transform: rotate(360deg) translateX(30px) rotate(-360deg); }
        }
    
        @keyframes float {
            0% {
                transform: translate(calc(var(--float-distance) * -1), 0);
                opacity: 0;
            }
            25% {
                opacity: 1;
            }
            75% {
                opacity: 1;
            }
            100% {
                transform: translate(var(--float-distance), calc(var(--float-distance) * -2));
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    initializeGiftAnimations();
});
document.addEventListener('DOMContentLoaded', function() {
    let openedGifts = [];
    const tableBody = document.getElementById('tableBody');

    function addGiftToTable(emoji) {
        const row = document.createElement('div');
        row.className = 'table-row';
        
        const suggestions = {
            // Categoría AMOR
            '❤️': 'Una carta de amor con 100 razones por las que lo/la amas',
            '💝': 'Un frasco decorado con 52 cupones de amor semanales',
            '💖': 'Un libro artesanal con vuestra historia de amor',
            '💕': 'Una lista de reproducción con canciones significativas',
            '💓': 'Una serie de notas escondidas por la casa',
            '💗': 'Una sorpresa romántica en un lugar significativo',
            '💘': 'Una serenata sorpresa (aunque no cantes bien)',
            '💞': 'Una cápsula del tiempo para abrir en un año',
            
            // Categoría NAVIDAD
            '🎄': 'Un calendario de adviento con 24 detalles románticos',
            '🎅': 'Una carta a Santa con deseos para los dos',
            '⛄': 'Un día de actividades invernales románticas',
            '🦌': 'Un paseo nocturno con luces navideñas',
            '🔔': 'Un ritual especial para año nuevo',
            
            // Categoría DULCES
            '🍪': 'Galletas caseras con mensajes de amor',
            '🍫': 'Una caja de mensajes dulces escondidos',
            '🍬': 'Un frasco decorado con dulces y notas',
            '🧁': 'Un taller de repostería juntos',
            '🎂': 'Una celebración sorpresa de "no cumpleaños"',
            
            // Categoría FLORES
            '🌹': 'Un jardín de origami con mensajes ocultos',
            '🌸': 'Un terrario hecho a mano con dedicatoria',
            '🌺': 'Un ritual de plantar algo juntos',
            '🌷': 'Un camino de pétalos hacia una sorpresa',
            
            // Categoría ESTRELLAS
            '⭐': 'Una noche de stargazing con picnic',
            '✨': 'Una noche mágica planificada',
            '🌟': 'Un álbum de "nuestros atardeceres"',
            
            // Categoría MUSICAL
            '🎵': 'Una lista de "canciones que me recuerdan a ti"',
            '🎶': 'Un baile sorpresa en un lugar especial',
            '🎸': 'Aprender juntos una canción especial'
        };

        row.innerHTML = `
            <div class="emoji-cell">${emoji}</div>
            <div class="suggestions-cell">
                <div class="suggestion">${suggestions[emoji] || '¡Has descubierto un regalo especial!'}</div>
            </div>
        `;
        
        tableBody.appendChild(row);
    }

    // Observador de mutaciones para detectar cuando se crea un nuevo emoji
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) {
                    const mainEmoji = node.querySelector('.main-emoji');
                    if (mainEmoji && mainEmoji.textContent) {
                        const emoji = mainEmoji.textContent;
                        if (!openedGifts.includes(emoji)) {
                            openedGifts.push(emoji);
                            addGiftToTable(emoji);
                        }
                    }
                }
            });
        });
    });

    // Configurar el observador
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});