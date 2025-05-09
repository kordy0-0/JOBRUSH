// DOM Elements
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const confirmPasswordInput = document.getElementById('confirmPassword');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');

// Toggle mobile navigation
if (navToggle) {
    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
}

// Toggle password visibility
if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Toggle eye icon
        const eyeIcon = togglePassword.querySelector('i');
        eyeIcon.classList.toggle('fa-eye');
        eyeIcon.classList.toggle('fa-eye-slash');
    });
}

// Password strength meter
if (passwordInput && strengthBar && strengthText) {
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const strength = calculatePasswordStrength(password);
        
        // Update strength bar
        strengthBar.style.width = `${strength.score * 25}%`;
        
        // Set color based on strength
        if (strength.score === 0) {
            strengthBar.style.backgroundColor = '#ddd';
            strengthText.textContent = 'Password strength';
        } else if (strength.score === 1) {
            strengthBar.style.backgroundColor = '#f44336';
            strengthText.textContent = 'Weak';
        } else if (strength.score === 2) {
            strengthBar.style.backgroundColor = '#ff9800';
            strengthText.textContent = 'Fair';
        } else if (strength.score === 3) {
            strengthBar.style.backgroundColor = '#4caf50';
            strengthText.textContent = 'Good';
        } else {
            strengthBar.style.backgroundColor = '#2e7d32';
            strengthText.textContent = 'Strong';
        }
    });
}

// Calculate password strength
function calculatePasswordStrength(password) {
    let score = 0;
    
    // Length check
    if (password.length > 6) score += 1;
    if (password.length > 10) score += 1;
    
    // Complexity checks
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    return {
        score: Math.min(4, score)
    };
}

// Form validation - Login
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe').checked;
        
        // Reset error messages
        document.getElementById('emailError').textContent = '';
        document.getElementById('passwordError').textContent = '';
        
        // Validate email
        if (!validateEmail(email)) {
            document.getElementById('emailError').textContent = 'Please enter a valid email address';
            return;
        }
        
        // Validate password
        if (password.length < 6) {
            document.getElementById('passwordError').textContent = 'Password must be at least 6 characters';
            return;
        }
        
        // Store email in localStorage if remember me is checked
        if (rememberMe) {
            localStorage.setItem('rememberedEmail', email);
        } else {
            localStorage.removeItem('rememberedEmail');
        }
        
        // Simulate login success
        showSuccessMessage('Login successful! Redirecting...');
        
        // In a real app, you would send the data to a server
        // For this demo, we'll just redirect after a delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    });
    
    // Check for remembered email
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        document.getElementById('email').value = rememberedEmail;
        document.getElementById('rememberMe').checked = true;
    }
}

// Form validation - Signup
if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const termsAgree = document.getElementById('termsAgree').checked;
        const userType = document.querySelector('input[name="userType"]:checked').value;
        
        // Reset error messages
        document.getElementById('firstNameError').textContent = '';
        document.getElementById('lastNameError').textContent = '';
        document.getElementById('emailError').textContent = '';
        document.getElementById('passwordError').textContent = '';
        document.getElementById('confirmPasswordError').textContent = '';
        document.getElementById('termsError').textContent = '';
        
        let hasError = false;
        
        // Validate first name
        if (firstName.trim() === '') {
            document.getElementById('firstNameError').textContent = 'First name is required';
            hasError = true;
        }
        
        // Validate last name
        if (lastName.trim() === '') {
            document.getElementById('lastNameError').textContent = 'Last name is required';
            hasError = true;
        }
        
        // Validate email
        if (!validateEmail(email)) {
            document.getElementById('emailError').textContent = 'Please enter a valid email address';
            hasError = true;
        }
        
        // Validate password
        if (password.length < 6) {
            document.getElementById('passwordError').textContent = 'Password must be at least 6 characters';
            hasError = true;
        }
        
        // Validate confirm password
        if (password !== confirmPassword) {
            document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
            hasError = true;
        }
        
        // Validate terms agreement
        if (!termsAgree) {
            document.getElementById('termsError').textContent = 'You must agree to the terms';
            hasError = true;
        }
        
        if (hasError) return;
        
        // Simulate signup success
        showSuccessMessage('Account created successfully! Redirecting...');
        
        // In a real app, you would send the data to a server
        // For this demo, we'll just redirect after a delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    });
}

// Email validation helper
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Show success message
function showSuccessMessage(message) {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = message;
    successMessage.style.position = 'fixed';
    successMessage.style.top = '20px';
    successMessage.style.left = '50%';
    successMessage.style.transform = 'translateX(-50%)';
    successMessage.style.backgroundColor = '#4caf50';
    successMessage.style.color = 'white';
    successMessage.style.padding = '15px 20px';
    successMessage.style.borderRadius = '5px';
    successMessage.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    successMessage.style.zIndex = '2000';
    
    document.body.appendChild(successMessage);
    
    setTimeout(() => {
        successMessage.style.opacity = '0';
        successMessage.style.transition = 'opacity 0.5s';
        setTimeout(() => {
            document.body.removeChild(successMessage);
        }, 500);
    }, 1500);
}