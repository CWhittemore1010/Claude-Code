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

    // Dashboard Tab Navigation
    initDashboardTabs();
});

/**
 * Initialize Dashboard Tab Navigation
 */
function initDashboardTabs() {
    const sidebarItems = document.querySelectorAll('.sidebar-item[data-tab]');
    const panels = document.querySelectorAll('.dashboard-panel[data-panel]');

    if (sidebarItems.length === 0 || panels.length === 0) return;

    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all sidebar items
            sidebarItems.forEach(si => si.classList.remove('active'));

            // Add active class to clicked item
            this.classList.add('active');

            // Hide all panels
            panels.forEach(panel => {
                panel.classList.remove('active');
            });

            // Show target panel
            const targetPanel = document.querySelector(`.dashboard-panel[data-panel="${targetTab}"]`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    // Filter Tabs for Contractors Panel
    initFilterTabs();

    // Payment Approve/Reject Buttons
    initPaymentActions();
}

/**
 * Initialize Filter Tabs (All/Active/Pending)
 */
function initFilterTabs() {
    const filterTabs = document.querySelectorAll('.filter-tab');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all filter tabs
            filterTabs.forEach(ft => ft.classList.remove('active'));

            // Add active class to clicked tab
            this.classList.add('active');

            // Here you would filter the contractor list based on the selected tab
            // For demo purposes, we're just toggling the active state
        });
    });
}

/**
 * Initialize Payment Action Buttons (Approve/Reject)
 */
function initPaymentActions() {
    const approveButtons = document.querySelectorAll('.approve-btn');
    const rejectButtons = document.querySelectorAll('.reject-btn');

    approveButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const paymentRow = this.closest('.payment-row');
            if (paymentRow) {
                // Animate the approval
                paymentRow.style.transition = 'all 0.3s ease';
                paymentRow.style.backgroundColor = '#ECFDF5';
                paymentRow.style.borderColor = '#10B981';

                // Replace buttons with status badge
                const actionsDiv = paymentRow.querySelector('.payment-actions');
                if (actionsDiv) {
                    actionsDiv.innerHTML = '<span class="payment-status-badge success">Approved</span>';
                }

                // Optionally remove after animation
                setTimeout(() => {
                    paymentRow.style.opacity = '0';
                    paymentRow.style.transform = 'translateX(20px)';
                    setTimeout(() => {
                        paymentRow.remove();
                        updatePendingCount();
                    }, 300);
                }, 1000);
            }
        });
    });

    rejectButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const paymentRow = this.closest('.payment-row');
            if (paymentRow) {
                // Animate the rejection
                paymentRow.style.transition = 'all 0.3s ease';
                paymentRow.style.backgroundColor = '#FEF2F2';
                paymentRow.style.borderColor = '#EF4444';

                // Remove after animation
                setTimeout(() => {
                    paymentRow.style.opacity = '0';
                    paymentRow.style.transform = 'translateX(-20px)';
                    setTimeout(() => {
                        paymentRow.remove();
                        updatePendingCount();
                    }, 300);
                }, 500);
            }
        });
    });
}

/**
 * Update pending payment count after action
 */
function updatePendingCount() {
    const pendingPayments = document.querySelectorAll('.pending-payment');
    const pendingValue = document.querySelector('.summary-card .pending-icon')?.closest('.summary-card')?.querySelector('.summary-value');

    if (pendingPayments.length === 0) {
        // All payments processed
        const pendingSection = document.querySelector('.payments-section .section-subheader span');
        if (pendingSection && pendingSection.textContent === 'Pending Approval') {
            const section = pendingSection.closest('.payments-section');
            if (section) {
                section.innerHTML = `
                    <div style="text-align: center; padding: 24px; color: var(--color-text-light);">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" stroke-width="2" style="margin-bottom: 12px;">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                            <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                        <p style="font-weight: 500; color: var(--color-secondary); margin-bottom: 4px;">All caught up!</p>
                        <p style="font-size: 12px;">No payments pending approval.</p>
                    </div>
                `;
            }
        }
    }

    // Recalculate pending total
    let total = 0;
    pendingPayments.forEach(row => {
        const amountText = row.querySelector('.payment-amount')?.textContent;
        if (amountText) {
            const amount = parseFloat(amountText.replace(/[$,]/g, ''));
            if (!isNaN(amount)) {
                total += amount;
            }
        }
    });

    if (pendingValue) {
        pendingValue.textContent = '$' + total.toLocaleString();
    }
}

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
