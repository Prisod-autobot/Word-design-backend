const Word = require("../models/Word");

async function findAll(wordIds) {
    try {
        const words = await Word.findAll({
            attributes: ['word_id', 'word', 'pos', 'meaning'],
            where: { word_id: wordIds },
        });

        const sortedWords = [];
        wordIds.forEach(id => {
            words.forEach(word => {
                if (word.word_id === id) {
                    sortedWords.push(word);
                }
            });
        });
        return sortedWords;
    } catch (error) {
        console.error(error);
        reject(error);
    }
}

module.exports = findAll;