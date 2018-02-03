// Importacion del Express
var express = require('express');
var app = express(); // Levantar la app

//Importar modelo Estudiante
var Estudiante = require('../models/estudiante');


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