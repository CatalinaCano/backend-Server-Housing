// Punto de entrada para la aplicacion es que inicializa el servidor de express
// Requires
var express = require('express');

// Libreria Mongoose para conectarnos a mongo
var mongoose = require('mongoose');


// Inicializar Variables
var app = express();


//Conexión a la BD
mongoose.connection.openUri('mongodb://localhost:27017/HousingDB', (err, res) => {
    if (err) throw err;

    console.log("Base de Datos HousingDB: \x1b[32m%s\x1b[0m", "online");
})


// Rutas
app.get('/', (req, res, next) => {
    res.status(202).json({
            ok: true,
            mensaje: 'Petición realizada correctamente'
        }) // Todo se hizo corriendo correctamente
})


// Escuchar peticiones
app.listen(8080, () => {
    console.log('Express server corriendo en el puerto 8080: \x1b[32m%s\x1b[0m', 'online');
})