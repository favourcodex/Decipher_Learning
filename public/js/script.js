document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const signupBtn = document.getElementById('signupBtn');
    const loginBtn = document.getElementById('loginBtn');
    const onboardingContainer = document.getElementById('onboardingContainer');
    const steps = document.querySelectorAll('.step');
    const stepContents = document.querySelectorAll('.step-content');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    const completeBtn = document.getElementById('complete-onboarding');
    const reviewSummary = document.getElementById('review-summary');
    
    // Show onboarding when sign up is clicked
    signupBtn.addEventListener('click', function() {
        onboardingContainer.style.display = 'block';
        onboardingContainer.scrollIntoView({ behavior: 'smooth' });
    });
    
    // Login button action
    loginBtn.addEventListener('click', function() {
        alert('Login functionality would be implemented here. For this demo, please use Sign Up.');
    });
    
    // Next step functionality
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.step-content').id.replace('step', '');
            const nextStep = this.getAttribute('data-next');
            
            // Update stepper
            steps.forEach(step => {
                if (step.getAttribute('data-step') === currentStep) {
                    step.classList.remove('active');
                    step.classList.add('completed');
                }
                if (step.getAttribute('data-step') === nextStep) {
                    step.classList.add('active');
                }
            });
            
            // Update content
            stepContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `step${nextStep}`) {
                    content.classList.add('active');
                }
            });
            
            // If moving to review step, update summary
            if (nextStep === '5') {
                updateReviewSummary();
            }
        });
    });
    
    // Previous step functionality
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.step-content').id.replace('step', '');
            const prevStep = this.getAttribute('data-prev');
            
            // Update stepper
            steps.forEach(step => {
                if (step.getAttribute('data-step') === currentStep) {
                    step.classList.remove('active');
                }
                if (step.getAttribute('data-step') === prevStep) {
                    step.classList.add('active');
                    step.classList.remove('completed');
                }
            });
            
            // Update content
            stepContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `step${prevStep}`) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // Complete onboarding
    completeBtn.addEventListener('click', function() {
        alert('Onboarding completed! Taking you to your dashboard...');
        // In a real application, this would redirect to the actual dashboard
        // window.location.href = '/dashboard';
    });
    
    // Update review summary
    function updateReviewSummary() {
        let summaryHTML = '<ul style="list-style: none; padding: 0;">';
        
        // Get selected goal
        const selectedGoal = document.querySelector('input[name="goal"]:checked');
        if (selectedGoal) {
            const goalText = selectedGoal.parentElement.querySelector('span').textContent;
            summaryHTML += `<li><strong>Goal:</strong> ${goalText}</li>`;
        }
        
        // Get selected experience
        const selectedExperience = document.querySelector('input[name="experience"]:checked');
        if (selectedExperience) {
            const experienceText = selectedExperience.parentElement.querySelector('span').textContent;
            summaryHTML += `<li><strong>Experience:</strong> ${experienceText}</li>`;
        }
        
        // Get selected interests
        const selectedInterests = document.querySelectorAll('input[name="interests"]:checked');
        if (selectedInterests.length > 0) {
            let interestsText = '';
            selectedInterests.forEach(interest => {
                interestsText += interest.parentElement.querySelector('span').textContent + ', ';
            });
            interestsText = interestsText.slice(0, -2); // Remove last comma
            summaryHTML += `<li><strong>Interests:</strong> ${interestsText}</li>`;
        }
        
        // Get selected schedule
        const selectedSchedule = document.querySelector('input[name="schedule"]:checked');
        if (selectedSchedule) {
            const scheduleText = selectedSchedule.parentElement.querySelector('span').textContent;
            summaryHTML += `<li><strong>Schedule:</strong> ${scheduleText}</li>`;
        }
        
        summaryHTML += '</ul>';
        reviewSummary.innerHTML = summaryHTML;
    }
});