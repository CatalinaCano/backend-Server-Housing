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

            return res.status(400).json({
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

// Actualizar Usuario
//id: variable para capturar un usuario
app.put('/:id', (req, res) => {
    var id = req.params.id;
    Administrador.findById(id, (err, administrador) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'fallo al buscar admon',
                errors: err

            });
        }
        if (!administrador) {
            res.status(400).json({
                ok: true,
                mensaje: 'El administrador con id ' + id + ' no existe',
            })
        }
        //listos para actualizar la data
        var body = req.body;
        administrador.nombre = body.nombre;
        administrador.save((err, administradorGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'error al actualizar el admon',
                    error: err
                });

            }
            administradorGuardado.password = ':)';
            return res.status(200).json({
                ok: true,
                mensaje: 'admin actualizado correctamente',
                administradorGuardado: administradorGuardado

            });

        });


    });




});

// Eliminar Administrador
app.delete('/:id', (req, res) => {
    var id = req.params.id;
    Administrador.findByIdAndRemove(id, (err, administradorBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al eliminar administrador',
                errors: err

            });

        }
        if (!administradorBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'no existe administrador con ese id ',
                errors: err

            });
        }






        return res.status(200).json({
            ok: true,
            mensaje: 'administrador eliminado correctamente',
            administradorBorrado: administradorBorrado

        });


    });


});


// Exporatacion para hacer uso de ella en cualquier modulo
module.exports = app;