export function startHandlingQuestions(myArray, chunk_size) {
    const results = [];
    while (myArray.length) {
        results.push(myArray.splice(0, chunk_size));
    }
    return shuffle(results);
}

function shuffle(arrToShuffle) {
    for (let i = arrToShuffle.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrToShuffle[i], arrToShuffle[j]] = [arrToShuffle[j], arrToShuffle[i]];
    }
    return getFiveQuestionsArr(5, arrToShuffle);
}

function getFiveQuestionsArr(count, array) {
    let tmp = array.slice(array);
    const ret = [];
    
    for (let i = 0; i < count; i++) {
        let index = Math.floor(Math.random() * tmp.length);
        let removed = tmp.splice(index, 1);
        ret.push(removed[0]);
    }
    return makeAlwaysFiveDifferentQuestions(ret);
}

function makeAlwaysFiveDifferentQuestions(array) {
    const res = [];
    for(let i = 0; i < array.length; i++) {
        // console.log('prvi niz', array[i]);
        for(let j = 0; j < 1; j++) {
            // console.log('drugi niz', array[i]);
            let tempArr = [...array[i]];
            res.push(tempArr[Math.floor(Math.random() * tempArr.length)]);
        }
    }
    return res;
}
