const API = 'https://api.myjson.com/bins/a6da9';

export async function allQuestions() {
    return await getData();
}

async function getData() {
    return await fetch(API)
    .then(res => res.json())
    .then(data => data)
}