// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling para los enlaces de navegación
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Validación básica del formulario de contacto
    const formContacto = document.querySelector('#contacto form');
    if (formContacto) {
        formContacto.addEventListener('submit', function(event) {
            let isValid = true;
            const nombreInput = document.getElementById('nombre');
            const emailInput = document.getElementById('email');

            if (!nombreInput.value.trim()) {
                alert('Por favor, introduce tu nombre.');
                isValid = false;
            }

            if (!emailInput.value.trim()) {
                alert('Por favor, introduce tu email.');
                isValid = false;
            } else if (!isValidEmail(emailInput.value.trim())) {
                alert('Por favor, introduce un email válido.');
                isValid = false;
            }

            if (!isValid) {
                event.preventDefault();
            }
        });
    }

    function isValidEmail(email) {
        // Validación de email básica
        return /\S+@\S+\.\S+/.test(email);
    }
});

const carouselContainer = document.querySelector('#quienes-somos .carousel-container');
const slides = document.querySelectorAll('#quienes-somos .carousel-slide');
const slideCount = slides.length;
let currentIndex = 0;
let autoScrollInterval;
const autoScrollDelay = 5000; // Intervalo de tiempo en milisegundos (ej: 5 segundos)
const clickZoneThreshold = 0.2; // Porcentaje del ancho para definir las esquinas clicables

function scrollToSlide(index) {
    carouselContainer.scrollTo({
        left: slides[index].offsetLeft,
        behavior: 'smooth'
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slideCount;
    scrollToSlide(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount; // Asegura que no sea negativo
    scrollToSlide(currentIndex);
}

function startAutoScroll() {
    autoScrollInterval = setInterval(nextSlide, autoScrollDelay);
}

function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}

// Inicializar el carrusel automático
startAutoScroll();

// Detener/reiniciar auto scroll al interactuar
carouselContainer.addEventListener('mouseenter', stopAutoScroll);
carouselContainer.addEventListener('mouseleave', startAutoScroll);

// Navegación por clic en las esquinas
carouselContainer.addEventListener('click', (event) => {
    const containerWidth = carouselContainer.offsetWidth;
    const clickX = event.clientX - carouselContainer.getBoundingClientRect().left;

    if (clickX < containerWidth * clickZoneThreshold) {
        // Clic en la esquina izquierda
        stopAutoScroll();
        prevSlide();
        startAutoScroll();
    } else if (clickX > containerWidth * (1 - clickZoneThreshold)) {
        // Clic en la esquina derecha
        stopAutoScroll();
        nextSlide();
        startAutoScroll();
    }
});