let app = require('express')();
const http = require('http').Server(app);
const express = require('express');
const port = 3000;


app.use(express.json());

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-type, Accept");
    next();
});


app.use(require('./routers/usuario'))

http.listen(port, function(){
    console.log('Conectado por http://localhost:'+port);
})

