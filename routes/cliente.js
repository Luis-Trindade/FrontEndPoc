/**
 * Created by lt on 17-05-2017.
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var context = {
        clinom: "AUDAXYS - SOFTWARE E SISTEMAS, S.A.",
        cliwww: "www.audaxys.com",
        clitlx: "info@audaxys.com",
        clitel: "+351 217 229 300"
    }
    res.render('cliente', context);
});

module.exports = router;

