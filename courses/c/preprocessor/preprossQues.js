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
        question: "Which one of the following is not a token?",
        choice1: "Comments",
        choice2: "Functions",
        choice3: "Identifier",
        choice4: "Keywords",
        answer: 2,
    },
    {
        question: "Which of the following is the correct method of writing comments?(Answer<=4)",
        choice1: "//This is a comment",
        choice2: "/*This is a comment",
        choice3: "(This is a comment)",
        choice4: "/*This is a comment*/",
        answer: 1,
    },
    {
        question: "Which of the following is an incorrect identifier?",
        choice1: "car_55",
        choice2: "@car55",
        choice3: "variable55",
        choice4: "_variable",
        answer: 1,
    },
    {
        question: "Which of the following is the required correction for the given piece of INCORRECT code :  \n{	\n\tint age=15 \n\tchar name=Dylan;\n}",
        choice1: "{	\n\tint age=15 \n\tchar name=Dylan \n}",
        choice2: "{	\n\tint age=15; \n\tchar name=Dylan; \n}",
        choice3: "{	\n\tint age=15 . \n\tchar name=Dylan .\n}",
        choice4: "{	\n\tint age=15 /\n\tchar name=Dylan /\n}",
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