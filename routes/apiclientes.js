var express = require('express');
var restRequest = require('../modules/httpRestRequest');
var async = require('async');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var restUrlClientes = 'http://apaxsys004:5113/lease/api/client/short';
    var countUrlClientes = 'http://apaxsys004:5113/lease/api/client/count';

    restUrlClientes = restUrlClientes + '?';
    if ( req.query.start > 0 ) {
        restUrlClientes = restUrlClientes + 'start=' + req.query.start;
    }
    restUrlClientes = restUrlClientes + '&nrec=' + req.query.length;
    if(req.query.search.value ){
        restUrlClientes = restUrlClientes + '&criterio=' + req.query.search.value;
    }

    if(req.query.restricao ){
        restUrlClientes = restUrlClientes + '&restricao=' + req.query.restricao;
    }
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
        }
    ],
        function(err, results) {
            if(err) { console.log(err); res.send(500,"Server Error"); return; }
            var resposta = {
                draw: req.query.draw,
                recordsTotal: results[1],
                recordsFiltered: results[1],
                data: results[0]
            };
            res.json(resposta);
        }
    );

});

module.exports = router;