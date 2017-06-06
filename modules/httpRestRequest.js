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
exports.putRestRequest = function(hostUrl, requestData,processResult){
    request({
            method: 'PUT',
            uri: hostUrl,
            headers: {"content-type": "application/json",    },
            json: requestData
    }, function(err, response, body) {
        // JSON body
        if(err) { console.log(err); processResult(true); return; }
        var obj = "OK" //JSON.parse(body);
        processResult(false, obj);
    });
}


exports.postRestRequest = function(hostUrl, requestData, processResult){
    request({
            method: 'POST',
            uri: hostUrl,
            headers: {
                "content-type": "application/json",
            },
            json: requestData
    }, function(err, response, body) {
        // JSON body
        if(err) { console.log(err); processResult(true); return; }
        var obj = body;
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


