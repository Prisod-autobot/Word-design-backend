const { Sequelize } = require('sequelize');
const database_conn = require('../config/database');

const Word = database_conn.define('Word', {
    word_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    word: {
        type: Sequelize.STRING,
        allowNull: 'compositeIndex',
    },
    pos: {
        type: Sequelize.STRING,
        allowNull: 'compositeIndex',
    },
    meaning: {
        type: Sequelize.STRING,
        allowNull: true,
    }
}
);

module.exports = Word;