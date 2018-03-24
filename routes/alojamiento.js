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

app.post('/:idEstudiante', (req, res) => {
    var estudianteId = req.params.idEstudiante;
    var body = req.body;

    //Definicion para crear un nuevo usuario
    var alojamiento = new Alojamiento({
        estudiante: estudianteId,
        tipoVivienda: body.tipoVivienda,
        tipoHabitacion: body.tipoHabitacion,
        propiedadesAlojamiento: {
            descripcionAlojamiento: body.descripcionAlojamiento,
            clasificacionAlojamiento: body.clasificacionAlojamiento,
            estadoAlojamiento: body.estadoAlojamiento,
            estadoPublicacionAlojamiento: body.estadoPublicacionAlojamiento,
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
            imgSala: '',
            imgBanio: '',
            imgCocina: '',
            imgHabitacion: '',
            imgFachada: ''
        },

        mascota: {
            habitaMascota: body.habitaMascota
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
            metro: body.metro,
            uber: body.uber
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
            servicioTVCable: body.television,
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

});


app.use(fileUpload());

app.put('/:idAlojamiento', (req, res) => {

    var alojamientoid = req.params.idAlojamiento;
    console.log(alojamientoid);

    Alojamiento.findById(alojamientoid, (err, alojamiento) => {
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
                mensaje: 'El alojamiento con id ' + idAlojamiento + ' no existe',
            })
        }


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
        var archivos = [sala, banio, cocina, habitacion, fachada];


        // Nombres de archivos
        var nombreSala = sala.name.split('.');
        var nombreBanio = banio.name.split('.');
        var nombreCocina = cocina.name.split('.');
        var nombreHabitacion = habitacion.name.split('.');
        var nombreFachada = fachada.name.split('.');


        // Extendsion de archivos
        var extensionSala = nombreSala[nombreSala.length - 1];
        var extensionBanio = nombreBanio[nombreBanio.length - 1];
        var extensionCocina = nombreCocina[nombreCocina.length - 1];
        var extensionHabitacion = nombreHabitacion[nombreHabitacion.length - 1];
        var extensionFachada = nombreFachada[nombreFachada.length - 1];
        var extensiones = [extensionSala, extensionBanio, extensionCocina, extensionHabitacion, extensionFachada];

        // Extensiones Validas
        var extensionesValidas = ['png', 'PNG', 'JPG', 'jpg', 'jpeg', 'JPEG'];
        console.log(extensiones.length);

        for (var i = 0; i < extensiones.length; i++) {
            if (extensionesValidas.indexOf(extensiones[i]) < 0) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Extension no valida',
                    error: extensionesValidas.join(', ')
                });
            }

        }

        // Nombres de archivos personalizados
        var nombreFinalSala = `${alojamientoid}-${new Date().getMilliseconds()}-1.${extensionSala}`;
        var nombreFinalBanio = `${alojamientoid}-${new Date().getMilliseconds()}-2.${extensionBanio}`;
        var nombreFinalCocina = `${alojamientoid}-${new Date().getMilliseconds()}-3.${extensionCocina}`;
        var nombreFinalHabitacion = `${alojamientoid}-${new Date().getMilliseconds()}-4.${extensionHabitacion}`;
        var nombreFinalFachada = `${alojamientoid}-${new Date().getMilliseconds()}-5.${extensionFachada}`;

        var archivosFinales = [nombreFinalSala, nombreFinalBanio, nombreFinalCocina, nombreFinalHabitacion, nombreFinalFachada];

        for (var i = 0; i < archivosFinales.length; i++) {
            var path = `./uploads/alojamientos/${archivosFinales[i]}`;
            archivos[i].mv(path, err => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al mover archivo'
                    })
                }

            });
        }

        alojamiento.imagenes.imgSala = `/uploads/alojamientos/${nombreFinalSala}`;
        alojamiento.imagenes.imgBanio = `/uploads/alojamientos/${nombreFinalBanio}`;
        alojamiento.imagenes.imgCocina = `/uploads/alojamientos/${nombreFinalCocina}`;
        alojamiento.imagenes.imgHabitacion = `/uploads/alojamientos/${nombreFinalHabitacion}`;
        alojamiento.imagenes.imgFachada = `/uploads/alojamientos/${nombreFinalFachada}`;

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