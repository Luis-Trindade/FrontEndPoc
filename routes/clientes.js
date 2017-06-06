var express = require('express');
var async = require('async');
var restRequest = require('../modules/httpRestRequest');
var cfg = require('../modules/config');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    var restUrlListagem = 'http://' + cfg.lease_rest_host + ':'+ cfg.lease_rest_port + '/lease/api/restricaoLst?listagem=CLIENT';
    var restUrlPais = 'http://' + cfg.lease_rest_host + ':'+ cfg.lease_rest_port + '/lease/api/pais/short';
    var restUrlDefaults = 'http://' + cfg.lease_rest_host + ':'+ cfg.lease_rest_port + '/lease/api/client/defaults';

    var context = {
        modal_title: "Adicionar Cliente",
        modal_id: "adicionaCliente",
        temTabelas: "Sim",
        idtabela: "dataTables-clientes",
        tabledblhref: "cliente",
        dataTableUrl: "/api/clientes",
        tblColumns: [ "clinum", "clinom", "clitlx", "clitel", "clinfis" ],
        cod_select: "cod_restricao",
        temModal: "Sim",
        submit_method: "POST",
        submit_action: "clientes",
        mensagem_sucesso_modal: "'Foi registado o cliente número ' + result.client.clinum",
        sucess_follow_link: "'/cliente/ ' + result.client.clinum"
    };

    async.parallel([
        function(callback) {
            restRequest.getRestRequest(restUrlListagem, function (err, restricao) {
               if(err) { console.log(err); callback(true); return; }
                callback(false, restricao);
            });
        },
        function(callback) {
            restRequest.getRestRequest(restUrlDefaults, function (err, defaults) {
                if(err) { console.log(err); callback(true); return; }
                callback(false, defaults);
            });
        },
        function(callback) {
            restRequest.getRestRequest(restUrlPais, function (err, paises) {
                if(err) { console.log(err); callback(true); return; }
               callback(false, paises);
            });
        }
    ],
    function(err, results) {
        if(err) { console.log(err); res.send(500,"Server Error"); return; }
        var cliente = {};
        var clienteResult = results[1];
        cliente.clitcli = clienteResult[0].clitcli;
        cliente.clipais = clienteResult[0].clipais;
        cliente.clinfis = clienteResult[0].clinfis;
        cliente.clinom = clienteResult[0].clinom;
        cliente.climor = clienteResult[0].climor;
        cliente.climor2 = clienteResult[0].climor2;
        cliente.clicop = clienteResult[0].clicop;
        cliente.clicop2 = clienteResult[0].clicop2;
        cliente.cliloc = clienteResult[0].cliloc;
        cliente.cliwww = clienteResult[0].cliwww;
        cliente.clitlx = clienteResult[0].clitlx;
        cliente.clitel = clienteResult[0].clitel;
        cliente.cliehsucursal = false;
        if (clienteResult[0].cliehsucursal == "S") {
            cliente.cliehsucursal = true;
        }
        cliente.cliivacaixa = false;
        if (clienteResult[0].cliivacaixa == "S") {
            cliente.cliivacaixa = true;
        }
        cliente.clibanco = false;
        if (clienteResult[0].clibanco == "S") {
            cliente.clibanco = true;
        }

        context.cliente = cliente;
        context.restricoes = results[0];
        context.paises = results[2];
        res.render('clientes', context);
    }
    );

});

router.post('/', function(req, res, next) {
    var client = {};
    var restocliente = {};
    var registoCliente = {};


    client.clipais = req.body.clipais;
    client.clinfis = req.body.clinfis;
    client.clinom = req.body.clinom;
    client.climor = req.body.climor;
    client.climor2 = req.body.climor2;
    client.clicop = req.body.clicop;
    client.clicop2 = req.body.clicop2;
    client.cliloc = req.body.cliloc;
    client.clitlx = req.body.clitlx;
    client.cliwww = req.body.cliwww;
    client.clitel = req.body.clitel;
    if(req.body.cliehsucursal){
        client.cliehsucursal = req.body.cliehsucursal;
    } else {
        client.cliehsucursal = 'N';
    }
    if(req.body.cliivacaixa){
        client.cliivacaixa = req.body.cliivacaixa;
    } else {
        client.cliivacaixa = 'N';
    }
    if(req.body.clibanco){
        client.clibanco = req.body.clibanco;
    } else {
        client.clibanco = 'N';
    }

    registoCliente.client = client;
    client.clitcli = req.body.clitcli;
    if(req.body.clitcli == 'P'){
        restocliente.datanascimento = req.body.datanascimento;
        registoCliente.restocliente = restocliente;
    }
    var restUrlRegCliente = 'http://' + cfg.lease_rest_host + ':'+ cfg.lease_rest_port + '/lease/api/client';

    restRequest.postRestRequest(restUrlRegCliente, registoCliente, function (err, resposta) {
        if(err) { console.log(err); res.sendStatus(406); return; }

        res.status(200).json({ client: resposta.rClienteT, restocliente: resposta.rRestCliT });
    });

});

module.exports = router;

