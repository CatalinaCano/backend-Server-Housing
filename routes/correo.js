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



app.post('/rechazado', (req, res, next) => {
    var observaciones = req.body.observaciones;
    var correoEstudiante = req.body.email;
    const mailOptions = {
        from: 'HousingUD ' + MAIL_ADMIN,
        to: correoEstudiante,
        subject: 'Alojamiento Rechazado',
        html: '<h1>Lo sentimos!</h1><p>Lamentamos informarte que tu alojamiento,ha sido rechazado. El administrador tiene las siguientes observaciones para ti:</p> ' + observaciones + '<p> Cordialmente, <br> Administrador Housing UD </p>'
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

app.post('/aceptado', (req, res, next) => {
    var observaciones = req.body.observaciones;
    var correoEstudiante = req.body.email;
    const mailOptions = {
        from: 'HousingUD ' + MAIL_ADMIN,
        to: correoEstudiante,
        subject: 'Alojamiento Aceptado',
        html: '<h1>Felicidades!!!</h1><p>Hola, nos complace informarte que tu alojamiento,ha sido aceptado. El administrador tiene las siguientes observaciones para ti:</p> ' + observaciones + '<p> Cordialmente, <br> Administrador Housing UD </p>'
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


app.post('/eliminado/:correo', (req, res, next) => {
    var correoEstudiante = req.params.correo;
    const mailOptions = {
        from: 'HousingUD ' + MAIL_ADMIN,
        to: correoEstudiante,
        subject: 'Alojamiento Eliminado',
        html: '<h1>Lo Sentimos!!!</h1><p>lamentamos informarte que el administrador de Housing ha eliminado tu alojamiento dentro del sistema. Si tienes alguna novedad al respecto te invitamos acercarte al CERI. </p>  Cordialmente, <br> Administrador Housing UD </p>'
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

app.post('/disponible/:correo', (req, res, next) => {
    var correoEstudiante = req.params.correo;
    const mailOptions = {
        from: 'HousingUD ' + MAIL_ADMIN,
        to: correoEstudiante,
        subject: 'Alojamiento Disponible',
        html: '<h1>Atención!!</h1><p>Te informarmamos que el administrador de Housing ha notificado que tu alojamiento se encuentra <strong>DISPONIBLE</strong>  dentro del sistema. Si tienes alguna novedad al respecto te invitamos acercarte al CERI. </p>  Cordialmente, <br> Administrador Housing UD </p>'
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

app.post('/ocupado/:correo', (req, res, next) => {
    var correoEstudiante = req.params.correo;
    const mailOptions = {
        from: 'HousingUD ' + MAIL_ADMIN,
        to: correoEstudiante,
        subject: 'Alojamiento Eliminado',
        html: '<h1>Atención!!</h1><p>Te informarmamos que el administrador de Housing ha notificado que tu alojamiento se encuentra <strong>OCUPADO</strong> dentro del sistema. Si tienes alguna novedad al respecto te invitamos acercarte al CERI. </p>  Cordialmente, <br> Administrador Housing UD </p>'
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