document.addEventListener('DOMContentLoaded', function() {
    // GSAP setup
    gsap.registerPlugin(ScrollTrigger, Draggable);
    
    // Automatic infinite scroll animation
    const infiniteScroll = gsap.timeline({
        repeat: -1,
        defaults: { ease: 'none' }
    });
    
    infiniteScroll.to('.infinite-scroll', {
        x: '-50%',
        duration: 10
    });
    
    // Make the gallery draggable
    const gallery = document.querySelector('.gallery-section');
    const scrollContainer = document.querySelector('.infinite-scroll');
    
    const draggable = Draggable.create(scrollContainer, {
        type: 'x',
        edgeResistance: 0.5,
        onDragStart: function() {
            // Pause the automatic animation when dragging starts
            infiniteScroll.pause();
        },
        onDragEnd: function() {
            // Resume the automatic animation when dragging ends
            // Wait a short time before resuming
            setTimeout(() => {
                // Ensure smooth continuation from current position
                const currentX = this.x % (scrollContainer.offsetWidth / 2);
                gsap.set('.infinite-scroll', { x: currentX });
                infiniteScroll.invalidate().restart();
            }, 1000);
        },
        bounds: {
            minX: -scrollContainer.offsetWidth / 2,
            maxX: 0
        },
        throwProps: true,
        onThrowUpdate: function() {
            // Make sure the scroll doesn't exit bounds when thrown
            if (this.x > 0) {
                this.x = 0;
            } else if (this.x < -scrollContainer.offsetWidth / 2) {
                this.x = -scrollContainer.offsetWidth / 2;
            }
        },
    });
    
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
    
    gsap.from('.social-icon', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        delay: 1.2,
        ease: 'back.out(1.7)'
    });
    
    // Window resize handler to ensure draggable bounds are updated
    window.addEventListener('resize', function() {
        draggable[0].kill();
        
        // Reinitialize draggable with updated bounds
        Draggable.create(scrollContainer, {
            type: 'x',
            edgeResistance: 0.5,
            onDragStart: function() {
                infiniteScroll.pause();
            },
            onDragEnd: function() {
                setTimeout(() => {
                    const currentX = this.x % (scrollContainer.offsetWidth / 2);
                    gsap.set('.infinite-scroll', { x: currentX });
                    infiniteScroll.invalidate().restart();
                }, 1000);
            },
            bounds: {
                minX: -scrollContainer.offsetWidth / 2,
                maxX: 0
            },
            throwProps: true
        });
    });
});