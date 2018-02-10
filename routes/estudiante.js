// Importacion del Express
var express = require('express');
var app = express(); // Levantar la app

//Importar modelo Estudiante
var Estudiante = require('../models/estudiante');

//Consultar Estudiantes
app.get('/', (req, res) => {
    //Paginacion 
    var desde = req.query.desde || 0;
    desde = Number(desde);

    Estudiante.find({})
        .skip(desde)
        .limit(5)
        .exec((err, estudiantes) => {
            if (err) {
                return res
                    .status(500)
                    .json({
                        ok: false,
                        mensaje: 'Error al consultar estudiantes',
                        errors: err
                    });
            }

            Estudiante.count({}, (err, total) => {
                res.status(200).json({
                    ok: true,
                    mensaje: 'Consulta de estudiantes exitosa',
                    estudiantes: estudiantes,
                    total: total
                });
            })
        });
});


// Crear Estudiante
app.post('/', (req, res) => {
    var body = req.body;
    //Definicion para crear un nuevo usuario
    var estudiante = new Estudiante({
        sobreMi: body.sobreMi,
        perteneceA: body.perteneceA,
        role: body.role,
        email: body.email
    });
    //metodo para guardar nuevo usuario
    estudiante.save((err, estudianteGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al Guardar Estudiante',
                error: err
            });
        }
        res.status(201).json({
            ok: true,
            mensaje: 'Estudiante Guardado con Éxito',
            estudianteGuardado: estudianteGuardado
        });
    });
});


// Actualizar Estudiante
//id: variable para capturar el id del estudiante
app.put('/:id', (req, res) => {
    var id = req.params.id;
    Estudiante.findById(id, (err, estudiante) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'fallo al buscar estudiante',
                errors: err

            });
        }
        if (!estudiante) {
            res.status(400).json({
                ok: true,
                mensaje: 'El Estudiante con id ' + id + ' no existe',
            })
        }
        //listos para actualizar la data
        var body = req.body;
        estudiante.sobreMi = body.sobreMi;
        estudiante.save((err, estudianteGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'error al actualizar el estudiante',
                    error: err
                });

            }
            return res
                .status(200)
                .json({
                    ok: true,
                    mensaje: "estudiante actualizado correctamente",
                    estudianteGuardado: estudianteGuardado
                });
        });
    });
});






// Exporatacion para hacer uso de ella en cualquier modulo
module.exports = app;