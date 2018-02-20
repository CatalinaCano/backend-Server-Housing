// Importacion de Mongoose
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
// Libreria para crear esquemas
var Schema = mongoose.Schema;

//variable para controlar los roles validos

var rolesValidos = {
    values: ['ADMINISTRADOR', 'ESTUDIANTE'],
    message: '{VALUE} no es un rol válido'
};

// Definir el Administrador esquema
// Funcion que recibe un objeto de js con la configuracion del registro
var administradorSchema = new Schema({
    nombre: { type: String, required: [true, 'Este Campo es Requerido'] },
    email: {
        type: String,
        unique: true,
        required: [true, 'Este Campo es Requerido']
    },
    password: { type: String, required: [true, 'Este Campo es Requerido'] },
    role: { type: String, required: [true, 'Este Campo es Requerido'], default: 'ADMINISTRADOR', enum: rolesValidos }


}, { collection: 'administradores' });

administradorSchema.plugin(uniqueValidator, { message: 'Este {PATH} ya esta en uso' });



// Exportar el esquema Usuario
module.exports = mongoose.model('Administrador', administradorSchema);