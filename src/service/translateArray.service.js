const Sentence = require('../models/Sentence');

async function findTranslateThai(data_arr) {
    try {
        const results = await Promise.all(data_arr.map(async (subArray) => {
            const result = await Sentence.findAll({
                attributes: ['word_order', 'sentence', 'translated_sentence'],
                where: { word_order: JSON.stringify(subArray) },
                raw: true,
            });
            return result;
        }));

        return results.flat();
    } catch (error) {
        console.error(error);
        return [];
    }
};

module.exports = findTranslateThai;