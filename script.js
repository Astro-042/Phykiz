// Quiz data
const quizQuestions = [
  {
    question: "What is the formula for speed?",
    options: ["Distance / Time", "Time / Distance", "Speed x Time", "Speed x Distance"],
    correctAnswer: 0, // Index of the correct answer in the options array
    explanation: "Speed is defined as the distance traveled per unit of time, so the formula is Distance / Time."
  },
  {
    question: "What is the unit of force?",
    options: ["Joule", "Newton", "Meter", "Watt"],
    correctAnswer: 1,
    explanation: "The unit of force is the Newton (N), named after Sir Isaac Newton."
  },
  {
    question: "Which of the following is an example of potential energy?",
    options: ["A moving car", "A stretched spring", "A running athlete", "A flowing river"],
    correctAnswer: 1,
    explanation: "Potential energy is stored energy, like energy stored in a stretched spring."
  },
  {
    question: "What is the formula for kinetic energy?",
    options: ["0.5 x mass x velocity^2", "mass x velocity", "0.5 x mass x velocity", "velocity / mass"],
    correctAnswer: 0,
    explanation: "The formula for kinetic energy is 0.5 x mass x velocity^2."
  }
];

let currentQuestionIndex = 0;

// Function to load the current question and options
function loadQuestion() {
  const questionData = quizQuestions[currentQuestionIndex];
  
  // Display the question
  document.getElementById('question').textContent = questionData.question;
  
  // Display options
  const optionsContainer = document.getElementById('options-container');
  optionsContainer.innerHTML = ''; // Clear any previous options
  
  questionData.options.forEach((option, index) => {
    const optionElement = document.createElement('div');
    optionElement.textContent = option;
    optionElement.classList.add('option');
    optionElement.onclick = () => checkAnswer(index);
    optionsContainer.appendChild(optionElement);
  });
  
  // Hide feedback
  document.getElementById('feedback').textContent = '';
  document.getElementById('explanation').textContent = '';
  
  // Enable Next button only after an answer is selected
  document.getElementById('next-button').disabled = true;
}

// Function to check if the selected answer is correct
function checkAnswer(selectedIndex) {
  const questionData = quizQuestions[currentQuestionIndex];
  
  // Provide feedback
  const feedback = document.getElementById('feedback');
  const explanation = document.getElementById('explanation');
  const options = document.querySelectorAll('.option');
  
  if (selectedIndex === questionData.correctAnswer) {
    feedback.textContent = "Correct!";
    explanation.textContent = questionData.explanation;
    options[selectedIndex].classList.add('correct');
  } else {
    feedback.textContent = "Incorrect!";
    explanation.textContent = `The correct answer is: ${questionData.options[questionData.correctAnswer]}.`;
    options[selectedIndex].classList.add('incorrect');
    options[questionData.correctAnswer].classList.add('correct');
  }

  // Disable options after an answer is selected
  options.forEach(option => option.onclick = null);

  // Enable the Next button
  document.getElementById('next-button').disabled = false;
}

// Function to go to the next question
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    loadQuestion();
  } else {
    document.getElementById('question').textContent = "Congratulations, you've completed the quiz!";
    document.getElementById('options-container').innerHTML = '';
    document.getElementById('feedback-container').style.display = 'none';
    document.getElementById('next-button').textContent = "Restart";
    currentQuestionIndex = 0; // Reset the quiz
  }
}

// Initial call to load the first question
loadQuestion();
