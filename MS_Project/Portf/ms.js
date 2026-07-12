/* ===== EXECUTION ===== */

/* ----- Menu Icon Toggle (Mobile Navbar) ----- */
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

/* Close mobile navbar when a link is clicked */
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});

/* ----- Sticky Header on Scroll ----- */
let header = document.querySelector('.header');

window.onscroll = () => {
    header.classList.toggle('sticky', window.scrollY > 100);

    /* ----- Active Link Highlight based on Scroll Position ----- */
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('.navbar a');

    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => link.classList.remove('active'));
            let activeLink = document.querySelector(`.navbar a[href="#${id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });

    /* Close mobile menu on scroll */
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

/* ----- Typed.js Animated Text ----- */
if (typeof Typed !== 'undefined') {
    const typed = new Typed('.multiple-text', {
        strings: ['Frontend Developer', 'Web Designer',],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });
}

/* ----- ScrollReveal Animations ----- */
if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
        distance: '80px',
        duration: 2000,
        delay: 200,
        reset: true
    });

    sr.reveal('.home-content, .heading', { origin: 'top' });
    sr.reveal('.home-img', { delay: 400, origin: 'bottom' });
    sr.reveal('.about-img', { origin: 'left' });
    sr.reveal('.about-content', { origin: 'right' });
    sr.reveal('.services-box', { interval: 200 });
    sr.reveal('.portfolio-box', { interval: 200 });
    sr.reveal('.contact-form', { origin: 'bottom' });
    sr.reveal('.footer', { delay: 300 });
}

/* ----- Contact Form Submit (basic demo handler) ----- */
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}