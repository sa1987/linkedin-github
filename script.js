const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: '1.	Which of the following is/are not FAIR principles?',
    answers: [
      { text: 'A.	Findable', correct: false },
      { text: 'B.	Accessible', correct: false },
      { text: 'C.	Identifiable', correct: true },
      { text: 'D.	Reproducible', correct: true }
    ]
  },
  {
    question: '2.	Which of the following statements is/are true? ',
    answers: [
      { text: 'A.	Metadata should be determined at the beginning of the project to provide guidelines for the process.', correct: false },
      { text: 'B.	Understanding the purpose of a file is a good way to start when you try to decide the format for file preserving.', correct: true },
      { text: 'C.	PID (persistent identifier) includes DOI, ORCID, ISBN, URL, etc.', correct: false },
      { text: 'D.	Sensitive data can always be FAIR in the same way as non-sensitive data.', correct: false }
    ]
  },
  {
    question: '3.	If you want to find out about a specific author, the most effective way is to search by: ',
    answers: [
      { text: 'A.	ORCID', correct: true },
      { text: 'B.	URL', correct: false },
      { text: 'C.	DOI', correct: false },
      { text: 'D.	ARKs', correct: false }
    ]
  },
  {
    question: '4.	Select the 3 types of metadata that are the most relevant to the FAIR principles: ',
    answers: [
      { text: 'A.	Descriptive metadata', correct: true },
      { text: 'B.	Structural metadata', correct: true },
      { text: 'C.	Indicative metadata', correct: false },
      { text: 'D.	Administrative metadata', correct: true }
    ]
  },
  {
    question: '5.	Jane is conducting a research project that employs quantitative data without any personal or confidential information. How can she draw up a data management plan that is FAIR? ',
    answers: [
      { text: 'A.	Write a new data management plan, specifying the planned handling of all data types.', correct: false },
      { text: 'B.	Find the data management plan from a previous project and use it.', correct: true },
      { text: 'C.	Hire someone externally to write the data management plan.', correct: false },
      { text: 'D.	Delegate the job to one of her collaborators.', correct: true }
    ]
  }
]