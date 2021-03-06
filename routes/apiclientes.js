var express = require('express');
var restRequest = require('../modules/httpRestRequest');
var cfg = require('../modules/config');
var async = require('async');
var router = express.Router();

router.get('/valida_nif', function(req, res, next){
    var restUrlValidaNif = 'http://' + cfg.lease_rest_host + ':'+ cfg.lease_rest_port + '/lease/api/client/valida_nif';
    if ( req.query.nif > 0 ) {
        restUrlValidaNif = restUrlValidaNif + '?nif=' + req.query.nif;
    }
    async.parallel([
        function(callback) {
            restRequest.getRestRequest(restUrlValidaNif, function (err, resultados) {
                if(err) { console.log(err); callback(true); return; }
                callback(false, resultados);
            });
        } ],
        function(err, results) {
            if(err) { console.log(err); res.send(500,"Server Error"); return; }
            if(results == 1) {
                res.sendStatus(200);
            } else {
                res.sendStatus(400);
            }
        }
    );



});

/* GET home page. */
router.get('/', function(req, res, next) {
    var restUrlClientes = 'http://' + cfg.lease_rest_host + ':'+ cfg.lease_rest_port + '/lease/api/client/short';
    var countUrlClientes = 'http://' + cfg.lease_rest_host + ':'+ cfg.lease_rest_port + '/lease/api/client/count';
    var countFilteredUrlClientes = 'http://' + cfg.lease_rest_host + ':'+ cfg.lease_rest_port + '/lease/api/client/count';

    var queryParams='?';

    if ( req.query.start > 0 ) {
        queryParams = queryParams + 'start=' + req.query.start;
    }
    queryParams = queryParams + '&nrec=' + req.query.length;
    if(req.query.search.value ){
        queryParams = queryParams + '&criterio=' + req.query.search.value;
    }

    if(req.query.restricao != "--" ){
        queryParams = queryParams + '&restricao=' + req.query.restricao;
    }
    if(req.query.order.length > 0){
        var ordem = "&order=";
        var ordemAsc = "";
        var ordemDesc = "";
        req.query.order.forEach(function(x){
            var columnIndex = parseInt(x.column, 10) + 1;
            if(x.dir == "asc"){
                ordemAsc += columnIndex + ",";
            }
            if(x.dir == "desc"){
                ordemDesc += columnIndex + ",";
            }
        });
        if(ordemAsc.length > 0 ){
            ordemAsc = ordemAsc.slice(0, -1);
            ordem += ordemAsc + " asc";
        }
        if(ordemDesc.length > 0 ){
            ordemDesc = ordemDesc.slice(0, -1);
            ordem += ordemDesc + " desc";
        }
        queryParams = queryParams + ordem;
    }
    restUrlClientes = restUrlClientes + queryParams;
    countFilteredUrlClientes = countFilteredUrlClientes + queryParams;

    async.parallel([
        function(callback) {
            restRequest.getRestRequest(restUrlClientes, function (err, resultados) {
                if(err) { console.log(err); callback(true); return; }
                callback(false, resultados);
            });
        },
        function(callback) {
            restRequest.getRestRequest(countUrlClientes, function (err, resultados) {
                if(err) { console.log(err); callback(true); return; }
                callback(false, resultados);
            });
        },
        function(callback) {
            restRequest.getRestRequest(countFilteredUrlClientes, function (err, resultados) {
                if(err) { console.log(err); callback(true); return; }
                callback(false, resultados);
            });
        }
    ],
        function(err, results) {
            if(err) { console.log(err); res.send(500,"Server Error"); return; }
            var resposta = {
                draw: req.query.draw,
                recordsTotal: results[1],
                recordsFiltered: results[2],
                data: results[0]
            };
            res.json(resposta);
        }
    );

});

router.get('/mapas/:nomemapa', function(req, res, next){
    var restUrlMapas = 'http://' + cfg.lease_rest_host + ':'+ cfg.lease_rest_port + '/lease/api/mapas/' + req.params.nomemapa;
    restRequest.getRestRequest(restUrlMapas, function (err, resultados) {
        if(err) { console.log(err); res.json(null); return; }
        res.json(resultados);
    });
    //res.json(resposta);

});


module.exports = router;