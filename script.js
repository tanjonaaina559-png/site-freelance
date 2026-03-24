document.addEventListener('DOMContentLoaded', () => {
    // Reveal animation
    const revealElements = document.querySelectorAll('section, header, .service-card, .contact-container');
    
    const reveal = () => {
        revealElements.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial styles for animation
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
    });

    window.addEventListener('scroll', reveal);
    reveal(); // Initial call

    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form logic
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn.innerText;
            const data = new FormData(contactForm);
            
            // REMPLACER PAR VOTRE ID FORMSPREE OU EMAIL
            const FORMSPREE_ENDPOINT = "https://formspree.io/f/mon-id-formspree"; 

            submitBtn.innerText = 'Envoi en cours...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.5';

            try {
                const response = await fetch(FORMSPREE_ENDPOINT, {
                    method: 'POST',
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    submitBtn.innerText = 'Message Envoyé ! ✨';
                    submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                    submitBtn.style.opacity = '1';
                    contactForm.reset();
                } else {
                    throw new Error('Erreur lors de l\'envoi');
                }
            } catch (error) {
                submitBtn.innerText = 'Erreur d\'envoi ❌';
                submitBtn.style.background = 'linear-gradient(135deg, #ef4444, #b91c1c)';
                submitBtn.style.opacity = '1';
            } finally {
                // Reset after 4 seconds
                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 4000);
            }
        });
    }

    // Dynamic Navigation background
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 1)';
            nav.style.padding = '1rem 10%';
        } else {
            nav.style.boxShadow = 'none';
            nav.style.padding = '1.5rem 10%';
        }
    });
});
