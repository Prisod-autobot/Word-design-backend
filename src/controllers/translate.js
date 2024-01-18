const express = require('express');
const router = express.Router();

const newWord = require('../service/translate.service');
const thaiLanguage = require('../service/newlanguage.service');
const findAll = require('../service/findWord.service');
const transSentence = require('../service/transseantence.service');
const findArrayData = require('../service/findArray.service');
const findArrayDataEx = require('../service/ex.service');
const findTranslateThai = require('../service/translateArray.service');
const combineArrays = require('../service/combineArray.service');
const allTrans = require('../service/allTran.service');

router.get('/', (req, res) => {
    return res.send('Hello, world!');
});

router.post('/sentence', async (req, res) => {
    const sentence = req.body.sentence;
    const result = await newWord(sentence);
    res.status(200).send(result);
});

router.post('/findall', async (req, res) => {
    const arr_id = req.body.arr_id.arr_sentences;
    const wordIds = arr_id.map(item => item.word_id);
    const result = await findAll(wordIds);
    res.status(200).send(result);
});

router.post('/thaiwords', async (req, res) => {
    const thaiWord = req.body.thaiWord;
    const engWordId = req.body.engWordId;
    const result = await thaiLanguage(thaiWord, engWordId);
    res.status(200).send(result);
});

router.post('/translatesentence', async (req, res) => {
    const word_text = req.body.engText;
    const order_word_id = req.body.order_word_id;
    const translate_th = req.body.sentence_translate;

    const result = await transSentence(word_text, order_word_id, translate_th);
    res.status(200).send(result);
});

router.post('/find-translations-set', async (req, res) => {
    const word_id = req.body.arr_set.arr_sentences;
    const word_set = word_id.map(item => item.word_id);
    const arr_set = await findArrayDataEx(word_set);
    // Combine for what??
    const fuq_fuq = combineArrays(arr_set, word_set);
    const le_festin = await allTrans(fuq_fuq);
    const result = await findTranslateThai(arr_set);
    const hanabi_hi = ({ trans_all_word: le_festin });

    res.status(200).send({ result, hanabi_hi });
});

module.exports = router;