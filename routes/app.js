// Ruta Principal

// Importacion del Express
var express = require('express');
var app = express(); // Levantar la app

// Rutas
app.get('/', (req, res, next) => {
    res.status(202).json({
        ok: true,
        mensaje: 'Petición realizada correctamente'
    }); // Todo se hizo corriendo correctamente
});

// Exporatacion para hacer uso de ella en cualquier modulo
module.exports = app;