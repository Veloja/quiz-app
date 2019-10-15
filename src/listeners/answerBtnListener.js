import { getState, setCorrectAnswer } from '../core/state';

export default function answerBtnListener(state) {
    const btns = document.querySelectorAll('.btn--answer');
    btns.forEach(btn => btn.addEventListener('click', checkAnswer));
}

export function checkAnswer(event) {
    const correctAnswer = getState().correctAnswer;
    const clickedAnswer = event.target.getAttribute('data-answer');
    clickedAnswer === correctAnswer ? console.log('tacno') : console.log('netacno');
    console.log('state correct answer -- from listener', correctAnswer);
    console.log('clicked answer -- from listener', clickedAnswer);
}