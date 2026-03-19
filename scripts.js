// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.querySelector('i').classList.toggle('fa-bars');
        navToggle.querySelector('i').classList.toggle('fa-times');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.querySelector('i').classList.add('fa-bars');
            navToggle.querySelector('i').classList.remove('fa-times');
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    window.addEventListener('scroll', function() {
        let sections = document.querySelectorAll('section');
        let scrollPosition = window.scrollY + 120;

        sections.forEach(section => {
            if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
                let id = section.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            faqItems.forEach(other => {
                if (other !== item && other.classList.contains('active')) {
                    other.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    });

    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            company: document.getElementById('company').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showFormStatus('Please complete all required fields.', 'error');
            return;
        }

        if (!isValidEmail(formData.email)) {
            showFormStatus('Please enter a valid email address.', 'error');
            return;
        }

        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            showFormStatus('Thank you! Your message has been sent. Our team will contact you shortly.', 'success');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });

    function showFormStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = 'form-status ' + type;

        setTimeout(() => {
            formStatus.textContent = '';
            formStatus.className = 'form-status';
        }, 5000);
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Quote estimator
    const estimateBtn = document.getElementById('estimateBtn');
    const quoteResult = document.getElementById('quoteResult');
    estimateBtn.addEventListener('click', function() {
        const productType = document.getElementById('productType').value;
        const materialType = document.getElementById('materialType').value;
        const quantity = Number(document.getElementById('quantity').value);
        if (quantity <= 0 || Number.isNaN(quantity)) {
            quoteResult.innerHTML = '<h3>Please enter a valid quantity.</h3>';
            return;
        }

        const basePrices = {
            standard: 0.55,
            premium: 1.1,
            custom: 1.8,
            food: 1.25
        };

        const materialMultiplier = {
            basic: 1,
            premium: 1.4,
            eco: 1.2
        };

        const base = basePrices[productType] || 0.7;
        const mult = materialMultiplier[materialType] || 1;
        const estimatedCost = quantity * base * mult;
        const formattedCost = estimatedCost.toLocaleString('en-US', {style: 'currency', currency: 'USD'});

        quoteResult.innerHTML = `<h3>Estimated Cost: ${formattedCost}</h3><p>For ${quantity} units of ${productType} units with ${materialType} material.</p><p>Request a formal quote with our team for exact production pricing and shipping.</p>`;
    });

    // Newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input').value;
            if (email && isValidEmail(email)) {
                alert('Thanks for signing up for PremiumPack updates!');
                this.reset();
            } else {
                alert('Please provide a valid email address.');
            }
        });
    }

    // Animated counters
    const stats = [
        {id: 'statClients', value: 520},
        {id: 'statExperience', value: 12},
        {id: 'statProjects', value: 1180}
    ];

    function animateStats() {
        stats.forEach(stat => {
            const element = document.getElementById(stat.id);
            if (!element) return;
            const target = stat.value;
            let current = 0;
            const step = Math.ceil(target / 80);
            const interval = setInterval(() => {
                current += step;
                if (current >= target) {
                    element.textContent = target;
                    clearInterval(interval);
                } else {
                    element.textContent = current;
                }
            }, 20);
        });
    }

    let statsAnimated = false;
    window.addEventListener('scroll', () => {
        const heroBottom = document.getElementById('home').offsetHeight;
        if (!statsAnimated && window.scrollY > heroBottom * 0.5) {
            statsAnimated = true;
            animateStats();
        }
    });

    // Live Chat Widget
    const chatButton = document.getElementById('chatButton');
    const chatBox = document.getElementById('chatBox');
    const closeChat = document.getElementById('closeChat');

    chatButton.addEventListener('click', function() {
        chatBox.classList.toggle('active');
        if (chatBox.classList.contains('active')) {
            document.querySelector('.chat-notification').style.display = 'none';
        }
    });

    closeChat.addEventListener('click', function() {
        chatBox.classList.remove('active');
    });

    document.addEventListener('click', function(e) {
        if (!chatBox.contains(e.target) && !chatButton.contains(e.target)) {
            chatBox.classList.remove('active');
        }
    });
});

// Live Chat Functions (global)
function sendQuickMessage(message) {
    const chatInput = document.getElementById('chatInput');
    chatInput.value = message;
    sendChatMessage();
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

function sendChatMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    if (!message) return;
    addChatMessage(message, 'user');
    chatInput.value = '';
    showTypingIndicator();
    setTimeout(() => {
        removeTypingIndicator();
        const botResponse = generateBotResponse(message);
        addChatMessage(botResponse, 'bot');
    }, 1200);
}

function addChatMessage(text, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.innerHTML = sender === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.textContent = text;
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(bubble);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    const chatMessages = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot typing-indicator';
    typingDiv.id = 'typingIndicator';
    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.innerHTML = '<i class="fas fa-robot"></i>';
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> PremiumPack typing...';
    typingDiv.appendChild(avatar);
    typingDiv.appendChild(bubble);
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
}

function generateBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    if (/price|cost|rate/.test(lowerMessage)) {
        return 'Our prices depend on product type, material, and volume. Would you like an instant quote from the estimator section?';
    }
    if (/moq|min(imum)?.*order/.test(lowerMessage)) {
        return 'MOQ details: Standard packaging starts at 100 units, custom at 500 units, and in-stock products can be quoted per piece.';
    }
    if (/design|support|creative/.test(lowerMessage)) {
        return 'We offer free design consultation, two design revisions, and print-ready artwork packages. Ready to start your brand concept?';
    }
    if (/shipping|delivery/.test(lowerMessage)) {
        return 'We ship nationwide via trusted couriers and provide tracking updates. Delivery timelines vary by location.';
    }
    if (/sample/.test(lowerMessage)) {
        return 'Samples are available with shipping fee. Custom sample fees are refundable when you place a full confirmed order.';
    }
    return 'Thanks for contacting PremiumPack! Please share your preferred timeline and product type. Our team will follow up with the best quote and samples.';
}
