// Ruta Principal

// Importacion del Express
var express = require('express');
var app = express(); // Levantar la app


var Estudiante = require('../models/estudiante');
var Alojamiento = require('../models/alojamiento');

// Busqueda por todo
app.get('/todo/:busqueda', (req, res, next) => {

    var busqueda = req.params.busqueda;
    //Expresion regular para poder buscar sin que se afecteen mayusculas y minusculas
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

// Busqueda de alojamientos Disponibles y aceptados para la galeria
app.get('/galeria', (req, res, next) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);
    Promise.all([
            buscarAlojamientosGaleria(desde)
        ])
        .then(respuestas => {
            res.status(202).json({
                ok: true,
                mensaje: 'Petición realizada correctamente - alojamientos de la galeria',
                alojamientosGaleria: respuestas[0]
            }); // Todo se hizo corriendo correctamente
        })
});

// Busqueda de todos los alojamientos
app.get('/admin/alojamientos', (req, res, next) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);
    Promise.all([
            buscarAlojamientos(desde)
        ])
        .then(respuestas => {
            res.status(202).json({
                ok: true,
                mensaje: 'Petición realizada correctamente - alojamientos de la galeria',
                totalAlojamientos: respuestas[0]
            }); // Todo se hizo corriendo correctamente
        })
});


// Busqueda de Estadisticas
app.get('/estadisticas', (req, res, next) => {
    Promise.all([
            buscarCantidadAlojamientos(),
            buscarCantidadAlojamientosDisponibles(),
            buscarCantidadAlojamientosAceptados(),
            buscarCantidadAlojamientosPorAprobar()
        ])
        .then(respuestas => {
            res.status(202).json({
                ok: true,
                mensaje: 'Petición realizada correctamente-estadisticas',
                cantidadAlojamientos: respuestas[0],
                alojamientosDisponibles: respuestas[1],
                alojamientosAceptados: respuestas[2],
                alojamientosPorAprobar: respuestas[3]
            }); // Todo se hizo corriendo correctamente
        })
});



// Busqueda a nivel de alojamiento

app.get('/alojamientos/:sede/:hospedan/:hospedaje/:habitacion', (req, res) => {
    var sede = req.params.sede;
    var hospedan = req.params.hospedan;
    var hospedaje = req.params.hospedaje;
    var habitacion = req.params.habitacion;

    Promise.all([
            buscarEnAlojamientoFiltro(sede, hospedan, hospedaje, habitacion)
        ])
        .then(respuestas => {
            res.status(202).json({
                ok: true,
                mensaje: 'Petición realizada correctamente - para el filtro',
                alojamientos: respuestas[0]
            }); // Todo se hizo corriendo correctamente
        })
});


// Busqueda en simultanea de administrador
// Busqueda por todo

// /new?portfolioId&param1&param2
app.get('/admin', (req, res, next) => {

    var sede = req.params('sede');
    var hospedanA = req.params('hospedanA');
    var estadoAlojamiento = req.params('estadoAlojamiento');
    var estadoPublicacionAlojamiento = req.params('estadoPublicacionAlojamiento');
    var desde = req.query.desde || 0;
    desde = Number(desde);


    Promise.all([
            buscarPorSedeAlojamiento(sede, desde),
            buscarPorTipoPersona(hospedanA, desde),
            buscarPorEstadosAlojamiento(hospedanA, desde),
            buscarPorEstadosPublicacionAlojamiento(hospedanA, desde)
        ])
        .then(respuestas => {
            res.status(202).json({
                ok: true,
                mensaje: 'Petición realizada correctamente - admin',
                sedesAlojamientos: respuestas[0],
                tipoPersonas: respuestas[1],
                estadosAlojamientos: respuestas[2],
                estadosPublicacionAlojamiento: respuestas[3]

            }); // Todo se hizo corriendo correctamente
        })
});


app.get('/alojamiento/:idAlojamiento', (req, res) => {
    var alojamientoid = req.params.idAlojamiento;
    console.log(alojamientoid);

    Alojamiento.findById(alojamientoid, (err, alojamientoBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'fallo al buscar alojamiento',
                errors: err

            });
        }
        if (!alojamientoBD) {
            return res.status(400).json({
                ok: true,
                mensaje: 'El alojamiento con id ' + idAlojamiento + ' no existe',
            });
        }

        return res.status(200).json({
            ok: true,
            mensaje: 'Alojamiento encontrado con exito',
            alojamientoBD: alojamientoBD
        });
    });


    /*Alojamiento.findById(alojamientoid, (err, alojamiento) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'fallo al buscar alojamiento',
                errors: err

            });
        }
        if (!alojamiento) {
            return res.status(400).json({
                ok: true,
                mensaje: 'El alojamiento con id ' + idAlojamiento + ' no existe',
            })
        }
        return alojamiento;
    });*/
});


function buscarPorTipoPersona(hospedanA, desde) {
    return new Promise((resolve, reject) => {
        Alojamiento.find({
                'hospedanA': hospedanA
            })
            .populate('estudiante', 'role email')
            .skip(desde)
            .limit(5)
            .exec((err, tipoPersonas) => {
                if (err) {
                    reject('Erro al cargar alojamientos');
                } else {

                    Alojamiento.count({}, (err, total) => {
                        resolve(tipoPersonas, total);
                    })
                }
            })
    });
}

function buscarPorSedeAlojamiento(sede, desde) {
    return new Promise((resolve, reject) => {
        Alojamiento.find({ 'sedeCercana': sede })
            .populate('estudiante', 'role email')
            .skip(desde)
            .limit(5)
            .exec((err, sedesAlojamientos) => {
                if (err) {
                    reject('Erro al cargar alojamientos');
                } else {

                    Alojamiento.count({}, (err, total) => {
                        resolve(sedesAlojamientos, total);
                    })
                }
            })
    });
}

function buscarPorEstadosAlojamiento(estadoAlojamiento, desde) {
    return new Promise((resolve, reject) => {
        Alojamiento.find({
                'estadoAlojamiento': estadoAlojamiento
            })
            .populate('estudiante', 'role email')
            .skip(desde)
            .limit(5)
            .exec((err, estadoAlojamiento) => {
                if (err) {
                    reject('Erro al cargar alojamientos');
                } else {

                    Alojamiento.count({}, (err, total) => {
                        resolve(estadoAlojamiento, total);
                    })
                }
            })
    });
}

function buscarPorEstadosPublicacionAlojamiento(estadoPublicacionAlojamiento, desde) {
    return new Promise((resolve, reject) => {
        Alojamiento.find({
                'estadoPublicacionAlojamiento': estadoPublicacionAlojamiento
            })
            .populate('estudiante', 'role email')
            .skip(desde)
            .limit(5)
            .exec((err, estadoPublicacionAlojamiento) => {
                if (err) {
                    reject('Erro al cargar alojamientos');
                } else {

                    Alojamiento.count({}, (err, total) => {
                        resolve(estadoPublicacionAlojamiento, total);
                    })
                }
            })
    });
}





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
            .or([{ 'sedeCercana': regex }, { 'hospedanA': regex }, { 'tipoVivienda': regex }, { 'tipoHabitacion': regex }])
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


function buscarAlojamientosGaleria(desde) {
    return new Promise((resolve, reject) => {
        Alojamiento.find({ 'propiedadesAlojamiento.estadoAlojamiento': 'Disponible', 'propiedadesAlojamiento.estadoPublicacionAlojamiento': 'Aceptado' })
            .populate('estudiante', 'role email')
            .skip(desde)
            .limit(5)
            .exec((err, alojamientosGaleria) => {
                if (err) {
                    reject('Erro al cargar alojamientos');
                } else {

                    Alojamiento.count({}, (err, total) => {
                        resolve(alojamientosGaleria, total);
                    })
                }
            })
    });
}


function buscarAlojamientos(desde) {
    return new Promise((resolve, reject) => {
        Alojamiento.find({})
            .populate('estudiante', 'role email')
            .skip(desde)
            .limit(5)
            .exec((err, totalAlojamientos) => {
                if (err) {
                    reject('Erro al cargar alojamientos');
                } else {

                    Alojamiento.count({}, (err, total) => {
                        resolve(totalAlojamientos, total);
                    })
                }
            })
    });
}

function buscarEnAlojamientoFiltro(sede, hospedan, hospedaje, habitacion, desde) {
    return new Promise((resolve, reject) => {
        Alojamiento.find({ 'propiedadesAlojamiento.estadoAlojamiento': 'Disponible', 'propiedadesAlojamiento.estadoPublicacionAlojamiento': 'Aceptado' })
            .populate('estudiante', 'role email')
            .skip(desde)
            .limit(5)
            .and([{ 'sedeCercana': sede }, { 'hospedanA': hospedan }, { 'tipoVivienda': hospedaje }, { 'tipoHabitacion': habitacion }])
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


function buscarCantidadAlojamientos() {
    return new Promise((resolve, reject) => {
        Alojamiento.count({}, (err, cantidadAlojamientos) => {
            if (err) {
                reject('Error al cargar las sedes de los estudiantes');
            } else {
                resolve(cantidadAlojamientos);
            }
        });
    });
}

function buscarCantidadAlojamientosDisponibles() {
    return new Promise((resolve, reject) => {
        Alojamiento.count({ 'propiedadesAlojamiento.estadoAlojamiento': 'Disponible' }, (err, alojamientosDisponibles) => {
            if (err) {
                reject('Error al cargar los alojamientos disponibles');
            } else {
                resolve(alojamientosDisponibles);
            }
        });
    });
}


function buscarCantidadAlojamientosAceptados() {
    return new Promise((resolve, reject) => {
        Alojamiento.count({ 'propiedadesAlojamiento.estadoPublicacionAlojamiento': 'Aceptado' }, (err, alojamientosAceptados) => {
            if (err) {
                reject('Error al cargar los alojamientos aprobados');
            } else {
                resolve(alojamientosAceptados);
            }
        });
    });
}

function buscarCantidadAlojamientosPorAprobar() {
    return new Promise((resolve, reject) => {
        Alojamiento.count({ 'propiedadesAlojamiento.estadoPublicacionAlojamiento': 'En estudio' }, (err, alojamientosPorAprobar) => {
            if (err) {
                reject('Error al cargar los alojamientos por aprobar');
            } else {
                resolve(alojamientosPorAprobar);
            }
        });
    });
}

// Exporatacion para hacer uso de ella en cualquier modulo
module.exports = app;