/**
 * PayoutMate Landing Page JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('mobile-open');
        });
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navLinks.classList.contains('mobile-open')) {
                    navLinks.classList.remove('mobile-open');
                    mobileMenuBtn.classList.remove('active');
                }
            }
        });
    });

    // Navbar Background on Scroll
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatableElements = document.querySelectorAll(
        '.feature-card, .problem-card, .step-card, .testimonial-card, .pricing-card, .faq-item'
    );

    animatableElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        animateOnScroll.observe(el);
    });

    // Add animate-in class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Form Submission Handler
    const ctaForm = document.querySelector('.cta-form');
    if (ctaForm) {
        ctaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;

            // Here you would typically send this to your backend
            console.log('Email submitted:', email);

            // Show success message
            const formGroup = this.querySelector('.form-group');
            formGroup.innerHTML = `
                <div style="background: var(--color-success-bg); color: var(--color-success); padding: var(--spacing-4) var(--spacing-6); border-radius: var(--radius-lg); text-align: center; width: 100%;">
                    <strong>Thanks!</strong> We'll be in touch soon.
                </div>
            `;
        });
    }

    // Add staggered animation delay to grid items
    const addStaggerDelay = (selector, baseDelay = 0.1) => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.style.transitionDelay = `${index * baseDelay}s`;
        });
    };

    addStaggerDelay('.feature-card', 0.1);
    addStaggerDelay('.testimonial-card', 0.15);
    addStaggerDelay('.pricing-card', 0.1);
});

// Mobile Navigation Styles (injected dynamically)
const mobileNavStyles = document.createElement('style');
mobileNavStyles.textContent = `
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: var(--spacing-6);
            gap: var(--spacing-4);
            box-shadow: var(--shadow-lg);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }

        .nav-links.mobile-open {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }

        .nav-links a {
            padding: var(--spacing-3) 0;
            border-bottom: 1px solid var(--color-border-light);
        }

        .nav-links .btn {
            margin-top: var(--spacing-4);
        }

        .mobile-menu-btn.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }

        .mobile-menu-btn.active span:nth-child(2) {
            opacity: 0;
        }

        .mobile-menu-btn.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;
document.head.appendChild(mobileNavStyles);
