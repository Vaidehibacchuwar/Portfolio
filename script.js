<script src="https://cdn.emailjs.com/sdk/3.2/email.min.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
    // ----------------------
    // Theme toggle functionality
    // ----------------------
    const themeToggle = document.getElementById('theme-toggle-checkbox');
    const body = document.body;

    const currentTheme = localStorage.getItem('theme') || 'dark';
    body.classList.add(currentTheme + '-mode');
    themeToggle.checked = currentTheme === 'light';

    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        }
    });

    // ----------------------
    // Mobile menu toggle
    // ----------------------
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // ----------------------
    // Sticky header on scroll
    // ----------------------
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // ----------------------
    // Portfolio filtering
    // ----------------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // ----------------------
    // Smooth scrolling
    // ----------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ----------------------
    // Contact form submission with EmailJS
    // ----------------------
    emailjs.init("uQLoFRz5JOzs5HVwS"); // Your Public Key

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            emailjs.send("service_fjf2o2p", "template_o9hwu8b", {
                from_name: document.getElementById('name').value,
                from_email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            }).then(function(response) {
                console.log("SUCCESS!", response.status, response.text);
                alert('✅ Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            }, function(error) {
                console.log("FAILED...", error);
                alert('❌ Oops! Something went wrong. Please try again.');
            });
        });
    }

    // ----------------------
    // Animation on scroll
    // ----------------------
    function animateOnScroll() {
        const elements = document.querySelectorAll('.portfolio-item, .service-card, .about-content, .contact-content');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    document.querySelectorAll('.portfolio-item, .service-card, .about-content, .contact-content').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    function animateButtons() {
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
        buttons.forEach((button, index) => {
            button.style.opacity = '0';
            button.style.transform = 'translateY(20px)';
            setTimeout(() => {
                button.style.opacity = '1';
                button.style.transform = 'translateY(0)';
                button.style.transition = 'opacity 0.6s cubic-bezier(0.65, 0, 0.35, 1), transform 0.6s cubic-bezier(0.65, 0, 0.35, 1)';
            }, 300 + (index * 100));
        });
    }

    window.addEventListener('load', animateButtons);

    // ----------------------
    // Dynamic data science background
    // ----------------------
    function createDataScienceBackground() {
        const bgContainer = document.querySelector('.data-science-bg');
        const width = window.innerWidth;
        const height = window.innerHeight;

        for (let i = 0; i < 30; i++) {
            const point = document.createElement('div');
            point.className = 'data-point';
            point.style.width = `${Math.random() * 8 + 2}px`;
            point.style.height = point.style.width;
            point.style.left = `${Math.random() * width}px`;
            point.style.top = `${Math.random() * height}px`;
            point.style.animationDelay = `${Math.random() * 5}s`;
            point.style.animationDuration = `${Math.random() * 10 + 10}s`;
            bgContainer.appendChild(point);
        }

        for (let i = 0; i < 15; i++) {
            const line = document.createElement('div');
            line.className = 'data-line';
            line.style.left = `${Math.random() * width}px`;
            line.style.top = `${Math.random() * height}px`;
            line.style.transform = `rotate(${Math.random() * 360}deg)`;
            line.style.animationDelay = `${Math.random() * 5}s`;
            line.style.animationDuration = `${Math.random() * 15 + 10}s`;
            bgContainer.appendChild(line);
        }

        createFloatingChart('bar', width * 0.2, height * 0.3);
        createFloatingChart('line', width * 0.7, height * 0.6);
        createFloatingChart('pie', width * 0.4, height * 0.2);
    }

    function createFloatingChart(type, x, y) {
        const chart = document.createElement('div');
        chart.className = `floating-chart ${type}-chart`;
        chart.style.left = `${x}px`;
        chart.style.top = `${y}px`;
        document.querySelector('.data-science-bg').appendChild(chart);
        chart.style.animation = `float ${Math.random() * 20 + 20}s infinite linear ${Math.random() * 5}s`;
    }

    window.addEventListener('load', createDataScienceBackground);

});
</script>
