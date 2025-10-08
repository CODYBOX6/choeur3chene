// ===== NAVIGATION ET MENU MOBILE =====
document.addEventListener('DOMContentLoaded', function() {
    
    // Éléments du DOM
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const dropdowns = document.querySelectorAll('.dropdown');
    
    // Toggle menu mobile
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isActive = navMenu.classList.contains('active');
            
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('nav-open');
            
            // Fermer tous les dropdowns quand on ferme le menu
            if (isActive) {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                    if (dropdownMenu) dropdownMenu.classList.remove('active');
                });
            }
        });
    }
    
    // Fermer le menu mobile lors du clic sur un lien (sauf dropdown-toggle)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                // Ne fermer le menu que si ce n'est PAS un dropdown-toggle
                if (!this.classList.contains('dropdown-toggle')) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('nav-open');
                    
                    // Fermer tous les dropdowns quand on navigue
                    dropdowns.forEach(dropdown => {
                        dropdown.classList.remove('active');
                        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                        if (dropdownMenu) dropdownMenu.classList.remove('active');
                    });
                }
            }
        });
    });
    
    // Gestion des dropdowns sur mobile
    dropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        if (dropdownToggle && dropdownMenu) {
            dropdownToggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    
                    // Fermer les autres dropdowns
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                            const otherMenu = otherDropdown.querySelector('.dropdown-menu');
                            if (otherMenu) otherMenu.classList.remove('active');
                        }
                    });
                    
                    // Toggle le dropdown actuel
                    dropdown.classList.toggle('active');
                    dropdownMenu.classList.toggle('active');
                }
            });
            
            // Fermer le menu quand on clique sur un lien dans le dropdown
            const dropdownLinks = dropdownMenu.querySelectorAll('a');
            dropdownLinks.forEach(link => {
                link.addEventListener('click', function() {
                    if (window.innerWidth <= 768) {
                        navToggle.classList.remove('active');
                        navMenu.classList.remove('active');
                        document.body.classList.remove('nav-open');
                        
                        // Fermer tous les dropdowns
                        dropdowns.forEach(dropdown => {
                            dropdown.classList.remove('active');
                            const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                            if (dropdownMenu) dropdownMenu.classList.remove('active');
                        });
                    }
                });
            });
        }
    });
    
    // Fermer les dropdowns lors du redimensionnement
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 768) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
                
                // Fermer tous les dropdowns mobiles
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                    if (dropdownMenu) dropdownMenu.classList.remove('active');
                });
            }
        }, 250);
    });
});

// ===== SMOOTH SCROLLING POUR LES ANCRES =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== HEADER SCROLL EFFECT =====
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===== ANIMATIONS AU SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Animation séquentielle pour les éléments de grille
            if (entry.target.classList.contains('programs-grid') || 
                entry.target.classList.contains('stats-grid')) {
                const items = entry.target.children;
                Array.from(items).forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animated');
                    }, index * 100);
                });
            }
        }
    });
}, observerOptions);

// Observer tous les éléments à animer
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll([
        '.about-preview',
        '.programs-preview', 
        '.program-card',
        '.stat-card',
        '.timeline-item',
        '.cta-section'
    ].join(','));
    
    animateElements.forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
});

// ===== UTILITAIRES =====

// Fonction pour débouncer les événements
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Optimisation du scroll avec debounce
const debouncedScrollHandler = debounce(function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// ===== ACCESSIBILITÉ =====

// Navigation au clavier
document.addEventListener('keydown', function(e) {
    // Échapper pour fermer le menu mobile
    if (e.key === 'Escape') {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
            navToggle.focus();
        }
    }
});

// Gestion du focus pour les dropdowns
document.querySelectorAll('.dropdown').forEach(dropdown => {
    const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
    const dropdownLinks = dropdown.querySelectorAll('.dropdown-menu a');
    
    if (dropdownToggle && dropdownMenu) {
        // Ouvrir avec Enter ou Space
        dropdownToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                dropdownMenu.classList.toggle('show');
                if (dropdownLinks[0]) {
                    dropdownLinks[0].focus();
                }
            }
        });
        
        // Navigation dans le dropdown avec les flèches
        dropdownLinks.forEach((link, index) => {
            link.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const nextIndex = (index + 1) % dropdownLinks.length;
                    dropdownLinks[nextIndex].focus();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prevIndex = (index - 1 + dropdownLinks.length) % dropdownLinks.length;
                    dropdownLinks[prevIndex].focus();
                } else if (e.key === 'Escape') {
                    dropdownMenu.classList.remove('show');
                    dropdownToggle.focus();
                }
            });
        });
    }
});

// ===== PERFORMANCE =====

// Lazy loading pour les images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Preload des pages importantes
function preloadPage(url) {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
}

// Preloader les pages importantes après le chargement
window.addEventListener('load', function() {
    setTimeout(() => {
        // Déterminer le chemin de base en fonction de l'URL actuelle
        const isInPagesFolder = window.location.pathname.includes('/pages/');
        const pathPrefix = isInPagesFolder ? '' : 'pages/';
        
        preloadPage(pathPrefix + 'qui-sommes-nous.html');
        preloadPage(pathPrefix + 'contact.html');
        preloadPage(pathPrefix + 'recrutement.html');
    }, 2000);
});

// ===== ANALYTICS ET TRACKING =====

// Tracking des interactions (remplacer par votre solution d'analytics)
function trackEvent(category, action, label) {
    // Exemple pour Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
    
    // Ou pour tout autre système d'analytics
    console.log('Event tracked:', { category, action, label });
}

// Tracker les clics sur les boutons importants
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', function() {
        const text = this.textContent.trim();
        trackEvent('Button', 'Click', text);
    });
});

// Tracker les téléchargements
document.querySelectorAll('a[href$=".pdf"], a[href$=".doc"], a[href$=".docx"]').forEach(link => {
    link.addEventListener('click', function() {
        const filename = this.href.split('/').pop();
        trackEvent('Download', 'Click', filename);
    });
});

// ===== MESSAGES ET NOTIFICATIONS =====

// Système de notifications simple
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style de base pour la notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '9999',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px'
    });
    
    // Couleurs selon le type
    const colors = {
        info: '#3498db',
        success: '#27ae60',
        warning: '#f39c12',
        error: '#e74c3c'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animation d'apparition
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Disparition automatique
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// ===== EASTER EGGS =====

// Konami Code pour les fans de jeux vidéo
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg activé !
        document.body.style.animation = 'rainbow 2s infinite';
        showNotification('🎵 Bravo ! Vous avez trouvé l\'easter egg musical ! 🎵', 'success');
        
        // Ajouter l'animation rainbow CSS si elle n'existe pas
        if (!document.querySelector('#rainbow-style')) {
            const style = document.createElement('style');
            style.id = 'rainbow-style';
            style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Remettre à zéro après 3 secondes
        setTimeout(() => {
            document.body.style.animation = '';
            konamiCode = [];
        }, 3000);
    }
});

console.log('🎵 Site du Chœur des Trois-Chêne chargé avec succès ! 🎵');
