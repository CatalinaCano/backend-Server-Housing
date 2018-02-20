var express = require('express');
var app = express();

var Estudiante = require('../models/estudiante');


var GoogleAuth = require('google-auth-library');
var auth = new GoogleAuth;


const GOOGLE_CLIENT_ID = require('../config/config').GOOGLE_CLIENT_ID;
const GOOGLE_SECRET = require('../config/config').GOOGLE_SECRET;
const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjNlMTg3MTc3Zjk5ODdjMTkxMDg1MTA3ZjY4M2E2ZWEyNzdhZmJjOGQifQ.eyJhenAiOiI0MzAyOTQzMzQyMzUtYWIwdDFiMWU0NWJtbDIxM2s4MmxsZDQ2bmcxczlkZmsuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0MzAyOTQzMzQyMzUtYWIwdDFiMWU0NWJtbDIxM2s4MmxsZDQ2bmcxczlkZmsuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDU0NzM2NzE2MjkzNzAwMzAxMzMiLCJlbWFpbCI6ImNmcmlhbm9jMDExOEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IkdrNFJ0WEFmV2NhblNlUUJPdzNRcGciLCJleHAiOjE1MTkwOTU1ODksImlzcyI6ImFjY291bnRzLmdvb2dsZS5jb20iLCJqdGkiOiIxMGNiMjAyZDAyMzRhZjc1YWY0OWFiNThhNjY2ZmIzODcwNTZmYTM2IiwiaWF0IjoxNTE5MDkxOTg5LCJuYW1lIjoiQ3Jpc3RoaWFuIFJpYcOxbyIsInBpY3R1cmUiOiJodHRwczovL2xoNS5nb29nbGV1c2VyY29udGVudC5jb20vLXhlRy02d0FxQlZrL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUI0L2VneTJCTnNzV1NRL3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJDcmlzdGhpYW4iLCJmYW1pbHlfbmFtZSI6IlJpYcOxbyIsImxvY2FsZSI6ImVzLTQxOSJ9.GFUEd7E9bYeMOwhJLxUjWZh5ZW21a9jZbdffzN1j6LdwNs4MiMXx3t_x6uPySF6nXrCjJBvxOxvVTYuyfm_bW5R9EoTVMoRxmhWqoYsqKFsRB_Fkua3djZ_iZkAJBbNgc99Fq0Ltg2tceVCP7DnZFOH8d2NbgmDib6-pLYzHSzwpv64D6_-2C9-A6E8kSuq5lNsdHrWfhf92E_WB-97VLpzj2HaZ2mBgFBEgCjgA2Ejjaa4AlazyVl90-NqpWNgKr9jMechgNh452XoRmfTAwFcRa4UtImfC6th3QC4leVGDuDMKQ0GkeFkDK-UHXQbJJau-mbVB-vz2ilEMhIdxvw';
var client = new auth.OAuth2(GOOGLE_CLIENT_ID, '', '');

app.post('/google', (req, res) => {
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

            // If request specified a G Suite domain:
            //var domain = payload['hd'];
        });

});

/*app.post('/', (req, res) => {
    var token = req.body.token || 'XXX';
    var client = new auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_SECRET, '');
    console.log(token);
    client.verifyIdToken(
        token,
        GOOGLE_CLIENT_ID,
        function(e, login) {

            if (e) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Token no valido',
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
                    estudianteBD: estudianteBD
                });

            });
        });
});

/*
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

});*/

module.exports = app;