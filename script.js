const form = document.querySelector('.user-form')
const userName = document.getElementById('user-name')
const quesCountButtons = document.querySelectorAll('.ques-count-buttons button') // Get all buttons in the question count section in the form of a NodeList
const quesCategory = document.getElementById('ques-category')
const container = document.querySelector('.container')
const quesContainer = document.querySelector('.ques-container')

container.style.transform = 'translateZ(20px)'
quesContainer.style.transform = 'translateZ(20px)'

let userNameValue = ''
let selectedQuestionCount = 5 // Default question count
let quesCategoryValue = 'mixed' // Default question category
let currentQuestionIndex = 0
let score = 0
let questions = []

// Set default selected for 5 questions
quesCountButtons.forEach((btn, idx) => {
    if (btn.textContent === '5') btn.classList.add('selected');
    btn.addEventListener('click', () => {
        quesCountButtons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Get user name
    userNameValue = userName.value.trim();
    // Get selected question count
    selectedQuestionCount = parseInt(document.querySelector('.ques-count-buttons button.selected').textContent);
    // Get selected question category
    quesCategoryValue = quesCategory.value;

    // Prepare questions based on selected category
    prepareQuestions();

    // Hide the form container and show the question container
    container.style.display = 'none';
    quesContainer.style.display = 'flex';
    showQuestions();
})

// Function to prepare questions based on selected category
function prepareQuestions() {
    if (quesCategoryValue === 'mixed') {
        // Create a mixed array from all categories
        const allQuestions = [
            ...arts_and_literature,
            ...film_and_tv,
            ...food_and_drink,
            ...general_knowledge,
            ...geography,
            ...history,
            ...music,
            ...society_and_culture,
            ...sport_and_leisure
        ]

        // Shuffle the array
        shuffleArray(allQuestions);

        // Take only the required number of questions
        questions = allQuestions.slice(0, selectedQuestionCount);
    }
    else {
        // Get questions from the selected category
        const categoryQuestions = eval(quesCategoryValue); // Here eval is used to dynamically access the variable which is defined somewhere else in the code

        // Shuffle the questions
        shuffleArray(categoryQuestions);

        // Take only the required number of questions
        questions = categoryQuestions.slice(0, selectedQuestionCount);
    }
}

// Function to shuffle array (Fisher-Yates algorithm)
// This is the most efficient and reliable way to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to show current question
function showQuestions() {
    if (currentQuestionIndex >= questions.length) {
        // Quiz completed, show results
        showResults();
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];

    // Create HTML for the question
    quesContainer.innerHTML = `
        <div class="question-header">
            <div class="question-count">
                <span>Question ${currentQuestionIndex + 1}/${selectedQuestionCount}</span>
            </div>
        </div>
        <div class="question>
            <h2>${currentQuestion.question}</h2>
        </div>
        <div class="options">
            ${currentQuestion.options.map((option, index) => `
                <button class="option" data-index="${index}>
                    <span class="option-marker">${String.fromCharCode(65 + index)}></span>
                    <span class="option-text">${option}</span>
                </button>
            `)}
        </div>
        <div class="navigation">
            <button class="nav-btn" id="lock-btn">
                Lock Option
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </button>
        </div>
    `;

    // Add event listeners to option buttons
    const optionsButtons = quesContainer.querySelectorAll('.option');
    let selectedOption = null;

    optionsButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove selected class from all options
            optionsButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            selectedOption = button;
        });
    });

    // Add event listener to lock button
    const lockBtn = document.getElementById('lock-btn');

    lockBtn.addEventListener('click', () => {
        if(selectedOption){}
        else{
            alert('Please select an option first!');
        }
    })
}