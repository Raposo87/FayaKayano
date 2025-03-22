document.addEventListener('DOMContentLoaded', function() {
    // GSAP setup
    gsap.registerPlugin(ScrollTrigger);

    // Configuração para rolagem infinita
    const scrollContainer = document.querySelector('.infinite-scroll');
    const scrollContent = document.querySelector('.scroll-container');
    
    // Criar um clone do conteúdo para efeito infinito
    const clone = scrollContent.cloneNode(true);
    clone.classList.remove('original');
    clone.classList.add('clone');
    scrollContainer.appendChild(clone);
    
    // Calcular largura real do conteúdo original
    const scrollContentWidth = scrollContent.scrollWidth;
    
    // Animação infinita
    const infiniteScroll = gsap.timeline({
        repeat: -1,
        defaults: { ease: 'none' }
    });

    infiniteScroll.to('.infinite-scroll', {
        x: `-=${scrollContentWidth}`,
        duration: scrollContentWidth / 50,
        ease: 'none'
    });

    // Sistema de controle manual mantendo o movimento automático
    let isDragging = false;
    let startX;
    let lastX;
    let dragVelocity = 0;

    function handleDragStart(e) {
        isDragging = true;
        startX = lastX = e.clientX || e.touches[0].clientX;
        
        // Diminuir a velocidade da animação durante o arrasto
        gsap.to(infiniteScroll, {
            timeScale: 0.3,
            duration: 0.2
        });
        
        e.preventDefault();
    }

    function handleDragMove(e) {
        if (!isDragging) return;
        
        const x = e.clientX || (e.touches && e.touches[0].clientX);
        const deltaX = x - lastX;
        lastX = x;
        
        // Calcular velocidade e direção do arrasto
        dragVelocity = deltaX;
        
        // Aplicar um impulso à animação baseado na direção do arrasto
        if (Math.abs(deltaX) > 1) {
            // Ajustar o progresso da animação baseado na força do arrasto
            const currentProgress = infiniteScroll.progress();
            const newProgress = currentProgress - (deltaX / 1000);
            infiniteScroll.progress(newProgress);
            
            // Mudar a direção da animação baseado na direção do arrasto
            if (deltaX > 2) {
                // Arrastando para a direita - inverter a direção
                infiniteScroll.timeScale(-0.3);
            } else if (deltaX < -2) {
                // Arrastando para a esquerda - manter a direção normal
                infiniteScroll.timeScale(0.3);
            }
        }
        
        e.preventDefault();
    }

    function handleDragEnd(e) {
        if (!isDragging) return;
        isDragging = false;
        
        // Restaurar a direção e velocidade normal da animação
        gsap.to(infiniteScroll, {
            timeScale: dragVelocity > 0 ? -1 : 1, // Manter a direção baseada no último movimento
            duration: 0.5
        });
        
        // Efeito de inércia - continuar na direção do último movimento
        const momentum = Math.abs(dragVelocity) > 10 ? dragVelocity / 10 : 0;
        if (momentum !== 0) {
            const currentProgress = infiniteScroll.progress();
            const newProgress = currentProgress - (momentum / 100);
            gsap.to(infiniteScroll, {
                progress: newProgress,
                duration: 0.5,
                ease: "power2.out"
            });
        }
        
        e.preventDefault();
    }

    // Adicionar eventos de toque/mouse
    scrollContainer.addEventListener('mousedown', handleDragStart);
    scrollContainer.addEventListener('touchstart', handleDragStart);
    
    window.addEventListener('mousemove', handleDragMove);
    window.addEventListener('touchmove', handleDragMove);
    
    window.addEventListener('mouseup', handleDragEnd);
    window.addEventListener('touchend', handleDragEnd);


    
    // Scroll animations for biography section
    gsap.from('.bio-text h3', {
        scrollTrigger: {
            trigger: '.biography-section',
            start: 'top 80%'
        },
        y: 50,
        opacity: 0,
        stagger: 0.3,
        duration: 1,
        ease: 'power2.out'
    });
    
    gsap.from('.bio-text p', {
        scrollTrigger: {
            trigger: '.biography-section',
            start: 'top 70%'
        },
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out'
    });
    
    gsap.from('.bio-image', {
        scrollTrigger: {
            trigger: '.biography-section',
            start: 'top 60%'
        },
        x: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out'
    });
    
    // Header animations
    gsap.from('h1', {
        y: -50,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out'
    });
    
    gsap.from('.bio-short', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.8,
        ease: 'power3.out'
    });
    
    gsap.from('.social-icons', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        delay: 1.2,
        ease: 'back.out(1.7)'
    });
  
  // Ajustar a animação quando a janela for redimensionada
  window.addEventListener('resize', function() {
    // Recalcular a largura do conteúdo
    const newScrollContentWidth = scrollContent.scrollWidth;
    
    // Matar a timeline atual
    infiniteScroll.kill();
    
    // Recriar com as novas dimensões
    const newInfiniteScroll = gsap.timeline({
        repeat: -1,
        defaults: { ease: 'none' }
    });

    newInfiniteScroll.to('.infinite-scroll', {
        x: `-=${newScrollContentWidth}`,
        duration: newScrollContentWidth / 50,
        ease: 'none'
    });
});
});

//-------slide---------//
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(index) {
    // Remove a classe 'active' de todos os slides
    slides.forEach((slide) => {
        slide.classList.remove('active');
    });
    // Adiciona a classe 'active' ao slide atual
    slides[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides; // Avança para o próximo slide
    showSlide(currentSlide);
}

// Inicia o slide automático a cada 3 segundos
setInterval(nextSlide, 3000);

// Mostra o primeiro slide ao carregar a página
showSlide(currentSlide);
//-------slide---------//


