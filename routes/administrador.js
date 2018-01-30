// Importacion del Express
var express = require('express');
var app = express(); // Levantar la app

//Importar modelo de  Administrador
var Administrador = require('../models/administrador')

// Rutas
app.get('/', (req, res, next) => {

    Administrador.find({},
            'nombre email role')
        .exec((err, administradores) => {
            if (err) {
                return res
                    .status(500)
                    .json({
                        ok: false,
                        mensaje: "Error cargando administradores",
                        errors: err
                    });
            }
            res
                .status(200)
                .json({
                    ok: true,
                    mensaje: "usuarios correctos",
                    administradores: administradores
                });
        });

});

// Exporatacion para hacer uso de ella en cualquier modulo
module.exports = app;