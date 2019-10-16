import './styles/main.scss';
// function setStateAnswers(fiveQuestions) {
//     const correctAnwser = fiveQuestions[state.currentQuestion];
//     const filteredQuestionsNotToHaveCorrectAnsw = questions.filter(question => question !== correctAnwser.continent);
//     const shuffledArrayWithoutCorrectAnswer = Utils.shuffle(filteredQuestionsNotToHaveCorrectAnsw);
//     const twoAnswers = Utils.setTwoRemainingAnswers(shuffledArrayWithoutCorrectAnswer);
//     return { twoAnswers, correctAnwser };
// }

import * as Utils from './utils/utils';
import * as Template from './templates/templates';
import * as LocalStorage from './local-storage/localStorage';

const questions = [
    {
        question: {
            image: 'https://i.imgur.com/vWlrNXk.jpg',
            continent: 'Asia'
        },
        answers: ['Antartica', 'Europe', 'Asia']
    },
    {
        question: {
            image: 'https://i.imgur.com/sczp9om.jpg',
            continent: 'Europe'
        },
        answers: ['Antartica', 'Europe', 'test 22']
    },
    {
        question: {
            image: 'https://i.imgur.com/nLUAr4P.jpg',
            continent: 'Antartica'
        },
        answers: ['Antartica', 'Europe', 'TEst 333']
    }
];

const questionImage = document.querySelector('#image');
const questionsEl = document.querySelector('#questions');
const btns = document.querySelector('#btns');
const nextBtn = document.querySelector('.btn__next');
const startBtn = document.querySelector('.btn__start');
const questionTitle = document.querySelector('.question__title');
const scoresElement = document.querySelector('#scores');
const finishEl = document.querySelector('#finish');
const finishBtn = document.querySelector('.btn__finish');

let currentQuestionIndex = 0;
let score = 0;

window.onload = LocalStorage.setAllScores();

startBtn.addEventListener('click', startGame);
finishBtn.addEventListener('click', showAllYourScores);
nextBtn.addEventListener('click', changeQuestion);

Utils.getDate(score);

function changeQuestion() {
    currentQuestionIndex++;
    const endGame = checkIfEnd();
    if(endGame) {
        return
    } else {
        questionTitle.innerHTML = `Question ${currentQuestionIndex + 1} of ${questions.length}`
        setNextQuestion(questions[currentQuestionIndex]);
    }
}

function checkIfEnd() {
    if(currentQuestionIndex === questions.length) {
        finishGame();
        return true;
    } else {
        return false;
    }
}

function showAllYourScores() {
    const newScore = {
        score,
        date: Utils.getDate().date
    }
    showFinalScores(LocalStorage.retrieveClearAndUpdateScores(newScore));
}

function showFinalScores(newestScores) {
    scoresElement.classList.remove('scores--hidden');
    finishBtn.classList.add('btn--hidden');
    finishEl.classList.add('btn--hidden');
    LocalStorage.scoresUpdated(newestScores);
}

function finishGame() {
    questionsEl.classList.add('questions--hidden');
    finishEl.classList.remove('finish--hidden');
    finishBtn.classList.remove('btn--hidden');
    finishEl.innerHTML = `Your score is ${score}`;
}

function startGame() {
    scoresElement.classList.add('scores--hidden');
    startBtn.classList.add('btn--hidden');
    questionsEl.classList.remove('questions--hidden');
    setNextQuestion(questions[currentQuestionIndex]);
}

function setNextQuestion(nextQuestion) {
    resetState();
    showQuestion(nextQuestion);
}

function resetState() {
    nextBtn.classList.add('btn--hidden');
    while(btns.firstChild) {
        btns.removeChild(btns.firstChild);
    }
}

function showQuestion(question) {
    questionImage.setAttribute('style', `background-image: url(${question.question.image})`);
    const correctAnwser = question.question.continent;
    Template.showBtns(question, correctAnwser);
    const buttons = document.querySelectorAll('.btn--answer');
    buttons.forEach(btn => btn.addEventListener('click', selectAnswer));
}

function selectAnswer(event) {
    const selectedBtn = event.target;
    clearClasses(selectedBtn);
    const correctAnswer = btns.querySelector('[data-correct]');
    if(selectedBtn.dataset.correct === 'true') {
        selectedBtn.classList.add('correct');
        score += 750;
    } else if(selectedBtn.dataset.correct === undefined) {
        selectedBtn.classList.add('wrong');
        correctAnswer.classList.add('correct');
    }
    nextBtn.classList.remove('btn--hidden');
};

function clearClasses(element) {
    element.classList.remove('wrong');
    element.classList.remove('correct');
}
