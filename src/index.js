import './styles/main.scss';

import Question from './templates/question/Question';
import { allQuestions } from './API/API';
import { startHandlingQuestions } from './utils/sortQuestions';
import answerBtnListener from './listeners/answerBtnListener';
import * as Utils from './utils/utils';

const questions = ['Africa', 'Asia', 'South America', 'North America', 'Europe', 'Oceania', 'Antarctica'];

const state = {
    currentQuestion: 0,
    questions: [],
    answers: []
};

async function initializeApp() {
    const questions = await allQuestions();
    answerBtnListener();
    const fiveQuestions = startHandlingQuestions(questions, 5);
    const answers = setStateAnswers(fiveQuestions);
    const newState = {
        ...state,
        questions: fiveQuestions,
        answers: [...answers.twoAnswers, answers.correctAnwser.continent]
    }
    console.log('STATE', newState);
    changeQuestion();
    Question(newState);
}

function setStateAnswers(fiveQuestions) {
    const correctAnwser = fiveQuestions[state.currentQuestion];
    const filteredQuestionsNotToHaveCorrectAnsw = questions.filter(question => question !== correctAnwser.continent);
    const shuffledArrayWithoutCorrectAnswer = Utils.shuffle(filteredQuestionsNotToHaveCorrectAnsw);
    const twoAnswers = Utils.setTwoRemainingAnswers(shuffledArrayWithoutCorrectAnswer);
    return { twoAnswers, correctAnwser };
}

function changeQuestion() {
    state.currentQuestion += 1;
}




initializeApp();
