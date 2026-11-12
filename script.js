
document.addEventListener('DOMContentLoaded', () => {

    // CONFIGURATION EMAILJS
    const SERVICE_ID = "service_ewbk7sn";
    const TEMPLATE_ID = "template_qgfo94u";
    const PUBLIC_KEY = "tf8bwbPQEXucEwNh9";

    if (typeof emailjs === "undefined") {
        console.error("La bibliothèque EmailJS n'est pas chargée.");
        return;
    }

    emailjs.init({
        publicKey: PUBLIC_KEY
    });

    // ANIMATIONS
    const revealElements = document.querySelectorAll(
        'section, header, .service-card, .contact-container'
    );

    const reveal = () => {
        revealElements.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;

            if (elementTop < windowHeight - 150) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
    });

    window.addEventListener('scroll', reveal);
    reveal();

    // DÉFILEMENT FLUIDE
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const target = document.querySelector(
                this.getAttribute('href')
            );

            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // FORMULAIRE EMAILJS
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector(
                'button[type="submit"]'
            );

            const status = document.getElementById('form-status');
            const originalText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Envoi en cours...';

            if (status) {
                status.textContent = '';
            }

            const templateParams = {
                name: contactForm.elements['name'].value,
                email: contactForm.elements['email'].value,
                location: contactForm.elements['location'].value,
                message: contactForm.elements['message'].value
            };

            try {
                await emailjs.send(
                    SERVICE_ID,
                    TEMPLATE_ID,
                    templateParams
                );

                if (status) {
                    status.textContent =
                        'Votre message a été envoyé avec succès !';
                    status.style.color = '#10b981';
                }

                submitBtn.innerHTML = 'Message envoyé ! ✨';
                contactForm.reset();

            } catch (error) {
                console.error('Erreur EmailJS :', error);

                if (status) {
                    status.textContent =
                        "Erreur d'envoi. Veuillez réessayer.";
                    status.style.color = '#ef4444';
                }

                submitBtn.innerHTML = 'Échec ❌';

            } finally {
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }, 5000);
            }
        });
    }

    // NAVIGATION DYNAMIQUE
    const nav = document.querySelector('nav');

    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.style.boxShadow =
                    '0 10px 30px rgba(0, 0, 0, 1)';
                nav.style.padding = '1rem 10%';
            } else {
                nav.style.boxShadow = 'none';
                nav.style.padding = '1.5rem 10%';
            }
        });
    }

});
