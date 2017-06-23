/**
 * Created by lt on 17-05-2017.
 */


var express = require('express');
var router = express.Router();
var restRequest = require('../modules/httpRestRequest');
var cfg = require('../modules/config');
var async = require('async');

/* GET home page. */
router.get('/:numcliente', function(req, res, next) {
    console.log('Request Id:', req.params.numcliente);

    var restUrlClient = 'http://' + cfg.lease_rest_host + ':' + cfg.lease_rest_port + '/lease/api/client/' + req.params.numcliente;
    var restUrlPais = 'http://' + cfg.lease_rest_host + ':' + cfg.lease_rest_port + '/lease/api/pais/short';

    var context = {
        modal_title: "Modificar Clientes",
        modal_id: "modificaCliente",
        temModal: "Sim",
        submit_method: "PUT",
        submit_action: "cliente/" + req.params.numcliente,
        mensagem_sucesso_modal: "'Foi modificado o cliente '",
        sucess_follow_link: "'/clientes'"
    };

    async.parallel([
            function (callback) {
                restRequest.getRestRequest(restUrlPais, function (err, paises) {
                    if (err) {
                        console.log(err);
                        callback(true);
                        return;
                    }
                    callback(false, paises);
                });
            },
            function (callback) {
                restRequest.getRestRequest(restUrlClient, function (err, resultadocliente) {
                    if (err) {
                        console.log(err);
                        callback(true);
                        return;
                    }
                    callback(false, resultadocliente);
                });
            }
        ],

        function (err, results) {
            if (err) {
                console.log(err);
                res.send(500, "Server Error");
                return;
            }

            var cliente = {};
            var restocliente = {};
            var paises = {};

            //callback(false, restricao);
            cliente.clinum = results[1].client[0].clinum;
            cliente.clitcli = results[1].client[0].clitcli;
            cliente.clipais = results[1].client[0].clipais;
            cliente.clinfis = results[1].client[0].clinfis;
            cliente.clinom = results[1].client[0].clinom;
            cliente.climor = results[1].client[0].climor;
            cliente.climor2 = results[1].client[0].climor2;
            cliente.clicop = results[1].client[0].clicop;
            cliente.clicop2 = results[1].client[0].clicop2;
            cliente.cliloc = results[1].client[0].cliloc;
            cliente.cliwww = results[1].client[0].cliwww;
            cliente.clitlx = results[1].client[0].clitlx;
            cliente.clitel = results[1].client[0].clitel;
            restocliente.datanascimento = results[1].restocliente[0].datanascimento;
            cliente.cliehsucursal = false;
            if (results[1].client[0].cliehsucursal == "S") {
                cliente.cliehsucursal = true;
            }
            cliente.cliivacaixa = false;
            if (results[1].client[0].cliivacaixa == "S") {
                cliente.cliivacaixa = true;
            }
            cliente.clibanco = false;
            if (results[1].client[0].clibanco == "S") {
                cliente.clibanco = true;
            }

            context.cliente = cliente;
            context.restocliente = restocliente;
            context.paises = results[0];
            var map_address="NULL";
            // para o mapa
            if(cliente.climor){
                map_address = cliente.climor.replace(/ /g, '+') +","+ cliente.cliloc.replace(/ /g, '+');
            }
            context.map_address = map_address;
            res.render('cliente', context);
        }
    );
});



/* PUT home page. */
router.put('/:numcliente', function(req, res, next) {
    console.log('Request Id:', req.params.numcliente);

    var cliente= {};
    var restocliente = {};
    var modificacliente = {};
    var restUrlClient = 'http://' + cfg.lease_rest_host + ':'+ cfg.lease_rest_port + '/lease/api/client/'+req.params.numcliente;

    //callback(false, restricao);
    cliente.clinum = req.body.clinum;
    cliente.clitcli = req.body.clitcli;
    cliente.clipais = req.body.clipais;
    cliente.clinfis = req.body.clinfis;
    cliente.clinom = req.body.clinom;
    cliente.climor = req.body.climor;
    cliente.climor2 = req.body.climor2;
    cliente.clicop = req.body.clicop;
    cliente.clicop2 = req.body.clicop2;
    cliente.cliloc = req.body.cliloc;
    cliente.clitlx = req.body.clitlx;
    cliente.cliwww = req.body.cliwww;
    cliente.clitel = req.body.clitel;
    restocliente.datanascimento = req.body.datanascimento;
    if(req.body.cliehsucursal){
        cliente.cliehsucursal = req.body.cliehsucursal;
    } else {
        cliente.cliehsucursal = 'N';
    }
    if(req.body.cliivacaixa){
        cliente.cliivacaixa = req.body.cliivacaixa;
    } else {
        cliente.cliivacaixa = 'N';
    }
    if(req.body.clibanco){
        cliente.clibanco = req.body.clibanco;
    } else {
        cliente.clibanco = 'N';
    }

    modificacliente.client = cliente;
    if(req.body.clitcli == 'P'){
            modificacliente.restocliente = restocliente;
    }

    restRequest.putRestRequest(restUrlClient, modificacliente, function (err, modificacliente) {
        if(err) {
            res.status(406).json( modificacliente );
            return;
        }
        res.status(200).json({ client: modificacliente.rClienteT, restocliente: modificacliente.rRestCliT });
    });

});

router.delete('/:numcliente', function(req, res, next) {
    console.log('Request Id:', req.params.numcliente);
    var restUrlClient = 'http://' + cfg.lease_rest_host + ':' + cfg.lease_rest_port + '/lease/api/client/' + req.params.numcliente;

    restRequest.deleteRestRequest(restUrlClient, function (err) {
        if (err) {
            console.log(err);
            res.send(406, "Server Error");
            return;
        }
        res.send(200, "OK");
        return;
    });
});

module.exports = router;
