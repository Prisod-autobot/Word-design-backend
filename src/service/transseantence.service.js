const { Op, Sequelize } = require('sequelize');
const Sentence = require('../models/Sentence');

async function transSentence(word_text, order_word_id, translate_th) {

    try {

        const sentence_string = Array.isArray(word_text) ? word_text.join(' ') : word_text;

        const existingSentence = await Sentence.findOne({
            where: { word_order: JSON.stringify(order_word_id) },
        });

        if (existingSentence) {
            await existingSentence.update({
                sentence: sentence_string,
                translated_sentence: translate_th,
            });

            return existingSentence;
        } else {
            const sentence_th = await Sentence.create({
                sentence: sentence_string,
                word_order: order_word_id,
                translated_sentence: translate_th,
            });

            return sentence_th;
        }

    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = transSentence;