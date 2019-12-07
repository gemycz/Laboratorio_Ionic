const express = require('express');
const router = express.Router();

var getConnection = require('../conexion');

router.get('/usuario/:cedula', (req, res)=>{
    console.log("entrò");
    getConnection(function(err, conn){
        const{cedula} = req.params;
        if(err){
            return res.send(400);
        }
        conn.query('SELECT * FROM usuario WHERE cedulausuario= ?', [cedula], function(err, rows){

            if(err){

                conn.release();
                return res.send(400, 'No se puede conectar a la base de datos')
            }
            res.send(rows);
            conn.release();
        })
    })
});

 //obtener todos los usuarios

 router.get('/usuario', (req, res)=>{
    console.log("entrò");
    getConnection(function(err, conn){
        const{cedula} = req.params;
        if(err){
            return res.send(400);
        }
        conn.query('SELECT * FROM usuario' , function(err, rows){

            if(err){

                conn.release();
                return res.send(400, 'No se puede conectar a la base de datos')
            }
            res.send(rows);
            conn.release();
        })
    })
});



router.post('/usuario/', (req,res,next) =>{
    const data ={
        nombreusuario: req.body.nombreusuario,
        apellidousuario: req.body.apellidousuario,
        cedulausuario: req.body.cedulausuario,
        telefonousuario: req.body.telefonousuario,
        direccionusuario: req.body.direccionusuario,
        correousuario: req.body.correousuario

    };



    const query = "INSERT INTO usuario (nombreusuario, apellidousuario,cedulausuario,"
    +"telefonousuario, direccionusuario, correousuario)"
    +"values ("+"\'" + data.nombreusuario+ "\', \'"+ data.apellidousuario+ "\',\'"
    + data.cedulausuario
    + "\',\'" + data.telefonousuario+ "\', \'"+ data.direccionusuario
    +"\', \'"+ data.correousuario+ "\')";

    getConnection(function (err, client){
        if(err){
            console.log("No se puede conectar a la BD" + err);
        }
        client.query(query, function(err, result){
            if(!err){
               res.json({ status: "Registro exitoso"});
            } else{
                console.log(err);
            }    
        });
    });

   
});
module.exports = router;
