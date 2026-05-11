/* ========================================
   AL GHZAL - INTERACTIVE FEATURES
   ======================================== */

// ========================================
// DOM Elements
// ========================================

const navbar = document.querySelector('.navbar');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const statNumbers = document.querySelectorAll('.stat-number');

// ========================================
// Navbar Functions
// ========================================

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active nav link
    updateActiveNavLink();
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on any link or CTA button
document.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// ========================================
// Smooth Scroll Behavior
// ========================================

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

// ========================================
// Scroll Animations
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // If it's a stat card, start the counter animation
            if (entry.target.classList.contains('stat-number')) {
                animateCounter(entry.target);
            }
        }
    });
}, observerOptions);

// Observe all scroll-fade elements
document.querySelectorAll('.product-card, .recipe-card, .stat-card, .feature-item, .cert-item, .products-slider-wrapper, .recipes-header, .recipes-wrapper, .stats-header').forEach(el => {
    el.classList.add('scroll-fade');
    observer.observe(el);
});

// Stats counters are observed directly so counting starts once numbers enter viewport.
statNumbers.forEach(number => observer.observe(number));

// ========================================
// Counter Animation
// ========================================

function animateCounter(element) {
    if (element.hasAttribute('data-animated')) {
        return; // Already animated
    }
    
    const target = parseInt(element.getAttribute('data-target'));
    const suffix = element.getAttribute('data-suffix') || '';
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    element.setAttribute('data-animated', 'true');
    
    const animation = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            element.textContent = `${suffix}${target}`;
            clearInterval(animation);
        } else {
            element.textContent = `${suffix}${Math.floor(current)}`;
        }
    }, 16);
}

// ========================================
// Premium Hero Animations
// ========================================

// Scroll indicator animation
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });
    }
}

// Parallax effect on mouse move
function initHeroParallax() {
    const heroPremium = document.querySelector('.hero-premium');
    const heroVisual = document.querySelector('.hero-visual-container');
    const circles = document.querySelectorAll('.hero-circle-gold, .hero-circle-gold-small');
    
    if (!heroPremium) return;
    
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        
        // Parallax effect on image
        if (heroVisual) {
            heroVisual.style.transform = `perspective(1000px) rotateX(${y * 5}deg) rotateY(${x * 5}deg)`;
        }
        
        // Subtle movement on circles
        circles.forEach((circle, index) => {
            const offset = (index + 1) * 10;
            circle.style.transform = `translate(${x * offset}px, ${y * offset}px)`;
        });
    });
}

// Hero buttons interactions
function initHeroButtonInteractions() {
    const buttons = document.querySelectorAll('.hero-btn-primary, .hero-btn-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Add ripple styles
const heroRippleStyles = document.createElement('style');
heroRippleStyles.textContent = `
    .hero-btn-primary,
    .hero-btn-secondary {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(heroRippleStyles);

// Initialize all hero animations
function initHeroAnimations() {
    initScrollIndicator();
    initHeroParallax();
    initHeroButtonInteractions();
}

// ========================================
// Form Submission
// ========================================

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        
        // Show success message (you can replace this with actual API call)
        showNotification('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Hide notification after 5 seconds
        setTimeout(() => {
            hideNotification();
        }, 5000);
    });
}

// ========================================
// Notifications
// ========================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <p>${message}</p>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
}

function hideNotification() {
    const notifications = document.querySelectorAll('.notification');
    notifications.forEach(notification => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
}

// Add notification styles dynamically
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #e4b13f 0%, #d4a034 100%);
        color: #0f0f0f;
        padding: 1.5rem 2rem;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(228, 177, 63, 0.4);
        z-index: 2000;
        animation: slideDown 0.3s ease-out;
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease-out;
        max-width: 400px;
    }
    
    .notification.show {
        opacity: 1;
        transform: translateY(0);
    }
    
    .notification-success {
        background: linear-gradient(135deg, #7fb3a0 0%, #6a9a87 100%);
    }
    
    .notification-error {
        background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .notification-content p {
        margin: 0;
        color: white;
        font-weight: 600;
    }
    
    @media (max-width: 480px) {
        .notification {
            top: 10px;
            right: 10px;
            left: 10px;
            max-width: none;
        }
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(notificationStyles);

// ========================================
// Hover Effects Enhancement
// ========================================

// Add subtle scale effect to cards on hover
document.querySelectorAll('.recipe-card').forEach(card => {
    // Skip carousel recipe cards because their transform is controlled by pagination classes.
    if (card.closest('.recipes-container')) {
        return;
    }

    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-12px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ========================================
// Page Load Animation
// ========================================

window.addEventListener('load', () => {
    // Add loaded class to body
    document.body.classList.add('loaded');
    
    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
    }
});

// ========================================
// Keyboard Navigation
// ========================================

document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Navigate sections with arrow keys
    if (e.key === 'ArrowDown') {
        const currentSection = document.querySelector('section:in-viewport');
        if (currentSection && currentSection.nextElementSibling) {
            currentSection.nextElementSibling.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// ========================================
// Accessibility Enhancements
// ========================================

// Add keyboard focus visibility
document.querySelectorAll('button, a, input, textarea').forEach(element => {
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            element.focus();
        }
    });
});

// ========================================
// Performance Monitoring
// ========================================

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    document.documentElement.style.setProperty('--transition-fast', '0s');
    document.documentElement.style.setProperty('--transition-normal', '0s');
    document.documentElement.style.setProperty('--transition-smooth', '0s');
}

// ========================================
// Lazy Loading Images
// ========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// Print Styles
// ========================================

const printStyles = document.createElement('style');
printStyles.textContent = `
    @media print {
        .navbar,
        .hero-indicators,
        .btn,
        .footer {
            display: none;
        }
        
        .section {
            page-break-inside: avoid;
        }
    }
`;
document.head.appendChild(printStyles);

// ========================================
// Debug Mode (Remove in production)
// ========================================

// Uncomment to enable debug logs
/*
console.log('Al Ghzal Website Loaded');
console.log('Navbar:', navbar);
console.log('Hero Slider:', heroSlider);
*/

// ========================================
// Initialize on DOM Ready
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // All initialization code has already run
    initHeroAnimations();
    console.log('✓ Al Ghzal Website Fully Loaded');
});

// ========================================
// Handle Window Resize
// ========================================

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Re-calculate any dynamic values if needed
        updateActiveNavLink();
    }, 250);
});

// ========================================
// Social Links
// ========================================

document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', (e) => {
        // Add click animation
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.width = ripple.style.height = '20px';
        ripple.style.animation = 'ripple-animation 0.6s ease-out';
        
        link.style.position = 'relative';
        link.style.overflow = 'hidden';
        link.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyles);

console.log('✓ All interactive features initialized');

/* ========================================
   PRODUCTS - HORIZONTAL SLIDER SCRIPT
   - Builds product cards
   - Handles arrow navigation
   - Keeps swipe/scroll behavior native
   ======================================== */
function initProductsSlider() {
    const slider = document.getElementById('productsSlider');
    const track = document.getElementById('productsTrack');
    const prevBtn = document.getElementById('productsPrevBtn');
    const nextBtn = document.getElementById('productsNextBtn');
    const bottomPrevBtn = document.getElementById('productsBottomPrevBtn');
    const bottomNextBtn = document.getElementById('productsBottomNextBtn');
    const dotsContainer = document.getElementById('productsDots'); // حاوية النقط
    const products = window.__ALGHZAL_PRODUCTS || [];

    if (!slider || !track || !products.length) return;

    // بناء الكروت
    const cards = products.map((product, index) => {
        const card = document.createElement('article');
        card.className = 'product-card scroll-fade is-active'; 
        card.setAttribute('tabindex', '0');
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.src}" alt="${product.title}" loading="lazy">
            </div>
            <div class="product-info">
                <div class="product-kicker">تشكيلة الغزال</div>
                <h3>${product.title}</h3>
                <p>${product.desc}</p>
            </div>
        `;
        track.appendChild(card);
        if (typeof observer !== 'undefined') observer.observe(card);
        return card;
    });

    // بناء النقط برمجياً بناءً على عدد الكروت
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        cards.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = i === 0 ? 'slider-dot active' : 'slider-dot';
            dot.addEventListener('click', () => {
                cards[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            });
            dotsContainer.appendChild(dot);
        });
    }

    const getScrollAmount = () => cards[0].offsetWidth + (parseFloat(window.getComputedStyle(track).gap) || 0);
    const slideNext = () => track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    const slidePrev = () => track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });

    if (prevBtn) prevBtn.addEventListener('click', slidePrev);
    if (nextBtn) nextBtn.addEventListener('click', slideNext);
    if (bottomPrevBtn) bottomPrevBtn.addEventListener('click', slidePrev);
    if (bottomNextBtn) bottomNextBtn.addEventListener('click', slideNext);

    // تحديث النقطة النشطة أثناء السحب
    const activeCardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const index = cards.indexOf(entry.target);
                if (dotsContainer) {
                    const dots = dotsContainer.querySelectorAll('.slider-dot');
                    dots.forEach(d => d.classList.remove('active'));
                    if (dots[index]) dots[index].classList.add('active');
                }
            }
        });
    }, { root: slider, threshold: 0.6 });

    cards.forEach(card => activeCardObserver.observe(card));
}

function initProductsReveal() {
    const revealBtn = document.getElementById('productsRevealBtn');
    const revealPanel = document.getElementById('productsReveal');

    if (!revealBtn || !revealPanel) return;

    let isOpen = false;

    revealBtn.addEventListener('click', () => {
        if (!isOpen) {
            revealBtn.classList.add('is-hiding');

            setTimeout(() => {
                revealBtn.classList.add('is-hidden');
                revealPanel.classList.add('open');
                revealPanel.setAttribute('aria-hidden', 'false');
                isOpen = true;

                if (!revealPanel.dataset.initialized) {
                    initProductsSlider();
                    revealPanel.dataset.initialized = 'true';
                }

                setTimeout(() => {
                    revealPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 140);
            }, 260);
        }
    });
}

// ========================================
// Recipes Carousel - Show 3 Cards at a Time
// ========================================
function initRecipesPagination() {
    const container = document.querySelector('.recipes-container');
    const prevBtn = document.getElementById('recipesPrevBtn');
    const nextBtn = document.getElementById('recipesNextBtn');
    const dotsContainer = document.getElementById('recipesDots'); // حاوية النقط

    if (!container) return;

    const cards = Array.from(container.querySelectorAll('.recipe-card'));

    cards.forEach(card => {
        card.classList.remove('is-hidden-left', 'is-hidden-right', 'is-prev', 'is-next');
        card.classList.add('is-active');
    });

    // بناء النقط برمجياً بناءً على عدد الوصفات
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        cards.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = i === 0 ? 'slider-dot active' : 'slider-dot';
            dot.addEventListener('click', () => {
                cards[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            });
            dotsContainer.appendChild(dot);
        });
    }

    const getScrollAmount = () => cards[0].offsetWidth + (parseFloat(window.getComputedStyle(container).gap) || 0);
    const slideNext = () => container.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    const slidePrev = () => container.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });

    if (prevBtn) prevBtn.addEventListener('click', slidePrev);
    if (nextBtn) nextBtn.addEventListener('click', slideNext);

    // تحديث النقطة النشطة أثناء السحب
    const activeCardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const index = cards.indexOf(entry.target);
                if (dotsContainer) {
                    const dots = dotsContainer.querySelectorAll('.slider-dot');
                    dots.forEach(d => d.classList.remove('active'));
                    if (dots[index]) dots[index].classList.add('active');
                }
            }
        });
    }, { root: container, threshold: 0.6 });

    cards.forEach(card => activeCardObserver.observe(card));
}

document.addEventListener('DOMContentLoaded', () => {
    initProductsReveal();
    initRecipesPagination();
});

// ========================================
// Recipe Modal
// ========================================
const RECIPES_DATA = {
    hummus_beetroot: {
        title: 'حمص بالشمندر',
        image: 'recipes/IMG-20260509-WA0007.jpg',
        ingredients: [
            '2 كوب حمص جاهز من الغزال',
            '1 كوب شمندر مسلوق ومقطّع',
            '½ كوب طحينة',
            '¼ كوب عصير ليمون طازج',
            '2 فص ثوم',
            '⅓ كوب ماء بارد',
            '3 ملاعق كبيرة زيت زيتون',
            '¾ ملعقة صغيرة ملح',
            '¼ ملعقة صغيرة كمون'
        ],
        steps: [
            'ضع الحمص، الشمندر، الطحينة، عصير الليمون، والثوم في الخلاط.',
            'أضف الملح والكمون ثم اخلط المكونات جيدًا.',
            'أضف الماء البارد تدريجيًا حتى تحصل على قوام ناعم وكريمي.',
            'أضف زيت الزيتون أثناء الخلط للحصول على قوام غني ومتجانس.',
            'إذا كان القوام كثيفًا أضف 1–2 ملعقة كبيرة ماء إضافية.',
            'اسكب الحمص في طبق التقديم.',
            'زيّنه بزيت الزيتون، السمسم أو الجبنة البيضاء، وحبات الحمص.',
            'يُقدّم باردًا مع الخبز العربي أو الخضار الطازجة.'
        ]
    },
    hummus_tahini: {
        title: 'حمص بالطحينة',
        image: 'recipes/IMG-20260509-WA0008.jpg',
        ingredients: [
            '2 كوب حمص جاهز من الغزال',
            '½ كوب طحينة',
            '¼ كوب عصير ليمون طازج',
            '2 فص ثوم',
            '⅓ كوب ماء بارد',
            '3 ملاعق كبيرة زيت زيتون',
            'ملعقة صغيرة ملح',
            'ملعقة صغيرة كمون'
        ],
        steps: [
            'ضع الحمص، الطحينة، عصير الليمون، والثوم في الخلاط.',
            'أضف الملح والكمون ثم اخلط جيدًا.',
            'أضف الماء البارد تدريجيًا حتى يصبح القوام ناعمًا.',
            'أضف زيت الزيتون أثناء الخلط.',
            'اسكب الحمص في طبق التقديم.',
            'زيّنه بزيت الزيتون والبابريكا والبقدونس.',
            'يُقدّم باردًا مع الخبز العربي.'
        ]
    },
    eggplant_fatteh: {
        title: 'فتة متبل الباذنجان',
        image: 'recipes/IMG-20260509-WA0009.jpg',
        ingredients: [
            '2 كوب متبل باذنجان جاهز من الغزال',
            '2 كوب لبن زبادي',
            '½ كوب طحينة',
            '¼ كوب عصير ليمون',
            '2 فص ثوم مهروس',
            '¾ ملعقة صغيرة ملح',
            '3 أرغفة خبز عربي محمصة',
            '¼ كوب صنوبر محمّص',
            '3 ملاعق كبيرة زيت زيتون'
        ],
        steps: [
            'اخلط اللبن والطحينة والثوم والليمون.',
            'أضف الملح.',
            'ضع الخبز المحمص في طبق التقديم.',
            'وزّع متبل الباذنجان فوق الخبز.',
            'أضف خليط اللبن والطحينة.',
            'زيّن بزيت الزيتون والصنوبر والبقدونس.',
            'تُقدّم مباشرة وهي طازجة.'
        ]
    }
};

function openRecipeModal(key) {
    const modal = document.getElementById('recipeModal');
    const titleEl = document.getElementById('recipeModalTitle');
    const bodyEl = document.getElementById('recipeModalBody');
    const imageEl = document.getElementById('recipeModalImage');
    const contentEl = modal ? modal.querySelector('.recipe-modal-content') : null;

    const data = RECIPES_DATA[key];
    if (!modal || !data) return;

    titleEl.textContent = data.title;
    if (imageEl) {
        imageEl.src = data.image || '';
        imageEl.alt = data.title;
    }

    // Build content
    let html = '';
    html += '<h4>المقادير:</h4>';
    html += '<ul>';
    data.ingredients.forEach(i => { html += '<li>' + i + '</li>'; });
    html += '</ul>';
    html += '<h4>طريقة التحضير:</h4>';
    html += '<ol>';
    data.steps.forEach(s => { html += '<li>' + s + '</li>'; });
    html += '</ol>';

    bodyEl.innerHTML = html;

    modal.setAttribute('aria-hidden', 'false');
    document.documentElement.style.overflow = 'hidden';
    if (contentEl) contentEl.scrollTop = 0;
    if (bodyEl) bodyEl.scrollTop = 0;
}

function closeRecipeModal() {
    const modal = document.getElementById('recipeModal');
    const imageEl = document.getElementById('recipeModalImage');
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    document.documentElement.style.overflow = '';
    if (imageEl) imageEl.removeAttribute('src');
}

// Wire recipe buttons
document.addEventListener('click', (e) => {
    const btn = e.target.closest && e.target.closest('.recipe-btn');
    if (btn) {
        const key = btn.getAttribute('data-recipe');
        if (key) openRecipeModal(key);
    }

    if (e.target.id === 'recipeModalClose' || e.target.id === 'recipeModalOverlay') {
        closeRecipeModal();
    }
});

// Close modal on ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeRecipeModal();
});

/* ========================================
   CAREERS FORM HANDLER
   ======================================== */

function initCareersForm() {
    const form = document.getElementById('careersForm');
    if (!form) return;

    const formMessage = document.getElementById('formMessage');
    const uploadAreas = document.querySelectorAll('.upload-area');
    const requirementChecks = document.querySelectorAll('.requirement-check');

    // Upload area drag & drop
    uploadAreas.forEach(area => {
        const uploadType = area.getAttribute('data-upload');
        const fileInput = document.getElementById(uploadType);
        const filePreview = document.getElementById(`${uploadType}Preview`);

        // Click to upload
        area.addEventListener('click', () => fileInput.click());

        // Drag over
        area.addEventListener('dragover', (e) => {
            e.preventDefault();
            area.classList.add('drag-over');
        });

        // Drag leave
        area.addEventListener('dragleave', () => {
            area.classList.remove('drag-over');
        });

        // Drop
        area.addEventListener('drop', (e) => {
            e.preventDefault();
            area.classList.remove('drag-over');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                fileInput.files = files;
                handleFileSelect(uploadType, fileInput, filePreview, area);
            }
        });

        // File input change
        fileInput.addEventListener('change', () => {
            handleFileSelect(uploadType, fileInput, filePreview, area);
        });
    });

    // Handle file selection
    function handleFileSelect(type, input, preview, area) {
        const file = input.files[0];
        if (!file) return;

        // Validate file
        const isValid = validateFile(file, type);
        if (!isValid) {
            showError(area.closest('.upload-box'), `ملف غير صحيح. اختر ${type === 'cv' ? 'PDF أو Word' : 'صورة JPG أو PNG'}`);
            input.value = '';
            return;
        }

        // Show preview
        preview.innerHTML = `✓ ${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
        preview.classList.add('show');
        clearError(area.closest('.upload-box'));
    }

    // Validate file
    function validateFile(file, type) {
        const cvTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        const photoTypes = ['image/jpeg', 'image/png', 'image/webp'];
        const maxSize = 5 * 1024 * 1024; // 5 MB

        if (file.size > maxSize) return false;

        if (type === 'cv') return cvTypes.includes(file.type);
        if (type === 'photo') return photoTypes.includes(file.type);
        return false;
    }

    // Form validation
    function validateForm() {
        let isValid = true;
        const inputs = form.querySelectorAll('.form-input, select');

        inputs.forEach(input => {
            if (!input.value.trim()) {
                showError(input.closest('.form-group'), 'هذا الحقل مطلوب');
                isValid = false;
            } else {
                clearError(input.closest('.form-group'));

                // Email validation
                if (input.type === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value)) {
                        showError(input.closest('.form-group'), 'بريد إلكتروني غير صحيح');
                        isValid = false;
                    }
                }

                // Phone validation
                if (input.type === 'tel') {
                    const phoneRegex = /^\+?[\d\s\-()]{9,}$/;
                    if (!phoneRegex.test(input.value)) {
                        showError(input.closest('.form-group'), 'رقم هاتف غير صحيح');
                        isValid = false;
                    }
                }
            }
        });

        // File validation
        const cvFile = document.getElementById('cv');
        const photoFile = document.getElementById('photo');

        if (!cvFile.files.length) {
            showError(document.querySelector('[data-upload="cv"]').closest('.upload-box'), 'السيرة الذاتية مطلوبة');
            isValid = false;
        }

        if (!photoFile.files.length) {
            showError(document.querySelector('[data-upload="photo"]').closest('.upload-box'), 'الصورة الشخصية مطلوبة');
            isValid = false;
        }

        // Requirements validation
        let allChecked = true;
        requirementChecks.forEach(check => {
            if (!check.checked) allChecked = false;
        });

        if (!allChecked) {
            showError(document.querySelector('.requirements-list'), 'يجب قبول جميع المتطلبات');
            isValid = false;
        } else {
            clearError(document.querySelector('.requirements-list').closest('.form-group'));
        }

        return isValid;
    }

    // Show error
    function showError(element, message) {
        const errorEl = element.querySelector('.error-message');
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.classList.add('show');
        }
    }

    // Clear error
    function clearError(element) {
        const errorEl = element.querySelector('.error-message');
        if (errorEl) {
            errorEl.classList.remove('show');
            errorEl.textContent = '';
        }
    }

    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate
        if (!validateForm()) return;

        // Show loading
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
        submitBtn.disabled = true;

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Show success message
        formMessage.innerHTML = '✓ تم استقبال طلب التوظيف بنجاح! سنتواصل معك قريباً.';
        formMessage.classList.add('show', 'success');

        // Reset form
        form.reset();
        document.querySelectorAll('.file-preview').forEach(p => p.classList.remove('show'));
        document.querySelectorAll('.file-preview').forEach(p => p.innerHTML = '');

        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.classList.remove('show');
        }, 5000);
    });

    // Reset button
    const resetBtn = form.querySelector('button[type="reset"]');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            form.reset();
            document.querySelectorAll('.file-preview').forEach(p => {
                p.classList.remove('show');
                p.innerHTML = '';
            });
            document.querySelectorAll('.error-message').forEach(e => {
                e.classList.remove('show');
                e.textContent = '';
            });
            formMessage.classList.remove('show');
        });
    }
}

// Initialize careers form on page load
document.addEventListener('DOMContentLoaded', () => {
    initCareersForm();
});
