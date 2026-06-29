/* ===== Menu Toggle ===== */
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

/* ===== Scroll: Active Link + Sticky Header + Close Menu ===== */
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
let header = document.querySelector('header');

window.onscroll = () => {
    let scrollY = window.scrollY;

    // Active nav link on scroll
    sections.forEach(sec => {
        let offset = sec.offsetTop - 200;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (scrollY >= offset && scrollY < offset + height) {
            navLinks.forEach(link => link.classList.remove('active'));
            let activeLink = document.querySelector('header nav a[href*=' + id + ']');
            if (activeLink) activeLink.classList.add('active');
        }
    });

    // Sticky header
    header.classList.toggle('sticky', scrollY > 100);

    // Close mobile menu on scroll
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

/* ===== Close Menu on Nav Link Click ===== */
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});

/* ===== scroll reveal ===== */
ScrollReveal({
    reset: true,
    distance:'80px',
    duration:2000,
    delay:200
});

ScrollReveal().reveal('.home-content, .heading', { origin:'top' });
ScrollReveal().reveal('.home-img, .services-container,.portfolio-box,.contact form',{ origin:'bottom' });
ScrollReveal().reveal('.home-content h1,.about-img',{ origin:'left' });
ScrollReveal().reveal('.home-content p,.about-content',{ origin:'right' });

/* ===== typed js ===== */
const typed=new Typed('.multiple-text',{
    strings:['Frontend Developer','Video-Editor'],
    typespeed:100,
    backspeed:100,
    backDelay:1000,
    loop:true
});
