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
        question: "Choose teh correct Syntax for declaring variable?",
        choice1: "int a;b;c",
        choice2: "int a, b, c;",
        choice3: "int = a, b, c;",
        choice4: "int : a, b, c;",
        answer: 2,
    },
    {
        question: "The following block of code had a runtime error. Choose the appropriate corrections : \n\n{\n int a, b, c;\n a,b=10, c=20;\n}",
        choice1: "a,b=10; c=20;",
        choice2: "a=10,b=10,c=20;",
        choice3: "int a=10,b=10,c=20;",
        choice4: "No Correction needed",
        answer: 1,
    },
    {
        question: "Read the following and choose the appropriate option:\nprintf() function is used to print the enclosed value to the user.\nEg. : { printf(“Hello world”);}\nOutput : Hello World\nBased on the above example choose the correct output :\n{\nint a,b,c=10;\nint d=(a*b)+c ;\nprintf(d);\n}",
        choice1: "Output=30",
        choice2: "Output=110",
        choice3: "Output=200",
        choice4: "Output=1000",
        answer: 2,
    },
    {
        question: "What will be the output of the C program?\n\n#include<stdio.h>\nint main()\n{\nint class;\nint public = 5;\nint private = 10;\nint protected = 15;\nclass = public + private + protected;\nprintf('%d',class);\nreturn 0;\n}",
        choice1: "Garbage value",
        choice2: "Compilation time error",
        choice3: "Runtime Error",
        choice4: "30",
        answer: 4,
    },
    // {
    //     question: "Which of the following is a floating-point type value?",
    //     choice1: "0.5757",
    //     choice2: "244",
    //     choice3: "variable_name",
    //     choice4: "float.h",
    //     answer: 4,
    // }
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
