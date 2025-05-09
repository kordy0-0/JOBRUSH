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
        card.style.display = 'block';
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
cardsArray.forEach(card => fragment.appendChild(card));
document.getElementById('businessCards').appendChild(fragment);
});


// Filter Button Functionality
const filterButton = document.querySelector('.filter-button');
filterButton.addEventListener('click', function() {
    // Create a modal for filters
    const filterModal = document.createElement('div');
    filterModal.style.position = 'fixed';
    filterModal.style.top = '0';
    filterModal.style.left = '0';
    filterModal.style.width = '100%';
    filterModal.style.height = '100%';
    filterModal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    filterModal.style.zIndex = '999';
    filterModal.style.display = 'flex';
    filterModal.style.justifyContent = 'center';
    filterModal.style.alignItems = 'center';
    
    // Create the filter content
    const filterContent = document.createElement('div');
    filterContent.style.width = '90%';
    filterContent.style.maxWidth = '600px';
    filterContent.style.backgroundColor = 'white';
    filterContent.style.borderRadius = '12px';
    filterContent.style.padding = '2rem';
    filterContent.style.boxShadow = 'var(--shadow-xl)';
    
    // Filter header
    filterContent.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
            <h2 style="font-size: 1.5rem; font-weight: 700; margin: 0;">Filter Options</h2>
            <button id="closeFilter" style="background: none; border: none; cursor: pointer; font-size: 1.5rem;">×</button>
        </div>
        <div style="margin-bottom: 1.5rem;">
            <h3 style="font-size: 1rem; margin-bottom: 0.75rem; font-weight: 600;">Location</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                <label style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 6px; cursor: pointer;">
                    <input type="checkbox" name="location" value="Portland"> Portland
                </label>
                <label style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 6px; cursor: pointer;">
                    <input type="checkbox" name="location" value="Austin"> Austin
                </label>
                <label style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 6px; cursor: pointer;">
                    <input type="checkbox" name="location" value="Miami"> Miami
                </label>
                <label style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 6px; cursor: pointer;">
                    <input type="checkbox" name="location" value="Chicago"> Chicago
                </label>
                <label style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 6px; cursor: pointer;">
                    <input type="checkbox" name="location" value="Seattle"> Seattle
                </label>
                <label style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 6px; cursor: pointer;">
                    <input type="checkbox" name="location" value="Denver"> Denver
                </label>
                <label style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 6px; cursor: pointer;">
                    <input type="checkbox" name="location" value="San Diego"> San Diego
                </label>
                <label style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 6px; cursor: pointer;">
                    <input type="checkbox" name="location" value="Nashville"> Nashville
                </label>
            </div>
        </div>
        <div style="margin-bottom: 1.5rem;">
            <h3 style="font-size: 1rem; margin-bottom: 0.75rem; font-weight: 600;">Wage Range</h3>
            <div style="display: flex; align-items: center; gap: 1rem;">
                <input type="range" id="wageRange" min="15" max="30" step="1" value="15" style="flex: 1;">
                <span id="wageValue">$15+</span>
            </div>
        </div>
        <div style="margin-bottom: 1.5rem;">
            <h3 style="font-size: 1rem; margin-bottom: 0.75rem; font-weight: 600;">Status</h3>
            <div style="display: flex; gap: 1rem;">
                <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                    <input type="checkbox" name="status" value="hiring"> Hiring
                </label>
                <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                    <input type="checkbox" name="status" value="premium"> Premium
                </label>
                <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                    <input type="checkbox" name="status" value="seasonal"> Seasonal
                </label>
            </div>
        </div>
        <div style="display: flex; gap: 1rem; justify-content: flex-end;">
            <button id="resetFilter" style="padding: 0.75rem 1.5rem; background: none; border: 1px solid #e2e8f0; border-radius: 6px; cursor: pointer;">Reset</button>
            <button id="applyFilter" style="padding: 0.75rem 1.5rem; background-color: var(--primary); color: white; border: none; border-radius: 6px; cursor: pointer;">Apply Filters</button>
        </div>
    `;
    
    filterModal.appendChild(filterContent);
    document.body.appendChild(filterModal);
    
    // Handle wage range input
    const wageRange = filterModal.querySelector('#wageRange');
    const wageValue = filterModal.querySelector('#wageValue');
    wageRange.addEventListener('input', function() {
        wageValue.textContent = '$' + this.value + '+';
    });
    
    // Close filter modal
    filterModal.querySelector('#closeFilter').addEventListener('click', function() {
        document.body.removeChild(filterModal);
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
            
            card.style.display = showCard ? 'block' : 'none';
        }
        
        document.body.removeChild(filterModal);
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
        if (!this.classList.contains('fa-chevron-left') && !this.classList.contains('fa-chevron-right')) {
            this.classList.add('active');
        }
        
        // Scroll to top of cards
        document.querySelector('.cards-container').scrollIntoView({ behavior: 'smooth' });
        
        // Here you would normally load new cards for the page
        // For demo purposes, just simulate loading by adding a brief animation
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            // Reset animation
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
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
            const phone = card.querySelector('.info-value:nth-of-type(4)')?.textContent.trim() || '';
            
            // Create contact modal
            const contactModal = document.createElement('div');
            contactModal.style.position = 'fixed';
            contactModal.style.top = '0';
            contactModal.style.left = '0';
            contactModal.style.width = '100%';
            contactModal.style.height = '100%';
            contactModal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            contactModal.style.zIndex = '999';
            contactModal.style.display = 'flex';
            contactModal.style.justifyContent = 'center';
            contactModal.style.alignItems = 'center';
            
            // Create modal content
            const modalContent = document.createElement('div');
            modalContent.style.width = '90%';
            modalContent.style.maxWidth = '500px';
            modalContent.style.backgroundColor = 'white';
            modalContent.style.borderRadius = '12px';
            modalContent.style.padding = '2rem';
            modalContent.style.boxShadow = 'var(--shadow-xl)';
            
            modalContent.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h2 style="font-size: 1.5rem; font-weight: 700; margin: 0;">Contact ${businessName}</h2>
                    <button id="closeContact" style="background: none; border: none; cursor: pointer; font-size: 1.5rem;">×</button>
                </div>
                <form id="contactForm" style="display: flex; flex-direction: column; gap: 1rem;">
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <label for="name" style="font-weight: 600;">Your Name</label>
                        <input type="text" id="name" name="name" required style="padding: 0.75rem; border: 1px solid #e2e8f0; border-radius: 6px;">
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <label for="email" style="font-weight: 600;">Your Email</label>
                        <input type="email" id="email" name="email" required style="padding: 0.75rem; border: 1px solid #e2e8f0; border-radius: 6px;">
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <label for="message" style="font-weight: 600;">Message</label>
                        <textarea id="message" name="message" rows="4" required style="padding: 0.75rem; border: 1px solid #e2e8f0; border-radius: 6px; resize: vertical;"></textarea>
                    </div>
                    <button type="submit" style="padding: 0.75rem 1.5rem; background-color: var(--primary); color: white; border: none; border-radius: 6px; cursor: pointer; margin-top: 0.5rem;">Send Message</button>
                </form>
                <div style="margin-top: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
                    <p style="font-weight: 600; margin: 0;">Or contact directly:</p>
                    <p style="margin: 0;"><i class="fas fa-envelope" style="margin-right: 0.5rem;"></i> ${email}</p>
                    <p style="margin: 0;"><i class="fas fa-phone" style="margin-right: 0.5rem;"></i> ${phone}</p>
                </div>
            `;
            
            contactModal.appendChild(modalContent);
            document.body.appendChild(contactModal);
            
            // Close contact modal
            contactModal.querySelector('#closeContact').addEventListener('click', function() {
                document.body.removeChild(contactModal);
            });
            
            // Handle form submission
            contactModal.querySelector('#contactForm').addEventListener('submit', function(e) {
                e.preventDefault();
                const formName = this.querySelector('#name').value;
                
                // Replace form with success message
                modalContent.innerHTML = `
                    <div style="text-align: center; padding: 2rem 1rem;">
                        <i class="fas fa-check-circle" style="font-size: 4rem; color: var(--success); margin-bottom: 1.5rem;"></i>
                        <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem;">Message Sent!</h2>
                        <p style="margin-bottom: 2rem;">Thank you, ${formName}! Your message has been sent to ${businessName}. They will contact you shortly.</p>
                        <button id="closeSuccess" style="padding: 0.75rem 1.5rem; background-color: var(--primary); color: white; border: none; border-radius: 6px; cursor: pointer;">Close</button>
                    </div>
                `;
                
                // Add close event listener to success button
                modalContent.querySelector('#closeSuccess').addEventListener('click', function() {
                    document.body.removeChild(contactModal);
                });
            });
        });
    }
});
