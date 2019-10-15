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