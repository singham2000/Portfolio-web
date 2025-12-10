// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn.querySelector('i');

// Check for saved user preference, if any, on load of the website
const currentTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Function to update icon
const updateIcon = (theme) => {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
}

// Initial Theme Setup
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateIcon(currentTheme);
} else {
    // Auto-detect system theme
    if (systemPrefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateIcon('dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        updateIcon('light');
    }
}

// Listen for toggle click
themeToggleBtn.addEventListener('click', () => {
    let targetTheme = 'light';
    if (document.documentElement.getAttribute('data-theme') === 'light') {
        targetTheme = 'dark';
    }

    document.documentElement.setAttribute('data-theme', targetTheme);
    localStorage.setItem('theme', targetTheme); // Save preference
    updateIcon(targetTheme);
});

// Listen for system theme changes (only if no manual override is set? 
// Usually manual override wins, but let's allow system change to influence if user hasn't toggled yet or we can just listen to it)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        updateIcon(newTheme);
    }
});


// Navbar Scroll Effect
const nav = document.querySelector('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        nav.classList.remove('scroll-up');
        return;
    }

    if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
        // Scroll Down
        nav.classList.remove('scroll-up');
        nav.classList.add('scroll-down');
        nav.style.transform = 'translateY(-100%)';
    } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
        // Scroll Up
        nav.classList.remove('scroll-down');
        nav.classList.add('scroll-up');
        nav.style.transform = 'translateY(0)';
        nav.style.boxShadow = '0 10px 30px -10px rgba(2,12,27,0.7)';
    }
    lastScroll = currentScroll;
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
    // Toggle Nav
    navLinks.classList.toggle('nav-active');

    // Burger Animation
    hamburger.classList.toggle('toggle');
});

// Close mobile nav when link is clicked
links.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('nav-active')) {
            navLinks.classList.remove('nav-active');
            hamburger.classList.remove('toggle');
        }
    });
});

// Experience Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();

        // Remove active class from all buttons and panels
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));

        // Add active class to clicked button
        btn.classList.add('active');

        // Show corresponding panel
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});