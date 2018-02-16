// Importacion del Express
var express = require('express');
var app = express(); // Levantar la app

//Importar modelo Estudiante
var Estudiante = require('../models/estudiante');

var GoogleAuth = require('google-auth-library');
var auth = new GoogleAuth;

const GOOGLE_CLIENT_ID = require('../config/config').GOOGLE_CLIENT_ID;
const GOOGLE_SECRET = require('../config/config').GOOGLE_SECRET;

// Autenticacion de google
app.post('/google', (req, res) => {
    var token = req.params.token || 'XXX';
    var client = new auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_SECRET, '');
    client.verifyIdToken(
        token,
        GOOGLE_CLIENT_ID,
        function(e, login) {
            if (e) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Token no valido',
                    errors: e
                });
            }
            var payload = login.getPayload();
            var userid = payload['sub'];
            // If request specified a G Suite domain:
            //var domain = payload['hd'];

            Estudiante.findOne({ email: payload.email }, (err, estudianteBD) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Correo no registrado en la BD',
                        errors: err
                    });
                }
                res.status(200).json({
                    ok: true,
                    mensaje: 'Se encontro el correo en la BD',
                    estudianteBD: estudianteBD
                });

            });
        });
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