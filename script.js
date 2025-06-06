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
    // console.log('Name:', name);
    // console.log('Category:', quesCategoryValue);
    // console.log('Question Count:', selectedQuesCount);
    
    container.style.display = 'none';
    quesContainer.style.display = 'flex';
    showQuestions()
})
