function getActiveCharacters() {
    let indices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let randomIndices = [];

    // Fisher-Yates shuffle algorithm
    for (let i = indices.length - 1; i >= 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));
        let temp = indices[i];
        indices[i] = indices[randomIndex];
        indices[randomIndex] = temp;
    }

    // Get the first three indices as random indices
    randomIndices = indices.slice(0, 3);
    return randomIndices;
}

export default getActiveCharacters;