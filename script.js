const form = document.querySelector('.user-form')
const userName = document.getElementById('user-name')
const quesCountButtons = document.querySelectorAll('.ques-count-buttons button') // Get all buttons in the question count section in the form of a NodeList
const quesCategory = document.getElementById('ques-category')
const container = document.querySelector('.container')
const quesContainer = document.querySelector('.ques-container')

container.style.transform = 'translateZ(20px)'