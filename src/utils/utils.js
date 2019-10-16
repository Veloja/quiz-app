export function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function setTwoRemainingAnswers(array) {
    const results = [];
    while (array.length) {
        // get two random from shuffled
        results.push(array.splice(0, 2));
    }
    return results[Math.floor(Math.random() * results.length)];
}

export function getDate(score) {
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1;
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    return { date: `${year}/${month}/${day}`, score };
}