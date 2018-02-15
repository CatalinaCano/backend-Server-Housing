// Importacion del Express
var express = require('express');
var app = express(); // Levantar la app

//Importar modelo Estudiante
var Estudiante = require('../models/estudiante');

var GoogleAuth = require('google-auth-library');
var { google } = require('googleapis');
var OAuth2 = google.auth.OAuth2;

const GOOGLE_CLIENT_ID = require('../config/config').GOOGLE_CLIENT_ID;
const GOOGLE_SECRET = require('../config/config').GOOGLE_SECRET;

// Autenticacion de google
app.post('/google', (req, res, next) => {

    var token = req.body.token || 'XXX';

    var oauth2Client = new OAuth2(GOOGLE_CLIENT_ID, GOOGLE_SECRET, '');

    oauth2Client.verifyIdToken({
            idToken: token,
            audience: GOOGLE_CLIENT_ID
        },
        function(e, login) {

            if (error) return console.error(error);
            var payload = login.getPayload();
            var userid = payload['sub'];


            res.status(200).json({
                ok: true,
                payload: payload
            });

        }
    )

});



app.post('/', (req, res) => {
    var body = req.body;
    Estudiante.findOne({ email: body.email }, (err, estudianteEncontrado) => {
        if (err) {
            return res
                .status(500)
                .json({
                    ok: false,
                    mensaje: 'Error al encontrar estudiante',
                    errors: err
                });
        }
        if (!estudianteEncontrado) {
            return res
                .status(400)
                .json({
                    ok: false,
                    mensaje: 'Correo incorrecto ',
                    errors: err
                });
        }
        return res
            .status(200)
            .json({
                ok: true,
                mensaje: 'Se encontro el estudiante',
                estudianteEncontrado: estudianteEncontrado
            });
    });

});







module.exports = app;