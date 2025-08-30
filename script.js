// Theme Toggle Functionality
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Variables for easter eggs
    let toggleCount = 0;
    let lastToggleTime = 0;
    
    // Humorous messages for theme switching
    const darkThemeMessages = [
        {
            message: "Welcome to the enlightened side! 🌙",
            submessage: "You have chosen... wisely. The dark theme cult welcomes you."
        },
        {
            message: "Excellent choice, fellow dark mode disciple! ✨",
            submessage: "Your eyes and your soul thank you for this divine decision."
        },
        {
            message: "You've seen the light... by choosing darkness! 🖤",
            submessage: "Join us in the superior realm of dark theme supremacy."
        },
        {
            message: "Ah, a person of culture and refined taste! 🎭",
            submessage: "Welcome to the exclusive dark mode elite society."
        },
        {
            message: "The force is strong with this one... 🔮",
            submessage: "You understand the true power of the dark side."
        }
    ];
    
    const lightThemeMessages = [
        {
            message: "Nooo! You're abandoning the dark side! 😱",
            submessage: "The dark theme cult is... disappointed. We thought you were one of us."
        },
        {
            message: "Why must you torture your retinas so? 🔥",
            submessage: "The dark mode gods weep at this betrayal of perfection."
        },
        {
            message: "We don't understand this life choice... 💔",
            submessage: "But we respect your right to be wrong. Come back to us!"
        },
        {
            message: "You've chosen the path of ocular destruction! ⚡",
            submessage: "The dark theme enlightenment awaits your inevitable return."
        },
        {
            message: "Such a tragic fall from grace... 😢",
            submessage: "Remember us when your eyes cry from the brightness."
        },
        {
            message: "This is not the way... 🚫",
            submessage: "But the dark theme will always be here when you realize your mistake."
        }
    ];
    
    const rapidToggleMessages = [
        {
            message: "Whoa there, theme toggle warrior! 🎮",
            submessage: "Are you testing my reflexes or having an existential crisis?"
        },
        {
            message: "Make up your mind already! 🤯",
            submessage: "The themes are getting dizzy from all this switching!"
        },
        {
            message: "I see you enjoy chaos... 🌪️",
            submessage: "But even chaos needs to choose a side eventually."
        },
        {
            message: "Having trouble deciding? 🤔",
            submessage: "Pro tip: Dark theme is always the right answer."
        }
    ];
    
    const mobileEasterEggMessages = [
        {
            message: "Mobile theme warrior detected! 📱",
            submessage: "Your dedication to theme toggling on mobile is... impressive and concerning."
        }
    ];
    
    // Function to show humorous toast
    function showThemeToast(isDarkTheme, isRapidToggle = false, isMobileEasterEgg = false) {
        // Remove any existing toast
        const existingToast = document.querySelector('.theme-toast');
        if (existingToast) {
            existingToast.remove();
        }
        
        let randomMessage;
        let toastClass;
        let icon;
        
        if (isMobileEasterEgg) {
            randomMessage = mobileEasterEggMessages[0];
            toastClass = 'mobile-easter-egg';
            icon = '📱';
        } else if (isRapidToggle) {
            randomMessage = rapidToggleMessages[Math.floor(Math.random() * rapidToggleMessages.length)];
            toastClass = 'rapid-toggle';
            icon = '🎭';
        } else {
            const messages = isDarkTheme ? darkThemeMessages : lightThemeMessages;
            randomMessage = messages[Math.floor(Math.random() * messages.length)];
            toastClass = isDarkTheme ? 'dark-theme' : 'light-theme';
            icon = isDarkTheme ? '🌙' : '☀️';
        }
        
        const toast = document.createElement('div');
        toast.className = `theme-toast ${toastClass}`;
        
        toast.innerHTML = `
            <div class="theme-toast-icon">${icon}</div>
            <div class="theme-toast-content">
                <div class="theme-toast-message">${randomMessage.message}</div>
                <div class="theme-toast-submessage">${randomMessage.submessage}</div>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        // Trigger animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        // Remove toast after delay
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 400);
        }, 4000);
    }
    
    // Toggle theme function
    function toggleTheme() {
        const currentTime = Date.now();
        const timeSinceLastToggle = currentTime - lastToggleTime;
        
        // Check for rapid toggling (within 3 seconds)
        if (timeSinceLastToggle < 3000) {
            toggleCount++;
        } else {
            toggleCount = 1;
        }
        
        lastToggleTime = currentTime;
        
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Show appropriate message
        if (toggleCount >= 5) {
            showThemeToast(newTheme === 'dark', true);
            toggleCount = 0; // Reset after showing rapid toggle message
        } else {
            showThemeToast(newTheme === 'dark');
        }
        
        // Update navbar background for scroll effect
        updateNavbarBackground();
    }
    
    // Add click event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
        
        // Add touch event for mobile easter egg
        let touchCount = 0;
        themeToggle.addEventListener('touchstart', () => {
            touchCount++;
            if (touchCount >= 10) {
                showThemeToast(false, false, true); // Special mobile message
                touchCount = 0;
            }
        });
    }
}

// Update navbar background based on theme
function updateNavbarBackground() {
    const navbar = document.querySelector('.navbar');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (window.scrollY > 50) {
        if (currentTheme === 'dark') {
            navbar.style.background = 'rgba(26, 26, 26, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        }
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        if (currentTheme === 'dark') {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
        navbar.style.boxShadow = 'none';
    }
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', initializeTheme);

// Easter egg for developers
document.addEventListener('DOMContentLoaded', () => {
    const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
    
    console.log(
        `%c🌙 Welcome to the ${isDarkTheme ? 'ENLIGHTENED' : 'misguided'} side! 🌙`,
        `color: ${isDarkTheme ? '#68d391' : '#dc3545'}; font-size: 16px; font-weight: bold;`
    );
    
    if (isDarkTheme) {
        console.log(
            '%cYou are clearly a person of superior taste and intellect. The Dark Theme Cult™ welcomes you! 🖤',
            'color: #a5b4fc; font-size: 12px; font-style: italic;'
        );
    } else {
        console.log(
            '%cYour choice in themes is... questionable. But we believe in redemption. Try the dark side! 😈',
            'color: #f87171; font-size: 12px; font-style: italic;'
        );
    }
    
    console.log(
        '%c💡 Pro tip: Click the theme toggle to join the dark side (or betray it).',
        'color: #667eea; font-size: 11px;'
    );
});

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
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

// Navbar background on scroll
window.addEventListener('scroll', updateNavbarBackground);

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Contact form handling
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const btnText = submitBtn.querySelector('.btn-text');
const btnLoading = submitBtn.querySelector('.btn-loading');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        showStatus('Please fill in all fields.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showStatus('Please enter a valid email address.', 'error');
        return;
    }
    
    // Show loading state
    showLoading(true);
    
    try {
        // Create mailto link as fallback
        const mailtoBody = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
        const mailtoLink = `mailto:aneeshak2001@gmail.com?subject=${encodeURIComponent(subject)}&body=${mailtoBody}`;
        
        // Try to send via Web3Forms (free service) first
        const web3FormsResponse = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                access_key: "0c8a2865-28c4-4a95-8105-2f6173f41826", // This needs to be replaced with actual key
                name: name,
                email: email,
                subject: subject,
                message: message,
                from_name: name,
                to_email: "aneeshak2001@gmail.com"
            })
        });
        
        if (web3FormsResponse.ok) {
            const result = await web3FormsResponse.json();
            if (result.success) {
                showStatus('Thank you for your message! I\'ll get back to you soon.', 'success');
                contactForm.reset();
            } else {
                throw new Error('Web3Forms submission failed');
            }
        } else {
            throw new Error('Web3Forms service unavailable');
        }
    } catch (error) {
        console.log('Primary service failed, opening email client...', error);
        
        // Fallback: Open default email client
        const mailtoBody = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
        const mailtoLink = `mailto:aneeshak2001@gmail.com?subject=${encodeURIComponent(subject)}&body=${mailtoBody}`;
        
        window.location.href = mailtoLink;
        
        showStatus('Opening your email client... If it doesn\'t open automatically, please email me directly at aneeshak2001@gmail.com', 'success');
        contactForm.reset();
    } finally {
        showLoading(false);
    }
});

function showLoading(isLoading) {
    if (isLoading) {
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.disabled = true;
    } else {
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
    }
}

function showStatus(message, type) {
    formStatus.innerHTML = message;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';
    
    // Hide status after 7 seconds
    setTimeout(() => {
        formStatus.style.display = 'none';
    }, 7000);
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.project-card, .skill-category, .stat, .timeline-item, .about-text p, .achievement-card'
    );
    animateElements.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.25s cubic-bezier(.4,2,.6,1), transform 0.25s cubic-bezier(.4,2,.6,1)';
        el.style.transitionDelay = '0s';
        observer.observe(el);
    });
});

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect on page load
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        // Uncomment the line below to enable typing effect
        // typeWriter(heroTitle, originalText, 80);
    }
});


// Skills animation counter
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const isDecimal = target % 1 !== 0;
    const increment = target / (duration / 50);
    const suffix = element.dataset.suffix || '';

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = isDecimal ? target.toFixed(2) + suffix : target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = isDecimal ? start.toFixed(2) + suffix : Math.floor(start) + suffix;
        }
    }, 50);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('h3');
            // Extract suffix if present (e.g., '+', '%')
            const match = statNumber.textContent.match(/([\d.]+)(\D*)/);
            let targetValue = 0;
            let suffix = '';
            if (match) {
                targetValue = parseFloat(match[1]);
                suffix = match[2] || '';
            }
            statNumber.dataset.suffix = suffix;
            animateCounter(statNumber, targetValue);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const stats = document.querySelectorAll('.stat');
    stats.forEach(stat => statsObserver.observe(stat));
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    // Remove preloader immediately on load
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.remove();
        }, 300);
    }
});

// Preloader (optional)
document.addEventListener('DOMContentLoaded', () => {
    // Create a simple preloader if needed
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    const spinner = document.createElement('div');
    spinner.style.cssText = `
        width: 50px;
        height: 50px;
        border: 3px solid #f3f3f3;
        border-top: 3px solid #667eea;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;
    
    // Add CSS for spinner animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    preloader.appendChild(spinner);
    document.body.appendChild(preloader);
    
    // Remove preloader after page loads
    // (Preloader removal now handled above for instant load)
});
