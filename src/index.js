import './styles/main.scss';

import * as Utils from './utils/utils';
import * as Template from './templates/templates';
import * as LocalStorage from './local-storage/localStorage';
import { allQuestions } from './API/API';
import { startHandlingQuestions } from './utils/sortQuestions';

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
let finalQuestions = [];

function shuffle(array) {
    const shuffled = [...array];
    return shuffled.sort(() => Math.random() - 0.5);
  }

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
        questionTitle.innerHTML = `Question ${currentQuestionIndex + 1} of ${finalQuestions.length}`
        setNextQuestion(finalQuestions[currentQuestionIndex]);
    }
}

function checkIfEnd() {
    if(currentQuestionIndex === finalQuestions.length) {
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
    startBtn.classList.remove('btn--hidden');
}

function showFinalScores(newestScores) {
    scoresElement.classList.remove('scores--hidden');
    finishBtn.classList.add('btn--hidden');
    finishEl.classList.add('finish--hidden');
    LocalStorage.scoresUpdated(newestScores);
}

function finishGame() {
    questionsEl.classList.add('questions--hidden');
    finishEl.classList.remove('finish--hidden');
    finishBtn.classList.remove('btn--hidden');
    finishEl.innerHTML = `Your score is ${score}`;
}

async function startGame() {
    const questionsFromApi = await allQuestions();
    const alwaysFiveRandomQuestions = startHandlingQuestions(questionsFromApi, 5);
    // on every game start get new 5 random questions from api
    finalQuestions = alwaysFiveRandomQuestions.map((question, index) => {
        if(question.continent === alwaysFiveRandomQuestions[index].continent) {
            const answers = alwaysFiveRandomQuestions.map(answ => {
                if(answ.continent !== alwaysFiveRandomQuestions[index].continent) {
                    return answ.continent;
                }
            })
            const onlyTwoAnswers = answers.filter(answ =>
                answ !== alwaysFiveRandomQuestions[index].continent && answ !== this.undefined
            ).slice(0, 2);
            const threeShuffledAnswers = shuffle([question.continent, ...onlyTwoAnswers])
            return {
                question: {
                    ...question,
                    answers: [...threeShuffledAnswers]
                }
            }
        }
    })
    scoresElement.classList.add('scores--hidden');
    startBtn.classList.add('btn--hidden');
    questionsEl.classList.remove('questions--hidden');
    currentQuestionIndex = 0;
    score = 0;
    questionTitle.innerHTML = `Question ${currentQuestionIndex + 1} of ${finalQuestions.length}`
    setNextQuestion(finalQuestions[currentQuestionIndex]);
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
    clearBtnClasses(selectedBtn);
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

function clearBtnClasses(element) {
    element.classList.remove('wrong');
    element.classList.remove('correct');
}