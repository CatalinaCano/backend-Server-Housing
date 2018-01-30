// Punto de entrada para la aplicacion es que inicializa el servidor de express
// Requires
var express = require('express');

// Libreria Mongoose para conectarnos a mongo
var mongoose = require('mongoose');


// Inicializar Variables
var app = express();

// Importacion de las rutas
var administradorRoutes = require('./routes/administrador');
var appRoutes = require('./routes/app');


//Conexión a la BD
mongoose.connection.openUri('mongodb://localhost:27017/HousingUD', (err, res) => {
    if (err) throw err;

    console.log('Base de Datos HousingDB: \x1b[32m%s\x1b[0m', 'online');
});

// Rutas
// Ejecucion de Middleware,  se ejecuta antes de que se resuelvan otras rutas
app.use('/administrador', administradorRoutes);
app.use('/', appRoutes);

// Escuchar peticiones
app.listen(8080, () => {
    console.log('Express server corriendo en el puerto 8080: \x1b[32m%s\x1b[0m', 'online');
});