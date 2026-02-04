// Navigation mobile
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Fermer le menu en cliquant sur un lien
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Fermer le menu en cliquant à l'extérieur
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// Smooth scrolling pour les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animation au scroll (fade-in)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observer tous les éléments avec la classe fade-in
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.service-card, .portfolio-item, .process-step');
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Filtrage du portfolio
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Retirer la classe active de tous les boutons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Ajouter la classe active au bouton cliqué
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Animation des éléments flottants dans le hero
const floatingElements = document.querySelectorAll('.element');
floatingElements.forEach((element, index) => {
    const duration = 6 + (index * 2);
    const delay = index * 2;
    element.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
});

// Gestion du formulaire de contact
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Récupérer les données du formulaire
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Validation simple
        if (!data.name || !data.email || !data.message) {
            showNotification('Veuillez remplir tous les champs obligatoires', 'error');
            return;
        }
        
        // Validation email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Veuillez entrer une adresse email valide', 'error');
            return;
        }
        
        // Simuler l'envoi du formulaire
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Votre message a été envoyé avec succès ! Je vous répondrai dans les plus brefs délais.', 'success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Système de notifications
function showNotification(message, type = 'info') {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = message; // Utiliser innerHTML pour supporter le HTML
    
    // Style de la notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1.5rem 2rem;
        border-radius: 12px;
        color: white;
        font-weight: 500;
        font-size: 1rem;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        backdrop-filter: blur(10px);
    `;
    
    // Couleur selon le type
    switch(type) {
        case 'success':
            notification.style.background = 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';
            notification.style.borderLeft = '4px solid #2ecc71';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
            notification.style.borderLeft = '4px solid #e74c3c';
            break;
        case 'info':
            notification.style.background = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
            notification.style.borderLeft = '4px solid #3498db';
            break;
    }
    
    // Ajouter au DOM
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Sortie automatique
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 6000);
}

// Animation du header au scroll
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'var(--shadow-sm)';
    } else {
        navbar.style.boxShadow = 'var(--shadow-lg)';
    }
    
    lastScroll = currentScroll;
});

// Effet parallaxe sur le hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled * 0.001);
    }
});

// Animation des compteurs (si ajoutés plus tard)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Gestion du thème (clair/sombre) - fonctionnalité bonus
function initThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Basculer le thème');
    
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('dark-theme')) {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    });
    
    themeToggle.addEventListener('mouseenter', () => {
        themeToggle.style.transform = 'scale(1.1)';
    });
    
    themeToggle.addEventListener('mouseleave', () => {
        themeToggle.style.transform = 'scale(1)';
    });
}

// Initialiser le thème toggle au chargement
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
});

// Optimisation des performances : debounce pour les événements scroll
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Appliquer le debounce aux événements scroll
const optimizedScroll = debounce(() => {
    // Logique de scroll optimisée ici
}, 10);

window.addEventListener('scroll', optimizedScroll);

// Précharger les images du portfolio (important pour la performance)
function preloadImages() {
    const portfolioImages = document.querySelectorAll('.portfolio-image img');
    portfolioImages.forEach(img => {
        if (img.dataset.src) {
            const tempImg = new Image();
            tempImg.onload = () => {
                img.src = tempImg.src;
                img.classList.add('loaded');
            };
            tempImg.src = img.dataset.src;
        }
    });
}

// Initialiser au chargement complet
window.addEventListener('load', () => {
    preloadImages();
    
    // Ajouter une classe loaded au body pour les animations
    document.body.classList.add('loaded');
});

// Gestion des erreurs JavaScript
window.addEventListener('error', (e) => {
    console.error('Erreur JavaScript:', e.error);
    // Optionnel : envoyer les erreurs à un service de monitoring
});

// Export des fonctions pour utilisation externe si nécessaire
window.WebCraftStudio = {
    showNotification,
    animateCounter,
    debounce
};

// Fonctions pour la lightbox
let currentZoom = 1;
let isDragging = false;
let startX, startY, scrollLeft, scrollTop;

function openLightbox(element) {
    const img = element.querySelector('img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    // Utiliser l'image comme background
    lightboxImg.style.backgroundImage = `url(${img.src})`;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Réinitialiser le zoom
    currentZoom = 1;
    updateZoom();
    
    // Pas d'interactions - l'image est juste un background
    // Plus de drag, zoom ou scroll sur l'image
}

function closeLightbox(event) {
    // Fermer seulement si c'est un clic direct sur le fond ou sur le bouton close
    if (event) {
        // Si le clic vient des contrôles de zoom, ne pas fermer
        if (event.target.closest('.lightbox-controls')) {
            return;
        }
        // Si le clic vient de l'image background, ne pas fermer
        if (event.target.closest('#lightbox-img')) {
            return;
        }
        // Arrêter la propagation pour éviter les fermetures accidentelles
        event.stopPropagation();
    }
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    
    // Nettoyer le background
    lightboxImg.style.backgroundImage = '';
    
    // Réinitialiser le zoom
    currentZoom = 1;
}

function setupLightboxInteractions() {
    // Plus d'interactions sur l'image - elle est juste un background
    // On garde juste les contrôles de zoom si tu les veux plus tard
}

function removeLightboxInteractions() {
    // Plus d'interactions à retirer
}

function updateZoom() {
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.style.transform = `scale(${currentZoom})`;
}

// Fermer la lightbox avec la touche Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// Formulaire de devis avec antispam et EmailJS
document.addEventListener('DOMContentLoaded', function() {
    const devisForm = document.getElementById('devisForm');
    
    if (devisForm) {
        devisForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Vérification antispam
            const antispamAnswer = document.getElementById('antispam').value.trim();
            if (antispamAnswer !== '5') {
                showNotification('Réponse antispam incorrecte. Veuillez répondre à la question : 2 + 3 = ?', 'error');
                return;
            }
            
            // Validation des champs requis
            const requiredFields = devisForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#f5576c';
                } else {
                    field.style.borderColor = '#e2e8f0';
                }
            });
            
            if (!isValid) {
                showNotification('Veuillez remplir tous les champs obligatoires (*).', 'error');
                return;
            }
            
            // Validation email
            const email = document.getElementById('email').value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Veuillez entrer une adresse email valide.', 'error');
                document.getElementById('email').style.borderColor = '#f5576c';
                return;
            }
            
            // Validation téléphone
            const telephone = document.getElementById('telephone').value;
            const phoneRegex = /^[0-9\s\+\-\(\)]+$/;
            if (!phoneRegex.test(telephone)) {
                showNotification('Veuillez entrer un numéro de téléphone valide.', 'error');
                document.getElementById('telephone').style.borderColor = '#f5576c';
                return;
            }
            
            // Collecter toutes les données du formulaire
            const formData = new FormData(devisForm);
            const data = {};
            
            // Champs simples
            for (let [key, value] of formData.entries()) {
                // Ignorer les valeurs vides
                if (!value || value.trim() === '') continue;
                
                if (!data[key]) {
                    data[key] = value;
                } else if (Array.isArray(data[key])) {
                    // Éviter les doublons
                    if (!data[key].includes(value)) {
                        data[key].push(value);
                    }
                } else {
                    // Si c'est une chaîne, la convertir en array
                    if (typeof data[key] === 'string') {
                        // Éviter les doublons
                        if (data[key] !== value) {
                            data[key] = [data[key], value];
                        }
                    } else {
                        // Éviter les doublons
                        if (!data[key].includes(value)) {
                            data[key].push(value);
                        }
                    }
                }
            }
            
            // Traiter les checkboxes et radios
            const checkboxes = devisForm.querySelectorAll('input[type="checkbox"]:checked');
            checkboxes.forEach(checkbox => {
                const name = checkbox.name;
                const value = checkbox.value;
                
                // Ignorer si déjà traité par FormData pour éviter les doublons
                if (data[name] && (Array.isArray(data[name]) ? data[name].includes(value) : data[name] === value)) {
                    return;
                }
                
                // Initialiser comme array si nécessaire
                if (!data[name]) {
                    data[name] = [];
                }
                
                // S'assurer que c'est un array
                if (!Array.isArray(data[name])) {
                    data[name] = [data[name]];
                }
                
                data[name].push(value);
            });
            
            // Traiter les radios (une seule valeur par nom)
            const radios = devisForm.querySelectorAll('input[type="radio"]:checked');
            radios.forEach(radio => {
                data[radio.name] = radio.value;
            });
            
            // Envoyer avec EmailJS
            const submitBtn = devisForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            submitBtn.disabled = true;
            
            // Préparer les données pour EmailJS
            console.log('Données brutes collectées:', data);
            
            const templateParams = {
                // Champs principaux (ceux qui sont probablement dans ton template)
                nom: data.nom || '',
                prenom: data.prenom || '',
                email: data.email || '',
                telephone: data.telephone || '',
                
                // Message complet avec toutes les données (solution temporaire)
                message: createCompleteEmailMessage(data),
                
                // Debug - toutes les données en format lisible
                debug_all_data: JSON.stringify(data, null, 2),
                
                // Sujet
                sujet: 'Demande de devis - Création de site web'
            };
            
            console.log('TemplateParams préparés pour EmailJS:', templateParams);
            
            // Envoyer l'email avec EmailJS
            console.log('Tentative d\'envoi EmailJS avec:', templateParams);
            
            emailjs.send('service_ik8xlkp', 'template_kb98fkm', templateParams)
                .then(function(response) {
                    console.log('SUCCESS! EmailJS response:', response);
                    
                    // Afficher une notification de succès visible
                    showNotification('✅ Votre demande de devis a été envoyée avec succès !<br>Je vous répondrai dans les plus brefs délais.<br><br>Numéro de suivi : ' + response.status, 'success');
                    
                    // Réinitialiser le formulaire
                    devisForm.reset();
                    
                    // Afficher un message de confirmation supplémentaire
                    setTimeout(() => {
                        const successMessage = document.createElement('div');
                        successMessage.className = 'success-message';
                        successMessage.innerHTML = `
                            <div class="success-icon">
                                <i class="fas fa-check-circle"></i>
                            </div>
                            <h3>Demande envoyée avec succès !</h3>
                            <p>Merci pour votre confiance. Je vais étudier votre projet et vous contacterai rapidement.</p>
                            <p><strong>Référence : #DEVIS-${Date.now()}</strong></p>
                        `;
                        devisForm.parentNode.insertBefore(successMessage, devisForm.nextSibling);
                        
                        // Faire défiler vers le message de succès
                        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        
                        // Masquer le message après 10 secondes
                        setTimeout(() => {
                            successMessage.style.opacity = '0';
                            setTimeout(() => successMessage.remove(), 300);
                        }, 10000);
                    }, 500);
                }, function(error) {
                    console.log('FAILED! EmailJS error:', error);
                    console.log('Error details:', JSON.stringify(error, null, 2));
                    
                    // Message d'erreur détaillé
                    let errorMessage = '❌ Une erreur est survenue lors de l\'envoi.<br>Veuillez réessayer ou me contacter directement.<br><br>';
                    
                    if (error.text === 'The user is not authorized to send email by the provided from address.') {
                        errorMessage += 'Erreur: Adresse email non autorisée.<br>Vérifiez votre configuration EmailJS.';
                    } else if (error.text === 'The browser is blocked from sending emails. Check your firewall or antivirus settings.') {
                        errorMessage += 'Erreur: Navigateur bloqué.<br>Vérifiez votre firewall/antivirus.';
                    } else {
                        errorMessage += 'Erreur: ' + error.text;
                    }
                    
                    showNotification(errorMessage, 'error');
                })
                .finally(function() {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                });
        });
        
        // Gérer l'affichage des champs "Autre"
        handleAutreFields();
    }
});

function handleAutreFields() {
    // Type de site "Autre"
    const typeAutreCheckbox = document.querySelector('input[name="type_site"][value="autre"]');
    const typeAutreInput = document.getElementById('type_autre');
    
    if (typeAutreCheckbox && typeAutreInput) {
        typeAutreInput.style.display = 'none';
        typeAutreInput.required = false;
        
        // Gérer tous les checkboxes de type_site
        const typeSiteCheckboxes = document.querySelectorAll('input[name="type_site"]');
        typeSiteCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const autreChecked = document.querySelector('input[name="type_site"][value="autre"]').checked;
                typeAutreInput.style.display = autreChecked ? 'block' : 'none';
                typeAutreInput.required = autreChecked;
            });
        });
    }
    
    // Pages "Autres"
    const pagesAutresCheckbox = document.querySelector('input[name="pages"][value="autres_pages"]');
    const pagesAutresInput = document.getElementById('pages_autres');
    
    if (pagesAutresCheckbox && pagesAutresInput) {
        pagesAutresInput.style.display = 'none';
        pagesAutresInput.required = false;
        
        // Gérer tous les checkboxes de pages
        const pagesCheckboxes = document.querySelectorAll('input[name="pages"]');
        pagesCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const autresPagesChecked = document.querySelector('input[name="pages"][value="autres_pages"]').checked;
                pagesAutresInput.style.display = autresPagesChecked ? 'block' : 'none';
                pagesAutresInput.required = autresPagesChecked;
            });
        });
    }
    
    // Fonctionnalités "Autres"
    const foncAutresCheckbox = document.querySelector('input[name="fonctionnalites"][value="autres_fonc"]');
    const foncAutresInput = document.getElementById('fonc_autres');
    
    if (foncAutresCheckbox && foncAutresInput) {
        foncAutresInput.style.display = 'none';
        foncAutresInput.required = false;
        
        // Gérer tous les checkboxes de fonctionnalités
        const foncCheckboxes = document.querySelectorAll('input[name="fonctionnalites"]');
        foncCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const autresFoncChecked = document.querySelector('input[name="fonctionnalites"][value="autres_fonc"]').checked;
                foncAutresInput.style.display = autresFoncChecked ? 'block' : 'none';
                foncAutresInput.required = autresFoncChecked;
            });
        });
    }
    
    // Style "Autre"
    const styleAutreRadio = document.querySelector('input[name="style"][value="autre"]');
    const styleAutreInput = document.getElementById('style_autre');
    
    if (styleAutreRadio && styleAutreInput) {
        styleAutreInput.style.display = 'none';
        styleAutreInput.required = false;
        
        // Gérer tous les radios de style
        const styleRadios = document.querySelectorAll('input[name="style"]');
        styleRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                const styleAutreChecked = document.querySelector('input[name="style"][value="autre"]').checked;
                styleAutreInput.style.display = styleAutreChecked ? 'block' : 'none';
                styleAutreInput.required = styleAutreChecked;
            });
        });
    }
    
    // Exemples de sites
    const exemplesRadios = document.querySelectorAll('input[name="exemples"]');
    const exemplesLiensInput = document.getElementById('exemples_liens');
    
    if (exemplesRadios.length > 0 && exemplesLiensInput) {
        exemplesLiensInput.style.display = 'none';
        exemplesLiensInput.required = false;
        
        exemplesRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                const exemplesOuiChecked = document.querySelector('input[name="exemples"][value="oui"]').checked;
                exemplesLiensInput.style.display = exemplesOuiChecked ? 'block' : 'none';
                exemplesLiensInput.required = exemplesOuiChecked;
            });
        });
    }
}

function createCompleteEmailMessage(data) {
    let message = 'FORMULAIRE DE DEMANDE DE DEVIS – Création de site web\n\n';
    
    message += '------------------------------------------------------------\n';
    message += '1. INFORMATIONS GÉNÉRALES\n';
    message += '------------------------------------------------------------\n';
    message += `Nom : ${data.nom || ''}\n`;
    message += `Prénom : ${data.prenom || ''}\n`;
    message += `Entreprise : ${data.entreprise || 'Non applicable'}\n`;
    message += `Email : ${data.email || ''}\n`;
    message += `Téléphone : ${data.telephone || ''}\n`;
    message += `Secteur d\'activité : ${data.secteur || ''}\n\n`;
    
    message += '------------------------------------------------------------\n';
    message += '2. OBJECTIF DU SITE\n';
    message += '------------------------------------------------------------\n';
    message += `Type de site : ${Array.isArray(data.type_site) ? data.type_site.join(', ') : (data.type_site || '')}\n`;
    if (data.type_autre) {
        message += `Autre type : ${data.type_autre}\n`;
    }
    message += `Description du projet : ${data.projet_description || ''}\n\n`;
    
    message += '------------------------------------------------------------\n';
    message += '3. PAGES SOUHAITÉES\n';
    message += '------------------------------------------------------------\n';
    message += `Pages : ${Array.isArray(data.pages) ? data.pages.join(', ') : (data.pages || '')}\n`;
    if (data.pages_autres) {
        message += `Autres pages : ${data.pages_autres}\n`;
    }
    message += '\n';
    
    message += '------------------------------------------------------------\n';
    message += '4. FONCTIONNALITÉS\n';
    message += '------------------------------------------------------------\n';
    message += `Fonctionnalités : ${Array.isArray(data.fonctionnalites) ? data.fonctionnalites.join(', ') : (data.fonctionnalites || '')}\n`;
    if (data.fonc_autres) {
        message += `Autres fonctionnalités : ${data.fonc_autres}\n`;
    }
    message += '\n';
    
    message += '------------------------------------------------------------\n';
    message += '5. CONTENU\n';
    message += '------------------------------------------------------------\n';
    message += `Textes disponibles : ${data.textes || ''}\n`;
    message += `Images disponibles : ${data.images || ''}\n`;
    message += `Rédaction souhaitée : ${data.redaction || ''}\n\n`;
    
    message += '------------------------------------------------------------\n';
    message += '6. DESIGN & IDENTITÉ VISUELLE\n';
    message += '------------------------------------------------------------\n';
    message += `Charte graphique : ${data.charte || ''}\n`;
    message += `Exemples de sites : ${data.exemples || ''}\n`;
    if (data.exemples_liens) {
        message += `Liens des exemples : ${data.exemples_liens}\n`;
    }
    message += `Style souhaité : ${data.style || ''}\n`;
    if (data.style_autre) {
        message += `Autre style : ${data.style_autre}\n`;
    }
    message += '\n';
    
    message += '------------------------------------------------------------\n';
    message += '7. DÉLAIS\n';
    message += '------------------------------------------------------------\n';
    message += `Délais souhaités : ${data.delais || ''}\n\n`;
    
    message += '------------------------------------------------------------\n';
    message += '8. INFORMATIONS SUPPLÉMENTAIRES\n';
    message += '------------------------------------------------------------\n';
    message += `Informations supplémentaires : ${data.informations || ''}\n\n`;
    
    message += 'FIN DU FORMULAIRE\n';
    message += 'Merci de votre retour, je reviens vers vous rapidement avec un devis détaillé.';
    
    return message;
}

// ===== SOCIAL SHARE FUNCTIONS =====
function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent("OxmoDevWeb - Création de Sites Web avec IA");
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${title}`, '_blank', 'width=600,height=400');
}

function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Découvrez OxmoDevWeb - Création de sites web sur mesure avec intelligence artificielle !");
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
}

function shareOnInstagram() {
    // Instagram n'a pas de partage URL direct, on copie le lien
    copyLink();
    alert("Lien copié ! Vous pouvez maintenant le partager sur Instagram 📸");
}

function shareOnSnapchat() {
    // Snapchat n'a pas de partage URL direct, on copie le lien
    copyLink();
    alert("Lien copié ! Vous pouvez maintenant le partager sur Snapchat 📱");
}

function copyLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        showCopyNotification();
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showCopyNotification();
    });
}

function showCopyNotification() {
    // Create notification if it doesn't exist
    let notification = document.querySelector('.copy-notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'copy-notification';
        notification.innerHTML = '<i class="fas fa-check-circle"></i> Lien copié !';
        document.body.appendChild(notification);
    }
    
    // Show notification
    notification.classList.add('show');
    
    // Hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// ===== BACK TO TOP BUTTON =====
function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (!backToTopButton) return;

    // Afficher/masquer le bouton selon le scroll (moitié de la page)
    window.addEventListener('scroll', () => {
        const scrollThreshold = window.innerHeight / 2; // Moitié de la hauteur de la page
        if (window.pageYOffset > scrollThreshold) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    // Action au clic
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialiser le back to top
document.addEventListener('DOMContentLoaded', () => {
    initBackToTop();
});

function createMailtoLink(data) {
    const subject = encodeURIComponent('Demande de devis - Création de site web');
    const body = encodeURIComponent(createEmailBody(data));
    return `mailto:contact@webcraft-studio.fr?subject=${subject}&body=${body}`;
}
