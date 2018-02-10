// Ruta Principal

// Importacion del Express
var express = require('express');
var app = express(); // Levantar la app


var Estudiante = require('../models/estudiante');
var Alojamiento = require('../models/alojamiento');

// Rutas
app.get('/todo/:busqueda', (req, res, next) => {

    var busqueda = req.params.busqueda;
    //Expresion regular para poder buscar
    var regex = new RegExp(busqueda, 'i');
    var desde = req.query.desde || 0;
    desde = Number(desde);


    Promise.all([
            buscarEnEstudiante(busqueda, regex),
            buscarEnAlojamientoDisponibleyAceptado(busqueda, regex)
        ])
        .then(respuestas => {
            res.status(202).json({
                ok: true,
                mensaje: 'Petición realizada correctamente',
                sedes: respuestas[0],
                alojamientos: respuestas[1]
            }); // Todo se hizo corriendo correctamente
        })
});


function buscarEnEstudiante(busqueda, regex) {
    return new Promise((resolve, reject) => {
        Estudiante.find({ perteneceA: regex }, (err, sedes) => {
            if (err) {
                reject('Error al cargar las sedes de los estudiantes');
            } else {
                resolve(sedes);
            }
        });
    });
}

function buscarEnAlojamientoDisponibleyAceptado(busqueda, regex, desde) {
    return new Promise((resolve, reject) => {
        Alojamiento.find({ 'propiedadesAlojamiento.estadoAlojamiento': 'Disponible', 'propiedadesAlojamiento.estadoPublicacionAlojamiento': 'Aceptado' })
            .populate('estudiante', 'role email')
            .skip(desde)
            .limit(5)
            .or([{ 'sedeCercana': regex }, { 'hospedanA': regex }, { 'propiedadesAlojamiento.tipoVivienda': regex }, { 'propiedadesAlojamiento.tipoHabitacion': regex }])
            .exec((err, alojamientos) => {
                if (err) {
                    reject('Erro al cargar alojamientos');
                } else {

                    Alojamiento.count({}, (err, total) => {
                        resolve(alojamientos, total);
                    })
                }
            })
    });
}

// Exporatacion para hacer uso de ella en cualquier modulo
module.exports = app;