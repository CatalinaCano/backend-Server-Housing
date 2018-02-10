// Importacion de Mongoose
var mongoose = require('mongoose');


// Libreria para crear esquemas
var Schema = mongoose.Schema;

//variable para controlar las respuestas validas
var respuestasValidas = {
    values: ['SI', 'NO', 'si', 'no', 'Si', 'No'],
    message: '{VALUE} no es una respuesta válida'
};
var numerosValidos = {
    values: ['1', '2', '3', '4', '5', '6', '7'],
    message: "{VALUE} no es una respuesta válida"
};

var tipoViviendaValido = {
    values: ['Casa familiar', 'Duplex', 'Apartamento', 'Conjunto Casas', 'Conjunto Apartamentos', 'Otro '],
    message: '{VALUE} no es un tipo de vivienda válido'
};

var sedesValidas = {
    values: ['Aduanilla de Paiba',
        'Calle 34',
        'Calle 40 (Edificio Administrativo)',
        'Calle 40 (Facultad de Ingeniería)',
        'Calle 64',
        'Centro Cultural Nueva Santa Fé',
        'Edificio Villa Esther Desarrollo Físico y SGA/PIGA',
        'Edificio UGI',
        'El Tibar',
        'Emisora LAUD 90.4 F.M',
        'IDEXUD',
        'ILUD - San Luis Calle 58 ILUD',
        'ILUD - Virrey ILUD',
        'ILUD Rebeca',
        'Luis A. Calvo',
        'Macarena A',
        'Macarena B',
        'Palacio de la Merced',
        'Porvenir',
        'Sección de Publicaciones',
        'Sótanos',
        'Tecnológica',
        'Vivero'
    ],
    message: '{VALUE} no es una sede válida'
};

var estadoAlojamientoValido = {
    values: ['Disponible', 'Ocupado'],
    message: '{VALUE} no es un tipo de estado de vivienda válido'
};

var estadoPublicacionAlojamientoValido = {
    values: ['Aceptado', 'Rechazado', 'En estudio'],
    message: '{VALUE} no es un estado de publicacion válido'
};

var tipoHabitacionValido = {
    values: ['Individual', 'Compartida', 'Otra'],
    message: '{VALUE} no es un tipo de habitacion válido'
};

var clasificacionAlojamientoValido = {
    values: ['Arrendado', 'Propio', 'Familiar', 'Otro'],
    message: '{VALUE}  no es una clasificacion valida'
};

var hospedanAValido = {
    values: ['Hombre', 'Mujer', 'No importa'],
    message: '{VALUES}  no es un tipo de hospedaje valido'
};

var tipoMascotaValida = {
    values: ['Mamífero', 'Ave', 'Peces', 'Reptiles', 'Anfibios', 'Invertebrado', 'Otro', 'Sin mascota'],
    message: '{VALUES}  no es un tipo de máscota valido'
};

var tipoCamaValida = {
    values: ['Sin cama', 'Cama sencilla', 'Cama doble', 'Cama Semidoble', 'Sofa Cama', 'Otro'],
    message: '{VALUES} no es un tipo de cama valida'
};

var voltajeValido = {
    values: ['100V', '110V', '120V', '127V', '220V', '230V', '240V'],
    message: '{VALUES}  no es un tipo de voltaje valido'
};

var tipoZonaValida = {
    values: ['Centro', 'Sur', 'Occidente', 'Norte', 'Oriente'],
    message: '{VALUES} no es un tipo de zona valida'
};

var tipoHabitosAlimenticiosValidos = {
    values: ['Vegetariano', 'Vegano', 'Todas las carnes', 'Sólo carnes blancas', 'Sólo carnes rojas', 'Otro'],
    message: '{VALUES} no es un tipo de habito alimenticio valido'
};

var volumenValido = {
    values: ['Alto', 'Moderado', 'Bajo'],
    message: '{VALUES} no es un tipo de volumen valido'
};

var horasValidas = {
    values: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    message: '{VALUES} no es un tipo de hora valida'
};

var franjasValidas = {
    values: ['Am', 'Pm'],
    message: '{VALUES} no es un tipo de franja valida'
};


// Definir el Administrador esquema
// Funcion que recibe un objeto de js con la configuracion del registro
var alojamientoSchema = new Schema({
    //estudianteAnfitrion: { type: Schema.Types.ObjectId, ref: 'Estudiante' },
    estudiante: { type: Schema.Types.ObjectId, ref: 'Estudiante' },
    propiedadesAlojamiento: {
        tipoVivienda: { type: String, required: [true, ' El tipo de vivienda es requerido'], enum: tipoViviendaValido },
        descripcionAlojamiento: { type: String, required: [true, 'La descripcion del alojamiento es requerida'] },
        tipoHabitacion: { type: String, required: [true, 'El tipo de habitacion es requerido'], enum: tipoHabitacionValido },
        clasificacionAlojamiento: { type: String, required: [true, 'La clasificacion del alojamiento es requerida'], enum: clasificacionAlojamientoValido },
        estadoAlojamiento: { type: String, required: [true, 'El estado del alojamiento es requerido'], default: 'Disponible', enum: estadoAlojamientoValido },
        estadoPublicacionAlojamiento: { type: String, required: [true, 'El estado de la publicacion es requerido'], default: 'En estudio', enum: estadoPublicacionAlojamientoValido },
        fechaPublicacionAlojamiento: { type: String, required: [true, 'La fecha de publicacion es requerida'] }
    },
    sedeCercana: { type: String, required: [true, 'Debe seleccionar la sede mas cercana'], enum: sedesValidas },
    hospedanA: { type: String, required: [true, 'El tipo de persona a hospedar es requerido'], enum: hospedanAValido },
    ubicacion: {
        latitud: { type: Number, required: [true, 'La latitud es requerida'] },
        longitud: { type: Number, required: [true, 'La longitud es requerida'] },
        zona: { type: String, required: [true, 'La zona es requerida'], enum: tipoZonaValida }
    },
    imagenes: {
        imgSala: { type: String, required: [true, 'La Foto de la sala es requerida'] },
        imgBanio: { type: String, required: [true, 'La Foto del Baño es requerida'] },
        imgCocina: { type: String, required: [true, 'La Foto de la cocina es requerida'] },
        imgHabitacion: { type: String, required: [true, 'La Foto de la habitacion es requerida'] },
        imgFachada: { type: String, required: [true, 'La Foto de la fachada principal es requerida'] }

    },
    mascota: {
        habitaMascota: { type: String, required: [true, 'Es necesario especificar si habita mascota'], enum: respuestasValidas },
        tipoMascota: { type: String, required: [true, 'Es necesario especificar el tipo de mascota'], default: 'Sin mascota', enum: tipoMascotaValida }
    },
    normasAlojamiento: {
        horaLlegada: { type: String, required: [true, 'Es necesario especificar la hora de llegada '], enum: horasValidas },
        franjaLlegada: { type: String, required: [true, 'Es necesario especificar la franja de llegada '], enum: franjasValidas },
        accesoOtrasPersonas: { type: String, required: [true, 'Es necesario especificar si permite acceso a otras personas '], enum: respuestasValidas },
        fiestasEventos: { type: String, required: [true, 'Es necesario especificar si permite realizar fiestas o eventos'], enum: respuestasValidas },
        nivelVolumen: { type: String, required: [true, 'Es necesario especificar nivel de volumen permitido'], enum: volumenValido },
        ritosExorcismosOrgias: { type: String, required: [true, 'Es necesario especificar  si permite eventos bochornosos '], enum: respuestasValidas },
        permiteConsumoAlcohol: { type: String, required: [true, 'Es necesario especificar  si permite  consumo de alcohol en la vivienda'], enum: respuestasValidas },
        permiteConsumoDrogas: { type: String, required: [true, 'Es necesario especificar  si permite consumo de drogas en la vivienda '], enum: respuestasValidas }
    },
    transporte: {
        publico: { type: String, required: [true, 'Es necesario especificar  si esta disponible el tipo de transporte '], enum: respuestasValidas },
        bicicleta: { type: String, required: [true, 'Es necesario especificar  si esta disponible el tipo de transporte '], enum: respuestasValidas },
        taxi: { type: String, required: [true, 'Es necesario especificar  si esta disponible el tipo de transporte '], enum: respuestasValidas },
        caminando: { type: String, required: [true, 'Es necesario especificar  si esta disponible el tipo de transporte '], enum: respuestasValidas },
        metro: { type: String, required: [true, 'Es necesario especificar  si esta disponible el tipo de transporte '], enum: respuestasValidas }
    },
    lugaresCercanos: {
        centrosComerciales: { type: String, required: [true, 'Es necesario especificar si hay centros comerciales alrededor de su alojamiento'], enum: respuestasValidas },
        museos: { type: String, required: [true, 'Es necesario especificar  si hay museos alrededor de su alojamiento '], enum: respuestasValidas },
        restaurantes: { type: String, required: [true, 'Es necesario especificar  si hay restaurantes alrededor de su alojamiento '], enum: respuestasValidas },
        bares: { type: String, required: [true, 'Es necesario especificar  si hay restaurantes alrededor de su alojamiento '], enum: respuestasValidas },
        iglesias: { type: String, required: [true, 'Es necesario especificar  si hay iglesias alrededor de su alojamiento '], enum: respuestasValidas },
        hospitales: { type: String, required: [true, 'Es necesario especificar  si hay hospitales alrededor de su alojamiento '], enum: respuestasValidas },
        teatros: { type: String, required: [true, 'Es necesario especificar  si hay teatros alrededor de su alojamiento'], enum: respuestasValidas },
        parques: { type: String, required: [true, 'Es necesario especificar  si hay parques alrededor de su alojamiento'], enum: respuestasValidas },
        zonasComerciales: { type: String, required: [true, 'Es necesario especificar  si hay zonas comerciales alrededor de su alojamiento'], enum: respuestasValidas },
        zonasCulturales: { type: String, required: [true, 'Es necesario especificar  si hay zonas culturales alrededor de su alojamiento '], enum: respuestasValidas },
        gimnasio: { type: String, required: [true, 'Es necesario especificar  si hay gimnasio alrededor de su alojamiento'], enum: respuestasValidas }
    },
    servicios: {
        internet: { type: String, required: [true, 'Es necesario especificar si cuenta con este servicio en su alojamiento'], enum: respuestasValidas },
        computador: { type: String, required: [true, 'Es necesario especificar si cuenta con este servicio en su alojamiento'], enum: respuestasValidas },
        television: { type: String, required: [true, 'Es necesario especificar si cuenta con este servicio en su alojamiento'], enum: respuestasValidas },
        videoJuegos: { type: String, required: [true, 'Es necesario especificar si cuenta con este servicio en su alojamiento'], enum: respuestasValidas },
        serviciosPublicos: { type: String, required: [true, 'Es necesario especificar si cuenta con este servicio en su alojamiento'], enum: respuestasValidas },
        aguaCaliente: { type: String, required: [true, 'Es necesario especificar si cuenta con este servicio en su alojamiento'], enum: respuestasValidas },
        alimentacionIncluida: { type: String, required: [true, 'Es necesario especificar si cuenta con este servicio en su alojamiento'], enum: respuestasValidas },
        aseoHabitacion: { type: String, required: [true, 'Es necesario especificar si cuenta con este servicio en su alojamiento'], enum: respuestasValidas },
        lavadoRopa: { type: String, required: [true, 'Es necesario especificar si cuenta con este servicio en su alojamiento'], enum: respuestasValidas },
        servicioTVCable: { type: String, required: [true, 'Es necesario especificar si cuenta con este servicio en su alojamiento'], enum: respuestasValidas },
        lavadora: { type: String, required: [true, 'Es necesario especificar si cuenta con este servicio en su alojamiento'], enum: respuestasValidas },
        accesoLlaves: { type: String, required: [true, 'Es necesario especificar si cuenta con este servicio en su alojamiento'], enum: respuestasValidas },
        electrodomesticos: { type: String, required: [true, 'Es necesario especificar si cuenta con este servicio en su alojamiento'], enum: voltajeValido },
        banioPrivado: { type: String, required: [true, 'Es necesario especificar si cuenta con este servicio en su alojamiento'], enum: respuestasValidas },
        tipoCama: { type: String, required: [true, 'Es necesario especificar si cuenta con este servicio en su alojamiento'], enum: tipoCamaValida },
        electrodomesticosDeCocina: { type: String, required: [true, 'Es necesario especificar si cuenta con este servicio en su alojamiento'], enum: respuestasValidas },
        alarma: { type: String, required: [true, 'Es necesario especificar si cuenta con este servicio en su alojamiento'], enum: respuestasValidas },
        guardaRopa: { type: String, required: [true, 'Es necesario especificar si cuenta con este servicio en su alojamiento'], enum: respuestasValidas }
    },
    componentes: {
        numeroHabitaciones: { type: String, required: [true, 'Es necesario especificar con cuantas habitaciones cuenta su alojamiento'], enum: numerosValidos },
        cantidadBanios: { type: String, required: [true, 'Es necesario especificar si cuenta con este componente en su alojamiento'], enum: numerosValidos },
        accesoCocina: { type: String, required: [true, 'Es necesario especificar si cuenta con este componente en su alojamiento'], enum: respuestasValidas },
        espacioEstudio: { type: String, required: [true, 'Es necesario especificar si cuenta con este componente en su alojamiento'], enum: respuestasValidas },
        sePermiteFumar: { type: String, required: [true, 'Es necesario especificar si cuenta con este componente en su alojamiento'], enum: respuestasValidas },
        espacioAireLibre: { type: String, required: [true, 'Es necesario especificar si cuenta con este componente en su alojamiento'], enum: respuestasValidas },
        accesoSala: { type: String, required: [true, 'Es necesario especificar si cuenta con este componente en su alojamiento'], enum: respuestasValidas }
    },
    costumbres: {
        habitosAlimenticios: { type: String, required: [true, 'Es necesario especificar tipo de alimentacion'], enum: tipoHabitosAlimenticiosValidos },
        consumoDrogas: { type: String, required: [true, 'Es necesario especificar si consumen drogas en su alojamiento'], enum: respuestasValidas },
        consumoAlcohol: { type: String, required: [true, 'Es necesario especificar si consumen alcohol en su alojamiento'], enum: respuestasValidas }
    }
}, { collection: 'alojamientos' });


// Exportar el esquema Usuario
module.exports = mongoose.model('Alojamiento', alojamientoSchema);