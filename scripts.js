// Initialize chart when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('pageChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Home', 'About', 'Services', 'Products', 'FAQ', 'Contact'],
            datasets: [{
                label: 'estimasi konten (a.u.)',
                data: [12, 8, 14, 18, 10, 9],
                backgroundColor: ['#1f5f8f', '#256f9e', '#2e7dae', '#398cbe', '#4699cc', '#5saa9da'],
                borderRadius: 8,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { 
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1b2d3f',
                    titleColor: '#f0f7ff',
                    bodyColor: '#cfdef5',
                    callbacks: {
                        label: function(context) {
                            return `Konten: ${context.raw} unit`;
                        }
                    }
                }
            },
            scales: { 
                y: { 
                    display: false, 
                    beginAtZero: true,
                    grid: { display: false }
                }, 
                x: { 
                    display: true, 
                    ticks: { 
                        font: { size: 9, weight: '500' },
                        color: '#3b5e7a'
                    },
                    grid: { display: false }
                } 
            }
        }
    });

    // Add smooth scroll behavior for better UX (optional)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Optional: Add animation class on scroll
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

    // Observe elements for fade-in effect
    document.querySelectorAll('.stat-card, .page-tile, .feature-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
});

// Optional: Add interactive hover effects for mock buttons
document.querySelectorAll('.mock-button').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#e5f0ff';
        this.style.borderColor = '#1b5c9e';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'white';
        this.style.borderColor = '#b7d3f0';
    });
});