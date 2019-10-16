import * as Template from '../templates/templates';


const scoresElement = document.querySelector('#scores');

const dummyScores = [{date: '2019/05/22', score: 333},
                     {date: '2019/07/01', score: 444},
                     {date: '2019/09/14', score: 0}];

export function setAllScores() {
    localStorage.setItem('dates', JSON.stringify(dummyScores));
    const scores = JSON.parse(localStorage.getItem('dates'));
    Template.showScoreView(scores);
}

export function scoresUpdated(newestScores) {
    localStorage.setItem('dates', JSON.stringify(newestScores));
    const scores = JSON.parse(localStorage.getItem('dates'));
    scoresElement.innerHTML = '';
    Template.showScoreView(scores);
}

export function retrieveClearAndUpdateScores(newScore) {
    const scores = JSON.parse(localStorage.getItem('dates'));
    localStorage.clear();
    localStorage.setItem('dates', JSON.stringify([newScore, ...scores]));
    return JSON.parse(localStorage.getItem('dates'));
}