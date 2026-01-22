// Navbar scroll effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 26, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 10, 26, 0.8)';
    }
});

// Smooth scroll for anchor links
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

// Mobile menu toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
}

// Form submission
function handleSubmit(event) {
    event.preventDefault();

    // Show success message
    const form = event.target;
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.innerHTML = '✓ Request Sent!';
    btn.style.background = 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)';

    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        form.reset();
    }, 3000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate elements on scroll
document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card, .analytics-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Animate stats numbers
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString() + (element.dataset.suffix || '');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Trigger stat animation when visible
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNum = entry.target.querySelector('.stat-number');
            if (statNum && !statNum.dataset.animated) {
                const text = statNum.textContent;
                const number = parseInt(text.replace(/[^0-9]/g, ''));
                const suffix = text.replace(/[0-9,]/g, '');
                statNum.dataset.suffix = suffix;
                statNum.dataset.animated = 'true';
                animateValue(statNum, 0, number, 2000);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.hero-stats .stat').forEach(el => {
    statObserver.observe(el);
});

// Bar chart animation
const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                const height = bar.style.height;
                bar.style.height = '0%';
                setTimeout(() => {
                    bar.style.transition = 'height 0.8s ease';
                    bar.style.height = height;
                }, index * 100);
            });
            chartObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.bar-chart').forEach(el => {
    chartObserver.observe(el);
});

// Add typing effect to hero
const heroTitle = document.querySelector('.hero-content h1');
if (heroTitle) {
    heroTitle.style.opacity = '1';
}

console.log('Wisdom Classes Marketing Site loaded successfully!');
