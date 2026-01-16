// script.js - Matech Website Functionality

// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const backToTop = document.getElementById('backToTop');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const contactForm = document.getElementById('contactForm');
const successModal = document.getElementById('successModal');
const closeModal = document.getElementById('closeModal');
const chatBtn = document.getElementById('aiChatBtn');
const chatClose = document.getElementById('chatClose');
const chatBot = document.getElementById('aiChatbot');
const chatInput = document.getElementById('chatInput');
const sendMessage = document.getElementById('sendMessage');
const chatBody = document.getElementById('chatBody');


// Typing Animation - Business focused phrases
const typedTextSpan = document.querySelector('.typed-text');
const cursorSpan = document.querySelector('.cursor');

// Business-focused phrases
const businessPhrases = [
    'Your Business Success',
    'Digital Transformation',
    'Custom Software Solutions',
    'Mobile Apps for Growth',
    'Online Presence',
    'Tech Infrastructure',
    'Digital Marketing Strategy',
    'Cloud Solutions',
    'IT Consulting Services',
    'Training & Development'
];
const typingDelay = 80;     // Speed of typing
const erasingDelay = 40;    // Speed of erasing
const newWordDelay = 2000;  // Delay before next word
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentPhrase = businessPhrases[wordIndex];
    
    if (!isDeleting) {
        // Typing forward
        typedTextSpan.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentPhrase.length) {
            // Phrase is complete
            isDeleting = true;
            setTimeout(type, newWordDelay);
        } else {
            setTimeout(type, typingDelay);
        }
    } else {
        // Erasing backward
        typedTextSpan.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
            // Phrase is erased
            isDeleting = false;
            wordIndex = (wordIndex + 1) % businessPhrases.length;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(type, erasingDelay);
        }
    }
}

// Start the typing animation
document.addEventListener('DOMContentLoaded', () => {
    if (businessPhrases.length) {
        setTimeout(type, 1000); // Start after 1 second
    }
});



 // Handle testimonial image loading
document.addEventListener('DOMContentLoaded', function() {
    const testimonialImages = document.querySelectorAll('.author-avatar img');
    
    testimonialImages.forEach(img => {
        // Check if image loads successfully
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        img.addEventListener('error', function() {
            this.classList.add('error');
            // Show fallback
            const fallback = this.nextElementSibling;
            if (fallback && fallback.classList.contains('avatar-fallback')) {
                fallback.style.opacity = '1';
            }
        });
        
        // Trigger initial check
        if (img.complete) {
            if (img.naturalHeight === 0) {
                img.classList.add('error');
                const fallback = img.nextElementSibling;
                if (fallback && fallback.classList.contains('avatar-fallback')) {
                    fallback.style.opacity = '1';
                }
            } else {
                img.classList.add('loaded');
            }
        }
    });
});   






















// Theme Toggle
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    
    // Save theme preference to localStorage
    localStorage.setItem('theme', newTheme);
});

// Load saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
themeToggle.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';

// Back to Top Button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// Mobile Navigation
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Portfolio Filter
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Testimonials Swiper
const testimonialsSwiper = new Swiper('.testimonials-carousel', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
        }
    }
});

// Form Validation and Submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Basic form validation
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const terms = document.getElementById('terms');
    
    let isValid = true;
    
    // Reset errors
    document.querySelectorAll('.form-error').forEach(el => el.textContent = '');
    
    // Validate name
    if (!name.value.trim()) {
        document.getElementById('nameError').textContent = 'Name is required';
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        document.getElementById('emailError').textContent = 'Email is required';
        isValid = false;
    } else if (!emailRegex.test(email.value)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email';
        isValid = false;
    }
    
    // Validate message
    if (!message.value.trim()) {
        document.getElementById('messageError').textContent = 'Message is required';
        isValid = false;
    }
    
    // Validate terms
    if (!terms.checked) {
        document.getElementById('termsError').textContent = 'You must agree to the terms';
        isValid = false;
    }
    
    if (!isValid) return;
    
    // Show loading state
    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Sending...</span>';
    submitBtn.disabled = true;
    
    try {
        // Using Web3Forms for form submission
        const formData = new FormData(contactForm);
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Show success modal
            successModal.classList.add('active');
            // Reset form
            contactForm.reset();
        } else {
            alert('There was an error sending your message. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error sending your message. Please try again.');
    } finally {
        // Reset button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

// Close modal
closeModal.addEventListener('click', () => {
    successModal.classList.remove('active');
});

// AI Chatbot
chatBtn.addEventListener('click', () => {
    chatBot.classList.toggle('active');
});

chatClose.addEventListener('click', () => {
    chatBot.classList.remove('active');
});

// AI Chatbot Responses
const aiResponses = {
    greeting: "Hello! I'm Matech AI Assistant. I can help you with information about our comprehensive tech services, pricing estimates, project timelines, tech training programs, and remote support options. How can I assist you today?",
    services: "Matech offers a wide range of technology services including:<br><br>1. <strong>Software Development</strong> - Custom web apps, enterprise solutions<br>2. <strong>Mobile App Development</strong> - iOS, Android, and cross-platform apps<br>3. <strong>Digital Marketing</strong> - SEO, social media, content marketing<br>4. <strong>Cloud Solutions</strong> - AWS, Azure, Google Cloud deployment<br>5. <strong>IT Consulting</strong> - Technology strategy and planning<br>6. <strong>Tech Training</strong> - Web development bootcamps, corporate training<br>7. <strong>Remote Support</strong> - 24/7 technical support services<br><br>Which service are you interested in?",
    pricing: "Our pricing depends on the scope and complexity of your project. For custom software development, projects typically range from ₦500,000 to ₦10M+. We offer free consultations to discuss your specific needs and provide a detailed quote. Would you like to schedule a consultation?",
    timeline: "Project timelines vary based on complexity:<br><br>• <strong>Simple website</strong>: 2-4 weeks<br>• <strong>Custom web application</strong>: 4-12 weeks<br>• <strong>Mobile app</strong>: 6-16 weeks<br>• <strong>Enterprise solution</strong>: 3-6 months<br><br>We follow an agile methodology with regular updates throughout the project.",
    training: "We offer comprehensive tech training programs:<br><br>• <strong>Web Development Bootcamp</strong> (12 weeks) - ₦300,000<br>• <strong>Mobile App Development</strong> (8 weeks) - ₦250,000<br>• <strong>Digital Marketing Mastery</strong> (6 weeks) - ₦200,000<br>• <strong>Corporate Training</strong> - Customized programs<br><br>All courses include hands-on projects and career support.",
    contact: "You can contact us via:<br><br>• <strong>Email</strong>: Matechonlinetechnology@gmail.com<br>• <strong>Phone</strong>: +234 (915) 077-6545<br>• <strong>WhatsApp</strong>: +2349150776545<br>• <strong>Office</strong>: Lagos, Nigeria<br><br>We typically respond within 24 hours.",
    support: "We provide 24/7 remote support for existing clients. Support includes:<br><br>• Server monitoring and maintenance<br>• Bug fixes and updates<br>• Performance optimization<br>• Security monitoring<br>• Emergency technical assistance<br><br>Support plans start at ₦50,000/month.",
    default: "I'm not sure I understand. Could you rephrase your question? You can ask me about:<br><br>• Our services<br>• Pricing estimates<br>• Project timelines<br>• Tech training programs<br>• Contact information<br>• Support options"
};

// Process user messages
function processUserMessage(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        return aiResponses.greeting;
    } else if (lowerMessage.includes('service') || lowerMessage.includes('what do you offer')) {
        return aiResponses.services;
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
        return aiResponses.pricing;
    } else if (lowerMessage.includes('time') || lowerMessage.includes('how long') || lowerMessage.includes('duration')) {
        return aiResponses.timeline;
    } else if (lowerMessage.includes('train') || lowerMessage.includes('course') || lowerMessage.includes('learn')) {
        return aiResponses.training;
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
        return aiResponses.contact;
    } else if (lowerMessage.includes('support') || lowerMessage.includes('help') || lowerMessage.includes('maintenance')) {
        return aiResponses.support;
    } else {
        return aiResponses.default;
    }
}

// Add message to chat
function addMessageToChat(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isUser ? 'user-message' : 'ai-message'}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = message;
    
    messageDiv.appendChild(contentDiv);
    chatBody.appendChild(messageDiv);
    
    // Scroll to bottom
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Send message function
function sendChatMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Add user message
    addMessageToChat(message, true);
    
    // Clear input
    chatInput.value = '';
    
    // Simulate AI thinking delay
    setTimeout(() => {
        const aiResponse = processUserMessage(message);
        addMessageToChat(aiResponse, false);
    }, 1000);
}

// Send message on button click
sendMessage.addEventListener('click', sendChatMessage);

// Send message on Enter key
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendChatMessage();
    }
});

// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    // Add animation to elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .portfolio-item, .floating-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    document.querySelectorAll('.service-card, .portfolio-item, .floating-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    // Initial check
    animateOnScroll();
});




