/**
 * Created by lt on 17-05-2017.
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:numcliente', function(req, res, next) {
    console.log('Request Id:', req.params.numcliente);

    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
        "address": inputAddress
    }, function(results) {
        console.log(results[0].geometry.location); //LatLng
    });

    var context = {
        modal_title: "Modificar Clientes",
        modal_id: "modificaCliente",
        cliente: {
            clinom: "AUDAXYS - SOFTWARE E SISTEMAS, S.A.",
            cliwww: "www.audaxys.com",
            clitlx: "info@audaxys.com",
            clitel: "+351 217 229 300"
        }
    }
    res.render('cliente', context);
});

module.exports = router;

