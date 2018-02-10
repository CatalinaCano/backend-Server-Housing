// Ruta Principal

// Importacion del Express
var express = require('express');
var app = express(); // Levantar la app


var Estudiante = require('../models/estudiante');

// Rutas
app.get('/todo/:busqueda', (req, res, next) => {

    var busqueda = req.params.busqueda;
    //Expresion regular para poder buscar
    var regex = new RegExp(busqueda, 'i');

    buscarEnEstudiante(busqueda, regex)
        .then(sedes => {
            res.status(202).json({
                ok: true,
                mensaje: 'Petición realizada correctamente',
                sedes: sedes
            }); // Todo se hizo corriendo correctamente
        });
});


function buscarEnEstudiante(busqueda, regex) {

    return new Promise((resolve, reject) => {
        Estudiante.find({ perteneceA: regex }, (err, sedes) => {
            if (err) {
                reject('Error al cargar las sedes de los estudiantes');
            } else {
                resolve(sedes)
            }
        });
    });


}

// Exporatacion para hacer uso de ella en cualquier modulo
module.exports = app;