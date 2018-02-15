// Punto de entrada para la aplicacion es que inicializa el servidor de express
// Requires
var express = require('express');

// Libreria Mongoose para conectarnos a mongo
var mongoose = require('mongoose');
//midleware para convertir un objeto de js
var bodyParser = require('body-parser');

// Inicializar Variables
var app = express();


//body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// Importacion de las rutas
var busquedaRoutes = require('./routes/busqueda');
var estudianteRoutes = require('./routes/estudiante');
var administradorRoutes = require('./routes/administrador');
var alojamientoRoutes = require('./routes/alojamiento');
var loginRoutes = require('./routes/login');
var imgRoutes = require('./routes/imagenes');
var appRoutes = require('./routes/app');


//Conexión a la BD
mongoose.connection.openUri('mongodb://localhost:27017/HousingUD', (err, res) => {
    if (err) throw err;

    console.log('Base de Datos HousingDB: \x1b[32m%s\x1b[0m', 'online');
});

// Rutas
// Ejecucion de Middleware,  se ejecuta antes de que se resuelvan otras rutas
app.use('/imagenes', imgRoutes);
app.use('/busqueda', busquedaRoutes);
app.use('/alojamiento', alojamientoRoutes);
app.use('/estudiante', estudianteRoutes);
app.use('/administrador', administradorRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);

// Escuchar peticiones
app.listen(8080, () => {
    console.log('Express server corriendo en el puerto 8080: \x1b[32m%s\x1b[0m', 'online');
});