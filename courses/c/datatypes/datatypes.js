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
        question: "Which of the following are not derived data types?",
        choice1: "Unions",
        choice2: "Integres",
        choice3: "Arrays",
        choice4: "Pointers",
        answer: 2,
    },
    {
        question: "Which is/are the correct entry(ies) for Integer types?",
        choice1: "@,!,#,$",
        choice2: "0-9",
        choice3: "a-z",
        choice4: "A-Z",
        answer: 1,
    },
    {
        question: "Correct header file for using floating values is?",
        choice1: "maths.h",
        choice2: "float.h",
        choice3: "int.h",
        choice4: "stdio.h",
        answer: 1,
    },
    {
        question: "The storage space occupied by a Long integer type is?",
        choice1: "1 Byte",
        choice2: "2 Bytes",
        choice3: "3 Bytes",
        choice4: "4 Bytes",
        answer: 4,
    },
    {
        question: "Which of the following is a floating-point type value?",
        choice1: "0.5757",
        choice2: "244",
        choice3: "variable_name",
        choice4: "float.h",
        answer: 4,
    }
]

const scorePoints = 10
const maxQuestions = 5
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
