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
    
    console.log(
        '%c🎮 Secret: Try the Konami code (↑↑↓↓←→←→BA) for a surprise!',
        'color: #f59e0b; font-size: 11px;'
    );
});

// Konami Code Easter Egg
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    // Keep only the last 10 keys
    if (konamiCode.length > 10) {
        konamiCode.shift();
    }
    
    // Check if sequence matches
    if (konamiCode.length === 10 && 
        konamiCode.every((key, index) => key === konamiSequence[index])) {
        triggerKonamiEasterEgg();
        konamiCode = []; // Reset
    }
});

function triggerKonamiEasterEgg() {
    // Create special modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        animation: fadeIn 0.5s ease;
    `;
    
    modal.innerHTML = `
        <div style="
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 3rem;
            border-radius: 20px;
            text-align: center;
            max-width: 500px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            animation: zoomIn 0.5s ease;
        ">
            <div style="font-size: 4rem; margin-bottom: 1rem;">🎮</div>
            <h2 style="margin-bottom: 1rem; font-size: 1.8rem;">KONAMI CODE ACTIVATED!</h2>
            <p style="margin-bottom: 1.5rem; opacity: 0.9; line-height: 1.6;">
                🎉 Congratulations, fellow gamer! You've unlocked the secret developer mode!
                <br><br>
                💰 +30 Lives<br>
                🔓 Unlimited Dark Theme Power<br>
                🚀 Enhanced Portfolio Performance<br>
                🌟 Legendary Status Achieved
            </p>
            <button id="konamiClose" style="
                background: white;
                color: #667eea;
                border: none;
                padding: 12px 24px;
                border-radius: 25px;
                font-weight: 600;
                cursor: pointer;
                transition: transform 0.2s ease;
            " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                Accept Power-Up
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add CSS animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes zoomIn { from { transform: scale(0.5); } to { transform: scale(1); } }
    `;
    document.head.appendChild(style);
    
    // Close modal
    document.getElementById('konamiClose').addEventListener('click', () => {
        modal.style.animation = 'fadeIn 0.3s ease reverse';
        setTimeout(() => modal.remove(), 300);
    });
    
    // Also allow clicking outside to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.animation = 'fadeIn 0.3s ease reverse';
            setTimeout(() => modal.remove(), 300);
        }
    });
}

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
    
    // Fun scroll easter egg - if someone scrolls way past the footer
    const footer = document.querySelector('.footer');
    const footerBottom = footer.offsetTop + footer.offsetHeight;
    const overScrollThreshold = footerBottom + 500;
    
    if (!window.overScrollShown && window.scrollY > overScrollThreshold) {
        window.overScrollShown = true;
        showSecretScrollMessage();
        
        // Reset after 10 seconds
        setTimeout(() => {
            window.overScrollShown = false;
        }, 10000);
    }
});

function showSecretScrollMessage() {
    const scrollToast = document.createElement('div');
    scrollToast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10002;
        max-width: 300px;
        animation: slideUp 0.5s ease;
    `;
    
    scrollToast.innerHTML = `
        <div style="font-size: 1.5rem; margin-bottom: 10px;">🔍</div>
        <div style="font-weight: 600; margin-bottom: 5px;">Scroll Explorer Detected!</div>
        <div style="font-size: 0.9rem; opacity: 0.9;">
            Looking for more content? You've reached the void! 
            But hey, your dedication to scrolling is impressive. 
            The dark theme approves! 🌙
        </div>
    `;
    
    const slideUpStyle = document.createElement('style');
    slideUpStyle.textContent = `
        @keyframes slideUp {
            from { transform: translateY(100px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(slideUpStyle);
    
    document.body.appendChild(scrollToast);
    
    setTimeout(() => {
        scrollToast.style.animation = 'slideUp 0.3s ease reverse';
        setTimeout(() => scrollToast.remove(), 300);
    }, 4000);
}

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
        showStatus('Whoa there! 🛑 Looks like you forgot to fill in some fields. Even dark theme disciples need complete information!', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showStatus('🤔 That email address looks as suspicious as someone who prefers light theme... Please enter a valid one!', 'error');
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
    const funnyLoadingMessages = [
        "🚀 Sending message through the dark theme dimension...",
        "⚡ Compiling your message with quantum algorithms...",
        "🌙 Consulting the dark mode gods for message delivery...",
        "🔮 Using advanced Morgan Stanley delivery protocols...",
        "💫 Encrypting message with IIT Madras-level security...",
        "🎯 Deploying message with ultra-low latency (<5ms)..."
    ];
    
    if (isLoading) {
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.disabled = true;
        
        // Show random funny loading message
        const randomMessage = funnyLoadingMessages[Math.floor(Math.random() * funnyLoadingMessages.length)];
        btnLoading.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${randomMessage}`;
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

// Preloader with rotating jokes
document.addEventListener('DOMContentLoaded', () => {
    const developerJokes = [
        "Initializing dark theme supremacy...",
        "Compiling years of coffee consumption...",
        "Loading IIT Madras engineering protocols...",
        "Optimizing for maximum awesomeness...",
        "Deploying Morgan Stanley level sophistication...",
        "Calibrating humor detection algorithms...",
        "Syncing with the dark side of the force...",
        "Establishing connection to the matrix..."
    ];
    
    // Create a more sophisticated preloader
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
        color: white;
    `;
    
    const spinner = document.createElement('div');
    spinner.style.cssText = `
        width: 60px;
        height: 60px;
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-top: 4px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 20px;
    `;
    
    const jokeText = document.createElement('div');
    jokeText.style.cssText = `
        font-size: 1.1rem;
        font-weight: 500;
        text-align: center;
        max-width: 400px;
        line-height: 1.4;
    `;
    
    let jokeIndex = 0;
    jokeText.textContent = developerJokes[jokeIndex];
    
    // Rotate jokes every 800ms
    const jokeInterval = setInterval(() => {
        jokeIndex = (jokeIndex + 1) % developerJokes.length;
        jokeText.style.opacity = '0';
        setTimeout(() => {
            jokeText.textContent = developerJokes[jokeIndex];
            jokeText.style.opacity = '1';
        }, 200);
    }, 800);
    
    jokeText.style.transition = 'opacity 0.3s ease';
    
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
    preloader.appendChild(jokeText);
    document.body.appendChild(preloader);
    
    // Remove preloader after page loads with a minimum display time
    const removePreloader = () => {
        clearInterval(jokeInterval);
        preloader.style.opacity = '0';
        setTimeout(() => {
            if (preloader.parentNode) {
                preloader.parentNode.removeChild(preloader);
            }
        }, 500);
    };
    
    // Minimum 2 second display time for people to enjoy the jokes
    setTimeout(removePreloader, 2000);
});

// Add humorous stat tooltips and other funny interactions
document.addEventListener('DOMContentLoaded', () => {
    // Funny stat tooltips
    const stats = document.querySelectorAll('.stat');
    const funnyTooltips = [
        "2+ years of turning coffee into code ☕️",
        "99.08% - Almost perfect, just like my dark theme preference 😎", 
        "8.95 CGPA - Proof that I can handle academic pressure AND theme controversies 🎓"
    ];
    
    stats.forEach((stat, index) => {
        if (funnyTooltips[index]) {
            stat.style.cursor = 'pointer';
            stat.title = funnyTooltips[index];
            
            stat.addEventListener('mouseenter', () => {
                stat.style.transform = 'translateY(-5px) scale(1.02)';
                stat.style.transition = 'transform 0.3s ease';
            });
            
            stat.addEventListener('mouseleave', () => {
                stat.style.transform = 'translateY(-5px)';
            });
        }
    });
    
    // Funny project card interactions
    const projectCards = document.querySelectorAll('.project-card');
    const projectJokes = [
        "Click me if you dare to see financial wizardry! 🧙‍♂️",
        "Warning: May cause excessive appreciation for low-latency systems ⚡",
        "Side effects include: Increased respect for collateral management 💼",
        "This project runs on pure determination and dark theme energy 🌙",
        "Computer vision so good, it solved your problems before you knew you had them 👁️",
        "Excel/VBA powered - Yes, I made Excel do things it wasn't meant to do 📊"
    ];
    
    projectCards.forEach((card, index) => {
        if (projectJokes[index]) {
            card.title = projectJokes[index];
        }
    });
    
    // Add a secret double-click easter egg to the logo
    const logo = document.querySelector('.nav-logo a');
    let logoClickCount = 0;
    
    logo.addEventListener('dblclick', () => {
        logoClickCount++;
        
        if (logoClickCount === 1) {
            showSecretMessage("🤔 Hmm, someone's curious about the logo...");
        } else if (logoClickCount === 3) {
            showSecretMessage("🎯 You're persistent! I like that in a developer.");
        } else if (logoClickCount >= 5) {
            showSecretMessage("🏆 Achievement Unlocked: Logo Master! You've discovered the secret of the persistent clicker.");
            logoClickCount = 0; // Reset
        }
    });
    
    function showSecretMessage(message) {
        const secretToast = document.createElement('div');
        secretToast.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 10001;
            font-weight: 500;
            text-align: center;
            animation: popIn 0.5s ease;
        `;
        
        secretToast.textContent = message;
        document.body.appendChild(secretToast);
        
        const popInStyle = document.createElement('style');
        popInStyle.textContent = `
            @keyframes popIn {
                0% { transform: translate(-50%, -50%) scale(0); }
                80% { transform: translate(-50%, -50%) scale(1.1); }
                100% { transform: translate(-50%, -50%) scale(1); }
            }
        `;
        document.head.appendChild(popInStyle);
        
        setTimeout(() => {
            secretToast.style.animation = 'popIn 0.3s ease reverse';
            setTimeout(() => secretToast.remove(), 300);
        }, 2500);
    }
    
    // Add time-based humor to hero section
    addTimeBasedGreeting();
});

function addTimeBasedGreeting() {
    const hour = new Date().getHours();
    let greeting = "";
    let emoji = "";
    
    if (hour >= 0 && hour < 6) {
        greeting = "Still awake? True dedication to dark theme supremacy! 🌙";
        emoji = "🦉";
    } else if (hour >= 6 && hour < 12) {
        greeting = "Good morning! Start your day right - with dark theme! ☀️";
        emoji = "🌅";
    } else if (hour >= 12 && hour < 17) {
        greeting = "Good afternoon! Perfect time to appreciate some dark mode elegance! 🌤️";
        emoji = "☀️";
    } else if (hour >= 17 && hour < 21) {
        greeting = "Good evening! The perfect time for dark theme appreciation! 🌆";
        emoji = "🌆";
    } else {
        greeting = "Good night! You're here late - just like a true developer! 🌙";
        emoji = "🌃";
    }
    
    // Add a subtle greeting that appears after 3 seconds
    setTimeout(() => {
        const heroDescription = document.querySelector('.hero-description');
        if (heroDescription) {
            const greetingElement = document.createElement('div');
            greetingElement.style.cssText = `
                margin-top: 15px;
                padding: 10px 15px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 20px;
                font-size: 0.9rem;
                opacity: 0;
                transition: opacity 1s ease;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
            `;
            greetingElement.innerHTML = `${emoji} ${greeting}`;
            heroDescription.appendChild(greetingElement);
            
            setTimeout(() => {
                greetingElement.style.opacity = '1';
            }, 100);
        }
    }, 3000);
}

// Snake Game Implementation
class SnakeGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.gridSize = 20;
        this.tileCount = this.canvas.width / this.gridSize;
        
        this.snake = [
            { x: 10, y: 10 }
        ];
        this.food = {};
        this.dx = 0;
        this.dy = 0;
        this.score = 0;
        this.gameRunning = false;
        this.gamePaused = false;
        
        // Game statistics
        this.gamesPlayed = parseInt(localStorage.getItem('snakeGamesPlayed') || '0');
        this.foodEaten = parseInt(localStorage.getItem('snakeFoodEaten') || '0');
        this.highScore = parseInt(localStorage.getItem('snakeHighScore') || '0');
        this.timePlayed = parseInt(localStorage.getItem('snakeTimePlayed') || '0');
        this.gameStartTime = 0;
        this.sessionTime = 0;
        this.foodCountForMessages = 0; // Track food eaten for message timing
        
        this.initializeElements();
        this.updateDisplay();
        this.generateFood();
        this.bindEvents();
        this.draw();
    }
    
    initializeElements() {
        this.scoreElement = document.getElementById('score');
        this.highScoreElement = document.getElementById('highScore');
        this.gamesPlayedElement = document.getElementById('gamesPlayed');
        this.foodEatenElement = document.getElementById('foodEaten');
        this.timePlayedElement = document.getElementById('timePlayed');
        this.finalScoreElement = document.getElementById('finalScore');
        this.gameOverScreen = document.getElementById('gameOverScreen');
        
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.restartBtn = document.getElementById('restartBtn');
    }
    
    bindEvents() {
        this.startBtn.addEventListener('click', () => this.startGame());
        this.pauseBtn.addEventListener('click', () => this.togglePause());
        this.resetBtn.addEventListener('click', () => this.resetGame());
        this.restartBtn.addEventListener('click', () => this.restartGame());
        
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        // Update time played every second when game is running
        setInterval(() => {
            if (this.gameRunning && !this.gamePaused) {
                this.sessionTime++;
                this.updateTimeDisplay();
            }
        }, 1000);
    }
    
    handleKeyPress(e) {
        if (!this.gameRunning || this.gamePaused) return;
        
        const { key } = e;
        
        // Prevent moving in opposite direction
        if ((key === 'ArrowLeft' || key === 'a' || key === 'A') && this.dx !== 1) {
            this.dx = -1;
            this.dy = 0;
        } else if ((key === 'ArrowUp' || key === 'w' || key === 'W') && this.dy !== 1) {
            this.dx = 0;
            this.dy = -1;
        } else if ((key === 'ArrowRight' || key === 'd' || key === 'D') && this.dx !== -1) {
            this.dx = 1;
            this.dy = 0;
        } else if ((key === 'ArrowDown' || key === 's' || key === 'S') && this.dy !== -1) {
            this.dx = 0;
            this.dy = 1;
        }
        
        // Prevent scrolling
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
            e.preventDefault();
        }
    }
    
    startGame() {
        if (this.gameRunning) return;
        
        this.gameRunning = true;
        this.gamePaused = false;
        this.gameStartTime = Date.now();
        this.sessionTime = 0;
        this.dx = 1;
        this.dy = 0;
        
        this.startBtn.disabled = true;
        this.pauseBtn.disabled = false;
        this.gameOverScreen.style.display = 'none';
        
        this.gameLoop = setInterval(() => {
            if (!this.gamePaused) {
                this.update();
                this.draw();
            }
        }, 150);
        
        // Add humorous start message
        this.showToast("Game started! Time to show those financial algorithms who's boss! 🐍", "success");
    }
    
    togglePause() {
        if (!this.gameRunning) return;
        
        this.gamePaused = !this.gamePaused;
        this.pauseBtn.textContent = this.gamePaused ? 'Resume' : 'Pause';
        
        if (this.gamePaused) {
            this.showToast("Paused! Even snakes need coffee breaks ☕", "info");
        } else {
            this.showToast("Resumed! Back to the grind! 🚀", "success");
        }
    }
    
    resetGame() {
        this.gameRunning = false;
        this.gamePaused = false;
        clearInterval(this.gameLoop);
        
        this.snake = [{ x: 10, y: 10 }];
        this.dx = 0;
        this.dy = 0;
        this.score = 0;
        this.sessionTime = 0;
        this.foodCountForMessages = 0; // Reset message counter
        
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        this.pauseBtn.textContent = 'Pause';
        this.gameOverScreen.style.display = 'none';
        
        this.generateFood();
        this.updateDisplay();
        this.draw();
        
        this.showToast("Game reset! Ready for another round? 🔄", "info");
    }
    
    restartGame() {
        this.resetGame();
        setTimeout(() => this.startGame(), 100);
    }
    
    update() {
        const head = { x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy };
        
        // Wrap around borders instead of game over
        if (head.x < 0) {
            head.x = this.tileCount - 1;
        } else if (head.x >= this.tileCount) {
            head.x = 0;
        }
        
        if (head.y < 0) {
            head.y = this.tileCount - 1;
        } else if (head.y >= this.tileCount) {
            head.y = 0;
        }
        
        // Check self collision
        for (let segment of this.snake) {
            if (head.x === segment.x && head.y === segment.y) {
                this.gameOver();
                return;
            }
        }
        
        this.snake.unshift(head);
        
        // Check food collision
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            this.foodEaten++;
            this.foodCountForMessages++;
            this.generateFood();
            this.updateDisplay();
            
            // Show eat messages only every 5th food consumed
            if (this.foodCountForMessages % 5 === 0) {
                const eatMessages = [
                    "Nom nom! That's some premium algorithmic apple! 🍎",
                    "Delicious! Tastes like successful trades! 💰",
                    "Growing stronger, just like my portfolio! 📈",
                    "Snake.exe is running optimally! 🐍💻",
                    "Fifth course achieved! Fine dining at its best! 🍽️",
                    "Milestone munching! Every 5th bite counts! 🎯"
                ];
                this.showToast(eatMessages[Math.floor(Math.random() * eatMessages.length)], "success");
            }
        } else {
            this.snake.pop();
        }
    }
    
    generateFood() {
        this.food = {
            x: Math.floor(Math.random() * this.tileCount),
            y: Math.floor(Math.random() * this.tileCount)
        };
        
        // Make sure food doesn't spawn on snake
        for (let segment of this.snake) {
            if (segment.x === this.food.x && segment.y === this.food.y) {
                this.generateFood();
                return;
            }
        }
    }
    
    draw() {
        // Clear canvas with theme-appropriate background
        const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
        this.ctx.fillStyle = isDarkTheme ? '#1a1a1a' : '#ffffff';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw snake
        this.ctx.fillStyle = '#667eea';
        for (let segment of this.snake) {
            this.ctx.fillRect(segment.x * this.gridSize, segment.y * this.gridSize, this.gridSize - 2, this.gridSize - 2);
        }
        
        // Draw snake head with different color
        if (this.snake.length > 0) {
            this.ctx.fillStyle = '#764ba2';
            const head = this.snake[0];
            this.ctx.fillRect(head.x * this.gridSize, head.y * this.gridSize, this.gridSize - 2, this.gridSize - 2);
        }
        
        // Draw food
        this.ctx.fillStyle = '#ff6b6b';
        this.ctx.fillRect(this.food.x * this.gridSize, this.food.y * this.gridSize, this.gridSize - 2, this.gridSize - 2);
        
        // Add grid lines for better visibility
        this.ctx.strokeStyle = isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
        this.ctx.lineWidth = 0.5;
        for (let i = 0; i <= this.tileCount; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(i * this.gridSize, 0);
            this.ctx.lineTo(i * this.gridSize, this.canvas.height);
            this.ctx.stroke();
            
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * this.gridSize);
            this.ctx.lineTo(this.canvas.width, i * this.gridSize);
            this.ctx.stroke();
        }
    }
    
    gameOver() {
        this.gameRunning = false;
        this.gamePaused = false;
        clearInterval(this.gameLoop);
        
        this.gamesPlayed++;
        this.timePlayed += this.sessionTime;
        
        if (this.score > this.highScore) {
            this.highScore = this.score;
            this.showToast("NEW HIGH SCORE! You're basically a gaming god now! 👑", "success");
        }
        
        this.saveStats();
        this.updateDisplay();
        
        this.finalScoreElement.textContent = this.score;
        this.gameOverScreen.style.display = 'block';
        
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        this.pauseBtn.textContent = 'Pause';
        
        // Funny game over messages
        const gameOverMessages = [
            "Game Over! Even the best algorithms crash sometimes! 💥",
            "Oops! Looks like your snake hit a NullPointerException! 🐛",
            "Game Over! Time to debug your snake's pathfinding algorithm! 🔍",
            "Crashed harder than the stock market in 2008! 📉"
        ];
        this.showToast(gameOverMessages[Math.floor(Math.random() * gameOverMessages.length)], "error");
    }
    
    updateDisplay() {
        this.scoreElement.textContent = this.score;
        this.highScoreElement.textContent = this.highScore;
        this.gamesPlayedElement.textContent = this.gamesPlayed;
        this.foodEatenElement.textContent = this.foodEaten;
        this.updateTimeDisplay();
    }
    
    updateTimeDisplay() {
        const totalTime = this.timePlayed + this.sessionTime;
        const minutes = Math.floor(totalTime / 60);
        const seconds = totalTime % 60;
        this.timePlayedElement.textContent = `${minutes}m ${seconds}s`;
    }
    
    saveStats() {
        localStorage.setItem('snakeGamesPlayed', this.gamesPlayed.toString());
        localStorage.setItem('snakeFoodEaten', this.foodEaten.toString());
        localStorage.setItem('snakeHighScore', this.highScore.toString());
        localStorage.setItem('snakeTimePlayed', this.timePlayed.toString());
    }
    
    showToast(message, type) {
        // Create a general toast system for the game
        const toast = document.createElement('div');
        toast.className = `game-toast game-toast-${type}`;
        toast.innerHTML = `
            <div class="game-toast-content">
                <span class="game-toast-icon">
                    ${type === 'success' ? '✅' : type === 'error' ? '❌' : type === 'info' ? 'ℹ️' : '🎮'}
                </span>
                <span class="game-toast-message">${message}</span>
            </div>
        `;
        
        // Add styles dynamically if not already added
        if (!document.querySelector('#game-toast-styles')) {
            const style = document.createElement('style');
            style.id = 'game-toast-styles';
            style.textContent = `
                .game-toast {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    background: rgba(0, 0, 0, 0.9);
                    color: white;
                    padding: 15px 20px;
                    border-radius: 10px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                    z-index: 10000;
                    transform: translateX(400px);
                    transition: all 0.3s ease;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    max-width: 350px;
                }
                
                .game-toast.show {
                    transform: translateX(0);
                }
                
                .game-toast-success {
                    border-left: 4px solid #4CAF50;
                }
                
                .game-toast-error {
                    border-left: 4px solid #F44336;
                }
                
                .game-toast-info {
                    border-left: 4px solid #2196F3;
                }
                
                .game-toast-content {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                
                .game-toast-icon {
                    font-size: 1.2rem;
                }
                
                .game-toast-message {
                    font-size: 0.9rem;
                    line-height: 1.4;
                }
                
                @media (max-width: 768px) {
                    .game-toast {
                        right: 10px;
                        left: 10px;
                        max-width: none;
                        transform: translateY(-100px);
                    }
                    
                    .game-toast.show {
                        transform: translateY(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(toast);
        
        // Trigger animation
        setTimeout(() => toast.classList.add('show'), 100);
        
        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize Snake Game when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on a page with the game canvas
    if (document.getElementById('gameCanvas')) {
        window.snakeGame = new SnakeGame();
    }
});

// Email Copy to Clipboard Functionality
document.addEventListener('DOMContentLoaded', function() {
    const heroEmailCopyBtn = document.getElementById('hero-email-copy');
    const contactEmailCopyBtn = document.getElementById('contact-email-copy');
    const emailAddress = 'aneeshak2001@gmail.com';
    
    // Function to handle email copy for any button
    async function handleEmailCopy(button) {
        try {
            // Modern clipboard API
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(emailAddress);
                showEmailCopyNotification('Email copied to clipboard! 📧', 'success');
            } else {
                // Fallback method for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = emailAddress;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                
                if (document.execCommand('copy')) {
                    showEmailCopyNotification('Email copied to clipboard! 📧', 'success');
                } else {
                    showEmailCopyNotification('Failed to copy email. Please copy manually: ' + emailAddress, 'error');
                }
                
                document.body.removeChild(textArea);
            }
            
            // Add visual feedback - temporarily change icon
            const icon = button.querySelector('i');
            const originalClass = icon.className;
            icon.className = 'fas fa-check';
            
            setTimeout(() => {
                icon.className = originalClass;
            }, 1000);
            
        } catch (err) {
            console.error('Failed to copy email: ', err);
            showEmailCopyNotification('Failed to copy email. Please copy manually: ' + emailAddress, 'error');
        }
    }
    
    // Add event listeners to both buttons
    if (heroEmailCopyBtn) {
        heroEmailCopyBtn.addEventListener('click', () => handleEmailCopy(heroEmailCopyBtn));
    }
    
    if (contactEmailCopyBtn) {
        contactEmailCopyBtn.addEventListener('click', () => handleEmailCopy(contactEmailCopyBtn));
    }
});

function showEmailCopyNotification(message, type) {
    // Create notification toast
    const toast = document.createElement('div');
    toast.className = `email-copy-toast email-copy-toast-${type}`;
    toast.innerHTML = `
        <div class="email-copy-toast-content">
            <span class="email-copy-toast-icon">
                ${type === 'success' ? '✅' : '❌'}
            </span>
            <span class="email-copy-toast-message">${message}</span>
        </div>
    `;
    
    // Add styles dynamically if not already added
    if (!document.querySelector('#email-copy-toast-styles')) {
        const style = document.createElement('style');
        style.id = 'email-copy-toast-styles';
        style.textContent = `
            .email-copy-toast {
                position: fixed;
                top: 100px;
                right: 20px;
                background: rgba(0, 0, 0, 0.9);
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                z-index: 10000;
                transform: translateX(400px);
                transition: all 0.3s ease;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                max-width: 350px;
            }
            
            .email-copy-toast.show {
                transform: translateX(0);
            }
            
            .email-copy-toast-success {
                border-left: 4px solid #4CAF50;
            }
            
            .email-copy-toast-error {
                border-left: 4px solid #F44336;
            }
            
            .email-copy-toast-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .email-copy-toast-icon {
                font-size: 1.2rem;
            }
            
            .email-copy-toast-message {
                font-size: 0.9rem;
                line-height: 1.4;
            }
            
            @media (max-width: 768px) {
                .email-copy-toast {
                    right: 10px;
                    left: 10px;
                    max-width: none;
                    transform: translateY(-100px);
                }
                
                .email-copy-toast.show {
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}
