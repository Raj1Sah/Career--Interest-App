// Global State
let currentUser = null;
let quizProgress = 0;
let answers = {};
let careerResults = null;
let categoryScores = null;
let isAuthLogin = true;

// Quiz Questions
const quizQuestions = [
    {
        id: 1,
        question: "I enjoy working with numbers and analyzing data",
        category: "analytical",
        options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
        id: 2,
        question: "I like creating visual designs and artistic content",
        category: "creative",
        options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
        id: 3,
        question: "I prefer helping and teaching others",
        category: "social",
        options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
        id: 4,
        question: "I enjoy building and fixing things",
        category: "technical",
        options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
        id: 5,
        question: "I like leading teams and making strategic decisions",
        category: "leadership",
        options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
        id: 6,
        question: "I enjoy researching and discovering new information",
        category: "investigative",
        options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
        id: 7,
        question: "I prefer working with technology and computers",
        category: "technical",
        options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
        id: 8,
        question: "I like organizing events and coordinating activities",
        category: "organizational",
        options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
        id: 9,
        question: "I enjoy writing and communicating ideas",
        category: "creative",
        options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
        id: 10,
        question: "I like solving complex problems and puzzles",
        category: "analytical",
        options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
        id: 11,
        question: "I prefer working outdoors or with nature",
        category: "environmental",
        options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
        id: 12,
        question: "I enjoy public speaking and presentations",
        category: "social",
        options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    }
];

// Career Database
const careerDatabase = [
    {
        id: 1,
        title: "Data Scientist",
        match: ["analytical", "technical", "investigative"],
        description: "Analyze complex data to help organizations make better decisions",
        skills: ["Python/R Programming", "Statistics", "Machine Learning", "Data Visualization", "SQL"],
        education: "Bachelor's in Computer Science, Statistics, or related field; Master's preferred",
        salary: "$80,000 - $150,000",
        growth: "35% growth expected (2022-2032)",
        icon: "📊"
    },
    {
        id: 2,
        title: "UX/UI Designer",
        match: ["creative", "technical", "analytical"],
        description: "Design user-friendly interfaces and experiences for digital products",
        skills: ["Figma/Adobe XD", "User Research", "Wireframing", "Prototyping", "Visual Design"],
        education: "Bachelor's in Design, HCI, or related field",
        salary: "$60,000 - $120,000",
        growth: "23% growth expected (2022-2032)",
        icon: "🎨"
    },
    {
        id: 3,
        title: "Software Developer",
        match: ["technical", "analytical", "investigative"],
        description: "Build applications and systems that solve real-world problems",
        skills: ["Programming Languages", "Problem Solving", "Version Control", "Algorithms", "Testing"],
        education: "Bachelor's in Computer Science or related field",
        salary: "$70,000 - $140,000",
        growth: "25% growth expected (2022-2032)",
        icon: "💻"
    },
    {
        id: 4,
        title: "Teacher/Educator",
        match: ["social", "organizational", "leadership"],
        description: "Educate and inspire students in various subjects and age groups",
        skills: ["Communication", "Curriculum Development", "Classroom Management", "Patience", "Subject Expertise"],
        education: "Bachelor's in Education or subject area; Teaching certification required",
        salary: "$45,000 - $75,000",
        growth: "5% growth expected (2022-2032)",
        icon: "👨‍🏫"
    },
    {
        id: 5,
        title: "Marketing Manager",
        match: ["creative", "social", "leadership"],
        description: "Develop and execute marketing strategies to promote products or services",
        skills: ["Digital Marketing", "Brand Strategy", "Analytics", "Content Creation", "Team Management"],
        education: "Bachelor's in Marketing, Business, or related field",
        salary: "$65,000 - $130,000",
        growth: "10% growth expected (2022-2032)",
        icon: "📱"
    },
    {
        id: 6,
        title: "Environmental Scientist",
        match: ["investigative", "environmental", "analytical"],
        description: "Study and protect the environment, develop sustainability solutions",
        skills: ["Research Methods", "Data Analysis", "Environmental Policy", "Field Work", "Report Writing"],
        education: "Bachelor's in Environmental Science or related field; Master's often preferred",
        salary: "$55,000 - $95,000",
        growth: "6% growth expected (2022-2032)",
        icon: "🌍"
    },
    {
        id: 7,
        title: "Project Manager",
        match: ["organizational", "leadership", "social"],
        description: "Plan, execute, and oversee projects from inception to completion",
        skills: ["Project Planning", "Risk Management", "Communication", "Budgeting", "Agile/Scrum"],
        education: "Bachelor's in Business, Management, or related field; PMP certification beneficial",
        salary: "$70,000 - $125,000",
        growth: "8% growth expected (2022-2032)",
        icon: "📋"
    },
    {
        id: 8,
        title: "Content Writer",
        match: ["creative", "investigative", "social"],
        description: "Create engaging written content for various platforms and audiences",
        skills: ["Writing", "Research", "SEO", "Editing", "Storytelling"],
        education: "Bachelor's in English, Journalism, Communications, or related field",
        salary: "$40,000 - $80,000",
        growth: "4% growth expected (2022-2032)",
        icon: "✍️"
    }
];

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    loadUserData();
    loadTheme();
    updateThemeIcons();
});

// Theme Management
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('careerAppTheme', isDark ? 'dark' : 'light');
    updateThemeIcons();
}

function loadTheme() {
    const savedTheme = localStorage.getItem('careerAppTheme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

function updateThemeIcons() {
    const isDark = document.body.classList.contains('dark-mode');
    const icon = isDark ? '☀️' : '🌙';
    
    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) themeIcon.textContent = icon;
    
    const navIcons = document.querySelectorAll('.theme-icon');
    navIcons.forEach(el => el.textContent = icon);
    
    const navThemeIcon = document.getElementById('navThemeIcon');
    if (navThemeIcon) navThemeIcon.textContent = icon;
    
    const mobileThemeIcon = document.getElementById('mobileThemeIcon');
    if (mobileThemeIcon) mobileThemeIcon.textContent = icon;
}

// User Authentication
function loadUserData() {
    const savedUser = localStorage.getItem('careerAppUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        goToPage('home');
        updateUserDisplay();
    }
}

function updateUserDisplay() {
    const userName = document.getElementById('userName');
    const mobileUserName = document.getElementById('mobileUserName');
    const userDisplays = document.querySelectorAll('.user-name-display');
    
    if (currentUser) {
        if (userName) userName.textContent = currentUser.name;
        if (mobileUserName) mobileUserName.textContent = currentUser.name;
        userDisplays.forEach(el => el.textContent = currentUser.name);
    }
}

function switchAuthTab(tab) {
    isAuthLogin = tab === 'login';
    const tabs = document.querySelectorAll('.auth-tab');
    tabs.forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    
    const nameInput = document.getElementById('nameInput');
    const submitBtn = document.querySelector('.auth-form .btn-primary');
    
    if (isAuthLogin) {
        nameInput.style.display = 'none';
        submitBtn.textContent = 'Login';
    } else {
        nameInput.style.display = 'block';
        submitBtn.textContent = 'Sign Up';
    }
}

function handleAuth() {
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;
    const name = document.getElementById('nameInput').value;
    
    if (!email || !password) {
        alert('Please fill in all required fields');
        return;
    }
    
    const userName = isAuthLogin ? email.split('@')[0] : (name || email.split('@')[0]);
    currentUser = { name: userName, email: email };
    
    localStorage.setItem('careerAppUser', JSON.stringify(currentUser));
    goToPage('home');
    updateUserDisplay();
}

function logout() {
    currentUser = null;
    localStorage.removeItem('careerAppUser');
    goToPage('auth');
}

// Navigation
function goToPage(page) {
    const pages = ['authPage', 'homePage', 'quizPage', 'resultsPage'];
    pages.forEach(p => {
        document.getElementById(p).style.display = 'none';
    });
    
    if (page === 'auth') {
        document.getElementById('authPage').style.display = 'flex';
    } else {
        document.getElementById(page + 'Page').style.display = 'block';
    }
    
    if (page === 'home') {
        checkPreviousResults();
    }
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('active');
}

// Quiz Functions
function startQuiz() {
    quizProgress = 0;
    answers = {};
    goToPage('quiz');
    displayQuestion();
}

function displayQuestion() {
    const question = quizQuestions[quizProgress];
    const progress = ((quizProgress + 1) / quizQuestions.length) * 100;
    
    document.getElementById('progressText').textContent = 
        `Question ${quizProgress + 1} of ${quizQuestions.length}`;
    document.getElementById('progressPercent').textContent = 
        `${Math.round(progress)}%`;
    document.getElementById('progressFill').style.width = `${progress}%`;
    
    const questionText = document.getElementById('questionText');
    questionText.textContent = question.question;
    questionText.classList.remove('animate-slide-right');
    void questionText.offsetWidth; // Trigger reflow
    questionText.classList.add('animate-slide-right');
    
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.style.animation = `slideRight 0.4s ease-out ${index * 80}ms both`;
        btn.onclick = () => handleAnswer(index);
        optionsContainer.appendChild(btn);
    });
    
    const backBtn = document.getElementById('backBtn');
    backBtn.style.display = quizProgress > 0 ? 'block' : 'none';
}

function handleAnswer(optionIndex) {
    const currentQuestion = quizQuestions[quizProgress];
    answers[currentQuestion.id] = optionIndex;
    
    if (quizProgress < quizQuestions.length - 1) {
        quizProgress++;
        displayQuestion();
    } else {
        calculateResults();
        goToPage('results');
        displayResults();
    }
}

function previousQuestion() {
    if (quizProgress > 0) {
        quizProgress--;
        displayQuestion();
    }
}

// Calculate Career Matches
function calculateResults() {
    const scores = {};
    const counts = {};
    
    Object.entries(answers).forEach(([questionId, answerIndex]) => {
        const question = quizQuestions.find(q => q.id === parseInt(questionId));
        const score = answerIndex + 1;
        
        if (!scores[question.category]) {
            scores[question.category] = 0;
            counts[question.category] = 0;
        }
        scores[question.category] += score;
        counts[question.category]++;
    });
    
    // Calculate percentages
    categoryScores = {};
    Object.keys(scores).forEach(category => {
        const maxPossible = counts[category] * 5;
        categoryScores[category] = Math.round((scores[category] / maxPossible) * 100);
    });
    
    // Rank careers
    const rankedCareers = careerDatabase.map(career => {
        let matchScore = 0;
        career.match.forEach(category => {
            matchScore += scores[category] || 0;
        });
        
        const maxPossible = career.match.reduce((sum, cat) => {
            return sum + (counts[cat] || 0) * 5;
        }, 0);
        
        const matchPercentage = maxPossible > 0 ? 
            Math.round((matchScore / maxPossible) * 100) : 0;
        
        return { ...career, matchScore, matchPercentage };
    }).sort((a, b) => b.matchScore - a.matchScore);
    
    careerResults = rankedCareers.slice(0, 5);
}

// Display Results
function displayResults() {
    displayInterestChart();
    displayCareers();
}

function displayInterestChart() {
    const chartContainer = document.getElementById('interestChart');
    
    const sortedCategories = Object.entries(categoryScores)
        .sort(([, a], [, b]) => b - a);
    
    let html = '<h2>Your Interest Distribution</h2><div style="margin-top: 24px;">';
    
    sortedCategories.forEach(([category, percentage], index) => {
        html += `
            <div class="interest-item" style="animation: slideUp 0.5s ease-out ${index * 100}ms both">
                <div class="interest-header">
                    <span class="interest-label">${category}</span>
                    <span class="interest-value">${percentage}%</span>
                </div>
                <div class="interest-bar">
                    <div class="interest-fill" style="width: ${percentage}%"></div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    chartContainer.innerHTML = html;
}

function displayCareers() {
    const container = document.getElementById('careersContainer');
    let html = '';
    
    careerResults.forEach((career, index) => {
        const matchClass = career.matchPercentage >= 80 ? 'match-high' : 
                          career.matchPercentage >= 60 ? 'match-medium' : 'match-low';
        
        html += `
            <div class="career-card" style="animation: slideUp 0.6s ease-out ${index * 150}ms both">
                <div class="career-header">
                    <div class="career-icon">${career.icon}</div>
                    <div class="career-info">
                        <div class="career-title-row">
                            <h2 class="career-title">${career.title}</h2>
                            <div class="career-badges">
                                <span class="badge badge-rank">#${index + 1} Match</span>
                                <span class="badge-match ${matchClass}">${career.matchPercentage}% Match</span>
                            </div>
                        </div>
                        <p class="career-description">${career.description}</p>
                        
                        <div class="career-details">
                            <div class="detail-item">
                                <h4><span class="icon">💼</span> Key Skills</h4>
                                <div class="skills-list">
                                    ${career.skills.map(skill => 
                                        `<span class="skill-tag">${skill}</span>`
                                    ).join('')}
                                </div>
                            </div>
                            
                            <div class="detail-item">
                                <h4><span class="icon">🎓</span> Education Required</h4>
                                <p class="detail-text">${career.education}</p>
                            </div>
                            
                            <div class="detail-item">
                                <h4><span class="icon">💰</span> Salary Range</h4>
                                <p class="detail-text">${career.salary}</p>
                            </div>
                            
                            <div class="detail-item">
                                <h4><span class="icon">📈</span> Job Growth</h4>
                                <p class="detail-text">${career.growth}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Helper Functions
function checkPreviousResults() {
    const resultsDiv = document.getElementById('previousResults');
    if (careerResults && careerResults.length > 0) {
        resultsDiv.style.display = 'block';
    } else {
        resultsDiv.style.display = 'none';
    }
}

function viewResults() {
    if (careerResults) {
        goToPage('results');
        displayResults();
    }
}

function retakeQuiz() {
    answers = {};
    quizProgress = 0;
    categoryScores = null;
    careerResults = null;
    startQuiz();
}

function downloadPDF() {
    alert('PDF download feature would generate a detailed report with your career matches, skills needed, and action plan. In a production app, this would use the jsPDF library to create a comprehensive PDF document.');
}

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    if (document.getElementById('quizPage').style.display !== 'none') {
        if (e.key === 'ArrowLeft' && quizProgress > 0) {
            previousQuestion();
        }
    }
});
