// ===================================
// MAIN.JS - Site Artiserv Débouchage
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // 1. MENU MOBILE
    // ===================================
    const menuToggle = document.getElementById('menuToggle');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuClose = document.getElementById('menuClose');

    if (menuToggle && menuOverlay) {
        menuToggle.addEventListener('click', function() {
            menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        if (menuClose) {
            menuClose.addEventListener('click', function() {
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        menuOverlay.addEventListener('click', function(e) {
            if (e.target === menuOverlay || e.target.classList.contains('menu-overlay-bg')) {
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        const menuLinks = menuOverlay.querySelectorAll('.menu-link');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ===================================
    // 2. CARTE LEAFLET
    // ===================================
    const VILLE_SLUG = 'vitry-sur-seine';
    const VILLE_NOM = 'Vitry-sur-Seine';
    const GPS_LAT = 48.7875;
    const GPS_LON = 2.3933;
    
    const mapElement = document.getElementById(VILLE_SLUG + '-map');
    
    if (mapElement) {
        console.log('✅ Élément carte trouvé:', VILLE_SLUG + '-map');
        
        if (typeof L === 'undefined') {
            console.error('❌ Leaflet n\'est pas chargé');
            mapElement.innerHTML = '<p style="text-align: center; padding: 2rem; color: #666;">Erreur : Leaflet non chargé</p>';
        } else {
            console.log('✅ Leaflet est chargé');
            
            try {
                const map = L.map(VILLE_SLUG + '-map').setView([GPS_LAT, GPS_LON], 12);
                console.log('✅ Carte initialisée pour', VILLE_NOM, 'à', GPS_LAT, GPS_LON);
                
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                    maxZoom: 19
                }).addTo(map);
                
                setTimeout(function() {
                    map.invalidateSize();
                }, 250);
                
                const marker = L.marker([GPS_LAT, GPS_LON]).addTo(map);
                marker.bindPopup(
                    '<strong>Artiserv Débouchage</strong><br>' +
                    'Zone d\'intervention à ' + VILLE_NOM
                ).openPopup();
                
                const circle = L.circle([GPS_LAT, GPS_LON], {
                    color: '#F88309',
                    fillColor: '#F88309',
                    fillOpacity: 0.1,
                    radius: 15000
                }).addTo(map);
                
                console.log('🎉 Carte Leaflet chargée avec succès !');
            } catch (error) {
                console.error('❌ Erreur lors de l\'initialisation de la carte:', error);
                mapElement.innerHTML = '<p style="text-align: center; padding: 2rem; color: #666;">La carte n\'a pas pu être chargée.</p>';
            }
        }
    } else {
        console.warn('⚠️ Élément carte non trouvé:', VILLE_SLUG + '-map');
    }

    // ===================================
    // 3. TOP BAR DYNAMIQUE
    // ===================================
    const nextSlotElement = document.getElementById('next-slot');
    
    if (nextSlotElement) {
        function updateNextSlot() {
            const now = new Date();
            const minutes = now.getMinutes();
            const hours = now.getHours();
            
            let nextMinutes = Math.ceil(minutes / 15) * 15;
            let nextHours = hours;
            
            if (nextMinutes === 60) {
                nextMinutes = 0;
                nextHours = (nextHours + 1) % 24;
            }
            
            const timeString = `${String(nextHours).padStart(2, '0')}h${String(nextMinutes).padStart(2, '0')}`;
            nextSlotElement.textContent = timeString;
        }
        
        updateNextSlot();
        setInterval(updateNextSlot, 60000);
    }

    // ===================================
    // 4. ACTIVITÉ TECHNICIEN
    // ===================================
    const technicianActivity = document.getElementById('technician-activity');
    
    if (technicianActivity) {
        const activities = [
            'Technicien en route sur ' + VILLE_NOM + ' Nord',
            'Intervention en cours dans le secteur',
            'Technicien disponible - Intervention rapide',
            'Débouchage terminé avec succès',
            'En route vers le prochain client'
        ];
        
        let currentIndex = 0;
        
        function updateActivity() {
            currentIndex = (currentIndex + 1) % activities.length;
            technicianActivity.textContent = activities[currentIndex];
        }
        
        setInterval(updateActivity, 8000);
    }

    // ===================================
    // 5. GESTION COOKIES
    // ===================================
    const cookieConsent = document.getElementById('cookieConsent');
    const cookieAccept = document.getElementById('cookieAccept');
    const cookieReject = document.getElementById('cookieReject');

    if (cookieConsent) {
        const cookieChoice = localStorage.getItem('cookieConsent');
        
        if (!cookieChoice) {
            setTimeout(() => {
                cookieConsent.style.display = 'block';
            }, 2000);
        }

        if (cookieAccept) {
            cookieAccept.addEventListener('click', function() {
                localStorage.setItem('cookieConsent', 'accepted');
                cookieConsent.style.display = 'none';
            });
        }

        if (cookieReject) {
            cookieReject.addEventListener('click', function() {
                localStorage.setItem('cookieConsent', 'rejected');
                cookieConsent.style.display = 'none';
            });
        }
    }

    // ===================================
    // 6. FORMULAIRE DE CONTACT
    // ===================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const submitButton = contactForm.querySelector('button[type="submit"]');
            
            if (submitButton) {
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Envoi en cours...';
                submitButton.disabled = true;
                
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 3000);
            }
        });
    }

    // ===================================
    // 7. SMOOTH SCROLL
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '#!') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===================================
    // 8. FAQ ACCORDÉONS
    // ===================================
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            const answer = faqItem.querySelector('.faq-answer');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Fermer tous les autres accordéons
            faqQuestions.forEach(q => {
                if (q !== this) {
                    q.setAttribute('aria-expanded', 'false');
                    q.closest('.faq-item').querySelector('.faq-answer').classList.remove('active');
                }
            });
            
            // Toggle l'accordéon actuel
            if (isExpanded) {
                this.setAttribute('aria-expanded', 'false');
                answer.classList.remove('active');
            } else {
                this.setAttribute('aria-expanded', 'true');
                answer.classList.add('active');
            }
        });
    });

    // ===================================
    // 9. CONSOLE MESSAGE
    // ===================================
    console.log('🚀 Site Artiserv Débouchage ' + VILLE_NOM + ' chargé !');
});