// Main JavaScript for Lawnomic Landing Page

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initializeNavigation();
    initializeAuditForms();
    initializeReportTabs();
    initializeScrollAnimations();
    initializeSmoothScrolling();
});

// Navigation functionality
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
}

// Audit form functionality
function initializeAuditForms() {
    const auditButtons = document.querySelectorAll('#startAudit, #startAudit2');
    const urlInputs = document.querySelectorAll('#websiteUrl, #websiteUrl2');
    const emailInputs = document.querySelectorAll('#emailAddress, #emailAddress2');
    
    auditButtons.forEach((button, index) => {
        const urlInput = urlInputs[index];
        const emailInput = emailInputs[index];
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const url = urlInput.value.trim();
            const email = emailInput.value.trim();
            
            if (!url) {
                showNotification('Please enter a website URL', 'error');
                urlInput.focus();
                return;
            }
            
            if (!email) {
                showNotification('Please enter your email address', 'error');
                emailInput.focus();
                return;
            }
            
            if (!isValidUrl(url)) {
                showNotification('Please enter a valid website URL', 'error');
                urlInput.focus();
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                emailInput.focus();
                return;
            }
            
            startAudit(url, email, button);
        });
        
        // Allow Enter key to trigger audit
        [urlInput, emailInput].forEach(input => {
            if (input) {
                input.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        button.click();
                    }
                });
            }
        });
    });
}

// URL validation
function isValidUrl(string) {
    try {
        const url = new URL(string.startsWith('http') ? string : 'https://' + string);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
        return false;
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Start audit process
function startAudit(url, email, button) {
    const originalText = button.textContent;
    
    // Disable button and show loading
    button.disabled = true;
    button.textContent = 'Starting audit...';
    button.classList.add('loading');
    
    // Make API call to backend
    // For development, use localhost. For production, use deployed backend URL
    const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? 'http://localhost:8000' 
        : 'https://api.lawnomic.com'; // Update with actual backend URL when deployed
    
    fetch(`${API_BASE_URL}/api/audit/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            domain: url,
            email: email
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            throw new Error(data.error);
        }
        
        // Show success message
        showNotification(
            `Audit started! You'll receive results at ${email} within 5-10 minutes.`, 
            'success'
        );
        
        // Reset form
        button.disabled = false;
        button.textContent = originalText;
        button.classList.remove('loading');
        
        // Clear form inputs
        const form = button.closest('.audit-form, .audit-form-cta');
        if (form) {
            form.querySelectorAll('input').forEach(input => input.value = '');
        }
        
        // Show additional information
        showAuditConfirmation(data.scan_id, email);
        
    })
    .catch(error => {
        console.error('Audit request failed:', error);
        
        // Reset button
        button.disabled = false;
        button.textContent = originalText;
        button.classList.remove('loading');
        
        // Show error message
        showNotification(
            'Audit request failed. Please try again or contact support.', 
            'error'
        );
    });
}

// Show audit confirmation modal
function showAuditConfirmation(scanId, email) {
    const modal = document.createElement('div');
    modal.className = 'results-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>🚀 Audit Request Submitted</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="confirmation-content">
                    <div class="confirmation-icon">✅</div>
                    <h4>Your GDPR audit is now running!</h4>
                    <p>We're analyzing your website for privacy compliance issues. You'll receive a comprehensive audit report via email within 5-10 minutes.</p>
                    
                    <div class="confirmation-details">
                        <div class="detail-item">
                            <span class="detail-label">Scan ID:</span>
                            <span class="detail-value">${scanId}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Email:</span>
                            <span class="detail-value">${email}</span>
                        </div>
                    </div>
                    
                    <div class="what-next">
                        <h5>What happens next?</h5>
                        <ul>
                            <li>🔍 Our AI audits your website for GDPR compliance</li>
                            <li>📊 Generates detailed risk assessment</li>
                            <li>📧 Sends personalized recommendations to your email</li>
                            <li>🎯 Provides actionable next steps</li>
                        </ul>
                    </div>
                    
                    <div class="modal-actions">
                        <button class="btn btn-primary explore-plans">Explore Professional Plans</button>
                        <button class="btn btn-outline close-confirmation">Got it!</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add confirmation-specific styles
    if (!document.querySelector('#confirmation-styles')) {
        const styles = document.createElement('style');
        styles.id = 'confirmation-styles';
        styles.textContent = `
            .confirmation-content {
                text-align: center;
                padding: 1rem 0;
            }
            
            .confirmation-icon {
                font-size: 4rem;
                margin-bottom: 1rem;
            }
            
            .confirmation-details {
                background-color: #f8fafc;
                border-radius: 0.5rem;
                padding: 1.5rem;
                margin: 1.5rem 0;
                text-align: left;
            }
            
            .detail-item {
                display: flex;
                justify-content: space-between;
                margin-bottom: 0.5rem;
            }
            
            .detail-label {
                font-weight: 600;
                color: #64748b;
            }
            
            .detail-value {
                font-family: monospace;
                background-color: #e2e8f0;
                padding: 0.25rem 0.5rem;
                border-radius: 0.25rem;
                font-size: 0.875rem;
            }
            
            .what-next {
                text-align: left;
                margin: 1.5rem 0;
            }
            
            .what-next h5 {
                margin-bottom: 0.75rem;
                color: #0f172a;
            }
            
            .what-next ul {
                list-style: none;
                padding: 0;
            }
            
            .what-next li {
                padding: 0.5rem 0;
                color: #64748b;
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(modal);
    
    // Show modal with animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 100);
    
    // Add close functionality
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    });
    
    modal.querySelector('.close-confirmation').addEventListener('click', () => {
        modal.querySelector('.close-modal').click();
    });
    
    modal.querySelector('.explore-plans').addEventListener('click', () => {
        modal.querySelector('.close-modal').click();
        document.querySelector('#pricing').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.querySelector('.close-modal').click();
        }
    });
}

// Show audit results (demo)
function showAuditResults(url) {
    const resultsData = generateDemoResults(url);
    
    // Create results modal
    const modal = createResultsModal(resultsData);
    document.body.appendChild(modal);
    
    // Show modal with animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 100);
    
    // Add close functionality
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    });
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.querySelector('.close-modal').click();
        }
    });
}

// Generate demo results
function generateDemoResults(url) {
    const domain = new URL(url.startsWith('http') ? url : 'https://' + url).hostname;
    const complianceRate = Math.floor(Math.random() * 40) + 50; // 50-90%
    const riskLevel = complianceRate > 80 ? 'Low' : complianceRate > 60 ? 'Medium' : 'High';
    const thirdPartyCount = Math.floor(Math.random() * 15) + 3;
    
    return {
        url: url,
        domain: domain,
        complianceRate: complianceRate,
        riskLevel: riskLevel,
        thirdPartyDomains: thirdPartyCount,
        consentManager: ['Google Consent Mode', 'OneTrust', 'CookieBot', 'Termly', 'None detected'][Math.floor(Math.random() * 5)],
        findings: [
            { type: 'critical', text: 'Analytics cookies loaded without consent' },
            { type: 'warning', text: 'Privacy policy link not found' },
            { type: 'info', text: `${thirdPartyCount} third-party domains detected` },
            { type: 'warning', text: 'Cross-border data transfers identified' }
        ],
        recommendations: [
            'Implement explicit consent for analytics cookies',
            'Add clearly accessible privacy policy',
            'Review third-party data processing agreements',
            'Conduct transfer impact assessment for US services'
        ]
    };
}

// Create results modal
function createResultsModal(data) {
    const modal = document.createElement('div');
    modal.className = 'results-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Audit Results for ${data.domain}</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="results-overview">
                    <div class="result-metric">
                        <span class="metric-value ${data.riskLevel.toLowerCase()}">${data.riskLevel}</span>
                        <span class="metric-label">Risk Level</span>
                    </div>
                    <div class="result-metric">
                        <span class="metric-value">${data.complianceRate}%</span>
                        <span class="metric-label">Compliance Rate</span>
                    </div>
                    <div class="result-metric">
                        <span class="metric-value">${data.thirdPartyDomains}</span>
                        <span class="metric-label">Third-Party Domains</span>
                    </div>
                    <div class="result-metric">
                        <span class="metric-value">${data.consentManager}</span>
                        <span class="metric-label">Consent Manager</span>
                    </div>
                </div>
                
                <div class="results-section">
                    <h4>Key Findings</h4>
                    <ul class="findings-list-modal">
                        ${data.findings.map(finding => `
                            <li class="finding-item-modal ${finding.type}">
                                <span class="finding-icon-modal">${getIconForType(finding.type)}</span>
                                <span>${finding.text}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="results-section">
                    <h4>Recommendations</h4>
                    <ul class="recommendations-list-modal">
                        ${data.recommendations.map(rec => `
                            <li class="recommendation-item-modal">
                                <span class="rec-icon">💡</span>
                                <span>${rec}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="modal-actions">
                    <button class="btn btn-primary download-report">Download Full Report</button>
                    <button class="btn btn-outline get-started">Get Started</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles if not already present
    if (!document.querySelector('#modal-styles')) {
        const styles = document.createElement('style');
        styles.id = 'modal-styles';
        styles.textContent = `
            .results-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s ease;
                padding: 1rem;
            }
            
            .results-modal.show {
                opacity: 1;
            }
            
            .modal-content {
                background-color: white;
                border-radius: 1rem;
                max-width: 600px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
                transform: scale(0.95);
                transition: transform 0.3s ease;
            }
            
            .results-modal.show .modal-content {
                transform: scale(1);
            }
            
            .modal-header {
                padding: 2rem 2rem 1rem;
                border-bottom: 1px solid #e2e8f0;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .close-modal {
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                color: #64748b;
                padding: 0;
                width: 2rem;
                height: 2rem;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .modal-body {
                padding: 2rem;
            }
            
            .results-overview {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                gap: 1rem;
                margin-bottom: 2rem;
            }
            
            .result-metric {
                text-align: center;
                padding: 1rem;
                background-color: #f8fafc;
                border-radius: 0.5rem;
            }
            
            .result-metric .metric-value {
                display: block;
                font-size: 1.5rem;
                font-weight: 700;
                margin-bottom: 0.25rem;
            }
            
            .result-metric .metric-value.high { color: #dc2626; }
            .result-metric .metric-value.medium { color: #d97706; }
            .result-metric .metric-value.low { color: #059669; }
            
            .result-metric .metric-label {
                font-size: 0.875rem;
                color: #64748b;
            }
            
            .results-section {
                margin-bottom: 2rem;
            }
            
            .results-section h4 {
                margin-bottom: 1rem;
                color: #0f172a;
            }
            
            .findings-list-modal,
            .recommendations-list-modal {
                list-style: none;
                padding: 0;
            }
            
            .finding-item-modal,
            .recommendation-item-modal {
                display: flex;
                align-items: flex-start;
                gap: 0.75rem;
                padding: 0.75rem;
                margin-bottom: 0.5rem;
                border-radius: 0.5rem;
                background-color: #f8fafc;
            }
            
            .finding-item-modal.critical {
                background-color: #fef2f2;
                border-left: 4px solid #dc2626;
            }
            
            .finding-item-modal.warning {
                background-color: #fffbeb;
                border-left: 4px solid #d97706;
            }
            
            .finding-item-modal.info {
                background-color: #eff6ff;
                border-left: 4px solid #2563eb;
            }
            
            .modal-actions {
                display: flex;
                gap: 1rem;
                justify-content: center;
                padding-top: 1rem;
                border-top: 1px solid #e2e8f0;
            }
            
            @media (max-width: 768px) {
                .modal-actions {
                    flex-direction: column;
                }
                
                .results-overview {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .modal-content {
                    margin: 1rem;
                    width: calc(100% - 2rem);
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Add event listeners for modal actions
    modal.querySelector('.download-report').addEventListener('click', () => {
        showNotification('Demo report downloaded!', 'success');
    });
    
    modal.querySelector('.get-started').addEventListener('click', () => {
        modal.querySelector('.close-modal').click();
        document.querySelector('#pricing').scrollIntoView({ behavior: 'smooth' });
    });
    
    return modal;
}

// Get icon for finding type
function getIconForType(type) {
    const icons = {
        critical: '🔴',
        warning: '⚠️',
        info: 'ℹ️'
    };
    return icons[type] || 'ℹ️';
}

// Report tabs functionality
function initializeReportTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .step, .pricing-card');
    animatedElements.forEach(el => observer.observe(el));
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add notification styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 2rem;
                right: 2rem;
                padding: 1rem 1.5rem;
                border-radius: 0.5rem;
                color: white;
                font-weight: 500;
                z-index: 1001;
                transform: translateX(100%);
                transition: transform 0.3s ease;
                max-width: 300px;
            }
            
            .notification-success {
                background-color: #059669;
            }
            
            .notification-error {
                background-color: #dc2626;
            }
            
            .notification-info {
                background-color: #2563eb;
            }
            
            .notification.show {
                transform: translateX(0);
            }
            
            @media (max-width: 768px) {
                .notification {
                    right: 1rem;
                    left: 1rem;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification after 4 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Loading state for buttons
function addLoadingStyles() {
    if (!document.querySelector('#loading-styles')) {
        const styles = document.createElement('style');
        styles.id = 'loading-styles';
        styles.textContent = `
            .btn.loading {
                position: relative;
                color: transparent;
            }
            
            .btn.loading::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 1rem;
                height: 1rem;
                margin: -0.5rem 0 0 -0.5rem;
                border: 2px solid transparent;
                border-top-color: currentColor;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            
            .btn-primary.loading::after {
                border-top-color: white;
            }
            
            .btn-outline.loading::after {
                border-top-color: var(--primary-blue);
            }
            
            @keyframes spin {
                to {
                    transform: rotate(360deg);
                }
            }
        `;
        document.head.appendChild(styles);
    }
}

// Initialize loading styles on page load
addLoadingStyles();

// Handle contact form submissions (if added later)
function initializeContactForm() {
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
            contactForm.reset();
        });
    }
}

// Performance optimization: Lazy load images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
}

// Initialize lazy loading
initializeLazyLoading();

// Export functions for potential external use
window.LawnomicApp = {
    startAudit,
    showNotification,
    isValidUrl
};