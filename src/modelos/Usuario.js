const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.sequelize.define(
    'usuarios',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        correo: Sequelize.STRING,
        clave: Sequelize.STRING,
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    },
    {
        timestamps: false
    }
)