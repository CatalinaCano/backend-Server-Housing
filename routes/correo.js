var express = require('express');
var app = express(); // Levantar la app
var nodemailer = require('nodemailer');


const MAIL_ADMIN = require('../config/config').MAIL_ADMIN;
const PASSWORD_ADMIN = require('../config/config').PASSWORD_ADMIN;

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: MAIL_ADMIN,
        pass: PASSWORD_ADMIN
    }
});

// Rutas
app.get('/enEstudio/', (req, res, next) => {
    res.status(202).json({
        ok: true,
        mensaje: 'Petición realizada correctamente'
    }); // Todo se hizo corriendo correctamente
});

// Exporatacion para hacer uso de ella en cualquier modulo
module.exports = app;