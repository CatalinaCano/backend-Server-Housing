var express = require('express');
var app = express();

var Estudiante = require('../models/estudiante');


var GoogleAuth = require('google-auth-library');
var auth = new GoogleAuth;


const GOOGLE_CLIENT_ID = require('../config/config').GOOGLE_CLIENT_ID;
const GOOGLE_SECRET = require('../config/config').GOOGLE_SECRET;


var client = new auth.OAuth2(GOOGLE_CLIENT_ID, '', '');

app.post('/google', (req, res) => {
    var token = req.body.token || 'XXX';
    var imagen = '';
    client.verifyIdToken(
        token,
        GOOGLE_CLIENT_ID,
        function(e, login) {
            if (e) {
                return res.status(200).json({
                    ok: false,
                    e: e
                });
            }
            var payload = login.getPayload();
            var userid = payload['sub'];

            Estudiante.findOne({ email: payload.email }, (e, estudianteBD) => {
                if (e) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Correo no registrado en la BD',
                        token: null,
                        e: e
                    });
                }

                res.status(200).json({
                    ok: true,
                    mensaje: 'Se encontro el correo en la BD',
                    token: token,
                    imagenUsuario: payload.picture,
                    estudianteBD: estudianteBD,
                    nombres: payload.given_name
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