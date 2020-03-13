const express = require('express')
const usuarios = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../config')

const Usuario = require('../modelos/Usuario')

 /*  REGISTRO DE USUARIOS */
 usuarios.post('/registro', (req, res) => {
     const dia = new Date
     const datos = {
         correo: req.body.correo,
         clave: req.body.clave,
         created_at: dia
     }

     Usuario.findOne({
         where: {
             correo: datos.correo 
         }
     })
     .then(user => {
         if(!user){
             const hash = bcrypt.hashSync(datos.clave, 10)
             datos.clave = hash
             Usuario.create(datos)
             .then(
                 res.status(200).json({mensaje: 'Usuario registrado satisfactoriamente'})
             )
             .catch(err => {
                 res.send('err', + err)
             })
         }
         else{
             res.status(405).send('El correo electrónico ya se encuentra registrado')
         }
     })
     .catch(err => {
         res.status(500).send(err)
     })
 })
 /* </> */

 /* INICIO DE SESION DE USUARIOS */
 usuarios.post('/login', (req, res) => {
     Usuario.findOne({
         where: {
             correo: req.body.correo
         }
     })
     .then(user => {
         if(!user){
             res.status(405).send('Usuario y/o contraseña incorrectos')
         }
         else{
             if(bcrypt.compareSync(req.body.clave, user.clave)){
                 let token = jwt.sign(user.dataValues, config.SECRET_KEY, {
                     expiresIn: 60*60*24
                 })
                 res.json({ token: token })
             }
             else{
                 res.status(405).send('Correo y/o contraseña incorrectos')
             }
             
         }
     })
     .catch(err => {
         res.status(500)
         console.log("error: ", err)
     })
 })
 /* </> */

 module.exports = usuarios