var request = require('request');

exports.getRestRequest = function(hostUrl, processResult){
    request({ method: 'GET', uri: hostUrl }, function(err, response, body) {
        // JSON body
        if(err) { console.log(err); processResult(true); return; }
        var obj = JSON.parse(body);
        processResult(false, obj);
    });
}

// TODO: tem de se fazer
exports.putRestRequest = function(hostUrl, processResult){
    request({ method: 'PUT', uri: hostUrl }, function(err, response, body) {
        // JSON body
        if(err) { console.log(err); processResult(true); return; }
        var obj = JSON.parse(body);
        processResult(false, obj);
    });
}

// TODO: tem de se fazer
exports.postRestRequest = function(hostUrl, processResult){
    request.post({ method: 'POST', uri: hostUrl }, function(err, response, body) {
        // JSON body
        if(err) { console.log(err); processResult(true); return; }
        var obj = JSON.parse(body);
        processResult(false, obj);
    });
}

// TODO: tem de se fazer correctamente(em principio não e preciso fazer nada)
exports.deleteRestRequest = function(hostUrl, processResult){
    request({ method: 'DELETE', uri: hostUrl }, function(err, response, body) {
        // JSON body
        if(err) { console.log(err); processResult(true); return; }
        var obj = JSON.parse(body);
        processResult(false, obj);
    });
}


