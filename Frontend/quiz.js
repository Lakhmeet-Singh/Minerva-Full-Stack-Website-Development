const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const finishBtn = document.getElementById("finish-btn");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer-btn");

let results = [];
let shufflQuestions, currentQuestion;

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", () => {
  currentQuestion++;
  nextQuestion();
});

// starts the quiz
function startQuiz() {
  startBtn.classList.add("hide"); //start button is hided
  shufflQuestions = questions.sort(() => Math.random() - 0.5); // shuffle question so we don't get question in a sequence
  currentQuestion = 0;
  questionContainer.classList.remove("hide");
  nextQuestion();
}

//
function nextQuestion() {
  reset();
  showQuestion(shufflQuestions[currentQuestion]); //shows the question which are shuffled so we don't get it in a sequence
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const btn = document.createElement("button");
    btn.innerText = answer.text;
    btn.classList.add("btn");
    if (answer.correct) {
      btn.dataset.correct = answer.correct;
    }
    btn.addEventListener("click", chooseAnswer);
    answerElement.appendChild(btn);
  });
}

function reset() {
  clearQuestionResult(document.body);
  nextBtn.classList.add("hide");
  Array.from(answerElement.children).forEach((button) => {
    button.disabled = false;
    questionResult(button, button.dataset.correct);
  });
  while (answerElement.firstChild) {
    answerElement.removeChild(answerElement.firstChild);
  }
}

function chooseAnswer(e) {
  const selectBtn = e.target;
  const correctAnswer = selectBtn.dataset.correct;
  if (correctAnswer) results.push(true);
  else results.push(false);
  questionResult(document.body, correctAnswer);
  Array.from(answerElement.children).forEach((button) => {
    button.disabled = true;
    questionResult(button, button.dataset.correct);
  });
  if (shufflQuestions.length > currentQuestion + 1) {
    nextBtn.classList.remove("hide");
  } else {
    finishBtn.classList.remove("hide"); //the user return to course page when clicking the finish button
    sendResults(getResults());
  }
}

function getResults() {
  let values = { correct: 0, wrong: 0 };
  results.forEach((element) => {
    if (element) values.correct++;
    else values.wrong++;
  });
  return (100 * values.correct) / (values.correct + values.wrong);
}

function questionResult(element, correct) {
  clearQuestionResult(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearQuestionResult(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "• Which of the following statements are true?",
    answers: [
      { text: "A factor of 10 is 3", correct: false },
      { text: "A factor of 100 is 11", correct: false },
      { text: "A factor of 8 is 4", correct: true },
      { text: "A factor of 12 is 5", correct: false },
    ],
  },
  {
    question: "• Which of the following is a prime number?",
    answers: [
      { text: "20", correct: false },
      { text: "23", correct: true },
      { text: "34", correct: false },
      { text: "49", correct: false },
    ],
  },
  {
    question:
      "• True or false? A factor is a number that divides into another number exactly.",
    answers: [
      { text: "True", correct: true },
      { text: "False", correct: false },
    ],
  },
  {
    question: "• What are all the factors of 20?",
    answers: [
      { text: "1,2,4,5 and 10", correct: false },
      { text: "2,3,4,10 and 20", correct: false },
      { text: "1,2,4,5,10 and 20", correct: true },
      { text: "20,40,60,80 and 100", correct: false },
    ],
  },
  {
    question: "• A square number has how many factors?",
    answers: [
      { text: "10", correct: false },
      { text: "An odd number of factors", correct: true },
      { text: "An even number of factors", correct: false },
      { text: "None", correct: false },
    ],
  },
];
