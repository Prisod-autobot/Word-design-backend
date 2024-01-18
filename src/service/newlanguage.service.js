const Word = require('../models/Word');

async function thaiLanguage(thaiWord, engWordId) {

    try {
        await Word.update({
            meaning: thaiWord,
        }, {
            where: { word_id: engWordId }
        });
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = thaiLanguage;

