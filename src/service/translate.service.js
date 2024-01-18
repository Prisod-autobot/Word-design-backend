const newSentence = require('./combine.service');
const Word = require('../models/Word');

// Function to sanitize string by replacing “ and ” with regular quotes
const sanitizeString = (input) => {
    const sanitizedInput = input.replace(/[\u201C\u201D\u201A\u201B\u0027\u0022\u0060]/g, 'quote');
    const sanitized = sanitizedInput.replace(/[^\w\s.,?!()'"\-*]/g, '');
    return sanitized.trim();
};

async function newWord(sentence) {
    let sanitizedWord, sanitizedPos;
    const wordResults = [];

    try {
        const result = await newSentence(sentence);

        for (const { word, pos } of result) {
            try {
                sanitizedWord = sanitizeString(word);
                sanitizedPos = sanitizeString(pos || '');

                const [wordRecord, created] = await Word.findOrCreate({
                    where: { word: sanitizedWord.toLowerCase(), pos: sanitizedPos.toLowerCase() },
                    defaults: { word: sanitizedWord, pos: sanitizedPos },
                });

                const data_word = await wordRecord.get({ plain: true });

                wordResults.push({
                    word: data_word.word,
                    word_id: data_word.word_id,
                    meaning: data_word.meaning,
                });

            } catch (error) {
                if (error.name === 'SequelizeUniqueConstraintError') {
                    console.log("Skipping duplicate entry: ", sanitizedWord, " ", sanitizedPos);
                } else {
                    console.error(`Error inserting entry: ${sanitizedWord}(${sanitizedPos})`, error);
                }
            }
        }

        return { result: wordResults };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = newWord;