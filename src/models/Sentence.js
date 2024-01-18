const { Sequelize } = require('sequelize');
const database_conn = require('../config/database');

const Sentence = database_conn.define('Sentence', {
    sentence_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    sentence: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    translated_sentence: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    word_order: {
        type: Sequelize.TEXT,
        allowNull: true,
        get() {
            const rawValue = this.getDataValue('word_order');
            return rawValue ? JSON.parse(rawValue) : null;
        },
        set(value) {
            this.setDataValue('word_order', value ? JSON.stringify(value) : null);
        }
    }
});

module.exports = Sentence;