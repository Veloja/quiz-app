const scoresElement = document.querySelector('#scores');
const btns = document.querySelector('#btns');

export function showScoreView(scores) {
    scoresElement.innerHTML = scores.map(score => 
        `<div class="score">
            on ${score.date} : ${score.score}
        </div>
        `
        ).join('');
}

export function showBtns(question, correctAnwser) {
    btns.innerHTML = question.question.answers.map(answ => 
        `
            <button class="btn btn--answer" 
                ${answ === correctAnwser && `data-correct="true"`}
            >
                ${answ}
            </button>
        `
        ).join('');
}