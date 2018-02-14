// Importacion del Express
var express = require('express');
//var formData = require('express-form-data');
var fileUpload = require('express-fileupload');
var app = express(); // Levantar la app



var nombresNuevos = [];
var path = [];
var archivo;

//Importar modelo de  Administrador
var Alojamiento = require('../models/alojamiento');


//Metodo para obtener  alojamientos
app.get('/', (req, res) => {
    //Paginacion 
    var desde = req.query.desde || 0;
    desde = Number(desde);

    Alojamiento.find({})
        .skip(desde)
        .limit(5)
        .populate('estudiante', 'role email')
        .exec((err, alojamientos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: "Error al consultar alojamientos",
                    errors: err
                });
            }
            Alojamiento.count({}, (err, total) => {
                res.status(200).json({
                    ok: true,
                    mensaje: "Consulta de alojamientos Exitosa",
                    alojamientos: alojamientos,
                    total: total
                });
            })
        });
});

app.use(fileUpload());

app.post('/:id', (req, res) => {

    var estudianteId = req.params.id;

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Debe seleccionar una imagen'
        });
    }

    var sala = req.files.imgSala;
    var banio = req.files.imgBanio;
    var cocina = req.files.imgCocina;
    var habitacion = req.files.imgHabitacion;
    var fachada = req.files.imgFachada;
    var imgs = [sala, banio, cocina, habitacion, fachada];

    var r = verificarExtension(imgs, estudianteId, res);

    if (r.indexOf('SI') < 0) {
        return res.status(400).json({
            ok: true,
            mensaje: ' imagenes no válidas'
        });
    }

    for (var x = 0; x < nombresNuevos.length; x++) {
        path.push(`./uploads/alojamientos/${nombresNuevos[x]}`);
        console.log(path[x]);
        imgs[x].mv(path[x], err => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al mover imagen',
                    err: err
                });
            }

            return res.status(200).json({
                ok: true,
                mensaje: 'lo logramos'
            });
        })
    }
});



function verificarExtension(imgs, id) {
    var extensionesValidas = ['jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'PNG'];
    var acep = [];
    for (var i = 0; i < imgs.length; i++) {
        archivo = imgs[i].name.split('.');
        if (extensionesValidas.indexOf(archivo[archivo.length - 1]) < 0) {
            acep.push('NO');
        } else {
            acep.push('SI');
            asignarNombreAleatorio(id, archivo[archivo.length - 1], i);

        }

    }
    return acep;
}

function asignarNombreAleatorio(id, extension, i) {
    nombresNuevos.push(`${id}-${new Date().getMilliseconds()}-${i}.${extension}`);
}


/*
// Crear Alojamiento
app.post('/:id', (req, res) => {
    var body = req.body;
    var idEstudiante = req.params.id;


    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Debe seleccionar una imagen'
        });
    }

    // Obtener el nombre del archivo
    var Sala = req.files.imgSala;
    var Banio = req.files.imgBanio;
    var Cocina = req.files.imgCocina;
    var Habitacion = req.files.imgHabitacion;
    var Fachada = req.files.imgFachada;




    //Definicion para crear un nuevo usuario
    var alojamiento = new Alojamiento({
        estudiante: idEstudiante,
        tipoVivienda: body.tipoVivienda,
        tipoHabitacion: body.tipoHabitacion,
        propiedadesAlojamiento: {
            descripcionAlojamiento: body.descripcionAlojamiento,
            clasificacionAlojamiento: body.clasificacionAlojamiento,
            estadoAlojamiento: body.estadoAlojamiento,
            estadoPublicacion: body.estadoPublicacion,
            fechaPublicacionAlojamiento: body.fechaPublicacionAlojamiento
        },

        sedeCercana: body.sedeCercana,
        hospedanA: body.hospedanA,

        ubicacion: {
            latitud: body.latitud,
            longitud: body.longitud,
            zona: body.zona
        },

        imagenes: {
            imgSala: Sala,
            imgBanio: Banio,
            imgCocina: Cocina,
            imgHabitacion: Habitacion,
            imgFachada: Fachada
        },

        mascota: {
            habitaMascota: body.habitaMascota,
            tipoMascota: body.tipoMascota
        },

        normasAlojamiento: {
            horaLlegada: body.horaLlegada,
            franjaLlegada: body.franjaLlegada,
            accesoOtrasPersonas: body.accesoOtrasPersonas,
            fiestasEventos: body.fiestasEventos,
            nivelVolumen: body.nivelVolumen,
            ritosExorcismosOrgias: body.ritosExorcismosOrgias,
            permiteConsumoAlcohol: body.permiteConsumoAlcohol,
            permiteConsumoDrogas: body.permiteConsumoDrogas
        },

        transporte: {
            publico: body.publico,
            bicicleta: body.bicicleta,
            taxi: body.taxi,
            caminando: body.caminando,
            metro: body.metro
        },

        lugaresCercanos: {
            centrosComerciales: body.centrosComerciales,
            museos: body.museos,
            restaurantes: body.restaurantes,
            bares: body.bares,
            iglesias: body.iglesias,
            hospitales: body.hospitales,
            teatros: body.teatros,
            parques: body.parques,
            zonasComerciales: body.zonasComerciales,
            zonasCulturales: body.zonasCulturales,
            gimnasio: body.gimnasio
        },

        servicios: {
            internet: body.internet,
            computador: body.computador,
            television: body.television,
            videoJuegos: body.videoJuegos,
            serviciosPublicos: body.serviciosPublicos,
            aguaCaliente: body.aguaCaliente,
            alimentacionIncluida: body.alimentacionIncluida,
            aseoHabitacion: body.aseoHabitacion,
            lavadoRopa: body.lavadoRopa,
            servicioTVCable: body.servicioTVCable,
            lavadora: body.lavadora,
            accesoLlaves: body.accesoLlaves,
            electrodomesticos: body.electrodomesticos,
            banioPrivado: body.banioPrivado,
            tipoCama: body.tipoCama,
            electrodomesticosDeCocina: body.electrodomesticosDeCocina,
            alarma: body.alarma,
            guardaRopa: body.guardaRopa
        },
        componentes: {
            numeroHabitaciones: body.numeroHabitaciones,
            cantidadBanios: body.cantidadBanios,
            accesoCocina: body.accesoCocina,
            espacioEstudio: body.espacioEstudio,
            sePermiteFumar: body.sePermiteFumar,
            espacioAireLibre: body.espacioAireLibre,
            accesoSala: body.accesoSala
        },

        costumbres: {
            habitosAlimenticios: body.habitosAlimenticios,
            consumoDrogas: body.consumoDrogas,
            consumoAlcohol: body.consumoAlcohol
        }
    });
    //metodo para guardar nuevo usuario
    alojamiento.save((err, alojamientoGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear Alojamiento',
                error: err
            });
        }
        res.status(201).json({
            ok: true,
            mensaje: 'Alojamiento creado con Éxito',
            alojamientoGuardado: alojamientoGuardado
        });
    });
});*/

// Actualizar alojamiento
//id: variable para capturar un usuario
app.put('/:id', (req, res) => {
    var id = req.params.id;
    Alojamiento.findById(id, (err, alojamiento) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'fallo al buscar alojamiento',
                errors: err

            });
        }
        if (!alojamiento) {
            res.status(400).json({
                ok: true,
                mensaje: 'El alojamiento con id ' + id + ' no existe',
            })
        }
        //listos para actualizar la data
        var body = req.body;
        alojamiento.tipoVivienda = body.tipoVivienda;
        alojamiento.tipoHabitacion = body.tipoHabitacion;

        alojamiento.propiedadesAlojamiento.descripcionAlojamiento = body.descripcionAlojamiento;
        alojamiento.propiedadesAlojamiento.clasificacionAlojamiento = body.clasificacionAlojamiento;
        alojamiento.propiedadesAlojamiento.estadoAlojamiento = body.estadoAlojamiento;
        alojamiento.propiedadesAlojamiento.estadoPublicacion = body.estadoPublicacion;
        alojamiento.propiedadesAlojamiento.fechaPublicacionAlojamiento = body.fechaPublicacionAlojamiento;

        alojamiento.sedeCercana = body.sedeCercana;
        alojamiento.hospedanA = body.hospedanA;

        alojamiento.ubicacion.latitud = body.latitud;
        alojamiento.ubicacion.longitud = body.longitud;
        alojamiento.ubicacion.zona = body.zona;

        alojamiento.imagenes.imgSala = body.imgSala;
        alojamiento.imagenes.imgBanio = body.imgBanio;
        alojamiento.imagenes.imgCocina = body.imgCocina;
        alojamiento.imagenes.imgHabitacion = body.imgHabitacion;
        alojamiento.imagenes.imgFachada = body.imgFachada;

        alojamiento.mascota.habitaMascota = body.habitaMascota;
        alojamiento.mascota.tipoMascota = body.tipoMascota;

        alojamiento.normasAlojamiento.horaLlegada = body.horaLlegada;
        alojamiento.normasAlojamiento.franjaLlegada = body.franjaLlegada;
        alojamiento.normasAlojamiento.accesoOtrasPersonas = body.accesoOtrasPersonas;
        alojamiento.normasAlojamiento.fiestasEventos = body.fiestasEventos;
        alojamiento.normasAlojamiento.nivelVolumen = body.nivelVolumen;
        alojamiento.normasAlojamiento.ritosExorcismosOrgias = body.ritosExorcismosOrgias;
        alojamiento.normasAlojamiento.permiteConsumoAlcohol = body.permiteConsumoAlcohol;
        alojamiento.normasAlojamiento.permiteConsumoDrogas = body.permiteConsumoDrogas;

        alojamiento.transporte.publico = body.publico;
        alojamiento.transporte.bicicleta = body.bicicleta;
        alojamiento.transporte.taxi = body.taxi;
        alojamiento.transporte.caminando = body.caminando;
        alojamiento.transporte.metro = body.metro;

        alojamiento.lugaresCercanos.centrosComerciales = body.centrosComerciales;
        alojamiento.lugaresCercanos.museos = body.museos;
        alojamiento.lugaresCercanos.restaurantes = body.restaurantes;
        alojamiento.lugaresCercanos.bares = body.bares;
        alojamiento.lugaresCercanos.iglesias = body.iglesias;
        alojamiento.lugaresCercanos.hospitales = body.hospitales;
        alojamiento.lugaresCercanos.teatros = body.teatros;
        alojamiento.lugaresCercanos.parques = body.parques;
        alojamiento.lugaresCercanos.zonasComerciales = body.zonasComerciales;
        alojamiento.lugaresCercanos.zonasCulturales = body.zonasCulturales;
        alojamiento.lugaresCercanos.gimnasio = body.gimnasio;

        alojamiento.servicios.internet = body.internet;
        alojamiento.servicios.computador = body.computador;
        alojamiento.servicios.television = body.television;
        alojamiento.servicios.videoJuegos = body.videoJuegos;
        alojamiento.servicios.serviciosPublicos = body.serviciosPublicos;
        alojamiento.servicios.aguaCaliente = body.aguaCaliente;
        alojamiento.servicios.alimentacionIncluida = body.alimentacionIncluida;
        alojamiento.servicios.aseoHabitacion = body.aseoHabitacion;
        alojamiento.servicios.lavadoRopa = body.lavadoRopa;
        alojamiento.servicios.servicioTVCable = body.servicioTVCable;
        alojamiento.servicios.lavadora = body.lavadora;
        alojamiento.servicios.accesoLlaves = body.accesoLlaves;
        alojamiento.servicios.electrodomesticos = body.electrodomesticos;
        alojamiento.servicios.banioPrivado = body.banioPrivado;
        alojamiento.servicios.tipoCama = body.tipoCama;
        alojamiento.servicios.electrodomesticosDeCocina = body.electrodomesticosDeCocina;
        alojamiento.servicios.alarma = body.alarma;
        alojamiento.servicios.guardaRopa = body.guardaRopa;

        alojamiento.componentes.numeroHabitaciones = body.numeroHabitaciones;
        alojamiento.componentes.cantidadBanios = body.cantidadBanios;
        alojamiento.componentes.accesoCocina = body.accesoCocina;
        alojamiento.componentes.espacioEstudio = body.espacioEstudio;
        alojamiento.componentes.sePermiteFumar = body.sePermiteFumar;
        alojamiento.componentes.espacioAireLibre = body.espacioAireLibre;
        alojamiento.componentes.accesoSala = body.accesoSala;

        alojamiento.costumbres.habitosAlimenticios = body.habitosAlimenticios;
        alojamiento.costumbres.consumoDrogas = body.consumoDrogas;
        alojamiento.costumbres.consumoAlcohol = body.consumoAlcohol;

        alojamiento.save((err, alojamientoGuardado) => {
            if (err) {
                return res
                    .status(400)
                    .json({
                        ok: false,
                        mensaje: "error al actualizar el Alojamiento",
                        error: err
                    });

            }

            return res
                .status(200)
                .json({
                    ok: true,
                    mensaje: "Alojamiento actualizado correctamente",
                    alojamientoGuardado: alojamientoGuardado
                });
        });
    });
});


// Eliminar Alojamiento
app.delete('/:id', (req, res) => {
    var id = req.params.id;
    Alojamiento.findByIdAndRemove(id, (err, alojamientoBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al eliminar alojamiento',
                errors: err

            });
        }
        if (!alojamientoBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'no existe alojamiento con ese id ',
                errors: err

            });
        }
        return res.status(200).json({
            ok: true,
            mensaje: 'alojamiento eliminado correctamente',
            alojamientoBorrado: alojamientoBorrado
        });
    });
});

// Exporatacion para hacer uso de ella en cualquier modulo
module.exports = app;