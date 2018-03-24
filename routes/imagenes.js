// Importacion del Express
var express = require('express');
var fs = require('fs');

var app = express(); // Levantar la app



// Rutas
app.get('/uploads/alojamientos/:img', (req, res, next) => {
    var img = req.params.img;

    var path = `./uploads/alojamientos/${ img }`;

    console.log(path);

    fs.exists(path, existe => {
        if (!existe) {
            path = './assets/no-img.jpg';
        }

        res.sendfile(path);
    })
});

// Exporatacion para hacer uso de ella en cualquier modulo
module.exports = app;