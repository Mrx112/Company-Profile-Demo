// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.querySelector('i').classList.toggle('fa-bars');
        navToggle.querySelector('i').classList.toggle('fa-times');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.querySelector('i').classList.add('fa-bars');
            navToggle.querySelector('i').classList.remove('fa-times');
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', function() {
        let sections = document.querySelectorAll('section');
        let scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            if (scrollPosition >= section.offsetTop && 
                scrollPosition < section.offsetTop + section.offsetHeight) {
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
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            company: document.getElementById('company').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Validation
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showFormStatus('Mohon lengkapi semua field yang wajib diisi', 'error');
            return;
        }

        if (!isValidEmail(formData.email)) {
            showFormStatus('Format email tidak valid', 'error');
            return;
        }

        // Show loading state
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            showFormStatus('Terima kasih! Pesan Anda telah terkirim. Tim PremiumPack akan segera menghubungi Anda.', 'success');
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

    // Live Chat Widget
    const chatButton = document.getElementById('chatButton');
    const chatBox = document.getElementById('chatBox');
    const closeChat = document.getElementById('closeChat');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');

    // Toggle chat
    chatButton.addEventListener('click', function() {
        chatBox.classList.toggle('active');
        if (chatBox.classList.contains('active')) {
            // Remove notification
            document.querySelector('.chat-notification').style.display = 'none';
        }
    });

    closeChat.addEventListener('click', function() {
        chatBox.classList.remove('active');
    });

    // Click outside to close
    document.addEventListener('click', function(e) {
        if (!chatBox.contains(e.target) && !chatButton.contains(e.target)) {
            chatBox.classList.remove('active');
        }
    });

    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input').value;
            if (email && isValidEmail(email)) {
                alert('Terima kasih telah berlangganan newsletter PremiumPack!');
                this.reset();
            } else {
                alert('Mohon masukkan email yang valid');
            }
        });
    }
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
    
    // Add user message
    addChatMessage(message, 'user');
    chatInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    setTimeout(() => {
        removeTypingIndicator();
        
        // Generate bot response
        const botResponse = generateBotResponse(message);
        addChatMessage(botResponse, 'bot');
    }, 1500);
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
    bubble.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> PremiumPack sedang mengetik...';
    
    typingDiv.appendChild(avatar);
    typingDiv.appendChild(bubble);
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.remove();
    }
}

function generateBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    // Bot responses
    if (lowerMessage.includes('harga') || lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('berapa')) {
        return 'Untuk informasi harga, kami memiliki berbagai pilihan tergantung jenis kemasan, material, dan quantity. Bisa Anda sebutkan produk apa yang diminati? Saya akan bantu informasikan kisaran harganya.';
    }
    
    if (lowerMessage.includes('minimal order') || lowerMessage.includes('moq') || lowerMessage.includes('minimum')) {
        return 'Minimal Order Quantity (MOQ) bervariasi per produk:\n- Kemasan standar: mulai 100 pcs\n- Kemasan custom: mulai 500 pcs\n- Produk jadi: bisa satuan\nAda produk spesifik yang ingin Anda tanyakan?';
    }
    
    if (lowerMessage.includes('desain') || lowerMessage.includes('design') || lowerMessage.includes('bantuan')) {
        return 'Ya, kami menyediakan layanan bantuan desain kemasan! Tim desain kami akan membantu mewujudkan konsep kemasan Anda. Fitur:\n✅ Gratis konsultasi awal\n✅ 2x revisi desain\n✅ File siap cetak\n✅ Bantuan pemilihan material\nTertarik konsultasi desain?';
    }
    
    if (lowerMessage.includes('pengiriman') || lowerMessage.includes('kirim') || lowerMessage.includes('delivery')) {
        return 'Info pengiriman PremiumPack:\n📦 Seluruh Indonesia\n🚚 Kerjasama dengan JNE, TIKI, SiCepat, J&T\n⏱ Estimasi: 2-7 hari kerja\n💰 Ongkir dihitung berdasarkan berat & tujuan\n📱 Tracking number akan diberikan setelah pengiriman';
    }
    
    if (lowerMessage.includes('bahan') || lowerMessage.includes('material')) {
        return 'Material yang tersedia:\n📦 Karton Duplex (250-400 gsm)\n📦 Kraft (120-300 gsm)\n📦 Ivory (210-350 gsm)\n📦 Corrugated (single/double wall)\n🍱 Food Grade (kertas food-safe)\n🎨 Finishing: doff/glossy, laminasi, spot UV';
    }
    
    if (lowerMessage.includes('waktu') || lowerMessage.includes('lama') || lowerMessage.includes('lead time') || lowerMessage.includes('selesai')) {
        return 'Estimasi waktu produksi:\n⚡ Desain: 1-3 hari\n⚡ Produksi: 7-14 hari kerja\n⚡ Pengiriman: 2-7 hari\nTotal estimasi: 2-3 minggu tergantung kompleksitas dan quantity.';
    }
    
    if (lowerMessage.includes('sample') || lowerMessage.includes('contoh')) {
        return 'Untuk sample:\n✅ Sample produk jadi: ongkir ditanggung pemesan\n✅ Sample custom: dikenakan biaya produksi (dapat dikembalikan jika order)\n✅ Sample bisa dikirim ke alamat Anda\n✅ Tersedia sample kit untuk offline preview';
    }
    
    // Default response
    return 'Terima kasih telah menghubungi PremiumPack! Untuk informasi lebih detail, silakan tinggalkan email atau nomor telepon Anda, tim kami akan segera menghubungi. Atau Anda bisa memilih topik di atas untuk pertanyaan cepat. Ada yang bisa kami bantu lagi?';
}