const words = ["Feliz", "Navidad", "Te", "Amo", "Cuidate", "JI JI JI JI"];
let currentWordIndex = 0;

function getResponsiveSize(baseSize) {
    const screenSize = Math.min(window.innerWidth, window.innerHeight);
    return (baseSize * screenSize) / 1200;
}

// Modificado el evento click para evitar la barra de navegación
document.addEventListener('click', function(e) {
    // Si el clic fue en la barra de navegación, no crear fuegos artificiales
    if (e.target.closest('.nav-christmas')) {
        return;
    }
    
    const word = words[currentWordIndex];
    createWordFirework(e.clientX, e.clientY, word);
    currentWordIndex = (currentWordIndex + 1) % words.length;
});

function createWordFirework(x, y, word) {
    x = Math.min(Math.max(x, window.innerWidth * 0.1), window.innerWidth * 0.9);
    y = Math.min(Math.max(y, window.innerHeight * 0.1), window.innerHeight * 0.9);

    const letterElement = document.createElement('div');
    letterElement.className = 'letter-particle';
    letterElement.textContent = word;
    letterElement.style.left = x + 'px';
    letterElement.style.top = y + 'px';
    document.querySelector('.fireworks-container').appendChild(letterElement);

    const brightColors = [
        '#ff3333', // Rojo brillante
        '#ffdd33', // Dorado brillante
        '#ff69f0', // Rosa brillante
        '#33ff33', // Verde brillante
        '#ff9933', // Naranja brillante
        '#ffffff', // Blanco
        '#ff33a1', // Rosa neón
        '#33ffff', // Cian brillante
        '#ffff33', // Amarillo brillante
        '#ff3399'  // Magenta brillante
    ];

    setTimeout(() => letterElement.remove(), 2000);

    const numberOfFireworks = Math.min(8, Math.floor(window.innerWidth / 120));
    const distance = getResponsiveSize(150);

    for (let i = 0; i < numberOfFireworks; i++) {
        const angle = (i * (360 / numberOfFireworks)) * (Math.PI / 180);
        const fx = x + Math.cos(angle) * distance;
        const fy = y + Math.sin(angle) * distance;
        createFirework(fx, fy, brightColors);
    }

    createCentralGlow(x, y, brightColors[Math.floor(Math.random() * brightColors.length)]);
}

function createFirework(x, y, colors) {
    const firework = document.createElement('div');
    firework.className = 'firework';
    document.querySelector('.fireworks-container').appendChild(firework);

    const particles = Math.min(24, Math.floor(window.innerWidth / 40));
    const radius = getResponsiveSize(180);

    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('span');
        particle.className = 'particle';
        const angle = (i * 360 / particles) * Math.PI / 180;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.backgroundColor = color;
        
        const glowSize = getResponsiveSize(25);
        particle.style.boxShadow = `
            0 0 ${glowSize}px ${color},
            0 0 ${glowSize * 1.5}px ${color},
            0 0 ${glowSize * 2}px rgba(255, 255, 255, 0.5)
        `;

        const animation = particle.animate([
            { 
                transform: 'translate(-50%, -50%) scale(0)',
                opacity: 1,
                filter: 'brightness(1.5)'
            },
            { 
                transform: `translate(
                    ${Math.cos(angle) * radius}px, 
                    ${Math.sin(angle) * radius}px
                ) scale(${Math.random() * 1.2 + 0.8})`,
                opacity: 0,
                filter: 'brightness(1)'
            }
        ], {
            duration: Math.random() * 1200 + 800,
            easing: 'cubic-bezier(0,0,0.2,1)'
        });

        firework.appendChild(particle);

        animation.onfinish = () => {
            particle.remove();
            if (!firework.children.length) {
                firework.remove();
            }
        };
    }
}

function createCentralGlow(x, y, color) {
    const glow = document.createElement('div');
    glow.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: ${getResponsiveSize(80)}px;
        height: ${getResponsiveSize(80)}px;
        background: radial-gradient(circle, ${color} 0%, rgba(255,255,255,0) 70%);
        transform: translate(-50%, -50%);
        pointer-events: none;
        opacity: 0.7;
        animation: centralGlow 0.8s ease-out forwards;
    `;
    document.querySelector('.fireworks-container').appendChild(glow);

    setTimeout(() => glow.remove(), 800);
}

// Modificado el evento touchstart para evitar la barra de navegación
document.addEventListener('touchstart', function(e) {
    // Si el toque fue en la barra de navegación, permitir el comportamiento normal
    if (e.target.closest('.nav-christmas')) {
        return;
    }
    
    e.preventDefault();
    const touch = e.touches[0];
    const word = words[currentWordIndex];
    createWordFirework(touch.clientX, touch.clientY, word);
    currentWordIndex = (currentWordIndex + 1) % words.length;
}, { passive: false });

let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const fireworks = document.querySelectorAll('.firework');
        fireworks.forEach(firework => firework.remove());
    }, 100);
});

const style = document.createElement('style');
style.textContent = `
    @keyframes centralGlow {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.7;
        }
        100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);