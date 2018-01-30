// Importacion de Mongoose
var mongoose = require('mongoose');

// Libreria para crear esquemas
var Schema = mongoose.Schema;

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
    role: { type: String, required: [true, 'Este Campo es Requerido'], default: 'ADMIN_ROL' }
});


// Exportar el esquema Usuario
module.exports = mongoose.model('administradores', administradorSchema);