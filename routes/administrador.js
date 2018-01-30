// Importacion del Express
var express = require('express');
var app = express(); // Levantar la app

//Importar modelo de  Administrador
var Administrador = require('../models/administrador')

// Rutas


//Metodo para obtener consultas
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

app.post('/', (req, res) => {
    var body = req.body;
    //Definicion para crear un nuevo usuario
    var administrador = new Administrador({
        nombre: body.nombre,
        email: body.email,
        password: body.password,
        role: body.role
    });
    //metodo para guardar nuevo usuario
    administrador.save((err, administradorGuardado) => {
        if (err) {

            return res.status(500).json({
                ok: false,
                mensaje: 'Error al guardar admin',
                error: err

            });
        }
        res.status(201).json({
            ok: true,
            mensaje: 'Admin guardado con exito',
            administradorGuardado: administradorGuardado
        })


    });
});

// Exporatacion para hacer uso de ella en cualquier modulo
module.exports = app;