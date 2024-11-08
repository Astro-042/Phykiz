// The base URL for the Open Trivia Database (OTDB) API
const apiUrl = "https://opentdb.com/api.php?amount=10&category=17&type=multiple"; // Category 17 corresponds to Science: Nature

let currentQuestionIndex = 0;
let quizData = [];

// Elements
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const feedbackElement = document.getElementById('feedback');
const explanationElement = document.getElementById('explanation');
const nextButton = document.getElementById('next-button');

// Function to fetch random physics questions from the API
async function fetchQuestions() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    quizData = data.results; // Store the fetched questions
    loadQuestion();
  } catch (error) {
    console.error('Error fetching questions:', error);
    alert("Failed to load questions. Please try again later.");
  }
}

// Function to load the current question and options
function loadQuestion() {
  if (currentQuestionIndex < quizData.length) {
    const questionData = quizData[currentQuestionIndex];
    
    // Display the question text
    questionElement.textContent = questionData.question;
    
    // Prepare the options and randomize them
    const options = [...questionData.incorrect_answers, questionData.correct_answer];
    options.sort(() => Math.random() - 0.5); // Shuffle the options

    // Display the options
    optionsContainer.innerHTML = ''; // Clear previous options
    options.forEach((option, index) => {
      const optionElement = document.createElement('div');
      optionElement.textContent = option;
      optionElement.classList.add('option');
      optionElement.onclick = () => checkAnswer(option, questionData.correct_answer);
      optionsContainer.appendChild(optionElement);
    });

    // Reset feedback and explanation
    feedbackElement.textContent = '';
    explanationElement.textContent = '';
    nextButton.disabled = true;
  } else {
    // End of quiz
    questionElement.textContent = "Congratulations, you've completed the quiz!";
    optionsContainer.innerHTML = '';
    feedbackElement.textContent = '';
    explanationElement.textContent = '';
    nextButton.textContent = "Restart";
    nextButton.disabled = false;
    currentQuestionIndex = 0; // Reset for restart
  }
}

// Function to check the answer
function checkAnswer(selectedOption, correctAnswer) {
  const options = document.querySelectorAll('.option');

  // Provide feedback
  if (selectedOption === correctAnswer) {
    feedbackElement.textContent = "Correct!";
    explanationElement.textContent = `Great job! The correct answer is: ${correctAnswer}`;
    options.forEach(option => {
      if (option.textContent === correctAnswer) {
        option.classList.add('correct');
      }
    });
  } else {
    feedbackElement.textContent = "Incorrect!";
    explanationElement.textContent = `The correct answer is: ${correctAnswer}.`;
    options.forEach(option => {
      if (option.textContent === selectedOption) {
        option.classList.add('incorrect');
      }
      if (option.textContent === correctAnswer) {
        option.classList.add('correct');
      }
    });
  }

  // Disable options after selecting an answer
  options.forEach(option => option.onclick = null);

  // Enable the next button
  nextButton.disabled = false;
}

// Function to go to the next question
function nextQuestion() {
  currentQuestionIndex++;
  loadQuestion();
}

// Initial call to fetch the questions
fetchQuestions();

// Event listener for the Next button
nextButton.addEventListener('click', nextQuestion);
