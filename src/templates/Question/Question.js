
const Question = (state) => {
    console.log('from Question', state);
    const buttons = state.answers.map(answer =>
        `
        <button class="btn btn--answer" data-answer="${answer.continent}">
            ${answer}
            <span class="btn__result btn__result--correct">da</span>
            <span class="btn__result btn__result--wrong">ne</span>
        </button>
        `
    ).join('');

    const questions = document.querySelector('#questions');
    questions.innerHTML +=`
        <div class="question">
            <h3 class="question__title">Question ${state.currentQuestion + 1} of 5</h3>
            <div class="question__image">
                <img class="question__image-img" src="${state.questions[state.currentQuestion].image}" alt="continent" />
            </div>
            ${buttons}
            <button class="btn btn__next btn__next--active">Next</button>
        </div>
    `;
};

export default Question;