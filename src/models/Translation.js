const { Sequelize } = require('sequelize');
const database_conn = require('../config/database');
const Word = require('./Word.js');

const Translation = database_conn.define('Translation', {
    translation_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    word_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Word,
            key: 'word_id'
        }
    },
    meaning: {
        type: Sequelize.STRING,
        allowNull: true,
    }
});

module.exports = Translation;