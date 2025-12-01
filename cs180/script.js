// Tab navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-content');

    // Function to show a specific tab
    function showTab(tabId) {
        // Hide all tab contents
        tabContents.forEach(content => {
            content.classList.remove('active');
        });

        // Remove active class from all nav tabs
        navTabs.forEach(tab => {
            tab.classList.remove('active');
        });

        // Show the selected tab content
        const selectedContent = document.getElementById(tabId);
        if (selectedContent) {
            selectedContent.classList.add('active');
        }

        // Add active class to the clicked nav tab
        const activeTab = document.querySelector(`[data-tab="${tabId}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }

        // Update URL hash without scrolling
        history.replaceState(null, null, `#${tabId}`);
    }

    // Add click event listeners to nav tabs
    navTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('data-tab');
            showTab(tabId);
        });
    });

    // Handle initial page load and hash changes
    function handleInitialTab() {
        const hash = window.location.hash.slice(1);
        if (hash && document.getElementById(hash)) {
            showTab(hash);
        } else {
            // Default to project0 tab
            showTab('project0');
        }
    }

    // Handle browser back/forward buttons
    window.addEventListener('popstate', function() {
        const hash = window.location.hash.slice(1);
        if (hash && document.getElementById(hash)) {
            showTab(hash);
        }
    });

    // Initialize the page
    handleInitialTab();

    // Smooth scrolling for anchor links
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

    // Add interactive features for project sections
    const projectSections = document.querySelectorAll('.project-section');
    projectSections.forEach(section => {
        section.addEventListener('click', function() {
            // Add a subtle click effect
            this.style.transform = 'scale(1.02)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px)';
            }, 150);
        });

        // Enhanced hover effects
        section.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add loading animation for better UX
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Add entrance animation for the active tab
        const activeTab = document.querySelector('.tab-content.active');
        if (activeTab) {
            activeTab.style.opacity = '0';
            activeTab.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                activeTab.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                activeTab.style.opacity = '1';
                activeTab.style.transform = 'translateY(0)';
            }, 100);
        }
    });
});

// Enhanced interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add enhanced hover effects for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.01)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add smooth transitions for navigation with enhanced behavior
    const navigation = document.querySelector('.navigation');
    let lastScrollTop = 0;
    let isScrolling = false;
    
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            isScrolling = true;
            requestAnimationFrame(function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                if (scrollTop > lastScrollTop && scrollTop > 150) {
                    // Scrolling down - hide navigation
                    navigation.style.transform = 'translateY(-100%)';
                } else if (scrollTop < lastScrollTop || scrollTop <= 150) {
                    // Scrolling up or near top - show navigation
                    navigation.style.transform = 'translateY(0)';
                }
                
                lastScrollTop = scrollTop;
                isScrolling = false;
            });
        }
    });

    // Add CSS transition for smooth navigation hide/show
    navigation.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';

    // Add parallax effect to header elements
    const header = document.querySelector('.header');
    const title = document.querySelector('.title');
    const subtitle = document.querySelector('.subtitle');
    const institution = document.querySelector('.institution');

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (title) title.style.transform = `translateY(${rate * 0.3}px)`;
        if (subtitle) subtitle.style.transform = `translateY(${rate * 0.2}px)`;
        if (institution) institution.style.transform = `translateY(${rate * 0.1}px)`;
    });

    // Add intersection observer for smooth animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe project sections for smooth entrance
    document.querySelectorAll('.project-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(section);
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        const activeTab = document.querySelector('.nav-tab.active');
        const currentIndex = Array.from(navTabs).indexOf(activeTab);
        
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = (currentIndex + 1) % navTabs.length;
            const nextTab = navTabs[nextIndex];
            nextTab.click();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            const prevIndex = (currentIndex - 1 + navTabs.length) % navTabs.length;
            const prevTab = navTabs[prevIndex];
            prevTab.click();
        }
    });

    // Add smooth page transitions
    const tabTransitions = document.querySelectorAll('.tab-content');
    tabTransitions.forEach(tab => {
        tab.addEventListener('transitionend', function() {
            if (this.classList.contains('active')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
});
