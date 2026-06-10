document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggle Logic ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    // Function to set theme
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (theme === 'light') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }

    // Determine initial theme:
    // 1. Check localStorage
    // 2. Fallback to OS preference
    // 3. Fallback to dark
    const savedTheme = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    if (savedTheme) {
        setTheme(savedTheme);
    } else if (prefersLight) {
        setTheme('light');
    } else {
        setTheme('dark'); // Default to dark if no preference
    }

    // Toggle button click listener
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    // Listen for OS theme changes
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'light' : 'dark');
        }
    });

    // --- Scroll Reveal Animation ---
    const reveals = document.querySelectorAll('.reveal');

    function reveal() {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', reveal);
    reveal(); // Trigger once on load

    // --- Smooth Scrolling for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Close mobile navbar if open
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Update active nav link on scroll ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const navbarHeight = document.querySelector('.navbar').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 50;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});
