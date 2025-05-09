// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const businessCards = document.getElementById('businessCards').children;

    searchInput.addEventListener('keyup', function() {
        const searchTerm = this.value.toLowerCase();

        for (let i = 0; i < businessCards.length; i++) {
            const card = businessCards[i];
            const name = card.getAttribute('data-name').toLowerCase();
            const location = card.getAttribute('data-location').toLowerCase();
            const businessName = card.querySelector('.business-name').textContent.toLowerCase();
            const categories = card.querySelectorAll('.category-tag');
            
            let matchFound = false;
            
            if (name.includes(searchTerm) || location.includes(searchTerm) || businessName.includes(searchTerm)) {
                matchFound = true;
            }
            
            // Search in categories
            for (let j = 0; j < categories.length; j++) {
                if (categories[j].textContent.toLowerCase().includes(searchTerm)) {
                    matchFound = true;
                    break;
                }
            }
            
            if (matchFound) {
                card.style.display = '';
                card.style.animation = 'fadeIn 0.5s ease forwards';
                card.style.animationDelay = (i * 0.1) + 's';
            } else {
                card.style.display = 'none';
            }
        }
    });

    // Sorting functionality
    const sortSelect = document.getElementById('sortSelect');

    sortSelect.addEventListener('change', function() {
        const sortType = this.value;
        const cardsArray = Array.from(businessCards);

        cardsArray.sort(function(a, b) {
            switch(sortType) {
                case 'nameAsc':
                    return a.getAttribute('data-name').localeCompare(b.getAttribute('data-name'));
                case 'nameDesc':
                    return b.getAttribute('data-name').localeCompare(a.getAttribute('data-name'));
                case 'locationAsc':
                    return a.getAttribute('data-location').localeCompare(b.getAttribute('data-location'));
                case 'wageDesc':
                    return parseFloat(b.getAttribute('data-wage')) - parseFloat(a.getAttribute('data-wage'));
                case 'wageAsc':
                    return parseFloat(a.getAttribute('data-wage')) - parseFloat(b.getAttribute('data-wage'));
                case 'ratingDesc':
                    return parseFloat(b.getAttribute('data-rating')) - parseFloat(a.getAttribute('data-rating'));
                default:
                    return 0;
            }
        });

        const fragment = document.createDocumentFragment();
        cardsArray.forEach((card, index) => {
            card.style.animation = 'none';
            setTimeout(() => {
                card.style.animation = 'fadeIn 0.5s ease forwards';
                card.style.animationDelay = (index * 0.1) + 's';
            }, 10);
            fragment.appendChild(card);
        });
        
        document.getElementById('businessCards').appendChild(fragment);
    });

    // Filter Button Functionality
    const filterButton = document.querySelector('.filter-button');
    filterButton.addEventListener('click', function() {
        // Create a modal for filters
        const filterModal = document.createElement('div');
        filterModal.className = 'modal-overlay';
        filterModal.innerHTML = `
            <div class="modal-container">
                <div class="modal-header">
                    <h2>Filter Options</h2>
                    <button id="closeFilter" class="close-btn"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <div class="filter-section">
                        <h3>Location</h3>
                        <div class="filter-options">
                            <label class="filter-option">
                                <input type="checkbox" name="location" value="Portland">
                                <span class="checkmark"></span>
                                Portland
                            </label>
                            <label class="filter-option">
                                <input type="checkbox" name="location" value="Austin">
                                <span class="checkmark"></span>
                                Austin
                            </label>
                            <label class="filter-option">
                                <input type="checkbox" name="location" value="Miami">
                                <span class="checkmark"></span>
                                Miami
                            </label>
                            <label class="filter-option">
                                <input type="checkbox" name="location" value="Chicago">
                                <span class="checkmark"></span>
                                Chicago
                            </label>
                            <label class="filter-option">
                                <input type="checkbox" name="location" value="Seattle">
                                <span class="checkmark"></span>
                                Seattle
                            </label>
                            <label class="filter-option">
                                <input type="checkbox" name="location" value="Denver">
                                <span class="checkmark"></span>
                                Denver
                            </label>
                            <label class="filter-option">
                                <input type="checkbox" name="location" value="San Diego">
                                <span class="checkmark"></span>
                                San Diego
                            </label>
                            <label class="filter-option">
                                <input type="checkbox" name="location" value="Nashville">
                                <span class="checkmark"></span>
                                Nashville
                            </label>
                        </div>
                    </div>
                    
                    <div class="filter-section">
                        <h3>Wage Range</h3>
                        <div class="range-slider">
                            <input type="range" id="wageRange" min="15" max="30" step="1" value="15">
                            <span id="wageValue">$15+</span>
                        </div>
                    </div>
                    
                    <div class="filter-section">
                        <h3>Status</h3>
                        <div class="filter-options">
                            <label class="filter-option">
                                <input type="checkbox" name="status" value="hiring">
                                <span class="checkmark"></span>
                                Hiring
                            </label>
                            <label class="filter-option">
                                <input type="checkbox" name="status" value="premium">
                                <span class="checkmark"></span>
                                Premium
                            </label>
                            <label class="filter-option">
                                <input type="checkbox" name="status" value="seasonal">
                                <span class="checkmark"></span>
                                Seasonal
                            </label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="resetFilter" class="btn btn-outline">Reset</button>
                    <button id="applyFilter" class="btn btn-primary">Apply Filters</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(filterModal);
        document.body.style.overflow = 'hidden';
        
        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                z-index: 999;
                display: flex;
                justify-content: center;
                align-items: center;
                animation: fadeIn 0.3s ease;
            }
            
            .modal-container {
                width: 90%;
                max-width: 600px;
                background-color: white;
                border-radius: var(--border-radius-xl);
                box-shadow: var(--shadow-xl);
                animation: slideInUp 0.3s ease;
                max-height: 90vh;
                display: flex;
                flex-direction: column;
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem;
                border-bottom: 1px solid var(--neutral-200);
            }
            
            .modal-header h2 {
                font-size: 1.5rem;
                font-weight: 700;
                margin: 0;
            }
            
            .close-btn {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: var(--neutral-500);
                transition: var(--transition);
            }
            
            .close-btn:hover {
                color: var(--danger);
            }
            
            .modal-body {
                padding: 1.5rem;
                overflow-y: auto;
            }
            
            .filter-section {
                margin-bottom: 2rem;
            }
            
            .filter-section h3 {
                font-size: 1.125rem;
                margin-bottom: 1rem;
                font-weight: 600;
            }
            
            .filter-options {
                display: flex;
                flex-wrap: wrap;
                gap: 0.75rem;
            }
            
            .filter-option {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.5rem 1rem;
                border: 1px solid var(--neutral-200);
                border-radius: var(--border-radius);
                cursor: pointer;
                transition: var(--transition);
                position: relative;
            }
            
            .filter-option:hover {
                border-color: var(--primary);
                background-color: var(--primary-light);
            }
            
            .filter-option input {
                position: absolute;
                opacity: 0;
                cursor: pointer;
                height: 0;
                width: 0;
            }
            
            .checkmark {
                position: relative;
                display: inline-block;
                width: 18px;
                height: 18px;
                border: 2px solid var(--neutral-400);
                border-radius: 4px;
                transition: var(--transition);
            }
            
            .filter-option:hover .checkmark {
                border-color: var(--primary);
            }
            
            .filter-option input:checked ~ .checkmark {
                background-color: var(--primary);
                border-color: var(--primary);
            }
            
            .checkmark:after {
                content: "";
                position: absolute;
                display: none;
                left: 5px;
                top: 1px;
                width: 5px;
                height: 10px;
                border: solid white;
                border-width: 0 2px 2px 0;
                transform: rotate(45deg);
            }
            
            .filter-option input:checked ~ .checkmark:after {
                display: block;
            }
            
            .range-slider {
                display: flex;
                align-items: center;
                gap: 1rem;
            }
            
            .range-slider input {
                flex: 1;
                -webkit-appearance: none;
                height: 6px;
                background: var(--neutral-300);
                border-radius: var(--border-radius-full);
                outline: none;
            }
            
            .range-slider input::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: var(--primary);
                cursor: pointer;
                transition: var(--transition);
            }
            
            .range-slider input::-webkit-slider-thumb:hover {
                transform: scale(1.2);
            }
            
            .range-slider span {
                font-weight: 600;
                min-width: 50px;
            }
            
            .modal-footer {
                display: flex;
                justify-content: flex-end;
                gap: 1rem;
                padding: 1.5rem;
                border-top: 1px solid var(--neutral-200);
            }
        `;
        document.head.appendChild(style);
        
        // Handle wage range input
        const wageRange = filterModal.querySelector('#wageRange');
        const wageValue = filterModal.querySelector('#wageValue');
        wageRange.addEventListener('input', function() {
            wageValue.textContent = '$' + this.value + '+';
        });
        
        // Close filter modal
        filterModal.querySelector('#closeFilter').addEventListener('click', function() {
            document.body.removeChild(filterModal);
            document.body.style.overflow = '';
        });
        
        // Reset filters
        filterModal.querySelector('#resetFilter').addEventListener('click', function() {
            const checkboxes = filterModal.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => checkbox.checked = false);
            wageRange.value = 15;
            wageValue.textContent = '$15+';
        });
        
        // Apply filters
        filterModal.querySelector('#applyFilter').addEventListener('click', function() {
            const selectedLocations = [];
            filterModal.querySelectorAll('input[name="location"]:checked').forEach(checkbox => {
                selectedLocations.push(checkbox.value);
            });
            
            const selectedStatuses = [];
            filterModal.querySelectorAll('input[name="status"]:checked').forEach(checkbox => {
                selectedStatuses.push(checkbox.value);
            });
            
            const minWage = parseInt(wageRange.value);
            
            // Filter cards
            for (let i = 0; i < businessCards.length; i++) {
                const card = businessCards[i];
                const location = card.getAttribute('data-location');
                const wage = parseInt(card.getAttribute('data-wage'));
                
                // Check for status badges
                const hasHiring = card.querySelector('.badge-hiring') !== null;
                const hasPremium = card.querySelector('.badge-premium') !== null;
                const hasSeasonal = card.querySelector('.badge-seasonal') !== null;
                
                let showCard = true;
                
                // Filter by location
                if (selectedLocations.length > 0 && !selectedLocations.includes(location)) {
                    showCard = false;
                }
                
                // Filter by wage
                if (wage < minWage) {
                    showCard = false;
                }
                
                // Filter by status
                if (selectedStatuses.length > 0) {
                    let statusMatch = false;
                    if (selectedStatuses.includes('hiring') && hasHiring) statusMatch = true;
                    if (selectedStatuses.includes('premium') && hasPremium) statusMatch = true;
                    if (selectedStatuses.includes('seasonal') && hasSeasonal) statusMatch = true;
                    
                    if (!statusMatch) showCard = false;
                }
                
                if (showCard) {
                    card.style.display = '';
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                    card.style.animationDelay = (i * 0.1) + 's';
                } else {
                    card.style.display = 'none';
                }
            }
            
            document.body.removeChild(filterModal);
            document.body.style.overflow = '';
        });
    });

    // Pagination Functionality
    const paginationLinks = document.querySelectorAll('.pagination a');
    paginationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            paginationLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            if (!this.classList.contains('page-nav')) {
                this.classList.add('active');
            }
            
            // Scroll to top of cards
            document.querySelector('.cards-container').scrollIntoView({ behavior: 'smooth' });
            
            // Here you would normally load new cards for the page
            // For demo purposes, just simulate loading by adding a brief animation
            const cards = document.querySelectorAll('.card');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                // Reset animation
                setTimeout(() => {
                    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                    card.style.animationDelay = (index * 0.1) + 's';
                }, 300);
            });
        });
    });

    // Contact button functionality
    const contactButtons = document.querySelectorAll('.contact-button');
    contactButtons.forEach(button => {
        // Only add event listener to buttons without specific URLs
        if (!button.getAttribute('href') || button.getAttribute('href') === '#') {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get business info
                const card = this.closest('.card');
                const businessName = card.querySelector('.business-name').textContent;
                const email = card.querySelector('.info-value a[href^="mailto:"]')?.getAttribute('href').replace('mailto:', '') || '';
                const phone = card.querySelector('.info-item:nth-of-type(4) .info-value')?.textContent.trim() || '';
                
                // Create contact modal
                const contactModal = document.createElement('div');
                contactModal.className = 'modal-overlay';
                contactModal.innerHTML = `
                    <div class="modal-container">
                        <div class="modal-header">
                            <h2>Contact ${businessName}</h2>
                            <button id="closeContact" class="close-btn"><i class="fas fa-times"></i></button>
                        </div>
                        <div class="modal-body">
                            <form id="contactForm">
                                <div class="form-group">
                                    <label for="name">Your Name</label>
                                    <input type="text" id="name" name="name" required>
                                </div>
                                <div class="form-group">
                                    <label for="email">Your Email</label>
                                    <input type="email" id="email" name="email" required>
                                </div>
                                <div class="form-group">
                                    <label for="message">Message</label>
                                    <textarea id="message" name="message" rows="4" required></textarea>
                                </div>
                                <button type="submit" class="btn btn-primary btn-block">Send Message</button>
                            </form>
                            <div class="direct-contact">
                                <h3>Or contact directly:</h3>
                                <p><i class="fas fa-envelope"></i> ${email}</p>
                                <p><i class="fas fa-phone"></i> ${phone}</p>
                            </div>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(contactModal);
                document.body.style.overflow = 'hidden';
                
                // Add modal styles
                const style = document.createElement('style');
                style.textContent = `
                    .form-group {
                        margin-bottom: 1.5rem;
                    }
                    
                    .form-group label {
                        display: block;
                        margin-bottom: 0.5rem;
                        font-weight: 600;
                    }
                    
                    .form-group input,
                    .form-group textarea {
                        width: 100%;
                        padding: 0.75rem;
                        border: 1px solid var(--neutral-300);
                        border-radius: var(--border-radius);
                        transition: var(--transition);
                    }
                    
                    .form-group input:focus,
                    .form-group textarea:focus {
                        outline: none;
                        border-color: var(--primary);
                        box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
                    }
                    
                    .btn-block {
                        display: block;
                        width: 100%;
                    }
                    
                    .direct-contact {
                        margin-top: 2rem;
                        padding-top: 1.5rem;
                        border-top: 1px solid var(--neutral-200);
                    }
                    
                    .direct-contact h3 {
                        font-size: 1rem;
                        margin-bottom: 1rem;
                        font-weight: 600;
                    }
                    
                    .direct-contact p {
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        margin-bottom: 0.5rem;
                    }
                    
                    .direct-contact i {
                        color: var(--primary);
                    }
                `;
                document.head.appendChild(style);
                
                // Close contact modal
                contactModal.querySelector('#closeContact').addEventListener('click', function() {
                    document.body.removeChild(contactModal);
                    document.body.style.overflow = '';
                });
                
                // Handle form submission
                contactModal.querySelector('#contactForm').addEventListener('submit', function(e) {
                    e.preventDefault();
                    const formName = this.querySelector('#name').value;
                    
                    // Replace form with success message
                    contactModal.querySelector('.modal-body').innerHTML = `
                        <div class="success-message">
                            <div class="success-icon">
                                <i class="fas fa-check-circle"></i>
                            </div>
                            <h3>Message Sent!</h3>
                            <p>Thank you, ${formName}! Your message has been sent to ${businessName}. They will contact you shortly.</p>
                            <button id="closeSuccess" class="btn btn-primary btn-block">Close</button>
                        </div>
                    `;
                    
                    // Add success styles
                    const successStyle = document.createElement('style');
                    successStyle.textContent = `
                        .success-message {
                            text-align: center;
                            padding: 2rem 1rem;
                        }
                        
                        .success-icon {
                            font-size: 4rem;
                            color: var(--success);
                            margin-bottom: 1.5rem;
                            animation: scaleIn 0.5s ease;
                        }
                        
                        @keyframes scaleIn {
                            0% {
                                transform: scale(0);
                            }
                            70% {
                                transform: scale(1.2);
                            }
                            100% {
                                transform: scale(1);
                            }
                        }
                        
                        .success-message h3 {
                            font-size: 1.5rem;
                            font-weight: 700;
                            margin-bottom: 1rem;
                        }
                        
                        .success-message p {
                            margin-bottom: 2rem;
                        }
                    `;
                    document.head.appendChild(successStyle);
                    
                    // Add close event listener to success button
                    contactModal.querySelector('#closeSuccess').addEventListener('click', function() {
                        document.body.removeChild(contactModal);
                        document.body.style.overflow = '';
                    });
                });
            });
        }
    });

    // Back to top button functionality
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    mobileMenuBtn.addEventListener('click', function() {
        // Create mobile menu
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu-overlay';
        mobileMenu.innerHTML = `
            <div class="mobile-menu">
                <div class="mobile-menu-header">
                    <div class="logo">
                        <i class="fas fa-building"></i>
                        <span>BizConnect</span>
                    </div>
                    <button id="closeMobileMenu" class="close-btn"><i class="fas fa-times"></i></button>
                </div>
                <div class="mobile-menu-body">
                    <nav class="mobile-nav">
                        <a href="#" class="active">Directory</a>
                        <a href="#">Businesses</a>
                        <a href="#">Jobs</a>
                        <a href="#">About</a>
                        <a href="#">Contact</a>
                    </nav>
                    <div class="mobile-buttons">
                        <button class="btn btn-outline btn-block">Sign In</button>
                        <button class="btn btn-primary btn-block">Register</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(mobileMenu);
        document.body.style.overflow = 'hidden';
        
        // Add mobile menu styles
        const style = document.createElement('style');
        style.textContent = `
            .mobile-menu-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                z-index: 1000;
                animation: fadeIn 0.3s ease;
            }
            
            .mobile-menu {
                position: fixed;
                top: 0;
                right: 0;
                width: 80%;
                max-width: 320px;
                height: 100%;
                background-color: white;
                box-shadow: var(--shadow-xl);
                animation: slideInRight 0.3s ease;
                display: flex;
                flex-direction: column;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                }
                to {
                    transform: translateX(0);
                }
            }
            
            .mobile-menu-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem;
                border-bottom: 1px solid var(--neutral-200);
            }
            
            .mobile-menu-body {
                padding: 1.5rem;
                overflow-y: auto;
                flex: 1;
            }
            
            .mobile-nav {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                margin-bottom: 2rem;
            }
            
            .mobile-nav a {
                color: var(--text-dark);
                text-decoration: none;
                font-weight: 500;
                padding: 0.75rem 0;
                border-bottom: 1px solid var(--neutral-200);
                transition: var(--transition);
            }
            
            .mobile-nav a:hover {
                color: var(--primary);
                padding-left: 0.5rem;
            }
            
            .mobile-nav a.active {
                color: var(--primary);
                font-weight: 600;
            }
            
            .mobile-buttons {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
        `;
        document.head.appendChild(style);
        
        // Close mobile menu
        mobileMenu.querySelector('#closeMobileMenu').addEventListener('click', function() {
            document.body.removeChild(mobileMenu);
            document.body.style.overflow = '';
        });
        
        // Close mobile menu when clicking outside
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                document.body.removeChild(mobileMenu);
                document.body.style.overflow = '';
            }
        });
    });

    // Add bookmark functionality
    const bookmarkButtons = document.querySelectorAll('.action-btn:first-child');
    bookmarkButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('fa-bookmark')) {
                icon.classList.remove('fa-bookmark');
                icon.classList.add('fa-bookmark');
                icon.style.color = '#4f46e5';
                
                // Show toast notification
                showToast('Business saved to bookmarks!', 'success');
            } else {
                icon.classList.remove('fa-bookmark');
                icon.classList.add('fa-bookmark');
                icon.style.color = '';
                
                // Show toast notification
                showToast('Business removed from bookmarks!', 'info');
            }
        });
    });

    // Add share functionality
    const shareButtons = document.querySelectorAll('.action-btn:last-child');
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.card');
            const businessName = card.querySelector('.business-name').textContent;
            
            // Create share modal
            const shareModal = document.createElement('div');
            shareModal.className = 'modal-overlay';
            shareModal.innerHTML = `
                <div class="modal-container" style="max-width: 400px;">
                    <div class="modal-header">
                        <h2>Share Business</h2>
                        <button id="closeShare" class="close-btn"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="modal-body">
                        <p>Share ${businessName} with your network:</p>
                        <div class="share-options">
                            <a href="#" class="share-option" data-platform="facebook">
                                <i class="fab fa-facebook-f"></i>
                                <span>Facebook</span>
                            </a>
                            <a href="#" class="share-option" data-platform="twitter">
                                <i class="fab fa-twitter"></i>
                                <span>Twitter</span>
                            </a>
                            <a href="#" class="share-option" data-platform="linkedin">
                                <i class="fab fa-linkedin-in"></i>
                                <span>LinkedIn</span>
                            </a>
                            <a href="#" class="share-option" data-platform="email">
                                <i class="fas fa-envelope"></i>
                                <span>Email</span>
                            </a>
                        </div>
                        <div class="share-link">
                            <input type="text" value="https://bizconnect.com/business/${businessName.toLowerCase().replace(/\s+/g, '-')}" readonly>
                            <button id="copyLink" class="btn btn-outline">Copy</button>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(shareModal);
            document.body.style.overflow = 'hidden';
            
            // Add share modal styles
            const style = document.createElement('style');
            style.textContent = `
                .share-options {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    margin: 1.5rem 0;
                }
                
                .share-option {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 1rem;
                    border-radius: var(--border-radius);
                    text-decoration: none;
                    color: var(--text-dark);
                    transition: var(--transition);
                    border: 1px solid var(--neutral-200);
                }
                
                .share-option:hover {
                    transform: translateY(-3px);
                    box-shadow: var(--shadow);
                }
                
                .share-option[data-platform="facebook"] {
                    background-color: #f7f9ff;
                }
                
                .share-option[data-platform="facebook"]:hover {
                    background-color: #3b5998;
                    color: white;
                }
                
                .share-option[data-platform="twitter"] {
                    background-color: #f5faff;
                }
                
                .share-option[data-platform="twitter"]:hover {
                    background-color: #1da1f2;
                    color: white;
                }
                
                .share-option[data-platform="linkedin"] {
                    background-color: #f5f9ff;
                }
                
                .share-option[data-platform="linkedin"]:hover {
                    background-color: #0077b5;
                    color: white;
                }
                
                .share-option[data-platform="email"] {
                    background-color: #f9f9f9;
                }
                
                .share-option[data-platform="email"]:hover {
                    background-color: #ea4335;
                    color: white;
                }
                
                .share-option i {
                    font-size: 1.5rem;
                }
                
                .share-link {
                    display: flex;
                    gap: 0.5rem;
                    margin-top: 1rem;
                }
                
                .share-link input {
                    flex: 1;
                    padding: 0.75rem;
                    border: 1px solid var(--neutral-300);
                    border-radius: var(--border-radius);
                    font-size: 0.875rem;
                }
            `;
            document.head.appendChild(style);
            
            // Close share modal
            shareModal.querySelector('#closeShare').addEventListener('click', function() {
                document.body.removeChild(shareModal);
                document.body.style.overflow = '';
            });
            
            // Copy link functionality
            shareModal.querySelector('#copyLink').addEventListener('click', function() {
                const linkInput = shareModal.querySelector('.share-link input');
                linkInput.select();
                document.execCommand('copy');
                
                this.textContent = 'Copied!';
                this.style.backgroundColor = 'var(--success)';
                this.style.color = 'white';
                this.style.borderColor = 'var(--success)';
                
                setTimeout(() => {
                    this.textContent = 'Copy';
                    this.style.backgroundColor = '';
                    this.style.color = '';
                    this.style.borderColor = '';
                }, 2000);
            });
            
            // Share options functionality
            shareModal.querySelectorAll('.share-option').forEach(option => {
                option.addEventListener('click', function(e) {
                    e.preventDefault();
                    const platform = this.getAttribute('data-platform');
                    const url = shareModal.querySelector('.share-link input').value;
                    const text = `Check out ${businessName} on BizConnect!`;
                    
                    let shareUrl;
                    
                    switch(platform) {
                        case 'facebook':
                            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                            break;
                        case 'twitter':
                            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
                            break;
                        case 'linkedin':
                            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                            break;
                        case 'email':
                            shareUrl = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`;
                            break;
                    }
                    
                    window.open(shareUrl, '_blank');
                });
            });
        });
    });

    // Toast notification function
    function showToast(message, type = 'info') {
        // Create toast container if it doesn't exist
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
            
            // Add toast container styles
            const style = document.createElement('style');
            style.textContent = `
                .toast-container {
                    position: fixed;
                    bottom: 2rem;
                    right: 2rem;
                    z-index: 9999;
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }
                
                .toast {
                    padding: 1rem 1.5rem;
                    border-radius: var(--border-radius);
                    background-color: white;
                    color: var(--text-dark);
                    box-shadow: var(--shadow-lg);
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s;
                    max-width: 350px;
                }
                
                .toast.success {
                    border-left: 4px solid var(--success);
                }
                
                .toast.success i {
                    color: var(--success);
                }
                
                .toast.info {
                    border-left: 4px solid var(--primary);
                }
                
                .toast.info i {
                    color: var(--primary);
                }
                
                .toast.warning {
                    border-left: 4px solid var(--warning);
                }
                
                .toast.warning i {
                    color: var(--warning);
                }
                
                .toast.error {
                    border-left: 4px solid var(--danger);
                }
                
                .toast.error i {
                    color: var(--danger);
                }
                
                @keyframes fadeOut {
                    from {
                        opacity: 1;
                    }
                    to {
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Create toast
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        let icon;
        switch(type) {
            case 'success':
                icon = 'check-circle';
                break;
            case 'info':
                icon = 'info-circle';
                break;
            case 'warning':
                icon = 'exclamation-circle';
                break;
            case 'error':
                icon = 'times-circle';
                break;
            default:
                icon = 'info-circle';
        }
        
        toast.innerHTML = `
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
        `;
        
        toastContainer.appendChild(toast);
        
        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
});