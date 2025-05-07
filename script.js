document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            console.log('Menu toggle clicked');
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    if (closeMenu && mobileMenu) {
        closeMenu.addEventListener('click', function() {
            console.log('Close menu clicked');
            mobileMenu.classList.add('hidden');
        });
    }
    
    // Typed.js initialization
    if (document.getElementById('typed')) {
        console.log('Initializing Typed.js');
        const typed = new Typed('#typed', {
            strings: [
                'God',
                'Intelligent',
                'Badass',
                'Software Engineer',
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 1500,
            loop: true
        });
    }
    
    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted');
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                console.log('Scrolling to', targetId);
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('Element in view:', entry.target);
                entry.target.classList.add('fade-in-view');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('section > .container').forEach(section => {
        section.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700');
        observer.observe(section);
    });
    
    // Tech sphere animation with Three.js
    const initTechSphere = function() {
        const container = document.querySelector('.tech-sphere');
        if (container && window.THREE) {
            console.log('Initializing tech sphere');
            const width = container.clientWidth;
            const height = container.clientHeight || 400; // Fallback height
            
            // Create scene
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
            camera.position.z = 30;
            
            const renderer = new THREE.WebGLRenderer({ 
                antialias: true,
                alpha: true 
            });
            renderer.setSize(width, height);
            container.appendChild(renderer.domElement);
            
            // Create sphere of tech icons
            const group = new THREE.Group();
            scene.add(group);
            
            // Tech stack names
            const technologies = [
                'JavaScript', 'Python', 'Docker', 'Kubernetes', 
                'AWS', 'React', 'Node.js', 'IoT', 'Arduino',
                'Raspberry Pi', 'CI/CD', 'Linux', 'Git', 'MongoDB',
                'Redis', 'GraphQL', 'TypeScript', 'Go'
            ];
            
            // Create text sprites for each technology
            technologies.forEach((tech, i) => {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = 256;
                canvas.height = 128;
                
                // Draw text
                context.fillStyle = '#dc2626';
                context.font = '24px Inter, sans-serif';
                context.textAlign = 'center';
                context.fillText(tech, 128, 64);
                
                // Create texture and sprite
                const texture = new THREE.CanvasTexture(canvas);
                const material = new THREE.SpriteMaterial({ map: texture });
                const sprite = new THREE.Sprite(material);
                
                // Position in sphere
                const phi = Math.acos(-1 + (2 * i) / technologies.length);
                const theta = Math.sqrt(technologies.length * Math.PI) * phi;
                
                sprite.position.x = 20 * Math.cos(theta) * Math.sin(phi);
                sprite.position.y = 20 * Math.sin(theta) * Math.sin(phi);
                sprite.position.z = 20 * Math.cos(phi);
                
                sprite.scale.set(5, 2.5, 1);
                group.add(sprite);
            });
            
            // Add ambient light
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);
            
            // Add point light
            const pointLight = new THREE.PointLight(0xdc2626, 1, 100);
            pointLight.position.set(10, 10, 10);
            scene.add(pointLight);
            
            // Animation loop
            function animate() {
                requestAnimationFrame(animate);
                
                group.rotation.y += 0.002;
                group.rotation.x += 0.001;
                
                renderer.render(scene, camera);
            }
            
            animate();
            
            // Handle window resize
            window.addEventListener('resize', () => {
                const newWidth = container.clientWidth;
                const newHeight = container.clientHeight || 400;
                
                camera.aspect = newWidth / newHeight;
                camera.updateProjectionMatrix();
                
                renderer.setSize(newWidth, newHeight);
            });
        } else {
            console.warn('Tech sphere container not found or Three.js not loaded');
        }
    };
    
    // Initialize tech sphere with a slight delay to ensure DOM is fully rendered
    setTimeout(initTechSphere, 500);
    
    // Add CSS styles for the tech-sphere container if it doesn't have dimensions
    const techSphere = document.querySelector('.tech-sphere');
    if (techSphere && (!techSphere.style.height || techSphere.style.height === '0px')) {
        techSphere.style.height = '400px';
        techSphere.style.width = '100%';
    }
    
    // Glassmorphism effect for cards
    const glassCards = document.querySelectorAll('.glass-card');
    glassCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
    
    console.log('Script initialization complete');
});