/**
 * Created by lt on 17-05-2017.
 */



var express = require('express');
var router = express.Router();
var restRequest = require('../modules/httpRestRequest');

/* GET home page. */
router.get('/:numcliente', function(req, res, next) {
    console.log('Request Id:', req.params.numcliente);

    var restUrlClient = 'http://apaxsys004:5113/lease/api/client/'+req.params.numcliente;

    var context = {
        modal_title: "Modificar Clientes",
        modal_id: "modificaCliente"
    };
    restRequest.getRestRequest(restUrlClient, function (err, resultadocliente) {
        if(err) {
            console.log(err);
            res.send(500,"Server Error");
            return;
        }
        var cliente = {};
        //callback(false, restricao);
        cliente.clinom = resultadocliente.client[0].clinom;
        cliente.cliwww = resultadocliente.client[0].cliwww;
        cliente.clitlx = resultadocliente.client[0].clitlx;
        cliente.clitel = resultadocliente.client[0].clitel;
        context.cliente = cliente;

        res.render('cliente', context);
    });


});


module.exports = router;

/*
 <div id="map" style="width:400px;height:400px">

 function myMap() {
 var mapOptions = {
 center: new google.maps.LatLng(51.5, -0.12),
 zoom: 10,
 mapTypeId: google.maps.MapTypeId.HYBRID
 }
 var map = new google.maps.Map(document.getElementById("map"), mapOptions);
 };


 <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY&callback=myMap"></script>


 */