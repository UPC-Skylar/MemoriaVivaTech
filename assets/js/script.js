        // Variables globales
        let isMenuOpen = false;

        // DOM Content Loaded
        document.addEventListener('DOMContentLoaded', function() {
            // Inicializar funcionalidades
            initializeNavbar();
            initializeBackToTop();
            initializeFadeInAnimations();
            initializeFormValidation();
            
            // Smooth scrolling para enlaces internos
            initializeSmoothScrolling();
        });

        // Navbar functionality
        function initializeNavbar() {
            const menuToggle = document.querySelector('.menu-toggle');
            const navMenu = document.querySelector('.nav-menu');
            const body = document.body;

            if (menuToggle && navMenu) {
                menuToggle.addEventListener('click', function() {
                    toggleMenu();
                });

                // Cerrar menú al hacer click en enlaces (móvil)
                const navLinks = navMenu.querySelectorAll('a');
                navLinks.forEach(link => {
                    link.addEventListener('click', function() {
                        if (isMenuOpen) {
                            toggleMenu();
                        }
                    });
                });

                // Cerrar menú al hacer click fuera
                document.addEventListener('click', function(e) {
                    if (isMenuOpen && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                        toggleMenu();
                    }
                });
            }
        }

        function toggleMenu() {
            const menuToggle = document.querySelector('.menu-toggle');
            const navMenu = document.querySelector('.nav-menu');
            const body = document.body;

            isMenuOpen = !isMenuOpen;
            
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            if (isMenuOpen) {
                body.classList.add('menu-open');
            } else {
                body.classList.remove('menu-open');
            }
        }

        // Back to top functionality
        function initializeBackToTop() {
            const backToTopBtn = document.querySelector('.back-to-top');
            
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            });
        }

        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Smooth scrolling
        function initializeSmoothScrolling() {
            const links = document.querySelectorAll('a[href^="#"]');
            
            links.forEach(link => {
                link.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    
                    if (href === '#' || href === '#login' || href === '#register') {
                        e.preventDefault();
                        if (href === '#login' || href === '#register') {
                            // Aquí irían las funciones de login/registro
                            showAuthModal(href.substring(1));
                        }
                        return;
                    }
                    
                    const targetElement = document.querySelector(href);
                    if (targetElement) {
                        e.preventDefault();
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }

        // FAQ functionality
        function toggleFaq(element) {
            const faqItem = element.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Cerrar todos los FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Abrir el seleccionado si no estaba activo
            if (!isActive) {
                faqItem.classList.add('active');
            }
        }

        // Video players
        function playTeamVideo() {
            // Simulación de reproducción de video
            alert('🎬 Video del equipo próximamente disponible\n\nConoce a los estudiantes de la UPC detrás de SoulStory y descubre cómo nació esta iniciativa para preservar memorias familiares.');
        }

        function playProductVideo() {
            // Simulación de reproducción de video
            alert('🎬 Demo de SoulStory próximamente disponible\n\nDescubre cómo funciona nuestra plataforma: grabación de recuerdos, ilustraciones con IA y compartir con la familia.');
        }

        // Auth modals simulation
        function showAuthModal(type) {
            const message = type === 'login' 
                ? '🔐 Formulario de Inicio de Sesión\n\nSerás redirigido a la aplicación para iniciar sesión con tu cuenta de SoulStory.'
                : '📝 Formulario de Registro\n\n¡Únete a SoulStory gratis! Serás redirigido al formulario de registro para comenzar a preservar tus memorias.';
            
            alert(message);
        }

        // Form validation
        function initializeFormValidation() {
            const contactForm = document.getElementById('contactForm');
            
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    // Validación básica
                    const nombre = document.getElementById('nombre').value;
                    const email = document.getElementById('email').value;
                    const mensaje = document.getElementById('mensaje').value;
                    
                    if (!nombre || !email || !mensaje) {
                        alert('⚠️ Por favor completa todos los campos obligatorios');
                        return;
                    }
                    
                    // Simulación de envío
                    showSuccessMessage();
                });
            }
        }

        function showSuccessMessage() {
            const form = document.getElementById('contactForm');
            form.innerHTML = `
                <div style="text-align: center; padding: 40px 20px; background: linear-gradient(135deg, var(--primary-green), var(--primary-blue)); border-radius: 12px; color: white;">
                    <i class="fas fa-check-circle" style="font-size: 3rem; margin-bottom: 20px; color: white;"></i>
                    <h3 style="margin-bottom: 16px; color: white;">¡Mensaje Enviado!</h3>
                    <p style="margin: 0; opacity: 0.9;">Gracias por contactarnos. Te responderemos en un plazo máximo de 24 horas.</p>
                    <button onclick="location.reload()" class="btn btn-outline" style="margin-top: 20px; border-color: white; color: white;">
                        Enviar otro mensaje
                    </button>
                </div>
            `;
        }

        // Fade in animations
        function initializeFadeInAnimations() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in');
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.fade-in').forEach(el => {
                observer.observe(el);
            });
        }

        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.style.backgroundColor = 'rgba(166, 201, 226, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.backgroundColor = 'var(--primary-blue)';
                navbar.style.backdropFilter = 'none';
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isMenuOpen) {
                toggleMenu();
            }
        });

        // Touch gestures for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        document.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });

        document.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            if (touchEndX < touchStartX - 50 && isMenuOpen) {
                toggleMenu(); // Cerrar menú con swipe izquierdo
            }
        }