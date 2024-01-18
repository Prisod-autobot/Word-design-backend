const Word = require('../models/Word');
const Sentence = require('../models/Sentence');

async function findSentenceTranslateThai(data_arr) {
    try {
        const result = await Sentence.findOne({
            attributes: ['translated_sentence'],
            where: { word_order: JSON.stringify(data_arr) },
            raw: true,
        });

        return result ? result.translated_sentence : null;
    } catch (error) {
        console.error(error);
    }
};

async function findWordTranslateThai(data_arr) {
    try {
        const result = await Word.findOne({
            attributes: ['meaning'],
            where: { word_id: data_arr },
            raw: true,
        });

        return result ? result.meaning : null;
    } catch (error) {
        console.error(error);
    }
};

async function allTrans(arr_set) {
    try {
        const resultArray = await Promise.all(arr_set.map(async (item) => {
            if (Array.isArray(item)) {
                return await findSentenceTranslateThai(item);
            } else {
                return await findWordTranslateThai(item);
            }
        }));
        const result = resultArray.join('');
        return result;
    } catch (error) {
        console.error(error);
    }
}

module.exports = allTrans;