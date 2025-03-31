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

    // **Código del Menú Hamburguesa (MOVEMOS ESTO AQUÍ)**
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    } else {
        console.error("No se encontraron los elementos .menu-toggle o .nav-links");
    }
    // **FIN del Código del Menú Hamburguesa**
});