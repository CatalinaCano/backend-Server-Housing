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
app.post('/enEstudio/:correo', (req, res, next) => {
    var correoEstudiante = req.params.correo;

    const mailOptions = {
        from: 'HousingUD ' + MAIL_ADMIN,
        to: correoEstudiante,
        subject: 'Alojamiento Registrado Exitosamente',
        html: '<h1>Felicidades!!!</h1><p>Nos complace informarte que tu alojamiento,ha sido registrado exitosamente. En el momento en que el administrador lo verifique recibiras un correo informando el nuevo estado del alojamiento.</p> <br> Cordialmente, <br> Administrador Housing UD '
    };

    transporter.sendMail(mailOptions, function(err, info) {
        if (err)
            return res.status(505).json({
                ok: false,
                mensaje: 'La Petición no pudo ser realizada correctamente',
                err: err
            });
        else
            return res.status(202).json({
                ok: true,
                mensaje: 'Petición realizada correctamente'
            });
    });


});

// Exporatacion para hacer uso de ella en cualquier modulo
module.exports = app;