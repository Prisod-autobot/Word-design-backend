const { literal, Sequelize } = require('sequelize');
const Sentence = require('../models/Sentence');

async function checkFirstSSR(arr_id) {
    if (arr_id.length === 1) {
        const query = await Sentence.findAll({
            attributes: [[literal('JSON_UNQUOTE(JSON_EXTRACT(word_order, "$[0]"))'), 'first_word']],
            order: [[Sequelize.fn('length', Sequelize.col('word_order')), 'DESC']],
        });

        const arr_first = query.map(item => Number(item.get('first_word')));
        const result = arr_first.some(boi => arr_id.includes(boi));
        return !!result;
    }
    return false;
}

async function findSSR(arr_id) {
    const result = await Sentence.findOne({
        where: { word_order: JSON.stringify(arr_id) },
    });
    return !!result;
}

async function findArrayData(dataToFind) {
    try {
        const rows = await Sentence.findAll({
            attributes: ['word_order'],
            raw: true,
            order: [[Sequelize.fn('length', Sequelize.col('word_order')), 'DESC']]
        });

        const check_arr = [];

        for (const row of rows) {
            const wordOrderArray = JSON.parse(row.word_order);

            let stacks = [];
            let match_arr = [];
            let check = false;

            for (const item of wordOrderArray) {

                if (dataToFind.includes(item)) {
                    check = true;
                    match_arr.push(item);

                    if (stacks.length > 0) {
                        stacks.push(item);
                        const word_check = await findSSR(stacks);

                        if (word_check) {
                            check_arr.push(stacks);
                            stacks = [];
                        }
                    } else if (stacks.length === 0) {
                        const check_first = await checkFirstSSR(match_arr);

                        if (!check_first) {
                            match_arr = [];
                        } else {
                            stacks.push(item);
                            match_arr = [];
                        }
                    }
                } else {
                    check = false;
                    if (stacks.length > 0) {
                        const word_check = await findSSR(stacks);
                        if (word_check) {
                            check_arr.push(stacks);
                        }
                        stacks = [];
                    }
                }
            }

            if (stacks.length > 0) {
                const word_check = await findSSR(stacks);
                if (word_check) {
                    check_arr.push(stacks);
                }
            }
        }

        return check_arr;
    } catch (error) {
        console.error(error);
    }
}

module.exports = findArrayData;