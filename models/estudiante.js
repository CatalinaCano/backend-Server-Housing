// Importacion de Mongoose
var mongoose = require('mongoose');
var uniqueValidator = require("mongoose-unique-validator");
// Libreria para crear esquemas
var Schema = mongoose.Schema;


//variable para controlar las Sedes

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

var rolesValidos = {
    values: ['ADMINISTRADOR', 'ESTUDIANTE'],
    message: '{VALUE} no es un rol válido'
};

// Definir el Administrador esquema
// Funcion que recibe un objeto de js con la configuracion del registro
var estudianteSchema = new Schema({
    sobreMi: { type: String, required: [true, 'Este Campo es Requerido'] },
    perteneceA: { type: String, required: [true, 'Debe seleccionar una sede válida'], enum: sedesValidas },
    role: { type: String, required: [true, 'Este Campo es Requerido'], default: 'ESTUDIANTE', enum: rolesValidos },
    email: {
        type: String,
        unique: true,
        required: [true, 'Este Campo es Requerido']
    },
}, { collection: 'estudiantes' });

// Exportar el esquema Estudiante
module.exports = mongoose.model('Estudiante', estudianteSchema);