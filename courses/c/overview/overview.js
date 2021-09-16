const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const game = document.querySelector('.game');
const showScore = document.querySelector('.show-score');
const scoreShow = document.querySelector('.scoreShow');
const suggestion = document.querySelector('.suggestion');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "Why is C language used in making operating systems?",
        choice1: "High-level language",
        choice2: "Large Standard Library",
        choice3: "Object-Oriented",
        choice4: "Structured language",
        answer: 4,
    },
    {
        question: "Who is the father of the C Programming Language?",
        choice1: "Bjarne Stroustrup",
        choice2: "James A. Gosling",
        choice3: "Dennis Ritchie",
        choice4: "Dr. E.F. Cod",
        answer: 3,
    },
    {
        question: "C is a which level language?",
        choice1: "Low Level",
        choice2: "High Level",
        choice3: "both a & b",
        choice4: "None of these",
        answer: 1,
    },
    {
        question: "Which features enable C suitable for making operating systems?",
        choice1: "High-level language",
        choice2: "Large Standard Library",
        choice3: "Object-Oriented",
        choice4: "Structured language",
        answer: 4,
    },
]

const scorePoints = 10
const maxQuestions = 4
const totalScore = scorePoints * maxQuestions

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > maxQuestions){
        localStorage.setItem('mostRecentScore', score)
        game.classList.add('hide')
        showScore.classList.remove('hide')
        
        scoreShow.innerText = `${score}`
        if(score < totalScore){
            suggestion.innerText = 'Try Getting Better next time !!'
        }
        else{
            suggestion.innerText = 'Congratulations!!'
        }
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${maxQuestions}`
    progressBarFull.style.width = `${(questionCounter/maxQuestions) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct'){
            incrementScore(scorePoints)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()