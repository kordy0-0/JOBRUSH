// Job data
const jobData = [
    {
        id: 1,
        title: "Senior Frontend Developer",
        company: "TechSolutions Inc.",
        companyLogo: "images/placeholder.svg",
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
        rating: 4.7
    },
    {
        id: 2,
        title: "UX/UI Designer",
        company: "Creative Designs",
        companyLogo: "images/placeholder.svg",
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
        rating: 4.5
    },
    {
        id: 3,
        title: "Data Scientist",
        company: "DataInsights",
        companyLogo: "images/placeholder.svg",
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
        rating: 4.8
    },
    {
        id: 4,
        title: "Marketing Manager",
        company: "GrowthMarketing",
        companyLogo: "images/placeholder.svg",
        location: "Chicago, IL",
        salary: "$85,000 - $105,000",
        jobType: "Full-time",
        category: "Marketing",
        experience: "5+ years",
        education: "Bachelor's Degree",
        skills: ["Digital Marketing", "SEO", "Content Strategy", "Social Media", "Analytics"],
        benefits: ["Health Insurance", "401(k)", "Paid Time Off", "Professional Development"],
        description: "We're looking for a Marketing Manager to lead our marketing efforts. You will be responsible for developing and implementing marketing strategies to increase brand awareness.",
        postedDate: "1 week ago",
        applicationDeadline: "July 20, 2025",
        rating: 4.2
    },
    {
        id: 5,
        title: "Backend Developer",
        company: "TechSolutions Inc.",
        companyLogo: "images/placeholder.svg",
        location: "San Francisco, CA",
        salary: "$110,000 - $140,000",
        jobType: "Full-time",
        category: "Technology",
        experience: "4+ years",
        education: "Bachelor's Degree",
        skills: ["Node.js", "Express", "MongoDB", "AWS", "Docker"],
        benefits: ["Health Insurance", "401(k) Matching", "Remote Work", "Flexible Hours"],
        description: "We are seeking a Backend Developer to build and maintain our server-side applications. You will work closely with frontend developers to create seamless user experiences.",
        postedDate: "5 days ago",
        applicationDeadline: "July 10, 2025",
        rating: 4.7
    },
    {
        id: 6,
        title: "Product Manager",
        company: "InnovateTech",
        companyLogo: "images/placeholder.svg",
        location: "Seattle, WA",
        salary: "$120,000 - $150,000",
        jobType: "Full-time",
        category: "Product",
        experience: "5+ years",
        education: "Bachelor's Degree",
        skills: ["Product Development", "Agile", "User Stories", "Market Research", "Roadmapping"],
        benefits: ["Health Insurance", "Stock Options", "Flexible Hours", "Remote Work Options"],
        description: "We're looking for a Product Manager to lead our product development efforts. You will work with cross-functional teams to define product vision and strategy.",
        postedDate: "2 weeks ago",
        applicationDeadline: "July 25, 2025",
        rating: 4.6
    }
];

// DOM Elements
const toggleFeaturesBtn = document.getElementById('toggleFeaturesBtn');
const addJobBtn = document.getElementById('addJobBtn');
const emptyAddJobBtn = document.getElementById('emptyAddJobBtn');
const jobSelectionModal = document.getElementById('jobSelectionModal');
const closeModal = document.querySelector('.close-modal');
const selectJobBtns = document.querySelectorAll('.select-job-btn');
const removeJobBtns = document.querySelectorAll('.remove-job-btn');
const comparisonTableContainer = document.getElementById('comparisonTableContainer');
const emptyComparisonMessage = document.getElementById('emptyComparisonMessage');

// Track selected jobs
let selectedJobs = [1, 2, 3]; // Default selected jobs

// Toggle features visibility
toggleFeaturesBtn.addEventListener('click', function() {
    const hiddenFeatures = document.querySelectorAll('.hidden-feature');
    const isShowingAll = toggleFeaturesBtn.textContent.includes('Show All');
    
    hiddenFeatures.forEach(feature => {
        feature.style.display = isShowingAll ? 'table-row' : 'none';
    });
    
    toggleFeaturesBtn.textContent = isShowingAll ? 'Show Less Features' : 'Show All Features';
});

// Open job selection modal
addJobBtn.addEventListener('click', openJobSelectionModal);
emptyAddJobBtn?.addEventListener('click', openJobSelectionModal);

function openJobSelectionModal() {
    // Update available jobs in modal (exclude already selected jobs)
    const jobSelectionList = document.querySelector('.job-selection-list');
    jobSelectionList.innerHTML = '';
    
    const availableJobs = jobData.filter(job => !selectedJobs.includes(job.id));
    
    if (availableJobs.length === 0) {
        jobSelectionList.innerHTML = '<p style="text-align: center; padding: 20px;">All jobs are already in comparison.</p>';
    } else {
        availableJobs.forEach(job => {
            const jobItem = document.createElement('div');
            jobItem.className = 'job-selection-item';
            jobItem.dataset.id = job.id;
            
            jobItem.innerHTML = `
                <div class="job-selection-info">
                    <h3>${job.title}</h3>
                    <p>${job.company} - ${job.location}</p>
                    <p class="job-selection-salary">${job.salary}</p>
                </div>
                <button class="btn select-job-btn">Add</button>
            `;
            
            jobSelectionList.appendChild(jobItem);
        });
        
        // Add event listeners to new buttons
        document.querySelectorAll('.select-job-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const jobId = parseInt(this.closest('.job-selection-item').dataset.id);
                addJobToComparison(jobId);
                closeJobSelectionModal();
            });
        });
    }
    
    jobSelectionModal.style.display = 'block';
}

// Close job selection modal
closeModal.addEventListener('click', closeJobSelectionModal);
window.addEventListener('click', function(event) {
    if (event.target === jobSelectionModal) {
        closeJobSelectionModal();
    }
});

function closeJobSelectionModal() {
    jobSelectionModal.style.display = 'none';
}

// Add job to comparison
function addJobToComparison(jobId) {
    if (!selectedJobs.includes(jobId)) {
        selectedJobs.push(jobId);
        updateComparisonTable();
    }
}

// Remove job from comparison
document.addEventListener('click', function(event) {
    if (event.target.closest('.remove-job-btn')) {
        const jobId = parseInt(event.target.closest('.remove-job-btn').dataset.id);
        removeJobFromComparison(jobId);
    }
});

function removeJobFromComparison(jobId) {
    selectedJobs = selectedJobs.filter(id => id !== jobId);
    updateComparisonTable();
}

// Update comparison table
function updateComparisonTable() {
    if (selectedJobs.length === 0) {
        comparisonTableContainer.style.display = 'none';
        emptyComparisonMessage.style.display = 'block';
        return;
    }
    
    comparisonTableContainer.style.display = 'block';
    emptyComparisonMessage.style.display = 'none';
    
    const compareJobs = jobData.filter(job => selectedJobs.includes(job.id));
    
    // Create table HTML
    let tableHTML = `
        <table class="comparison-table">
            <thead>
                <tr>
                    <th>Features</th>
    `;
    
    // Add job headers
    compareJobs.forEach(job => {
        tableHTML += `
            <th>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span>${job.title}</span>
                    <button class="remove-job-btn" data-id="${job.id}">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </th>
        `;
    });
    
    tableHTML += `
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Company</strong></td>
    `;
    
    // Add company names
    compareJobs.forEach(job => {
        tableHTML += `
            <td class="job-title"><a href="job-details.html?id=${job.id}">${job.company}</a></td>
        `;
    });
    
    tableHTML += `
                </tr>
                <tr class="feature-highlight">
                    <td><strong>Salary</strong></td>
    `;
    
    // Add salaries
    compareJobs.forEach(job => {
        tableHTML += `
            <td class="salary">${job.salary}</td>
        `;
    });
    
    tableHTML += `
                </tr>
                <tr>
                    <td><strong>Location</strong></td>
    `;
    
    // Add locations
    compareJobs.forEach(job => {
        tableHTML += `
            <td>${job.location}</td>
        `;
    });
    
    tableHTML += `
                </tr>
                <tr>
                    <td><strong>Job Type</strong></td>
    `;
    
    // Add job types
    compareJobs.forEach(job => {
        tableHTML += `
            <td>${job.jobType}</td>
        `;
    });
    
    tableHTML += `
                </tr>
                <tr>
                    <td><strong>Experience</strong></td>
    `;
    
    // Add experience
    compareJobs.forEach(job => {
        tableHTML += `
            <td>${job.experience}</td>
        `;
    });
    
    tableHTML += `
                </tr>
                <tr class="hidden-feature">
                    <td><strong>Education</strong></td>
    `;
    
    // Add education
    compareJobs.forEach(job => {
        tableHTML += `
            <td>${job.education}</td>
        `;
    });
    
    tableHTML += `
                </tr>
                <tr class="hidden-feature">
                    <td><strong>Skills</strong></td>
    `;
    
    // Add skills
    compareJobs.forEach(job => {
        tableHTML += `
            <td>${job.skills.slice(0, 3).join(", ")}${job.skills.length > 3 ? "..." : ""}</td>
        `;
    });
    
    tableHTML += `
                </tr>
                <tr class="hidden-feature">
                    <td><strong>Benefits</strong></td>
    `;
    
    // Add benefits
    compareJobs.forEach(job => {
        tableHTML += `
            <td>${job.benefits.slice(0, 2).join(", ")}${job.benefits.length > 2 ? "..." : ""}</td>
        `;
    });
    
    tableHTML += `
                </tr>
                <tr class="hidden-feature">
                    <td><strong>Company Rating</strong></td>
    `;
    
    // Add ratings
    compareJobs.forEach(job => {
        const fullStars = Math.floor(job.rating);
        const hasHalfStar = job.rating % 1 !== 0;
        
        let starsHTML = '';
        for (let i = 0; i < fullStars; i++) {
            starsHTML += '<i class="fas fa-star"></i>';
        }
        if (hasHalfStar) {
            starsHTML += '<i class="fas fa-star-half-alt"></i>';
        }
        
        tableHTML += `
            <td>
                <div class="rating">
                    ${starsHTML}
                    <span>(${job.rating})</span>
                </div>
            </td>
        `;
    });
    
    tableHTML += `
                </tr>
                <tr class="hidden-feature">
                    <td><strong>Posted Date</strong></td>
    `;
    
    // Add posted dates
    compareJobs.forEach(job => {
        tableHTML += `
            <td>${job.postedDate}</td>
        `;
    });
    
    tableHTML += `
                </tr>
                <tr>
                    <td><strong>Actions</strong></td>
    `;
    
    // Add action buttons
    compareJobs.forEach(job => {
        tableHTML += `
            <td>
                <a href="job-details.html?id=${job.id}" class="btn" style="padding: 8px 15px; font-size: 0.9rem;">View Details</a>
            </td>
        `;
    });
    
    tableHTML += `
                </tr>
            </tbody>
        </table>
    `;
    
    comparisonTableContainer.innerHTML = tableHTML;
    
    // Check if features are currently shown or hidden
    const isShowingAll = toggleFeaturesBtn.textContent.includes('Less');
    const hiddenFeatures = document.querySelectorAll('.hidden-feature');
    
    hiddenFeatures.forEach(feature => {
        feature.style.display = isShowingAll ? 'table-row' : 'none';
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Hide hidden features by default
    const hiddenFeatures = document.querySelectorAll('.hidden-feature');
    hiddenFeatures.forEach(feature => {
        feature.style.display = 'none';
    });
});