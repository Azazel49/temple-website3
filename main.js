/**
 * SRI DIVINE TEMPLE TRUST - Enterprise JS
 */

const TempleTrust = {
    init() {
        this.setupLanguageToggle();
        this.setupSmoothScroll();
        this.setupMobileMenu();
    },

    setupLanguageToggle() {
        const toggleBtn = document.getElementById('langToggle');
        if (!toggleBtn) return;

        // Check local storage for saved preference, default to English
        let currentLang = localStorage.getItem('templeLang') || 'en';
        this.applyLanguage(currentLang);

        toggleBtn.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'hi' : 'en';
            this.applyLanguage(currentLang);
        });
    },

    applyLanguage(lang) {
        // Update Body Class
        document.body.className = document.body.className.replace(/lang-\w+/, '');
        document.body.classList.add(`lang-${lang}`);
        
        // Save preference
        localStorage.setItem('templeLang', lang);

        // Update Toggle Button UI visually
        const btn = document.getElementById('langToggle');
        if (btn) {
            btn.querySelector('.en').classList.toggle('active', lang === 'en');
            btn.querySelector('.hi').classList.toggle('active', lang === 'hi');
        }
    },

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80, // offset for fixed navbar
                        behavior: 'smooth'
                    });
                }
            });
        });
    },
    
    setupMobileMenu() {
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');

        if (!menuToggle || !navMenu) return;

        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
};

const Forms = {
    showBookingModal(darshanType, price) {
        if(price === 0) {
            alert(`Registration form for ${darshanType} opened. (Demo)`);
        } else {
            if (window.PaymentGateway) {
                window.PaymentGateway.showPaymentModal(price, darshanType);
            } else {
                alert(`Initiating payment of ₹${price} for ${darshanType}...`);
            }
        }
    },

    handlePrasadam(event) {
        event.preventDefault();
        const name = document.getElementById('pName').value;
        const city = document.getElementById('pCity').value;
        
        const btn = event.target.querySelector('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = "Processing Payment...";
        btn.disabled = true;

        setTimeout(() => {
            alert(`✅ Payment Successful!\nThank you, ${name}. Your E-Prasadam will be shipped to ${city} via India Post within 3-5 working days.`);
            event.target.reset();
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 1500);
    }
};

// Mock Payment Gateway for Demo purposes
const PaymentGateway = {
    showPaymentModal(amount, purpose = 'Donation') {
        const lang = localStorage.getItem('templeLang') || 'en';
        const msg = lang === 'en' 
            ? `Redirecting to secure UPI Gateway for ₹${amount} (${purpose})` 
            : `₹${amount} (${purpose}) के लिए सुरक्षित UPI गेटवे पर रीडायरेक्ट कर रहा है`;
        alert(msg);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    TempleTrust.init();
});

// Expose globals
window.Forms = Forms;
window.PaymentGateway = PaymentGateway;
