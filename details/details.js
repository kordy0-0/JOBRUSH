// Job data with enhanced information
const jobData = [
    {
        id: 1,
        title: "Senior Frontend Developer",
        company: "TechSolutions Inc.",
        companyLogo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=60&h=60&fit=crop&auto=format",
        location: "San Francisco, CA",
        salary: "$120,000 - $150,000",
        jobType: "Full-time",
        category: "Technology",
        experience: "5+ years",
        education: "Bachelor's Degree",
        skills: ["React", "TypeScript", "CSS", "JavaScript", "Redux"],
        benefits: ["Health Insurance", "401(k) Matching", "Remote Work", "Flexible Hours", "Professional Development"],
        description: "We are looking for a Senior Frontend Developer to join our team. You will be responsible for building user interfaces for our web applications using React and TypeScript.",
        postedDate: "2 days ago",
        applicationDeadline: "June 30, 2025",
        rating: 4.7,
        // New fields for enhanced details
        gallery: [
            { url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=200&h=150&fit=crop&auto=format", caption: "Modern office space" },
            { url: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=200&h=150&fit=crop&auto=format", caption: "Collaborative workspace" },
            { url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&h=150&fit=crop&auto=format", caption: "Development team" },
            { url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=200&h=150&fit=crop&auto=format", caption: "Product dashboard" }
        ],
        pricing: {
            baseSalary: "$110,000 - $130,000",
            bonus: "Up to $20,000 annually",
            equity: "0.1% - 0.5%",
            signingBonus: "$5,000",
            notes: "Compensation package is negotiable based on experience and qualifications. Annual performance reviews with potential for salary increases."
        }
    },
    {
        id: 2,
        title: "UX/UI Designer",
        company: "Creative Designs",
        companyLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=60&h=60&fit=crop&auto=format",
        location: "New York, NY",
        salary: "$90,000 - $110,000",
        jobType: "Full-time",
        category: "Design",
        experience: "3+ years",
        education: "Bachelor's Degree",
        skills: ["Figma", "Adobe XD", "Sketch", "User Research", "Prototyping"],
        benefits: ["Health Insurance", "Gym Membership", "Flexible Hours", "Remote Work Options"],
        description: "We are seeking a talented UX/UI Designer to create amazing user experiences. The ideal candidate should have a strong portfolio demonstrating their design skills.",
        postedDate: "1 week ago",
        applicationDeadline: "July 15, 2025",
        rating: 4.5,
        gallery: [
            { url: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=200&h=150&fit=crop&auto=format", caption: "Design studio" },
            { url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=200&h=150&fit=crop&auto=format", caption: "Creative workspace" },
            { url: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=200&h=150&fit=crop&auto=format", caption: "Design team collaboration" }
        ],
        pricing: {
            baseSalary: "$85,000 - $100,000",
            bonus: "Up to $10,000 annually",
            equity: "0.05% - 0.2%",
            signingBonus: "$3,000",
            notes: "Compensation includes additional benefits like design conference allowances and creative software subscriptions."
        }
    },
    {
        id: 3,
        title: "Data Scientist",
        company: "DataInsights",
        companyLogo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=60&h=60&fit=crop&auto=format",
        location: "Austin, TX",
        salary: "$130,000 - $160,000",
        jobType: "Full-time",
        category: "Technology",
        experience: "4+ years",
        education: "Master's Degree",
        skills: ["Python", "Machine Learning", "SQL", "Data Visualization", "Statistics"],
        benefits: ["Health Insurance", "Stock Options", "Remote Work", "Continuing Education Allowance"],
        description: "Join our data science team to analyze complex datasets and build predictive models. You will work with large datasets to extract insights and drive business decisions.",
        postedDate: "3 days ago",
        applicationDeadline: "July 5, 2025",
        rating: 4.8,
        gallery: [
            { url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=150&fit=crop&auto=format", caption: "Data visualization" },
            { url: "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=200&h=150&fit=crop&auto=format", caption: "Analytics dashboard" },
            { url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=200&h=150&fit=crop&auto=format", caption: "Data science lab" }
        ],
        pricing: {
            baseSalary: "$125,000 - $150,000",
            bonus: "Up to $30,000 annually",
            equity: "0.2% - 0.7%",
            signingBonus: "$10,000",
            notes: "Compensation includes research budget and conference attendance. Performance bonuses based on project outcomes."
        }
    }
];

// DOM Elements
const jobDetailsContainer = document.getElementById('jobDetailsContainer');
const jobNotFound = document.getElementById('jobNotFound');
const similarJobsContainer = document.getElementById('similarJobsContainer');
const applyBtn = document.getElementById('applyBtn');
const saveBtn = document.getElementById('saveBtn');
const applicationModal = document.getElementById('applicationModal');
const closeApplicationModal = document.getElementById('closeApplicationModal');
const applicationForm = document.getElementById('applicationForm');
const modalJobTitle = document.getElementById('modalJobTitle');
const jobGallery = document.getElementById('jobGallery');
const galleryModal = document.getElementById('galleryModal');
const closeGalleryModal = document.getElementById('closeGalleryModal');
const galleryModalImage = document.getElementById('galleryModalImage');
const prevImageBtn = document.getElementById('prevImage');
const nextImageBtn = document.getElementById('nextImage');
const calculateSalaryBtn = document.getElementById('calculateSalaryBtn');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

// Gallery variables
let currentGalleryImages = [];
let currentImageIndex = 0;

// Toggle mobile navigation
navToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
});

// Initialize the gallery
function initializeGallery() {
    // Get all gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Set up the current gallery images
    currentGalleryImages = Array.from(galleryItems).map(item => {
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-item-overlay').textContent;
        return {
            url: img.src,
            caption: caption
        };
    });
    
    // Add click event to each gallery item
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openGalleryModal(index));
    });
}

// Open gallery modal
function openGalleryModal(index) {
    currentImageIndex = index;
    updateGalleryModalImage();
    galleryModal.style.display = 'block';
}

// Update gallery modal image
function updateGalleryModalImage() {
    const image = currentGalleryImages[currentImageIndex];
    galleryModalImage.src = image.url;
    galleryModalImage.alt = image.caption;
}

// Navigate gallery
prevImageBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
    updateGalleryModalImage();
});

nextImageBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex + 1) % currentGalleryImages.length;
    updateGalleryModalImage();
});

// Close gallery modal
closeGalleryModal.addEventListener('click', () => {
    galleryModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target === galleryModal) {
        galleryModal.style.display = 'none' ;  
    if (event.target === galleryModal) {
        galleryModal.style.display = 'none';
    }
    if (event.target === applicationModal) {
        applicationModal.style.display = 'none';
    }
}})

// Calculate estimated salary
calculateSalaryBtn.addEventListener('click', function() {
    const experience = parseInt(document.getElementById('experience').value);
    const education = document.getElementById('education').value;
    const skills = document.getElementById('skills').value;
    
    // Parse salary range (assuming format like "$120,000 - $150,000")
    const salaryText = document.getElementById('jobSalary').textContent;
    const salaryMatch = salaryText.match(/\$([0-9,]+)\s*-\s*\$([0-9,]+)/);
    
    if (!salaryMatch) return;
    
    const minSalary = parseInt(salaryMatch[1].replace(/,/g, ''));
    const maxSalary = parseInt(salaryMatch[2].replace(/,/g, ''));
    
    // Calculate estimated salary based on factors
    let basePercentage = 0.5; // Start at middle of range
    
    // Adjust for experience
    if (experience < 3) basePercentage -= 0.1;
    else if (experience > 7) basePercentage += 0.15;
    else basePercentage += (experience - 3) * 0.025;
    
    // Adjust for education
    if (education === 'master') basePercentage += 0.05;
    else if (education === 'phd') basePercentage += 0.1;
    
    // Adjust for skills match
    if (skills === 'high') basePercentage += 0.1;
    else if (skills === 'low') basePercentage -= 0.1;
    
    // Ensure percentage is within bounds
    basePercentage = Math.min(1, Math.max(0, basePercentage));
    
    // Calculate final salary
    const salaryRange = maxSalary - minSalary;
    const estimatedSalary = Math.round(minSalary + (salaryRange * basePercentage));
    
    // Format and display result
    document.getElementById('calculatedSalary').textContent = '$' + estimatedSalary.toLocaleString();
});

// Open application modal
applyBtn.addEventListener('click', function() {
    modalJobTitle.textContent = document.getElementById('jobTitle').textContent;
    applicationModal.style.display = 'block';
});

// Close application modal
closeApplicationModal.addEventListener('click', function() {
    applicationModal.style.display = 'none';
});

// Handle file upload
const resumeInput = document.getElementById('resume');
const fileNameDisplay = document.querySelector('.file-name');

resumeInput.addEventListener('change', function() {
    if (this.files.length > 0) {
        fileNameDisplay.textContent = this.files[0].name;
    } else {
        fileNameDisplay.textContent = 'No file selected';
    }
});

// Handle form submission
applicationForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // In a real app, you would send the form data to a server
    // For this demo, we'll just show a success message
    
    applicationModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-body" style="text-align: center; padding: 40px 20px;">
                <i class="fas fa-check-circle" style="font-size: 4rem; color: #34a853; margin-bottom: 20px;"></i>
                <h2 style="margin-bottom: 20px;">Application Submitted!</h2>
                <p style="margin-bottom: 30px;">Thank you for applying to the ${modalJobTitle.textContent} position. We'll review your application and get back to you soon.</p>
                <button id="closeSuccessBtn" class="job-details-apply-btn">Close</button>
            </div>
        </div>
    `;
    
    document.getElementById('closeSuccessBtn').addEventListener('click', function() {
        applicationModal.style.display = 'none';
    });
});

// Save job functionality
saveBtn.addEventListener('click', function() {
    const isSaved = this.classList.contains('saved');
    
    if (isSaved) {
        this.innerHTML = '<i class="far fa-bookmark"></i> Save Job';
        this.classList.remove('saved');
    } else {
        this.innerHTML = '<i class="fas fa-bookmark"></i> Saved';
        this.classList.add('saved');
    }
});

// Load job data from URL parameter
function loadJobFromUrl() {
    // Get job ID from URL parameter (e.g., ?job=1)
    const urlParams = new URLSearchParams(window.location.search);
    const jobId = parseInt(urlParams.get('job')) || 1; // Default to first job if not specified
    
    // Find the job in our data
    const job = jobData.find(j => j.id === jobId);
    
    if (!job) {
        // Show job not found message
        jobDetailsContainer.style.display = 'none';
        jobNotFound.style.display = 'block';
        return;
    }
    
    // Update page title
    document.title = `${job.title} at ${job.company} - Jobrush`;
    
    // Update job details
    document.getElementById('jobTitle').textContent = job.title;
    document.getElementById('companyLogo').src = job.companyLogo;
    document.getElementById('companyName').textContent = job.company;
    document.getElementById('jobLocation').textContent = job.location;
    document.getElementById('jobType').textContent = job.jobType;
    document.getElementById('postedDate').textContent = `Posted ${job.postedDate}`;
    document.getElementById('jobDescription').textContent = job.description;
    
    // Update sidebar information
    document.getElementById('jobSalary').textContent = job.salary;
    document.getElementById('sidebarJobType').textContent = job.jobType;
    document.getElementById('jobExperience').textContent = job.experience;
    document.getElementById('jobEducation').textContent = job.education;
    document.getElementById('sidebarJobLocation').textContent = job.location;
    document.getElementById('applicationDeadline').textContent = job.applicationDeadline;
    document.getElementById('sidebarCompanyName').textContent = job.company;
    document.getElementById('companyIndustry').textContent = job.category;
    
    // Update pricing details
    document.getElementById('baseSalary').textContent = job.pricing.baseSalary;
    document.getElementById('bonusAmount').textContent = job.pricing.bonus;
    document.getElementById('equityAmount').textContent = job.pricing.equity;
    document.getElementById('signingBonus').textContent = job.pricing.signingBonus;
    document.getElementById('pricingNotes').innerHTML = `<p><strong>Note:</strong> ${job.pricing.notes}</p>`;
    
    // Update requirements list
    const requirementsList = document.getElementById('requirementsList');
    requirementsList.innerHTML = '';
    job.skills.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill;
        requirementsList.appendChild(li);
    });
    
    // Add standard requirements
    const standardReqs = [
        `${job.experience} of relevant experience`,
        `${job.education} or equivalent`,
        'Strong communication and teamwork skills',
        'Ability to work in a fast-paced environment'
    ];
    
    standardReqs.forEach(req => {
        const li = document.createElement('li');
        li.textContent = req;
        requirementsList.appendChild(li);
    });
    
    // Update benefits list
    const benefitsList = document.getElementById('benefitsList');
    benefitsList.innerHTML = '';
    job.benefits.forEach(benefit => {
        const div = document.createElement('div');
        div.className = 'job-details-benefit';
        div.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${benefit}</span>
        `;
        benefitsList.appendChild(div);
    });
    
    // Update gallery
    updateGallery(job.gallery);
    
    // Update similar jobs
    updateSimilarJobs(job);
}

// Update gallery with job images
function updateGallery(gallery) {
    const jobGallery = document.getElementById('jobGallery');
    jobGallery.innerHTML = '';
    
    gallery.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.dataset.index = index;
        galleryItem.innerHTML = `
            <img src="${image.url}" alt="${image.caption}">
            <div class="gallery-item-overlay">${image.caption}</div>
        `;
        jobGallery.appendChild(galleryItem);
    });
    
    // Re-initialize gallery after updating
    initializeGallery();
}

// Update similar jobs section
function updateSimilarJobs(currentJob) {
    // Get similar jobs (in a real app, this would use more sophisticated matching)
    const similarJobs = jobData.filter(j => j.id !== currentJob.id && j.category === currentJob.category).slice(0, 3);
    
    // If no similar jobs found, add some default ones
    if (similarJobs.length === 0) {
        similarJobs.push(...jobData.filter(j => j.id !== currentJob.id).slice(0, 3));
    }
    
    // Clear container
    similarJobsContainer.innerHTML = '';
    
    // Add similar jobs
    similarJobs.forEach(job => {
        const jobCard = document.createElement('div');
        jobCard.className = 'similar-job-card';
        jobCard.innerHTML = `
            <div class="similar-job-header">
                <h3 class="similar-job-title">
                    <a href="?job=${job.id}">${job.title}</a>
                </h3>
                <div class="similar-job-company">
                    <img src="${job.companyLogo}" alt="${job.company}" width="30" height="30">
                    <span>${job.company}</span>
                </div>
            </div>
            <div class="similar-job-body">
                <div class="similar-job-meta">
                    <div class="similar-job-meta-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${job.location}</span>
                    </div>
                    <div class="similar-job-meta-item">
                        <i class="fas fa-dollar-sign"></i>
                        <span>${job.salary}</span>
                    </div>
                </div>
                <div class="similar-job-tags">
                    ${job.skills.slice(0, 3).map(skill => `
                        <span class="similar-job-tag">${skill}</span>
                    `).join('')}
                </div>
            </div>
            <div class="similar-job-footer">
                <div class="similar-job-time">
                    <i class="far fa-clock"></i> ${job.postedDate}
                </div>
                <div class="similar-job-apply" data-id="${job.id}">Apply Now</div>
            </div>
        `;
        similarJobsContainer.appendChild(jobCard);
    });
    
    // Add event listeners to the new similar job apply buttons
    document.querySelectorAll('.similar-job-apply').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const jobId = parseInt(this.dataset.id);
            const job = jobData.find(j => j.id === jobId);
            if (job) {
                modalJobTitle.textContent = job.title;
                applicationModal.style.display = 'block';
            }
        });
    });
}

// Add keyboard navigation for gallery
document.addEventListener('keydown', function(e) {
    if (galleryModal.style.display === 'block') {
        if (e.key === 'ArrowLeft') {
            prevImageBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextImageBtn.click();
        } else if (e.key === 'Escape') {
            galleryModal.style.display = 'none';
        }
    }
});

// Set up company action buttons
document.querySelectorAll('.job-details-company-action').forEach(action => {
    action.addEventListener('click', function() {
        const actionText = this.textContent.trim();
        if (actionText.includes('View Company')) {
            alert('Navigating to company profile page...');
        } else if (actionText.includes('Share')) {
            // Create a share dialog
            if (navigator.share) {
                navigator.share({
                    title: document.title,
                    text: 'Check out this job opportunity!',
                    url: window.location.href
                }).catch(err => {
                    alert('Sharing job posting...');
                });
            } else {
                alert('Sharing job posting...');
            }
        } else if (actionText.includes('Report')) {
            alert('Report job form would open here...');
        }
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Load job data
    loadJobFromUrl();
});