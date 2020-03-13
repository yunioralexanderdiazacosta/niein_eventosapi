const Sequelize = require('sequelize')
const db= {}
const sequelize = new Sequelize('niein_eventos', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-04:00'
})

db.sequelize = sequelize
db.Sequelize = Sequelize

sequelize.authenticate()
.then(() => {
    console.log('DB Conectada')
})
.catch(err => {
    console.log("DB No Conectada")
})
module.exports = db