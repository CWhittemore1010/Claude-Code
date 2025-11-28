/**
 * PayoutMate Landing Page
 * Editorial Luxury Fintech - JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // Mobile Navigation
    // ============================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('mobile-open');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('mobile-open');
            });
        });
    }

    // ============================================
    // Smooth Scroll for Anchor Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // Navbar Scroll Effect
    // ============================================
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.8)';
            navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.04)';
        }

        lastScroll = currentScroll;
    }, { passive: true });

    // ============================================
    // Scroll-Triggered Animations (Intersection Observer)
    // ============================================
    const animatedElements = document.querySelectorAll('[data-animate]');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay based on sibling position
                const siblings = entry.target.parentElement.querySelectorAll('[data-animate]');
                const siblingIndex = Array.from(siblings).indexOf(entry.target);

                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, siblingIndex * 100);

                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });

    // ============================================
    // Form Submission Handler
    // ============================================
    const ctaForm = document.querySelector('.cta-form');

    if (ctaForm) {
        ctaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            const formRow = this.querySelector('.form-row');

            // Simulate form submission
            console.log('Email submitted:', email);

            // Success state
            formRow.innerHTML = `
                <div style="
                    background: rgba(74, 222, 128, 0.1);
                    border: 1px solid rgba(74, 222, 128, 0.3);
                    color: #4ADE80;
                    padding: 1rem 1.5rem;
                    border-radius: 12px;
                    text-align: center;
                    width: 100%;
                    font-weight: 500;
                ">
                    Thanks! We'll be in touch soon.
                </div>
            `;
        });
    }

    // ============================================
    // FAQ Accordion Enhancement
    // ============================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        item.addEventListener('toggle', function() {
            if (this.open) {
                // Close other open items
                faqItems.forEach(otherItem => {
                    if (otherItem !== this && otherItem.open) {
                        otherItem.open = false;
                    }
                });
            }
        });
    });

    // ============================================
    // Ambient Glow Parallax Effect
    // ============================================
    const glows = document.querySelectorAll('.ambient-glow');

    window.addEventListener('scroll', function() {
        const scrollY = window.pageYOffset;

        glows.forEach((glow, index) => {
            const speed = index === 0 ? 0.1 : 0.05;
            const yPos = scrollY * speed;
            glow.style.transform = `translateY(${yPos}px)`;
        });
    }, { passive: true });

    // ============================================
    // Dashboard Preview Animation
    // ============================================
    const dashboardPreview = document.querySelector('.dashboard-preview');

    if (dashboardPreview) {
        const dashboardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate stat cards with stagger
                    const statCards = dashboardPreview.querySelectorAll('.stat-card');
                    statCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 200 + (index * 100));
                    });

                    // Animate activity feed items
                    const feedItems = dashboardPreview.querySelectorAll('.feed-item');
                    feedItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateX(0)';
                        }, 600 + (index * 80));
                    });

                    dashboardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        // Set initial states
        const statCards = dashboardPreview.querySelectorAll('.stat-card');
        statCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });

        const feedItems = dashboardPreview.querySelectorAll('.feed-item');
        feedItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        });

        dashboardObserver.observe(dashboardPreview);
    }

    // ============================================
    // Pricing Card Hover Enhancement
    // ============================================
    const pricingCards = document.querySelectorAll('.pricing-card');

    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('featured')) {
                this.style.borderColor = 'rgba(212, 165, 116, 0.3)';
            }
        });

        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.borderColor = '';
            }
        });
    });

    // ============================================
    // Metrics Counter Animation
    // ============================================
    const metrics = document.querySelectorAll('.metric-value');

    const metricsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const finalValue = el.textContent;

                // Only animate numeric values
                if (finalValue.match(/^[\$~]?\d+/)) {
                    const prefix = finalValue.match(/^[\$~]*/)[0];
                    const suffix = finalValue.match(/[%+]*$/)[0];
                    const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));

                    let currentValue = 0;
                    const duration = 1500;
                    const increment = numericValue / (duration / 16);

                    const counter = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= numericValue) {
                            el.textContent = finalValue;
                            clearInterval(counter);
                        } else {
                            el.textContent = prefix + Math.floor(currentValue) + suffix;
                        }
                    }, 16);
                }

                metricsObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    metrics.forEach(metric => {
        metricsObserver.observe(metric);
    });

    // ============================================
    // Button Ripple Effect
    // ============================================
    const buttons = document.querySelectorAll('.btn-primary');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                width: 100px;
                height: 100px;
                left: ${x - 50}px;
                top: ${y - 50}px;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation keyframes
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // ============================================
    // Lazy Load Ambient Glows (Performance)
    // ============================================
    setTimeout(() => {
        document.querySelectorAll('.ambient-glow').forEach(glow => {
            glow.style.opacity = '1';
            glow.style.transition = 'opacity 1s ease';
        });
    }, 500);
});

// ============================================
// Console Branding
// ============================================
console.log('%c PayoutMate ', 'background: linear-gradient(135deg, #E8C48D, #D4A574); color: #0A0A0F; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 8px;');
console.log('%c Enterprise-grade contractor payments for SMBs ', 'color: #A8A8A8; font-size: 12px;');
