// Importacion del Express
var express = require('express');
var app = express(); // Levantar la app

//Importar modelo de  Administrador
var Alojamiento = require('../models/alojamiento');


//Metodo para obtener  alojamientos
app.get('/', (req, res) => {
    Alojamiento.find({}, (err, alojamientos) => {
        if (err) {
            return res
                .status(500)
                .json({
                    ok: false,
                    mensaje: 'Error al consultar alojamientos',
                    errors: err
                });
        }
        return res
            .status(200)
            .json({
                ok: true,
                mensaje: 'Consulta de alojamientos Exitosa',
                alojamientos: alojamientos
            });
    });
});




// Crear Estudiante
app.post('/', (req, res) => {
    var body = req.body;
    //Definicion para crear un nuevo usuario
    var alojamiento = new Alojamiento({
        estudiante: req.estudiante._id,
        propiedadesAlojamiento: {
            tipoVivienda: body.tipoVivienda,
            descripcionAlojamiento: body.descripcionAlojamiento,
            tipoHabitacion: body.tipoHabitacion,
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
            imgSala: body.imgSala,
            imgBanio: body.imgBanio,
            imgCocina: body.imgCocina,
            imgHabitacion: body.imgHabitacion,
            imgFachada: body.imgFachada
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
        },


        estudiante: { type: Schema.Types.Object }
    });
    //metodo para guardar nuevo usuario
    alojamiento.save((err, alojamientoGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al Guardar Alojamiento',
                error: err
            });
        }
        res.status(201).json({
            ok: true,
            mensaje: 'Alojamiento Guardado con Éxito',
            alojamientoGuardado: alojamientoGuardado
        });
    });
});





// Actualizar Usuario
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
        alojamiento.propiedadesAlojamiento.tipoVivienda = body.tipoVivienda;
        alojamiento.propiedadesAlojamiento.descripcionAlojamiento = body.descripcionAlojamiento;
        alojamiento.propiedadesAlojamiento.tipoHabitacion = body.tipoHabitacion;
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


// Eliminar Administrador
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