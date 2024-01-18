function combineArrays(firstArray, secondArray) {

    const output = [];
    secondArray.forEach(item => {
        const index = firstArray.findIndex(arr => arr.includes(item));
        if (index !== -1) {
            if (!output.some(element => element === firstArray[index])) {
                output.push(firstArray[index]);
            }
        } else {
            output.push(item);
        }
    });
    return output;
}

module.exports = combineArrays;
