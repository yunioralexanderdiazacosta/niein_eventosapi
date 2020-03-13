const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const config = require('./config')
const port = process.env.port || 3000

//Configuración
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//Rutas
app.use('/api/usuarios', require('./rutas/usuarios'))

app.listen(port, () => {
    console.log("Servidor ejecutandose en el puerto: ", port)
})
