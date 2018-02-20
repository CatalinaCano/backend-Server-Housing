var express = require('express');
var app = express();

var Estudiante = require('../models/estudiante');


var GoogleAuth = require('google-auth-library');
var auth = new GoogleAuth;


const GOOGLE_CLIENT_ID = require('../config/config').GOOGLE_CLIENT_ID;
const GOOGLE_SECRET = require('../config/config').GOOGLE_SECRET;

//const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjNlMTg3MTc3Zjk5ODdjMTkxMDg1MTA3ZjY4M2E2ZWEyNzdhZmJjOGQifQ.eyJhenAiOiI0MzAyOTQzMzQyMzUtYWIwdDFiMWU0NWJtbDIxM2s4MmxsZDQ2bmcxczlkZmsuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0MzAyOTQzMzQyMzUtYWIwdDFiMWU0NWJtbDIxM2s4MmxsZDQ2bmcxczlkZmsuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDc2MjkyNTM1ODY3MzM2MjAxMjkiLCJlbWFpbCI6ImNhdGFsaW5hY2FubzA4QGhvdG1haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiI1d19TWVl3aFJEc3VXbmVuMU5YLXdnIiwiZXhwIjoxNTE5MTAwMTQ2LCJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwianRpIjoiODI5ZDRlMzI2YjRhZDAwN2JmMDliNjEzNmZkZmI5OTUyZWQ0N2YzZSIsImlhdCI6MTUxOTA5NjU0NiwibmFtZSI6IkNhdGFsaW5hIENhbm8iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy12LTRaNzRfOTh0MC9BQUFBQUFBQUFBSS9BQUFBQUFBQUttdy9TUXVVaVgzV1NXay9zOTYtYy9waG90by5qcGciLCJnaXZlbl9uYW1lIjoiQ2F0YWxpbmEiLCJmYW1pbHlfbmFtZSI6IkNhbm8iLCJsb2NhbGUiOiJlcyJ9.GN81V3ShHjMU0FwYQzXpE-cqznAzcjr9is4TreoQR_-4jMW24HGTjFw7MuAUSTmKxZ9Azj4rkkGyCj_2PblVBflWoCFTBIfXXHB3kFEmx3469MAJ4utqLeNMRvLiA5E93pKVLJe2eYusLz1H_oyPvbp62A96UF8IomaU9QrdIwHoOROx03X6f0vRbwwHRN6MDhDAFzOlo6p8WcZRtVf6VMAEz2fh2da_UqGr5ZrPDr_ssXBXkEYpFaVJcppbbNw5x41j7WNLAf8IRUL7nfWmz1xXeescGm06w9qdQEj7Ft9jpiYMQWdXTp7toXfEqfy2_iucPbdqeBGdsmLQkO7Gxw';
var client = new auth.OAuth2(GOOGLE_CLIENT_ID, '', '');

app.post('/google', (req, res) => {
    var token = req.body.token || 'XXX';
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
                        e: e
                    });
                }

                res.status(200).json({
                    ok: true,
                    mensaje: 'Se encontro el correo en la BD',
                    token: token,
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